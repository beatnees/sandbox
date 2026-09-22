import Link from "next/link";
import { Bot } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-7xl px-6 py-14">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* marca */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary font-bold text-primary-foreground">
                <Bot size={24} strokeWidth={2} />
              </div>

              <div>
                <p className="font-display text-lg font-bold text-foreground">
                  Sandbox
                </p>
                <p className="text-sm text-muted-foreground">IA na educação</p>
              </div>
            </Link>

            <p className="mt-5 max-w-md leading-relaxed text-muted-foreground">
              Um ambiente para experimentação responsável de soluções de
              Inteligência Artificial em contextos educacionais.
            </p>
          </div>

          {/* navegação */}

          <div>
            <h3 className="font-semibold text-foreground">Navegação</h3>

            <div className="mt-5 flex flex-col gap-3">
              <a
                href="#sobre"
                className="text-sm text-muted-foreground transition hover:text-primary"
              >
                Sobre
              </a>
              <a
                href="#como-funciona"
                className="text-sm text-muted-foreground transition hover:text-primary"
              >
                Como funciona
              </a>
              <a
                href="#projetos"
                className="text-sm text-muted-foreground transition hover:text-primary"
              >
                Projetos
              </a>
            </div>
          </div>

          {/* plataforma */}
          <div>
            <h3 className="font-semibold text-foreground">Plataforma</h3>
            <div className="mt-5 flex flex-col gap-3">
              <Link
                href="/login"
                className="text-sm text-muted-foreground transition hover:text-primary"
              >
                Acessar plataforma
              </Link>
              <Link
                href="/login"
                className="text-sm text-muted-foreground transition hover:text-primary"
              >
                Entrar
              </Link>
            </div>
          </div>
        </div>

        {/* rodapé inferior */}

        <div className="mt-12 flex flex-col gap-4 border-t border-border pt-8 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
          <p>
            ©{new Date().getFullYear()} Sandbox Regulatório de IA na educação.
          </p>
          <p>Ambiente de experimentação e acompanhamento.</p>
        </div>
      </div>
    </footer>
  );
}
