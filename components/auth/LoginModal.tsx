"use client";

import { useState } from "react";
import { LockKeyhole, Mail, X } from "lucide-react";

type LoginModalProps = {
  className?: string;
  label?: string;
};

const perfis = [
  {
    id: "participante",
    titulo: "Participante",
    descricao: "Instituição ou equipe participante do Sandbox",
  },
  {
    id: "gestor",
    titulo: "Gestor",
    descricao: "Gestão e acompanhamento institucional",
  },
  {
    id: "especialista",
    titulo: "Especialista / Avaliador",
    descricao: "Avaliação técnica e acompanhamento dos projetos",
  },
  {
    id: "administrador",
    titulo: "Administrador",
    descricao: "Administração geral da plataforma",
  },
];

export default function LoginModal({
  className = "",
  label = "Acessar plataforma",
}: LoginModalProps) {
  const [aberto, setAberto] = useState(false);
  const [perfil, setPerfil] = useState("participante");
  return (
    <>
      {/* botão para abrir o modal */}
      <button
        type="button"
        onClick={() => setAberto(true)}
        className={className}
      >
        {label}
      </button>

      {/* modal */}
      {aberto && (
        <div
          className="fixed inset-0 z-100 flex items-center justify-center bg-black/50 px-4 py-6 backdrop-blur-[2px]"
          onMouseDown={() => setAberto(false)}
        >
          <div
            className="relative max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-3xl border border-border bg-card p-6 shadow-2xl sm:p-8"
            onMouseDown={(e) => e.stopPropagation()}
          >
            {/* fechar */}
            <button
              type="button"
              onClick={() => setAberto(false)}
              className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full text-muted-foreground transition hover:bg-muted hover:text-foreground"
              aria-label="Fechar"
            >
              <X size={20} />
            </button>

            {/* cabeçalho */}
            <div className="pr-10">
              <span className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
                Acesso à plataforma
              </span>

              <h2 className="mt-3 text-2xl font-bold text-foreground sm:text-3xl">
                Entrar no Sandbox
              </h2>

              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Imforme suas credenciais e selecione o seu perfil de acesso.
              </p>
            </div>

            <form className="mt-8 space-y-6">
              {/* email */}
              <div>
                <label
                  htmlFor="email"
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
                    id="email"
                    type="email"
                    placeholder="nome@instituicao.br"
                    className="h-12 w-full rounded-xl border border-border bg-background pl-11 pr-4 text-sm text-foreground outline-none transition placeholder:text-muted-foreground/60 focus:border-primary focus:ring-2 focus:ring-primary/15"
                  />
                </div>
              </div>

              {/* senha */}
              <div>
                <div className="flex items-center justify-between gap-4">
                  <label
                    htmlFor="senha"
                    className="text-sm font-semibold text-foreground"
                  >
                    Senha
                  </label>
                  <button
                    type="button"
                    className="text-xs font-medium text-primary hover:underline"
                  >
                    {" "}
                    Esqueci minha senha{" "}
                  </button>
                </div>

                <div className="relative mt-2">
                  <LockKeyhole
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
                  />

                  <input
                    id="senha"
                    type="password"
                    placeholder="Digite sua senha"
                    className="h-12 w-full rounded-xl border border-border bg-background pl-11 pr-4 text-sm text-foreground outline-none transition placeholder:text-muted-foreground/60 focus:border-primary focus:ring-2 focus:ring-primary/15"
                  />
                </div>
              </div>

              {/* perfil */}
              <div>
                <p className="text-sm font-semibold text-foreground">
                  Perfil de acesso
                </p>

                <div className="mt-3 space-y-2">
                  {perfis.map((item) => {
                    const selecionado = perfil === item.id;

                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setPerfil(item.id)}
                        className={`flex w-full items-center justify-between gap-4 rounded-xl border p-4 text-left transition ${
                          selecionado
                            ? "border-primary bg-primary-soft"
                            : "border-border bg-card hover:bg-muted/50"
                        }`}
                      >
                        <div>
                          <p className="text-sm font-semibold text-foreground">
                            {item.titulo}
                          </p>

                          <p className="mt-1 text-xs text-muted-foreground">
                            {item.descricao}
                          </p>
                        </div>

                        <span
                          className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${
                            selecionado ? "border-primary" : "border-border"
                          }`}
                        >
                          {selecionado && (
                            <span className="h-2.5 w-2.5 rounded-full bg-primary" />
                          )}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Entrar */}
              <button
                type="submit"
                className="h-12 w-full rounded-xl bg-primary font-semibold text-primary-foreground transition hover:brightness-95"
              >
                Entrar
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
