"use client";

import { useEffect, useState, type FormEvent } from "react";
import Link from "next/link";
import { ArrowLeft, Save } from "lucide-react";
import { createClient } from "@/lib/supabase/cliente";

type Organizacao = {
  id: string;
  nome: string;
  tipo: string;
};

export default function NovoProjetoPage() {
  const [salvando, setSalvando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);
  const [sucesso, setSucesso] = useState<string | null>(null);

  const [organizacoes, setOrganizacoes] = useState<Organizacao[]>([]);
  const [carregandoOrganizacoes, setCarregandoOrganizacoes] = useState(true);
  const [erroOrganizacoes, setErroOrganizacoes] = useState<string | null>(null);

  useEffect(() => {
    let componenteAtivo = true;

    async function carregarOrganizacoes() {
      const supabase = createClient();

      try {
        const {
          data: { user },
          error: erroUsuario,
        } = await supabase.auth.getUser();

        if (erroUsuario || !user) {
          throw new Error("Não foi possível identificar sua sessão.");
        }

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
          return;
        }

        const { data, error: erroLista } = await supabase
          .from("organizacoes")
          .select("id, nome, tipo")
          .in("id", idsOrganizacoes)
          .order("nome");

        if (erroLista) {
          throw erroLista;
        }

        if (componenteAtivo) {
          setOrganizacoes(data ?? []);
        }
      } catch {
        if (componenteAtivo) {
          setErroOrganizacoes(
            "Não foi possível carregar suas organizações e equipes.",
          );
        }
      } finally {
        if (componenteAtivo) {
          setCarregandoOrganizacoes(false);
        }
      }
    }

    void carregarOrganizacoes();

    return () => {
      componenteAtivo = false;
    };
  }, []);

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
    setSucesso(null);

    try {
      const supabase = createClient();

      const {
        data: { user },
        error: erroUsuario,
      } = await supabase.auth.getUser();

      if (erroUsuario || !user) {
        setErro(
          "Sua sessão expirou. Entre novamente para cadastrar um projeto.",
        );
        return;
      }

      const progressoInformado = Number(formData.get("progresso"));

      const tags = String(formData.get("tags") ?? "")
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean);

      const organizacaoId =
        String(formData.get("organizacao_id") ?? "") || null;

      const { error: erroCadastro } = await supabase.from("projetos").insert({
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
        publico: formData.get("publico") === "on",
      });

      if (erroCadastro) {
        setErro(`Não foi possível salvar o projeto: ${erroCadastro.message}`);
        return;
      }

      setSucesso("Projeto cadastrado com sucesso!");
      form.reset();
    } catch {
      setErro("Ocorreu um erro inesperado. Tente novamente.");
    } finally {
      setSalvando(false);
    }
  }

  return (
    <>
      {/* Voltar */}
      <Link
        href="/dashboard/projetos"
        className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition hover:text-primary"
      >
        <ArrowLeft size={17} />
        Voltar para projetos
      </Link>

      {/* Cabeçalho */}
      <div className="mt-6">
        <span className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
          Projetos
        </span>

        <h1 className="mt-3 text-3xl font-bold text-foreground md:text-4xl">
          Novo projeto
        </h1>

        <p className="mt-3 max-w-2xl text-muted-foreground">
          Cadastre as informações principais da iniciativa que será acompanhada
          no Sandbox Regulatório.
        </p>
      </div>

      {/* Formulário */}
      <form onSubmit={handleSubmit} className="mt-10 space-y-8">
        {erro && (
          <div
            role="alert"
            className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
          >
            {erro}
          </div>
        )}

        {sucesso && (
          <div
            role="status"
            className="rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800"
          >
            {sucesso}
          </div>
        )}

        {/* Informações principais */}
        <section className="rounded-3xl border border-border bg-card p-6 shadow-card md:p-8">
          <div>
            <h2 className="text-xl font-bold text-foreground">
              Informações principais
            </h2>

            <p className="mt-1 text-sm text-muted-foreground">
              Identifique o projeto e descreva brevemente sua proposta.
            </p>
          </div>

          <div className="mt-7 grid gap-6">
            {/* Título */}
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
                placeholder="Ex.: Tutor de IA para apoio à aprendizagem"
                className="mt-2 h-12 w-full rounded-xl border border-border bg-background px-4 text-foreground outline-none transition placeholder:text-muted-foreground/60 focus:border-primary focus:ring-2 focus:ring-primary/15"
              />
            </div>

            {/* Descrição */}
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
                placeholder="Descreva brevemente a proposta, o contexto e o que será experimentado."
                className="mt-2 w-full resize-none rounded-xl border border-border bg-background px-4 py-3 text-foreground outline-none transition placeholder:text-muted-foreground/60 focus:border-primary focus:ring-2 focus:ring-primary/15"
              />
            </div>
          </div>
        </section>

        {/* Instituição e organização */}
        <section className="rounded-3xl border border-border bg-card p-6 shadow-card md:p-8">
          <div>
            <h2 className="text-xl font-bold text-foreground">
              Instituição e responsável
            </h2>

            <p className="mt-1 text-sm text-muted-foreground">
              Informe quem está conduzindo o projeto e, se desejar, vincule-o a
              uma organização ou equipe da plataforma.
            </p>
          </div>

          <div className="mt-7 grid gap-6 md:grid-cols-2">
            {/* Instituição */}
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
                placeholder="Nome da instituição"
                className="mt-2 h-12 w-full rounded-xl border border-border bg-background px-4 text-foreground outline-none transition placeholder:text-muted-foreground/60 focus:border-primary focus:ring-2 focus:ring-primary/15"
              />
            </div>

            {/* Responsável */}
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
                placeholder="Nome do responsável"
                className="mt-2 h-12 w-full rounded-xl border border-border bg-background px-4 text-foreground outline-none transition placeholder:text-muted-foreground/60 focus:border-primary focus:ring-2 focus:ring-primary/15"
              />
            </div>
          </div>

          {/* Organização ou equipe */}
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
              defaultValue=""
              disabled={carregandoOrganizacoes || !!erroOrganizacoes}
              className="mt-2 h-12 w-full rounded-xl border border-border bg-background px-4 text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <option value="">
                {carregandoOrganizacoes
                  ? "Carregando organizações..."
                  : "Sem vínculo coletivo"}
              </option>

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
              Vincular o projeto permite contabilizá-lo nas metas coletivas da
              organização ou equipe selecionada.
            </p>

            {erroOrganizacoes && (
              <p role="alert" className="mt-2 text-sm text-amber-700">
                {erroOrganizacoes} Você ainda pode cadastrar o projeto sem
                vínculo coletivo.
              </p>
            )}

            {!carregandoOrganizacoes &&
              !erroOrganizacoes &&
              organizacoes.length === 0 && (
                <p className="mt-2 text-xs text-muted-foreground">
                  Você ainda não participa de nenhuma organização ou equipe
                  ativa. É possível criar ou ingressar em uma na página
                  Organizações e equipes.
                </p>
              )}
          </div>
        </section>

        {/* Classificação */}
        <section className="rounded-3xl border border-border bg-card p-6 shadow-card md:p-8">
          <div>
            <h2 className="text-xl font-bold text-foreground">
              Classificação e acompanhamento
            </h2>

            <p className="mt-1 text-sm text-muted-foreground">
              Essas informações serão usadas nos cards e filtros da plataforma.
            </p>
          </div>

          <div className="mt-7 grid gap-6 md:grid-cols-2">
            {/* Etapa */}
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
                defaultValue=""
                required
                className="mt-2 h-12 w-full rounded-xl border border-border bg-background px-4 text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15"
              >
                <option value="" disabled>
                  Selecione uma etapa
                </option>

                <option value="planejamento">Planejamento</option>
                <option value="analise">Análise</option>
                <option value="experimentacao">Experimentação</option>
                <option value="evidencias">Coleta de evidências</option>
                <option value="avaliacao">Avaliação</option>
                <option value="concluido">Concluído</option>
              </select>
            </div>

            {/* Status */}
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
                defaultValue="em-andamento"
                className="mt-2 h-12 w-full rounded-xl border border-border bg-background px-4 text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15"
              >
                <option value="rascunho">Rascunho</option>
                <option value="em-andamento">Em andamento</option>
                <option value="pausado">Pausado</option>
                <option value="concluido">Concluído</option>
              </select>
            </div>

            {/* Progresso */}
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
                defaultValue="0"
                className="mt-2 h-12 w-full rounded-xl border border-border bg-background px-4 text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15"
              />
            </div>

            {/* Tags */}
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
                placeholder="IA generativa, Ensino médio, Matemática"
                className="mt-2 h-12 w-full rounded-xl border border-border bg-background px-4 text-foreground outline-none transition placeholder:text-muted-foreground/60 focus:border-primary focus:ring-2 focus:ring-primary/15"
              />

              <p className="mt-2 text-xs text-muted-foreground">
                Separe as tags por vírgulas.
              </p>
            </div>
          </div>
        </section>

        {/* Período */}
        <section className="rounded-3xl border border-border bg-card p-6 shadow-card md:p-8">
          <div>
            <h2 className="text-xl font-bold text-foreground">Período</h2>

            <p className="mt-1 text-sm text-muted-foreground">
              Informe o período previsto para a experimentação.
            </p>
          </div>

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
                className="mt-2 h-12 w-full rounded-xl border border-border bg-background px-4 text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15"
              />
            </div>
          </div>
        </section>

        {/* Ações */}
        <div className="flex flex-col-reverse gap-3 border-t border-border pt-6 sm:flex-row sm:justify-end">
          <Link
            href="/dashboard/projetos"
            className="inline-flex h-12 items-center justify-center rounded-xl border border-border bg-card px-6 font-semibold text-foreground transition hover:bg-muted"
          >
            Cancelar
          </Link>

          <div className="rounded-lg border border-gray-200 p-4">
            <label className="flex cursor-pointer items-start gap-3">
              <input type="checkbox" name="publico" className="mt-1 h-4 w-4" />
              <span>
                <span className="block font-medium">
                  Exibir este projeto na página inicial pública
                </span>
                <span className="mt-1 block text-sm text-gray-500">
                  Ao marcar esta opção, os dados do projeto poderão ser vistos
                  por visitantes sem login.
                </span>
              </span>
            </label>
          </div>

          <button
            type="submit"
            disabled={salvando}
            className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-primary px-6 font-semibold text-primary-foreground transition hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <Save size={18} />
            {salvando ? "Salvando..." : "Salvar projeto"}
          </button>
        </div>
      </form>
    </>
  );
}
