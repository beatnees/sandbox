"use client";

import { useEffect, useState, type FormEvent } from "react";
import { createPortal } from "react-dom";
import { LockKeyhole, Mail, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/cliente";

type LoginModalProps = {
  className?: string;
  label?: string;
  onOpen?: () => void;
};

export default function LoginModal({
  className = "",
  label = "Acessar plataforma",
  onOpen,
}: LoginModalProps) {
  const [aberto, setAberto] = useState(false);
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);

  const router = useRouter();

  useEffect(() => {
    if (!aberto) return;

    const fecharComEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setAberto(false);
      }
    };

    document.addEventListener("keydown", fecharComEsc);

    // impede a página de rolar atrás do modal
    const overflowAnterior = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", fecharComEsc);
      document.body.style.overflow = overflowAnterior;
    };
  }, [aberto]);

  const entrar = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setErro("");
    setCarregando(true);

    const supabase = createClient();

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password: senha,
    });

    if (error) {
      setErro("E-mail ou senha inválidos.");
      setCarregando(false);
      return;
    }

    // confere se o usuário possui perfil na plataforma

    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("perfil")
      .eq("id", data.user.id)
      .single();

    if (profileError || !profile) {
      await supabase.auth.signOut();

      setErro("Seu usuário não possui perfil configurado na plataforma.");

      setCarregando(false);
      return;
    }

    setCarregando(false);

    setAberto(false);
    router.push("/dashboard");
    router.refresh();
  };

  const abrirModal = () => {
    onOpen?.();
    setAberto(true);
  };

  const modal = aberto
    ? createPortal(
        <div
          className="fixed inset-0 z-9999 flex items-center justify-center bg-black/55 px-4 py-6 backdrop-blur-[2px]"
          onMouseDown={() => setAberto(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="login-title"
            className="relative max-h-[calc(100vh-3rem)] w-full max-w-xl overflow-y-auto rounded-3xl border border-border bg-card p-6 shadow-2xl sm:p-8"
            onMouseDown={(event) => event.stopPropagation()}
          >
            {/* Fechar */}
            <button
              type="button"
              onClick={() => setAberto(false)}
              className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full text-muted-foreground transition hover:bg-muted hover:text-foreground"
              aria-label="Fechar"
            >
              <X size={20} />
            </button>

            {/* Cabeçalho */}
            <div className="pr-10">
              <span className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
                Acesso à plataforma
              </span>

              <h2
                id="login-title"
                className="mt-3 text-2xl font-bold text-foreground sm:text-3xl"
              >
                Entre no Sandbox
              </h2>

              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Informe suas credenciais e selecione o seu perfil de acesso.
              </p>
            </div>

            <form onSubmit={entrar} className="mt-8 space-y-6">
              {/* E-mail */}
              <div>
                <label
                  htmlFor="login-email"
                  className="text-sm font-semibold text-foreground"
                >
                  E-mail institucional
                </label>

                <div className="relative mt-2">
                  <Mail
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
                  />

                  <input
                    id="login-email"
                    name="email"
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="nome@instituicao.br"
                    autoComplete="email"
                    required
                    className="h-12 w-full rounded-xl border border-border bg-background pl-11 pr-4 text-sm text-foreground outline-none transition placeholder:text-muted-foreground/60 focus:border-primary focus:ring-2 focus:ring-primary/15"
                  />
                </div>
              </div>

              {/* Senha */}
              <div>
                <div className="flex items-center justify-between gap-4">
                  <label
                    htmlFor="login-senha"
                    className="text-sm font-semibold text-foreground"
                  >
                    Senha
                  </label>

                  <button
                    type="button"
                    className="text-xs font-medium text-primary hover:underline"
                  >
                    Esqueci minha senha
                  </button>
                </div>

                <div className="relative mt-2">
                  <LockKeyhole
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
                  />

                  <input
                    id="login-senha"
                    name="senha"
                    type="password"
                    value={senha}
                    onChange={(event) => setSenha(event.target.value)}
                    placeholder="Digite sua senha"
                    autoComplete="current-password"
                    required
                    className="h-12 w-full rounded-xl border border-border bg-background pl-11 pr-4 text-sm text-foreground outline-none transition placeholder:text-muted-foreground/60 focus:border-primary focus:ring-2 focus:ring-primary/15"
                  />
                </div>
              </div>

              {/* Perfil */}
              <div className="rounded-xl bg-muted px-4 py-3">
                <p className="text-sm leading-relaxed text-muted-foreground">
                  Seu perfil de acesso será identificado automaticamente após o
                  login.
                </p>
              </div>

              {erro && (
                <div className="rounded-xl bg-destructive-soft px-4 py-3">
                  <p className="text-sm font-medium text-destructive">{erro}</p>
                </div>
              )}

              {/* Entrar */}
              <button
                type="submit"
                disabled={carregando}
                className="h-12 w-full rounded-xl bg-primary font-semibold text-primary-foreground transition hover:brightness-95"
              >
                {carregando ? "Entrando..." : "Entrar"}
              </button>
            </form>
          </div>
        </div>,
        document.body,
      )
    : null;

  return (
    <>
      <button type="button" onClick={abrirModal} className={className}>
        {label}
      </button>

      {modal}
    </>
  );
}
