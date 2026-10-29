import Link from "next/link";
import Image from "next/image";
import LoginModal from "../auth/LoginModal";
import { Bot } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-7xl px-6 py-14">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Marca e identificação institucional */}
          <div className="lg:col-span-2">
            {/* Marca Sandbox */}
            <Link href="/" className="mb-5 flex items-center gap-3">
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

            {/* Descrição */}
            <p className="mb-6 max-w-md leading-relaxed text-muted-foreground">
              Um ambiente para experimentação responsável de soluções de
              Inteligência Artificial em contextos educacionais.
            </p>

            {/* Logos institucionais */}
            <div className="mb-6 flex items-center gap-6">
              <Image
                src="/logo-nees.png"
                alt="NEES — Núcleo de Excelência em Tecnologias Sociais"
                width={200}
                height={48}
                className="h-12 w-auto object-contain"
              />

              <Image
                src="/logo-ufal.png"
                alt="Universidade Federal de Alagoas"
                width={200}
                height={48}
                className="h-12 w-auto object-contain"
              />
            </div>

            {/* Selo ISO */}
            <div className="flex items-center gap-4">
              <Image
                src="/selo.png"
                alt="Selo de certificação ISO/IEC 27001"
                width={56}
                height={56}
                className="h-14 w-auto object-contain"
              />

              <p className="max-w-xs text-xs leading-relaxed text-muted-foreground">
                Segurança da informação certificada conforme ISO/IEC 27001, no
                escopo UFAL/IC/NEES.
              </p>
            </div>
          </div>

          {/* navegação */}

          <div>
            <h3 className="font-semibold text-foreground">Navegação</h3>

            <div className="mt-5 flex flex-col gap-3">
              <Link
                href="/o-que-e"
                className="text-sm text-muted-foreground transition hover:text-primary"
              >
                O que é o Sandbox
              </Link>

              <Link
                href="/experiencia-mec"
                className="text-sm text-muted-foreground transition hover:text-primary"
              >
                Experiência MEC
              </Link>

              <Link
                href="/ciclo"
                className="text-sm text-muted-foreground transition hover:text-primary"
              >
                Ciclo de testagem
              </Link>

              <Link
                href="/cronograma"
                className="text-sm text-muted-foreground transition hover:text-primary"
              >
                Cronograma
              </Link>

              <Link
                href="/plano-do-ciclo"
                className="text-sm text-muted-foreground transition hover:text-primary"
              >
                Plano do ciclo
              </Link>

              <Link
                href="/entregas"
                className="text-sm text-muted-foreground transition hover:text-primary"
              >
                Entregas
              </Link>

              <Link
                href="/governanca"
                className="text-sm text-muted-foreground transition hover:text-primary"
              >
                Governança e salvaguardas
              </Link>

              <Link
                href="/aplicacoes"
                className="text-sm text-muted-foreground transition hover:text-primary"
              >
                Aplicações
              </Link>

              <Link
                href="/referencias"
                className="text-sm text-muted-foreground transition hover:text-primary"
              >
                Referências
              </Link>

              <Link
                href="/sobre"
                className="text-sm text-muted-foreground transition hover:text-primary"
              >
                Sobre o NEES e contato
              </Link>
            </div>
          </div>

          {/* plataforma */}
          <div>
            <h3 className="font-semibold text-foreground">Plataforma</h3>
            <div className="mt-5 flex flex-col gap-3">
              <LoginModal
                label="Acessar plataforma"
                className="w-fit text-left text-sm text-muted-foreground transition hover:text-primary"
              />
            </div>
          </div>
        </div>

        {/* rodapé inferior */}

        <div className="mt-12 flex flex-col gap-4 border-t border-border pt-8 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
          <p>
            ©{new Date().getFullYear()} Sandbox Regulatório de IA na educação.
          </p>
          <p>
            Metodologia do NEES/UFAL baseada na experiência do Sandbox de IA na
            Educação do MEC.
          </p>
        </div>
      </div>
    </footer>
  );
}
