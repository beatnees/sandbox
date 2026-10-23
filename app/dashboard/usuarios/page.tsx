"use client";

import { useEffect, useState, type FormEvent } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/cliente";

type PerfilConvidado =
  | "participante"
  | "gestor"
  | "especialista"
  | "administrador";

const opcoesAdministrador: {
  value: PerfilConvidado;
  label: string;
}[] = [
  { value: "participante", label: "Participante" },
  { value: "gestor", label: "Gestor" },
  { value: "especialista", label: "Especialista / Avaliador" },
  { value: "administrador", label: "Administrador" },
];

const opcoesGestor: {
  value: PerfilConvidado;
  label: string;
}[] = [
  { value: "participante", label: "Participante" },
  { value: "especialista", label: "Especialista / Avaliador" },
];

export default function UsuariosPage() {
  const [perfilAtual, setPerfilAtual] = useState("");
  const [carregandoPerfil, setCarregandoPerfil] = useState(true);

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [instituicao, setInstituicao] = useState("");
  const [perfilConvidado, setPerfilConvidado] =
    useState<PerfilConvidado>("participante");

  const [enviando, setEnviando] = useState(false);
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");

  useEffect(() => {
    let ativo = true;

    async function carregarPerfil() {
      const supabase = createClient();

      try {
        const {
          data: { user },
          error: erroUsuario,
        } = await supabase.auth.getUser();

        if (erroUsuario || !user) {
          if (ativo) setPerfilAtual("");
          return;
        }

        const { data, error } = await supabase
          .from("profiles")
          .select("perfil")
          .eq("id", user.id)
          .maybeSingle();

        if (ativo) {
          setPerfilAtual(error ? "" : (data?.perfil ?? ""));
        }
      } catch {
        if (ativo) setPerfilAtual("");
      } finally {
        if (ativo) setCarregandoPerfil(false);
      }
    }

    void carregarPerfil();

    return () => {
      ativo = false;
    };
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErro("");
    setSucesso("");

    if (nome.trim().length < 2) {
      setErro("Informe o nome completo do usuário.");
      return;
    }

    setEnviando(true);

    try {
      const resposta = await fetch("/api/usuarios/convites", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nome: nome.trim(),
          email: email.trim(),
          instituicao: instituicao.trim(),
          perfil: perfilConvidado,
        }),
      });

      const resultado = (await resposta.json().catch(() => ({}))) as {
        erro?: string;
        mensagem?: string;
      };

      if (!resposta.ok) {
        setErro(
          resultado.erro ??
            "Não foi possível enviar o convite. Tente novamente.",
        );
        return;
      }

      setSucesso(resultado.mensagem ?? "Convite enviado com sucesso.");

      setNome("");
      setEmail("");
      setInstituicao("");
      setPerfilConvidado("participante");
    } catch {
      setErro(
        "Não foi possível conectar ao servidor. Verifique sua conexão e tente novamente.",
      );
    } finally {
      setEnviando(false);
    }
  }

  if (carregandoPerfil) {
    return (
      <section className="mx-auto max-w-3xl">
        <p className="text-sm text-muted-foreground">
          Verificando permissões...
        </p>
      </section>
    );
  }

  if (perfilAtual !== "administrador" && perfilAtual !== "gestor") {
    return (
      <section className="mx-auto max-w-3xl rounded-2xl border border-border bg-card p-8">
        <h1 className="text-2xl font-bold text-foreground">Acesso restrito</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Somente administradores e gestores podem gerenciar convites.
        </p>
        <Link
          href="/dashboard"
          className="mt-5 inline-flex rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground hover:opacity-90"
        >
          Voltar ao dashboard
        </Link>
      </section>
    );
  }

  const opcoesPerfil =
    perfilAtual === "administrador" ? opcoesAdministrador : opcoesGestor;

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <header>
        <p className="text-sm text-muted-foreground">
          Administração da plataforma
        </p>
        <h1 className="mt-2 text-3xl font-bold text-foreground">
          Gerenciar usuários
        </h1>
        <p className="mt-3 text-muted-foreground">
          Convide pessoas para a plataforma Sandbox IA na Educação. Elas
          receberão um e-mail para acessar o link e definir a senha.
        </p>
      </header>

      <section className="rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8">
        <h2 className="text-xl font-semibold text-foreground">
          Convidar usuário
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Preencha os dados abaixo. O convite será enviado por e-mail.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
          <div>
            <label
              htmlFor="nome"
              className="mb-2 block text-sm font-medium text-foreground"
            >
              Nome completo
            </label>
            <input
              id="nome"
              type="text"
              autoComplete="name"
              value={nome}
              onChange={(event) => setNome(event.target.value)}
              minLength={2}
              maxLength={150}
              required
              className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none focus:ring-2 focus:ring-primary"
              placeholder="Nome do usuário"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium text-foreground"
            >
              E-mail
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              maxLength={254}
              required
              className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none focus:ring-2 focus:ring-primary"
              placeholder="nome@instituicao.edu.br"
            />
          </div>

          <div>
            <label
              htmlFor="instituicao"
              className="mb-2 block text-sm font-medium text-foreground"
            >
              Instituição
              <span className="ml-1 font-normal text-muted-foreground">
                (opcional)
              </span>
            </label>
            <input
              id="instituicao"
              type="text"
              value={instituicao}
              onChange={(event) => setInstituicao(event.target.value)}
              maxLength={200}
              className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none focus:ring-2 focus:ring-primary"
              placeholder="Nome da instituição"
            />
          </div>

          <div>
            <label
              htmlFor="perfil"
              className="mb-2 block text-sm font-medium text-foreground"
            >
              Perfil de acesso
            </label>
            <select
              id="perfil"
              value={perfilConvidado}
              onChange={(event) =>
                setPerfilConvidado(event.target.value as PerfilConvidado)
              }
              required
              className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none focus:ring-2 focus:ring-primary"
            >
              {opcoesPerfil.map((opcao) => (
                <option key={opcao.value} value={opcao.value}>
                  {opcao.label}
                </option>
              ))}
            </select>
          </div>

          {erro && (
            <p
              role="alert"
              className="rounded-xl bg-red-50 p-4 text-sm text-red-700"
            >
              {erro}
            </p>
          )}

          {sucesso && (
            <p
              role="status"
              className="rounded-xl border border-border bg-background p-4 text-sm text-foreground"
            >
              {sucesso}
            </p>
          )}

          <button
            type="submit"
            disabled={enviando}
            className="w-full rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
          >
            {enviando ? "Enviando convite..." : "Enviar convite"}
          </button>
        </form>
      </section>
    </div>
  );
}
