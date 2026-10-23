"use client";

import { useEffect, useState, type FormEvent } from "react";
import { createClient } from "@/lib/supabase/cliente";

type PerfilUsuario = {
  nome: string;
  perfil: string;
  instituicao: string | null;
};

const nomesPerfis: Record<string, string> = {
  participante: "Participante",
  gestor: "Gestor",
  especialista: "Especialista / Avaliador",
  administrador: "Administrador",
};

export default function PerfilPage() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [perfil, setPerfil] = useState("");
  const [instituicao, setInstituicao] = useState("");

  const [carregando, setCarregando] = useState(true);
  const [salvando, setSalvando] = useState(false);
  const [erroCarregamento, setErroCarregamento] = useState("");
  const [erro, setErro] = useState("");
  const [mensagem, setMensagem] = useState("");

  useEffect(() => {
    let ativo = true;

    async function carregarPerfil() {
      try {
        const supabase = createClient();

        const {
          data: { user },
          error: erroAuth,
        } = await supabase.auth.getUser();

        if (!ativo) return;

        if (erroAuth || !user) {
          setErroCarregamento(
            "Não foi possível identificar o usuário autenticado.",
          );
          return;
        }

        const { data: dadosPerfil, error: erroPerfil } = await supabase
          .from("profiles")
          .select("nome, perfil, instituicao")
          .eq("id", user.id)
          .single();

        if (!ativo) return;

        if (erroPerfil || !dadosPerfil) {
          setErroCarregamento(
            "Não foi possível carregar seu perfil. Tente novamente.",
          );
          return;
        }

        const dados = dadosPerfil as PerfilUsuario;

        setNome(dados.nome ?? "");
        setEmail(user.email ?? "");
        setPerfil(dados.perfil ?? "");
        setInstituicao(dados.instituicao ?? "");
      } catch {
        if (ativo) {
          setErroCarregamento("Ocorreu um erro ao carregar seu perfil.");
        }
      } finally {
        if (ativo) setCarregando(false);
      }
    }

    void carregarPerfil();

    return () => {
      ativo = false;
    };
  }, []);

  async function salvarPerfil(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const nomeLimpo = nome.trim();

    if (!nomeLimpo) {
      setErro("Informe seu nome.");
      return;
    }

    setSalvando(true);
    setErro("");
    setMensagem("");

    try {
      const supabase = createClient();

      const {
        data: { user },
        error: erroAuth,
      } = await supabase.auth.getUser();

      if (erroAuth || !user) {
        setErro("Sua sessão não foi identificada. Entre novamente.");
        return;
      }

      const { data: atualizado, error: erroAtualizacao } = await supabase
        .from("profiles")
        .update({
          nome: nomeLimpo,
          instituicao: instituicao.trim() || null,
        })
        .eq("id", user.id)
        .select("nome, instituicao")
        .single();

      if (erroAtualizacao || !atualizado) {
        setErro(
          "Não foi possível salvar as alterações. Pode ser necessário verificar as permissões de acesso do seu perfil.",
        );
        return;
      }

      setNome(atualizado.nome ?? nomeLimpo);
      setInstituicao(atualizado.instituicao ?? "");
      setMensagem("Perfil atualizado com sucesso.");
    } catch {
      setErro("Ocorreu um erro ao salvar seu perfil.");
    } finally {
      setSalvando(false);
    }
  }

  const campoClasse =
    "w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20";

  const campoSomenteLeitura =
    "w-full rounded-xl border border-border bg-muted/40 px-4 py-3 text-sm text-muted-foreground";

  if (carregando) {
    return (
      <main className="mx-auto max-w-3xl">
        <p className="text-sm text-muted-foreground">
          Carregando seu perfil...
        </p>
      </main>
    );
  }

  if (erroCarregamento) {
    return (
      <main className="mx-auto max-w-3xl space-y-4">
        <h1 className="text-2xl font-semibold text-foreground">Meu perfil</h1>
        <p role="alert" className="text-sm text-destructive">
          {erroCarregamento}
        </p>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-3xl space-y-6">
      <div>
        <p className="text-sm font-medium text-primary">Conta</p>

        <h1 className="mt-1 text-3xl font-semibold tracking-tight text-foreground">
          Meu perfil
        </h1>

        <p className="mt-2 text-sm text-muted-foreground">
          Consulte e atualize suas informações pessoais.
        </p>
      </div>

      <form onSubmit={salvarPerfil} className="space-y-6">
        <section className="rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-foreground">
            Informações pessoais
          </h2>

          <div className="mt-6 grid gap-5 md:grid-cols-2">
            <div className="space-y-2">
              <label
                htmlFor="nome"
                className="text-sm font-medium text-foreground"
              >
                Nome completo
              </label>

              <input
                id="nome"
                name="nome"
                type="text"
                autoComplete="name"
                maxLength={150}
                required
                value={nome}
                onChange={(event) => {
                  setNome(event.target.value);
                  setErro("");
                  setMensagem("");
                }}
                className={campoClasse}
                placeholder="Seu nome completo"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="email"
                className="text-sm font-medium text-foreground"
              >
                E-mail
              </label>

              <input
                id="email"
                type="email"
                value={email}
                readOnly
                className={campoSomenteLeitura}
              />

              <p className="text-xs text-muted-foreground">
                O e-mail não pode ser alterado nesta página.
              </p>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="instituicao"
                className="text-sm font-medium text-foreground"
              >
                Instituição
              </label>

              <input
                id="instituicao"
                name="instituicao"
                type="text"
                maxLength={200}
                value={instituicao}
                onChange={(event) => {
                  setInstituicao(event.target.value);
                  setErro("");
                  setMensagem("");
                }}
                className={campoClasse}
                placeholder="Nome da sua instituição"
              />

              <p className="text-xs text-muted-foreground">Campo opcional.</p>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="perfil"
                className="text-sm font-medium text-foreground"
              >
                Perfil de acesso
              </label>

              <input
                id="perfil"
                value={nomesPerfis[perfil] || "Não definido"}
                readOnly
                className={campoSomenteLeitura}
              />

              <p className="text-xs text-muted-foreground">
                O nível de acesso não pode ser alterado aqui.
              </p>
            </div>
          </div>
        </section>

        {erro && (
          <p
            role="alert"
            className="rounded-xl border border-destructive/30 p-4 text-sm text-destructive"
          >
            {erro}
          </p>
        )}

        {mensagem && (
          <p
            role="status"
            className="rounded-xl border border-border p-4 text-sm text-foreground"
          >
            {mensagem}
          </p>
        )}

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={salvando}
            className="rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {salvando ? "Salvando..." : "Salvar alterações"}
          </button>
        </div>
      </form>
    </main>
  );
}
