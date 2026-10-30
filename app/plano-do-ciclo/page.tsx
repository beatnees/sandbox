import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PlanoSections from "@/components/plano-do-ciclo/PlanoSections";
import Link from "next/link";

export default function PlanoDoCicloPage() {
  return (
    <>
      <Header />
      <main className="bg-background">
        <section className="bg-gradient-hero px-6 py-16 text-white md:py-24">
          <div className="mx-auto max-w-7xl">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm font-medium text-white/80 transition hover:text-white"
            >
              <span aria-hidden="true">←</span>
              Voltar à página inicial
            </Link>

            <div className="mt-10 max-w-4xl">
              <p className="text-sm font-semibold uppercase tracking-widest text-white/70">
                Plano do ciclo
              </p>

              <h1 className="mt-5 text-4xl font-bold leading-tight tracking-tight sm:text-5xl md:text-6xl">
                O Plano do Ciclo é o roteiro do experimento
              </h1>

              <p className="mt-7 max-w-3xl text-base leading-relaxed text-white/80 sm:text-lg md:text-xl">
                É um acordo de execução entre quem responde pela solução, o
                órgão demandante e o NEES. Descreve o que será testado, como,
                com quais dados, quais riscos, quais métricas e como o teste
                termina. Permite que a inovação seja representada em etapas
                concretas, mensuráveis e auditáveis.
              </p>
            </div>
          </div>
        </section>
        {/* Fluxo de validação */}
        <section className="bg-background px-6 py-16 md:py-20">
          <div className="mx-auto max-w-7xl">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-widest text-primary">
                Processo de validação
              </p>
              <h2 className="mt-4 text-2xl font-bold tracking-tight text-foreground md:text-3xl">
                Como o plano é validado
              </h2>
              <p className="mt-5 leading-relaxed text-muted-foreground md:text-lg">
                Antes de os testes começarem, o Plano do Ciclo passa por três
                momentos de construção e aprovação.
              </p>
            </div>

            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {/* Etapa 1 */}
              <article className="relative rounded-2xl border border-border bg-card p-6 shadow-sm">
                <span className="text-sm font-bold text-primary">01</span>
                <h3 className="mt-3 text-xl font-bold text-foreground">
                  Elaboração
                </h3>
                <p className="mt-3 leading-relaxed text-muted-foreground">
                  O responsável pela solução, junto ao órgão demandante, prepara
                  o plano e descreve como o experimento será conduzido.
                </p>
                <div className="mt-6 rounded-lg bg-primary/5 p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-primary">
                    Responsáveis
                  </p>
                  <p className="mt-1 text-sm font-medium text-foreground">
                    Responsável pela solução + órgão
                  </p>
                </div>
              </article>

              {/* Etapa 2 */}
              <article className="relative rounded-2xl border border-border bg-card p-6 shadow-sm">
                <span className="text-sm font-bold text-primary">02</span>
                <h3 className="mt-3 text-xl font-bold text-foreground">
                  Análise técnica
                </h3>
                <p className="mt-3 leading-relaxed text-muted-foreground">
                  O NEES avalia o conteúdo, verifica a consistência técnica e
                  devolve o plano com os ajustes necessários.
                </p>
                <div className="mt-6 rounded-lg bg-primary/5 p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-primary">
                    Responsável
                  </p>
                  <p className="mt-1 text-sm font-medium text-foreground">
                    NEES
                  </p>
                </div>
              </article>

              {/* Etapa 3 */}
              <article className="relative rounded-2xl border border-primary/30 bg-primary/5 p-6 shadow-sm">
                <span className="text-sm font-bold text-primary">03</span>
                <h3 className="mt-3 text-xl font-bold text-foreground">
                  Validação
                </h3>
                <p className="mt-3 leading-relaxed text-muted-foreground">
                  O órgão demandante aprova o plano antes do início dos testes,
                  formalizando as condições acordadas.
                </p>
                <div className="mt-6 rounded-lg bg-card p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-primary">
                    Responsável
                  </p>
                  <p className="mt-1 text-sm font-medium text-foreground">
                    Órgão demandante
                  </p>
                </div>
              </article>
            </div>

            <div className="mt-8 rounded-xl border-l-4 border-orange-500 bg-muted/50 p-5">
              <p className="font-semibold text-foreground">
                O plano aprovado orienta a execução.
              </p>
              <p className="mt-2 leading-relaxed text-muted-foreground">
                As informações declaradas no plano orientam os testes.
                Alterações relevantes precisam ser justificadas e aprovadas.
              </p>
            </div>
          </div>
        </section>
        {/* Sete seções do plano */}
        <section className="bg-muted/30 px-6 py-16 md:py-20">
          <div className="mx-auto max-w-7xl">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-widest text-primary">
                Estrutura do documento
              </p>
              <h2 className="mt-4 text-2xl font-bold tracking-tight text-foreground md:text-3xl">
                Sete seções para organizar o experimento
              </h2>
              <p className="mt-5 leading-relaxed text-muted-foreground md:text-lg">
                Cada seção responde a uma parte essencial do planejamento: o que
                será testado, como será acompanhado e quais condições precisam
                ser respeitadas.
              </p>
            </div>

            <div className="mt-10">
              <PlanoSections />
              <section className="mt-16">
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-foreground">
                    Modelos de apoio
                  </h2>

                  <p className="mt-3 max-w-3xl leading-relaxed text-muted-foreground">
                    Documentos de referência para apoiar a elaboração e a
                    execução do Plano do Ciclo. Os modelos estão em preparação.
                  </p>
                </div>

                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                  {[
                    "Ficha da solução",
                    "Matriz de riscos",
                    "Protocolo de teste",
                    "Plano de saída",
                  ].map((item) => (
                    <div
                      key={item}
                      className="rounded-2xl border border-border bg-card p-5 shadow-sm"
                    >
                      <h3 className="font-bold text-foreground">{item}</h3>

                      <span className="mt-4 inline-flex rounded-full bg-muted px-3 py-1 text-xs font-semibold text-muted-foreground">
                        Em preparação
                      </span>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </div>
        </section>
      </main>
      {/* Navegação entre as páginas */}
      <section className="border-t border-border bg-muted/40 px-6 py-12">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <Link
            href="/#mapa-sandbox"
            className="text-sm font-semibold text-muted-foreground transition hover:text-primary"
          >
            ← Voltar ao mapa
          </Link>

          <Link
            href="/entregas"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 font-semibold text-primary-foreground transition hover:brightness-95 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
          >
            Próxima etapa: Entregas
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>
      <Footer />
    </>
  );
}
