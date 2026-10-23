"use client";

import { useEffect, useState, type FormEvent } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Save } from "lucide-react";
import { createClient } from "@/lib/supabase/cliente";

type Organizacao = {
  id: string;
  nome: string;
  tipo: string;
};

type Projeto = {
  id: string;
  titulo: string;
  descricao: string | null;
  instituicao: string | null;
  responsavel: string | null;
  etapa: string;
  status: string;
  progresso: number;
  tags: string[] | null;
  data_inicio: string | null;
  data_fim: string | null;
  organizacao_id: string | null;
  publico: boolean;
};

export default function EditarProjetoPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const id = params.id;

  const [projeto, setProjeto] = useState<Projeto | null>(null);
  const [carregando, setCarregando] = useState(true);
  const [erroCarregamento, setErroCarregamento] = useState<string | null>(null);

  const [salvando, setSalvando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  const [organizacoes, setOrganizacoes] = useState<Organizacao[]>([]);
  const [carregandoOrganizacoes, setCarregandoOrganizacoes] = useState(true);
  const [erroOrganizacoes, setErroOrganizacoes] = useState<string | null>(null);

  const [organizacaoId, setOrganizacaoId] = useState("");
  const [publico, setPublico] = useState(false);

  useEffect(() => {
    let componenteAtivo = true;

    async function carregarDados() {
      const supabase = createClient();

      try {
        const {
          data: { user },
          error: erroUsuario,
        } = await supabase.auth.getUser();

        if (erroUsuario || !user) {
          throw new Error("Sua sessão expirou. Entre novamente.");
        }

        const { data, error: erroProjeto } = await supabase
          .from("projetos")
          .select(
            "id, titulo, descricao, instituicao, responsavel, etapa, status, progresso, tags, data_inicio, data_fim, organizacao_id, publico",
          )
          .eq("id", id)
          .maybeSingle();

        if (erroProjeto) {
          throw erroProjeto;
        }

        if (!data) {
          throw new Error(
            "Projeto não encontrado ou você não tem permissão para editá-lo.",
          );
        }

        if (!componenteAtivo) return;

        const projetoCarregado = data as Projeto;

        setProjeto(projetoCarregado);
        setOrganizacaoId(projetoCarregado.organizacao_id ?? "");
        setPublico(Boolean(projetoCarregado.publico));

        try {
          const { data: membros, error: erroMembros } = await supabase
            .from("organizacao_membros")
            .select("organizacao_id")
            .eq("usuario_id", user.id)
            .eq("status", "ativo");

          if (erroMembros) {
            throw erroMembros;
          }

          const idsOrganizacoes = (membros ?? []).map(
            (membro) => membro.organizacao_id,
          );

          if (idsOrganizacoes.length === 0) {
            if (componenteAtivo) {
              setOrganizacoes([]);
            }
          } else {
            const { data: lista, error: erroLista } = await supabase
              .from("organizacoes")
              .select("id, nome, tipo")
              .in("id", idsOrganizacoes)
              .order("nome");

            if (erroLista) {
              throw erroLista;
            }

            if (componenteAtivo) {
              setOrganizacoes(lista ?? []);
            }
          }
        } catch {
          if (componenteAtivo) {
            setErroOrganizacoes(
              "Não foi possível carregar suas organizações e equipes.",
            );
          }
        }
      } catch (erro) {
        if (componenteAtivo) {
          setErroCarregamento(
            erro instanceof Error
              ? erro.message
              : "Não foi possível carregar o projeto.",
          );
        }
      } finally {
        if (componenteAtivo) {
          setCarregando(false);
          setCarregandoOrganizacoes(false);
        }
      }
    }

    void carregarDados();

    return () => {
      componenteAtivo = false;
    };
  }, [id]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    const titulo = String(formData.get("titulo") ?? "").trim();
    const etapa = String(formData.get("etapa") ?? "");

    if (!titulo || !etapa) {
      setErro("Preencha o título e selecione a etapa do projeto.");
      return;
    }

    setSalvando(true);
    setErro(null);

    try {
      const supabase = createClient();

      const {
        data: { user },
        error: erroUsuario,
      } = await supabase.auth.getUser();

      if (erroUsuario || !user) {
        setErro(
          "Sua sessão expirou. Entre novamente para salvar as alterações.",
        );
        return;
      }

      const progressoInformado = Number(formData.get("progresso"));

      const tags = String(formData.get("tags") ?? "")
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean);

      const { error: erroAtualizacao } = await supabase
        .from("projetos")
        .update({
          titulo,
          descricao: String(formData.get("descricao") ?? "").trim() || null,
          instituicao: String(formData.get("instituicao") ?? "").trim() || null,
          responsavel: String(formData.get("responsavel") ?? "").trim() || null,
          etapa,
          status: String(formData.get("status") ?? "em-andamento"),
          progresso: Number.isFinite(progressoInformado)
            ? Math.max(0, Math.min(100, Math.trunc(progressoInformado)))
            : 0,
          tags,
          data_inicio: String(formData.get("inicio") ?? "") || null,
          data_fim: String(formData.get("fim") ?? "") || null,
          organizacao_id: organizacaoId || null,
          publico,
        })
        .eq("id", id);

      if (erroAtualizacao) {
        setErro(
          `Não foi possível atualizar o projeto: ${erroAtualizacao.message}`,
        );
        return;
      }

      router.push(`/dashboard/projetos/${id}`);
    } catch {
      setErro("Ocorreu um erro inesperado. Tente novamente.");
    } finally {
      setSalvando(false);
    }
  }

  return (
    <>
      <Link
        href={`/dashboard/projetos/${id}`}
        className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition hover:text-primary"
      >
        <ArrowLeft size={17} />
        Voltar para o projeto
      </Link>

      <div className="mt-6">
        <span className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
          Projetos
        </span>

        <h1 className="mt-3 text-3xl font-bold text-foreground md:text-4xl">
          Editar projeto
        </h1>

        <p className="mt-3 max-w-2xl text-muted-foreground">
          Atualize as informações do projeto e salve as alterações.
        </p>
      </div>

      {carregando && (
        <p className="mt-10 text-muted-foreground">
          Carregando informações do projeto...
        </p>
      )}

      {!carregando && !projeto && (
        <div className="mt-8 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {erroCarregamento ?? "Não foi possível abrir este projeto."}
        </div>
      )}

      {projeto && (
        <form onSubmit={handleSubmit} className="mt-10 space-y-8">
          {erro && (
            <div
              role="alert"
              className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
            >
              {erro}
            </div>
          )}

          <section className="rounded-3xl border border-border bg-card p-6 shadow-card md:p-8">
            <h2 className="text-xl font-bold text-foreground">
              Informações principais
            </h2>

            <p className="mt-1 text-sm text-muted-foreground">
              Identifique o projeto e descreva sua proposta.
            </p>

            <div className="mt-7 grid gap-6">
              <div>
                <label
                  htmlFor="titulo"
                  className="text-sm font-semibold text-foreground"
                >
                  Título do projeto
                </label>

                <input
                  id="titulo"
                  name="titulo"
                  type="text"
                  required
                  defaultValue={projeto.titulo}
                  className="mt-2 h-12 w-full rounded-xl border border-border bg-background px-4 text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15"
                />
              </div>

              <div>
                <label
                  htmlFor="descricao"
                  className="text-sm font-semibold text-foreground"
                >
                  Descrição
                </label>

                <textarea
                  id="descricao"
                  name="descricao"
                  rows={5}
                  defaultValue={projeto.descricao ?? ""}
                  placeholder="Descreva a proposta, o contexto e o que será experimentado."
                  className="mt-2 w-full resize-none rounded-xl border border-border bg-background px-4 py-3 text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15"
                />
              </div>
            </div>
          </section>

          <section className="rounded-3xl border border-border bg-card p-6 shadow-card md:p-8">
            <h2 className="text-xl font-bold text-foreground">
              Instituição e responsável
            </h2>

            <p className="mt-1 text-sm text-muted-foreground">
              Atualize os responsáveis e o vínculo coletivo, se houver.
            </p>

            <div className="mt-7 grid gap-6 md:grid-cols-2">
              <div>
                <label
                  htmlFor="instituicao"
                  className="text-sm font-semibold text-foreground"
                >
                  Instituição
                </label>

                <input
                  id="instituicao"
                  name="instituicao"
                  type="text"
                  defaultValue={projeto.instituicao ?? ""}
                  className="mt-2 h-12 w-full rounded-xl border border-border bg-background px-4 text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15"
                />
              </div>

              <div>
                <label
                  htmlFor="responsavel"
                  className="text-sm font-semibold text-foreground"
                >
                  Responsável
                </label>

                <input
                  id="responsavel"
                  name="responsavel"
                  type="text"
                  defaultValue={projeto.responsavel ?? ""}
                  className="mt-2 h-12 w-full rounded-xl border border-border bg-background px-4 text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15"
                />
              </div>
            </div>

            <div className="mt-6">
              <label
                htmlFor="organizacao_id"
                className="text-sm font-semibold text-foreground"
              >
                Organização ou equipe
                <span className="ml-2 font-normal text-muted-foreground">
                  (opcional)
                </span>
              </label>

              <select
                id="organizacao_id"
                name="organizacao_id"
                value={organizacaoId}
                onChange={(event) => setOrganizacaoId(event.target.value)}
                disabled={carregandoOrganizacoes || !!erroOrganizacoes}
                className="mt-2 h-12 w-full rounded-xl border border-border bg-background px-4 text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <option value="">Sem vínculo coletivo</option>

                {projeto.organizacao_id &&
                  !organizacoes.some(
                    (organizacao) => organizacao.id === projeto.organizacao_id,
                  ) && (
                    <option value={projeto.organizacao_id}>
                      Vínculo atual (organização não listada)
                    </option>
                  )}

                {organizacoes.map((organizacao) => (
                  <option key={organizacao.id} value={organizacao.id}>
                    {organizacao.nome} —{" "}
                    {organizacao.tipo === "instituicao"
                      ? "Instituição"
                      : "Equipe"}
                  </option>
                ))}
              </select>

              <p className="mt-2 text-xs text-muted-foreground">
                O vínculo permite contabilizar o projeto nas metas coletivas da
                organização ou equipe selecionada.
              </p>

              {erroOrganizacoes && (
                <p role="alert" className="mt-2 text-sm text-amber-700">
                  {erroOrganizacoes} O vínculo atual será preservado, a menos
                  que você altere essa opção.
                </p>
              )}
            </div>
          </section>

          <section className="rounded-3xl border border-border bg-card p-6 shadow-card md:p-8">
            <h2 className="text-xl font-bold text-foreground">
              Classificação e acompanhamento
            </h2>

            <p className="mt-1 text-sm text-muted-foreground">
              Atualize a etapa, o status e o progresso do projeto.
            </p>

            <div className="mt-7 grid gap-6 md:grid-cols-2">
              <div>
                <label
                  htmlFor="etapa"
                  className="text-sm font-semibold text-foreground"
                >
                  Etapa atual
                </label>

                <select
                  id="etapa"
                  name="etapa"
                  required
                  defaultValue={projeto.etapa}
                  className="mt-2 h-12 w-full rounded-xl border border-border bg-background px-4 text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15"
                >
                  <option value="planejamento">Planejamento</option>
                  <option value="analise">Análise</option>
                  <option value="experimentacao">Experimentação</option>
                  <option value="evidencias">Coleta de evidências</option>
                  <option value="avaliacao">Avaliação</option>
                  <option value="concluido">Concluído</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="status"
                  className="text-sm font-semibold text-foreground"
                >
                  Status
                </label>

                <select
                  id="status"
                  name="status"
                  defaultValue={projeto.status}
                  className="mt-2 h-12 w-full rounded-xl border border-border bg-background px-4 text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15"
                >
                  <option value="rascunho">Rascunho</option>
                  <option value="em-andamento">Em andamento</option>
                  <option value="pausado">Pausado</option>
                  <option value="concluido">Concluído</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="progresso"
                  className="text-sm font-semibold text-foreground"
                >
                  Progresso (%)
                </label>

                <input
                  id="progresso"
                  name="progresso"
                  type="number"
                  min="0"
                  max="100"
                  defaultValue={projeto.progresso ?? 0}
                  className="mt-2 h-12 w-full rounded-xl border border-border bg-background px-4 text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15"
                />
              </div>

              <div>
                <label
                  htmlFor="tags"
                  className="text-sm font-semibold text-foreground"
                >
                  Tags
                </label>

                <input
                  id="tags"
                  name="tags"
                  type="text"
                  defaultValue={(projeto.tags ?? []).join(", ")}
                  placeholder="IA generativa, Ensino médio, Matemática"
                  className="mt-2 h-12 w-full rounded-xl border border-border bg-background px-4 text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15"
                />

                <p className="mt-2 text-xs text-muted-foreground">
                  Separe as tags por vírgulas.
                </p>
              </div>
            </div>
          </section>

          <section className="rounded-3xl border border-border bg-card p-6 shadow-card md:p-8">
            <h2 className="text-xl font-bold text-foreground">Período</h2>

            <p className="mt-1 text-sm text-muted-foreground">
              Informe as datas previstas para o projeto.
            </p>

            <div className="mt-7 grid gap-6 md:grid-cols-2">
              <div>
                <label
                  htmlFor="inicio"
                  className="text-sm font-semibold text-foreground"
                >
                  Data de início
                </label>

                <input
                  id="inicio"
                  name="inicio"
                  type="date"
                  defaultValue={projeto.data_inicio ?? ""}
                  className="mt-2 h-12 w-full rounded-xl border border-border bg-background px-4 text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15"
                />
              </div>

              <div>
                <label
                  htmlFor="fim"
                  className="text-sm font-semibold text-foreground"
                >
                  Previsão de término
                </label>

                <input
                  id="fim"
                  name="fim"
                  type="date"
                  defaultValue={projeto.data_fim ?? ""}
                  className="mt-2 h-12 w-full rounded-xl border border-border bg-background px-4 text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15"
                />
              </div>
            </div>
          </section>

          <section className="rounded-3xl border border-border bg-card p-6 shadow-card md:p-8">
            <h2 className="text-xl font-bold text-foreground">
              Visibilidade pública
            </h2>

            <label className="mt-5 flex cursor-pointer items-start gap-3">
              <input
                type="checkbox"
                name="publico"
                checked={publico}
                onChange={(event) => setPublico(event.target.checked)}
                className="mt-1 h-4 w-4"
              />

              <span>
                <span className="block font-medium text-foreground">
                  Exibir este projeto na página inicial pública
                </span>

                <span className="mt-1 block text-sm text-muted-foreground">
                  Ao marcar esta opção, os dados do projeto poderão ser vistos
                  por visitantes sem login.
                </span>
              </span>
            </label>
          </section>

          <div className="flex flex-col-reverse gap-3 border-t border-border pt-6 sm:flex-row sm:justify-end">
            <Link
              href={`/dashboard/projetos/${id}`}
              className="inline-flex h-12 items-center justify-center rounded-xl border border-border bg-card px-6 font-semibold text-foreground transition hover:bg-muted"
            >
              Cancelar
            </Link>

            <button
              type="submit"
              disabled={salvando}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-primary px-6 font-semibold text-primary-foreground transition hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <Save size={18} />
              {salvando ? "Salvando..." : "Salvar alterações"}
            </button>
          </div>
        </form>
      )}
    </>
  );
}
