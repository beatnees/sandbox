"use client";

import { useEffect, useState, type FormEvent } from "react";
import { Building2, UsersRound, Plus } from "lucide-react";
import { createClient } from "@/lib/supabase/cliente";

type Organizacao = {
  id: string;
  nome: string;
  tipo: "instituicao" | "equipe";
  created_at: string;
};

export default function OrganizacoesPage() {
  const [organizacoes, setOrganizacoes] = useState<Organizacao[]>([]);
  const [nome, setNome] = useState("");
  const [tipo, setTipo] = useState<"instituicao" | "equipe">("instituicao");
  const [carregando, setCarregando] = useState(true);
  const [salvando, setSalvando] = useState(false);
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");

  // Carrega as organizações que o usuário tem permissão para visualizar.
  useEffect(() => {
    let cancelado = false;

    async function carregarOrganizacoes() {
      const supabase = createClient();

      const { data, error } = await supabase
        .from("organizacoes")
        .select("id, nome, tipo, created_at")
        .order("created_at", { ascending: false });

      if (cancelado) return;

      if (error) {
        setErro("Não foi possível carregar as organizações.");
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

  // Cria uma organização vinculada ao usuário autenticado.
  async function criarOrganizacao(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!nome.trim()) {
      setErro("Informe o nome da organização.");
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
      .select("id, nome, tipo, created_at")
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

          {erro && (
            <p role="alert" className="text-sm text-destructive">
              {erro}
            </p>
          )}

          {sucesso && (
            <p role="status" className="text-sm text-primary">
              {sucesso}
            </p>
          )}

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
              Crie sua primeira instituição ou equipe usando o formulário acima.
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

                    <div className="min-w-0">
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
                </article>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
