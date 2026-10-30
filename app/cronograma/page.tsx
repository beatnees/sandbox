import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Link from "next/link";
import { CalendarCheck2, FileText, UserRoundCheck } from "lucide-react";

export default function CronogramaPage() {
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
                Cronograma
              </p>

              <h1 className="mt-5 text-4xl font-bold leading-tight tracking-tight sm:text-5xl md:text-6xl">
                Seis meses, com critérios para avançar em cada etapa
              </h1>

              <p className="mt-7 max-w-3xl text-base leading-relaxed text-white/80 sm:text-lg md:text-xl">
                O primeiro ciclo autônomo cobre uma solução e uma pergunta de
                decisão delimitadas. Os prazos abaixo são uma referência de
                planejamento, confirmada no diagnóstico.
              </p>
            </div>
          </div>
        </section>
        {/* Calendário de referência */}
        <section className="bg-background px-6 py-16 md:py-20">
          <div className="mx-auto max-w-7xl">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-widest text-primary">
                Calendário de referência
              </p>

              <h2 className="mt-4 text-2xl font-bold tracking-tight text-foreground md:text-3xl">
                Um ciclo organizado em seis meses
              </h2>

              <p className="mt-5 leading-relaxed text-muted-foreground md:text-lg">
                Cada fase tem um período previsto e termina com um portão de
                decisão. A experimentação ocupa três meses, enquanto a
                documentação acompanha todo o ciclo.
              </p>
            </div>

            <div className="mt-10 overflow-x-auto rounded-2xl border border-border bg-card p-5 shadow-sm md:p-8">
              <div className="min-w-170">
                {/* Cabeçalho dos meses */}
                <div className="grid grid-cols-6 gap-2 border-b border-border pb-4">
                  {["Mês 1", "Mês 2", "Mês 3", "Mês 4", "Mês 5", "Mês 6"].map(
                    (mes) => (
                      <div
                        key={mes}
                        className="text-center text-sm font-semibold text-muted-foreground"
                      >
                        {mes}
                      </div>
                    ),
                  )}
                </div>

                {/* Fase 1 */}
                <div className="mt-6 grid grid-cols-6 gap-2">
                  <div className="relative col-span-1 rounded-lg bg-primary px-3 py-4 text-center text-white">
                    <p className="text-xs font-semibold uppercase">Fase 1</p>
                    <p className="mt-1 text-sm font-bold">Desenho</p>
                    <span className="absolute -right-2 top-1/2 z-10 -translate-y-1/2 text-xl text-orange-500">
                      ◆
                    </span>
                  </div>
                  <div className="col-span-5 flex items-center pl-3 text-sm text-muted-foreground">
                    Seleção da solução, problema, resultado esperado e
                    viabilidade
                  </div>
                </div>

                {/* Fase 2 */}
                <div className="mt-4 grid grid-cols-6 gap-2">
                  <div className="col-span-1" />
                  <div className="relative col-span-1 rounded-lg bg-primary/80 px-3 py-4 text-center text-white">
                    <p className="text-xs font-semibold uppercase">Fase 2</p>
                    <p className="mt-1 text-sm font-bold">Preparação</p>
                    <span className="absolute -right-2 top-1/2 z-10 -translate-y-1/2 text-xl text-orange-500">
                      ◆
                    </span>
                  </div>
                  <div className="col-span-4 flex items-center pl-3 text-sm text-muted-foreground">
                    Ambiente configurado e protocolo pactuado
                  </div>
                </div>

                {/* Fase 3 */}
                <div className="mt-4 grid grid-cols-6 gap-2">
                  <div className="col-span-2" />
                  <div className="relative col-span-3 rounded-lg bg-primary/70 px-3 py-4 text-center text-white">
                    <p className="text-xs font-semibold uppercase">Fase 3</p>
                    <p className="mt-1 text-sm font-bold">Experimentação</p>
                    <span className="absolute -right-2 top-1/2 z-10 -translate-y-1/2 text-xl text-orange-500">
                      ◆
                    </span>
                  </div>
                  <div className="col-span-1 flex items-center pl-3 text-sm text-muted-foreground">
                    Correções
                  </div>
                </div>

                {/* Fase 4 */}
                <div className="mt-4 grid grid-cols-6 gap-2">
                  <div className="col-span-5" />
                  <div className="rounded-lg bg-primary/60 px-3 py-4 text-center text-white">
                    <p className="text-xs font-semibold uppercase">Fase 4</p>
                    <p className="mt-1 text-sm font-bold">Evidência</p>
                  </div>
                </div>

                {/* Documentação em paralelo */}
                <div className="mt-8 border-t border-border pt-6">
                  <div className="mb-3 flex items-center justify-between gap-4">
                    <p className="text-sm font-bold text-foreground">
                      Documentação e registros
                    </p>
                    <span className="text-xs text-muted-foreground">
                      Durante todo o ciclo
                    </span>
                  </div>

                  <div className="h-3 rounded-full border-2 border-dashed border-orange-500 bg-orange-500/5" />
                </div>

                <p className="mt-6 text-xs text-muted-foreground">
                  ◆ Portões de decisão ao final das fases. O avanço depende do
                  cumprimento dos critérios definidos.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Modalidades de sandbox */}
        <section className="bg-muted/30 px-6 py-16 md:py-20">
          <div className="mx-auto max-w-7xl">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-widest text-primary">
                Duas modalidades, dois prazos
              </p>
              <h2 className="mt-4 text-2xl font-bold tracking-tight text-foreground md:text-3xl">
                O tempo depende do ponto de partida
              </h2>
              <p className="mt-5 leading-relaxed text-muted-foreground md:text-lg">
                Nem toda solução começa do mesmo lugar. O planejamento considera
                se o sandbox será conduzido de forma autônoma ou integrado ao
                desenvolvimento de uma solução pelo NEES.
              </p>
            </div>

            <div className="mt-10 grid gap-6 md:grid-cols-2">
              {/* Sandbox autônomo */}
              <article className="rounded-2xl border border-border bg-card p-6 shadow-sm md:p-8">
                <p className="text-sm font-semibold uppercase tracking-wider text-primary">
                  Modalidade 1
                </p>
                <h3 className="mt-3 text-xl font-bold text-foreground">
                  Sandbox autônomo
                </h3>
                <p className="mt-3 leading-relaxed text-muted-foreground">
                  Ciclo de referência de seis meses para uma solução elegível,
                  independentemente de sua origem.
                </p>

                <div className="mt-8">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-semibold text-foreground">
                      Duração prevista
                    </span>
                    <span className="font-bold text-primary">6 meses</span>
                  </div>
                  <div className="mt-3 grid grid-cols-6 gap-1.5">
                    {Array.from({ length: 6 }, (_, index) => (
                      <div
                        key={index}
                        className="h-3 rounded-sm bg-primary"
                        aria-label={`Mês ${index + 1}`}
                      />
                    ))}
                  </div>
                  <p className="mt-2 text-xs text-muted-foreground">
                    Um ciclo completo, do desenho à decisão com evidências.
                  </p>
                </div>
              </article>

              {/* Sandbox integrado */}
              <article className="rounded-2xl border border-border bg-card p-6 shadow-sm md:p-8">
                <p className="text-sm font-semibold uppercase tracking-wider text-primary">
                  Modalidade 2
                </p>
                <h3 className="mt-3 text-xl font-bold text-foreground">
                  Integrado ao desenvolvimento do NEES
                </h3>
                <p className="mt-3 leading-relaxed text-muted-foreground">
                  Janelas de testes técnicos e operacionais por versão pronta,
                  quando ambiente, dados e solução já estão disponíveis.
                </p>

                <div className="mt-8">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-semibold text-foreground">
                      Duração prevista
                    </span>
                    <span className="font-bold text-primary">
                      8 a 12 semanas
                    </span>
                  </div>
                  <div className="mt-3 grid grid-cols-12 gap-1.5">
                    {Array.from({ length: 12 }, (_, index) => (
                      <div
                        key={index}
                        className={`h-3 rounded-sm ${
                          index < 8
                            ? "bg-primary"
                            : "border border-primary/50 bg-primary/10"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="mt-2 text-xs text-muted-foreground">
                    Testes por versão que já esteja pronta para avaliação.
                  </p>
                </div>
              </article>
            </div>
          </div>
        </section>
        {/* O que reservar */}
        <section className="bg-background px-6 py-16 md:py-20">
          <div className="mx-auto max-w-7xl">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-widest text-primary">
                Planejamento
              </p>
              <h2 className="mt-4 text-2xl font-bold tracking-tight text-foreground md:text-3xl">
                O que reservar na sua agenda
              </h2>
              <p className="mt-5 leading-relaxed text-muted-foreground md:text-lg">
                Um ciclo bem planejado considera não apenas o tempo de testar,
                mas também as decisões, os registros e as pessoas necessárias
                para conduzir cada etapa.
              </p>
            </div>

            <div className="mt-10 grid gap-6 md:grid-cols-3">
              <article className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                <div
                  className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-2xl text-primary"
                  aria-hidden="true"
                >
                  <CalendarCheck2 />
                </div>
                <h3 className="mt-5 text-lg font-bold text-foreground">
                  Datas e portões
                </h3>
                <p className="mt-3 leading-relaxed text-muted-foreground">
                  Cada mês termina com um portão de decisão. Planeje a
                  disponibilidade da equipe e dos dados necessários para cada
                  etapa.
                </p>
              </article>

              <article className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                <div
                  className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-2xl text-primary"
                  aria-hidden="true"
                >
                  <FileText />
                </div>
                <h3 className="mt-5 text-lg font-bold text-foreground">
                  Documentação
                </h3>
                <p className="mt-3 leading-relaxed text-muted-foreground">
                  Reserve tempo para relatórios e registros. As equipes técnicas
                  costumam reservar tempo para testar, mas não para documentar.
                </p>
              </article>

              <article className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                <div
                  className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-2xl text-primary"
                  aria-hidden="true"
                >
                  <UserRoundCheck />
                </div>
                <h3 className="mt-5 text-lg font-bold text-foreground">
                  Responsáveis e dependências
                </h3>
                <p className="mt-3 leading-relaxed text-muted-foreground">
                  Defina quem responde pela solução, pelos dados e pela decisão.
                  Identifique também dependências externas, como compras e
                  autorizações.
                </p>
              </article>
            </div>
          </div>
        </section>
        {/* Observações sobre o cronograma */}
        <section className="px-6 pb-16 md:pb-20">
          <div className="mx-auto max-w-7xl">
            <div className="rounded-2xl border border-orange-300/60 bg-orange-50 p-6 dark:border-orange-900/60 dark:bg-orange-950/20 md:p-8">
              <div className="flex flex-col gap-5 md:flex-row md:gap-6">
                <div
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-orange-100 text-2xl text-orange-700 dark:bg-orange-900/40 dark:text-orange-300"
                  aria-hidden="true"
                >
                  !
                </div>

                <div>
                  <h2 className="text-xl font-bold text-foreground">
                    O cronograma é uma referência de planejamento
                  </h2>

                  <div className="mt-4 space-y-4 leading-relaxed text-muted-foreground">
                    <p>
                      Os seis meses não são um prazo regulatório. O calendário
                      pode mudar conforme processos de compra e autorizações,
                      correções do produto, coleta de dados longitudinais e
                      calendários epidemiológicos ou escolares.
                    </p>

                    <p>
                      Pilotos com efeitos no mundo real e comprovação de
                      benefício clínico ou pedagógico não estão automaticamente
                      incluídos no ciclo. Essas atividades precisam ser
                      delimitadas e planejadas separadamente.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

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
              href="/plano-do-ciclo"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 font-semibold text-primary-foreground transition hover:brightness-95 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
            >
              Próxima etapa: Plano do ciclo
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
