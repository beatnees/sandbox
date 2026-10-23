"use client";

import { useEffect, useState, type FormEvent } from "react";
import { Building2, UsersRound, Plus, Copy } from "lucide-react";
import { createClient } from "@/lib/supabase/cliente";

type Organizacao = {
  id: string;
  nome: string;
  tipo: "instituicao" | "equipe";
  created_at: string;
  codigo_convite: string;
};

type ResultadoConvite = {
  organizacao_id: string;
  nome: string;
  tipo: "instituicao" | "equipe";
};

export default function OrganizacoesPage() {
  const [organizacoes, setOrganizacoes] = useState<Organizacao[]>([]);
  const [nome, setNome] = useState("");
  const [tipo, setTipo] = useState<"instituicao" | "equipe">("instituicao");
  const [codigoConvite, setCodigoConvite] = useState("");
  const [codigoCopiado, setCodigoCopiado] = useState("");
  const [carregando, setCarregando] = useState(true);
  const [salvando, setSalvando] = useState(false);
  const [entrando, setEntrando] = useState(false);
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");

  useEffect(() => {
    let cancelado = false;

    async function carregarOrganizacoes() {
      const supabase = createClient();

      const { data, error } = await supabase
        .from("organizacoes")
        .select("id, nome, tipo, created_at, codigo_convite")
        .order("created_at", { ascending: false });

      if (cancelado) return;

      if (error) {
        setErro("Não foi possível carregar as organizações. " + error.message);
      } else {
        setOrganizacoes((data ?? []) as Organizacao[]);
      }

      setCarregando(false);
    }

    void carregarOrganizacoes();

    return () => {
      cancelado = true;
    };
  }, []);

  async function criarOrganizacao(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!nome.trim()) {
      setErro("Informe o nome da organização.");
      setSucesso("");
      return;
    }

    setSalvando(true);
    setErro("");
    setSucesso("");

    const supabase = createClient();

    const {
      data: { user },
      error: erroUsuario,
    } = await supabase.auth.getUser();

    if (erroUsuario || !user) {
      setErro(
        "Não foi possível identificar seu usuário. Faça login novamente.",
      );
      setSalvando(false);
      return;
    }

    const { data, error } = await supabase
      .from("organizacoes")
      .insert({
        nome: nome.trim(),
        tipo,
        criado_por: user.id,
      })
      .select("id, nome, tipo, created_at, codigo_convite")
      .single();

    if (error) {
      setErro("Não foi possível criar a organização. " + error.message);
    } else if (data) {
      setOrganizacoes((atuais) => [data as Organizacao, ...atuais]);
      setNome("");
      setTipo("instituicao");
      setSucesso("Organização criada com sucesso!");
    }

    setSalvando(false);
  }

  async function copiarCodigo(codigo: string) {
    setErro("");
    setSucesso("");

    try {
      await navigator.clipboard.writeText(codigo);
      setCodigoCopiado(codigo);
      setSucesso("Código de convite copiado!");
    } catch {
      setErro(
        "Não foi possível copiar automaticamente. Selecione o código e copie manualmente.",
      );
    }
  }

  async function entrarNaOrganizacao(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!codigoConvite.trim()) {
      setErro("Informe o código de convite.");
      setSucesso("");
      return;
    }

    setEntrando(true);
    setErro("");
    setSucesso("");

    const supabase = createClient();

    const { data, error } = await supabase.rpc(
      "entrar_organizacao_por_codigo",
      {
        p_codigo: codigoConvite.trim().toUpperCase(),
      },
    );

    if (error) {
      setErro("Não foi possível entrar na organização. " + error.message);
      setEntrando(false);
      return;
    }

    const resultado = data as ResultadoConvite[] | null;
    const organizacaoEncontrada = resultado?.[0];

    if (!organizacaoEncontrada) {
      setErro("Não foi possível confirmar a organização pelo código.");
      setEntrando(false);
      return;
    }

    const { data: lista, error: erroLista } = await supabase
      .from("organizacoes")
      .select("id, nome, tipo, created_at, codigo_convite")
      .order("created_at", { ascending: false });

    setCodigoConvite("");

    if (erroLista) {
      setErro(
        "Você entrou na organização, mas não foi possível atualizar a lista. Recarregue a página.",
      );
    } else {
      setOrganizacoes((lista ?? []) as Organizacao[]);
      setSucesso(
        `Você entrou na organização "${organizacaoEncontrada.nome}" com sucesso!`,
      );
    }

    setEntrando(false);
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground md:text-4xl">
          Organizações e equipes
        </h1>

        <p className="mt-3 max-w-2xl text-muted-foreground">
          Organize a participação coletiva no Sandbox IA na Educação e prepare o
          espaço para metas e conquistas compartilhadas.
        </p>
      </div>

      {erro && (
        <p
          role="alert"
          className="rounded-xl border border-destructive/30 bg-destructive/5 p-4 text-sm text-destructive"
        >
          {erro}
        </p>
      )}

      {sucesso && (
        <p
          role="status"
          className="rounded-xl border border-primary/20 bg-primary/5 p-4 text-sm text-foreground"
        >
          {sucesso}
        </p>
      )}

      <section className="rounded-2xl border border-border bg-card p-6">
        <h2 className="text-lg font-semibold text-foreground">
          Criar organização
        </h2>

        <form onSubmit={criarOrganizacao} className="mt-5 space-y-5">
          <div>
            <label
              htmlFor="nome"
              className="mb-2 block text-sm font-medium text-foreground"
            >
              Nome
            </label>

            <input
              id="nome"
              value={nome}
              onChange={(event) => setNome(event.target.value)}
              placeholder="Ex.: Escola Exemplo ou Equipe de Pesquisa"
              maxLength={120}
              required
              className="w-full rounded-xl border border-border bg-background px-4 py-3 text-foreground outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label
              htmlFor="tipo"
              className="mb-2 block text-sm font-medium text-foreground"
            >
              Tipo
            </label>

            <select
              id="tipo"
              value={tipo}
              onChange={(event) =>
                setTipo(event.target.value as "instituicao" | "equipe")
              }
              className="w-full rounded-xl border border-border bg-background px-4 py-3 text-foreground outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="instituicao">Instituição</option>
              <option value="equipe">Equipe</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={salvando}
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 font-medium text-primary-foreground transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <Plus size={18} />
            {salvando ? "Criando..." : "Criar organização"}
          </button>
        </form>
      </section>

      <section className="rounded-2xl border border-border bg-card p-6">
        <h2 className="text-lg font-semibold text-foreground">
          Entrar em uma organização
        </h2>

        <p className="mt-2 text-sm text-muted-foreground">
          Recebeu um código de convite? Informe-o abaixo para participar de uma
          instituição ou equipe.
        </p>

        <form
          onSubmit={entrarNaOrganizacao}
          className="mt-5 flex flex-col gap-3 sm:flex-row"
        >
          <input
            id="codigoConvite"
            value={codigoConvite}
            onChange={(event) =>
              setCodigoConvite(event.target.value.toUpperCase())
            }
            placeholder="Ex.: A1B2C3D4E5F6"
            maxLength={12}
            required
            className="min-w-0 flex-1 rounded-xl border border-border bg-background px-4 py-3 text-foreground outline-none focus:ring-2 focus:ring-primary"
          />

          <button
            type="submit"
            disabled={entrando}
            className="rounded-xl bg-primary px-5 py-3 font-medium text-primary-foreground transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {entrando ? "Entrando..." : "Entrar na organização"}
          </button>
        </form>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-foreground">
          Minhas organizações
        </h2>

        {carregando ? (
          <p className="mt-4 text-muted-foreground">
            Carregando organizações...
          </p>
        ) : organizacoes.length === 0 ? (
          <div className="mt-4 rounded-2xl border border-dashed border-border p-8 text-center">
            <Building2
              className="mx-auto mb-3 text-muted-foreground"
              size={32}
            />

            <p className="font-medium text-foreground">
              Nenhuma organização cadastrada
            </p>

            <p className="mt-2 text-sm text-muted-foreground">
              Crie sua primeira instituição ou equipe, ou entre usando um código
              de convite.
            </p>
          </div>
        ) : (
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {organizacoes.map((organizacao) => {
              const Icon =
                organizacao.tipo === "equipe" ? UsersRound : Building2;

              return (
                <article
                  key={organizacao.id}
                  className="rounded-2xl border border-border bg-card p-5"
                >
                  <div className="flex items-start gap-4">
                    <div className="rounded-xl bg-primary/10 p-3 text-primary">
                      <Icon size={24} />
                    </div>

                    <div className="min-w-0 flex-1">
                      <h3 className="font-semibold text-foreground">
                        {organizacao.nome}
                      </h3>

                      <p className="mt-1 text-sm text-muted-foreground">
                        {organizacao.tipo === "equipe"
                          ? "Equipe"
                          : "Instituição"}
                      </p>

                      <p className="mt-2 text-xs text-muted-foreground">
                        Criada em{" "}
                        {new Date(organizacao.created_at).toLocaleDateString(
                          "pt-BR",
                        )}
                      </p>
                    </div>
                  </div>

                  <div className="mt-5 border-t border-border pt-4">
                    <label
                      htmlFor={`convite-${organizacao.id}`}
                      className="mb-2 block text-sm font-medium text-foreground"
                    >
                      Código de convite
                    </label>

                    <div className="flex items-center gap-2">
                      <input
                        id={`convite-${organizacao.id}`}
                        value={organizacao.codigo_convite}
                        readOnly
                        onFocus={(event) => event.target.select()}
                        className="min-w-0 flex-1 rounded-lg border border-border bg-background px-3 py-2 font-mono text-sm text-foreground"
                      />

                      <button
                        type="button"
                        onClick={() =>
                          void copiarCodigo(organizacao.codigo_convite)
                        }
                        className="inline-flex shrink-0 items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm font-medium text-foreground transition hover:bg-muted"
                        aria-label={`Copiar código de convite de ${organizacao.nome}`}
                      >
                        <Copy size={16} />
                        {codigoCopiado === organizacao.codigo_convite}
                      </button>
                    </div>

                    <p className="mt-2 text-xs text-muted-foreground">
                      Compartilhe este código apenas com quem deve participar
                      desta organização.
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
