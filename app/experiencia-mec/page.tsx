import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Link from "next/link";

export default function ExperienciaMECPage() {
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
                Nossa experiência: MEC
              </p>

              <h1 className="mt-5 text-4xl font-bold leading-tight tracking-tight sm:text-5xl md:text-6xl">
                O método nasceu no Sandbox de IA na Educação
              </h1>

              <p className="mt-7 max-w-3xl text-base leading-relaxed text-white/80 sm:text-lg md:text-xl">
                O Sandbox de IA na Educação é conduzido pelo Ministério da
                Educação, por meio da SEGAPE, com apoio do NEES. Seu objetivo é
                organizar testes de IA educacional para identificar riscos e
                definir condições de uso nas escolas.
              </p>
            </div>
          </div>
        </section>

        <section className="px-6 py-16 md:py-20">
          <div className="mx-auto max-w-7xl">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-widest text-primary">
                Organização da experiência
              </p>

              <h2 className="mt-4 text-2xl font-bold tracking-tight text-foreground md:text-3xl">
                Como o sandbox foi organizado
              </h2>

              <p className="mt-5 text-base leading-relaxed text-muted-foreground md:text-lg">
                A experiência foi estruturada em cinco etapas, desde a seleção
                das soluções até o acompanhamento de sua evolução.
              </p>
            </div>

            <ol className="relative mt-10 grid gap-8 before:absolute before:bottom-5 before:left-5 before:top-5 before:w-px before:bg-border before:content-[''] md:grid-cols-5 md:gap-4 md:before:bottom-auto md:before:left-[10%] md:before:right-[10%] md:before:top-5 md:before:h-px md:before:w-auto">
              {[
                {
                  titulo: "Seleção",
                  descricao:
                    "De 38 candidaturas, 8 soluções foram selecionadas.",
                },
                {
                  titulo: "Entrada",
                  descricao:
                    "Cada instituição participante passou por onboarding e recebeu cronograma individual.",
                },
                {
                  titulo: "Formação e mentoria",
                  descricao:
                    "Módulos de formação e um programa de mentoria acompanharam as equipes.",
                },
                {
                  titulo: "Avaliação",
                  descricao:
                    "Pareceres técnicos orientaram a evolução de cada solução.",
                },
                {
                  titulo: "Governança",
                  descricao:
                    "Uma comissão executiva, com matriz de responsabilidades, acompanhou o conjunto.",
                },
              ].map((etapa, index) => (
                <li
                  key={etapa.titulo}
                  className="relative flex gap-4 md:flex-col md:gap-5"
                >
                  <span className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-primary bg-background text-sm font-bold text-primary md:mx-auto">
                    {index + 1}
                  </span>

                  <div className="md:text-center">
                    <h3 className="text-lg font-bold text-foreground">
                      {etapa.titulo}
                    </h3>

                    <p className="mt-2 leading-relaxed text-muted-foreground">
                      {etapa.descricao}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="bg-muted/40 px-6 py-16 md:py-20">
          <div className="mx-auto max-w-7xl">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-widest text-primary">
                Participantes da experiência
              </p>

              <h2 className="mt-4 text-2xl font-bold tracking-tight text-foreground md:text-3xl">
                As oito soluções selecionadas
              </h2>

              <p className="mt-5 text-base leading-relaxed text-muted-foreground md:text-lg">
                O processo de seleção partiu de 38 candidaturas e resultou na
                escolha de oito soluções para participar da experiência.
              </p>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                "Letrar.IA",
                "APA",
                "SAVIA",
                "Soff.ia",
                "REALCE",
                "Profy AEE",
                "Cogedu Sentinela",
                "EduJA",
              ].map((solucao, index) => (
                <article
                  key={solucao}
                  className="flex min-h-28 items-center gap-4 rounded-2xl border border-border bg-card p-5 shadow-sm"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-sm font-bold text-primary">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <h3 className="font-bold text-card-foreground">{solucao}</h3>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 py-16 md:py-20">
          <div className="mx-auto max-w-7xl">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-widest text-primary">
                Aprendizados da experiência
              </p>

              <h2 className="mt-4 text-2xl font-bold tracking-tight text-foreground md:text-3xl">
                O que aprendemos
              </h2>

              <p className="mt-5 text-base leading-relaxed text-muted-foreground md:text-lg">
                A experiência com o MEC ajudou a consolidar princípios
                importantes para estruturar e conduzir ciclos de testagem.
              </p>
            </div>

            <div className="mt-10 grid gap-5 md:grid-cols-2">
              {[
                {
                  numero: "01",
                  titulo: "Critérios antes do teste",
                  descricao:
                    "Medidas, comparadores e limites de risco são pactuados antes de começar.",
                },
                {
                  numero: "02",
                  titulo: "Papéis claros",
                  descricao:
                    "Cada experimento define quem supervisiona, quem corrige falhas e quem decide sobre o uso.",
                },
                {
                  numero: "03",
                  titulo: "Método reutilizável",
                  descricao:
                    "Instrumentos e guias permitem que o órgão conduza novos ciclos.",
                },
                {
                  numero: "04",
                  titulo: "O domínio importa",
                  descricao:
                    "Aplicar o método em outro setor exige especialistas e critérios próprios daquela área.",
                },
              ].map((aprendizado) => (
                <article
                  key={aprendizado.numero}
                  className="rounded-2xl border border-border bg-card p-6 shadow-sm md:p-8"
                >
                  <span className="text-sm font-bold tracking-widest text-primary">
                    {aprendizado.numero}
                  </span>

                  <h3 className="mt-4 text-xl font-bold text-card-foreground">
                    {aprendizado.titulo}
                  </h3>

                  <p className="mt-3 leading-relaxed text-muted-foreground">
                    {aprendizado.descricao}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-muted/40 px-6 py-16 md:py-20">
          <div className="mx-auto max-w-7xl">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-widest text-primary">
                Aplicação em outros contextos
              </p>

              <h2 className="mt-4 text-2xl font-bold tracking-tight text-foreground md:text-3xl">
                O que se transfere e o que se reconstrói
              </h2>

              <p className="mt-5 text-base leading-relaxed text-muted-foreground md:text-lg">
                A experiência na educação oferece uma base metodológica para
                outros contextos, mas cada política exige adaptações próprias.
              </p>
            </div>

            <div className="mt-10 grid gap-5 md:grid-cols-2">
              <article className="rounded-2xl border border-border bg-card p-6 shadow-sm md:p-8">
                <span className="text-sm font-bold uppercase tracking-widest text-primary">
                  Pode ser transferido
                </span>

                <h3 className="mt-4 text-xl font-bold text-card-foreground">
                  Transfere-se
                </h3>

                <ul className="mt-5 space-y-3 text-muted-foreground">
                  {[
                    "O processo",
                    "A governança",
                    "Os instrumentos",
                    "A lógica de decisão",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="mt-1 text-primary" aria-hidden="true">
                        ✓
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </article>

              <article className="rounded-2xl border border-border bg-card p-6 shadow-sm md:p-8">
                <span className="text-sm font-bold uppercase tracking-widest text-primary">
                  Exige adaptação
                </span>

                <h3 className="mt-4 text-xl font-bold text-card-foreground">
                  Reconstrói-se
                </h3>

                <ul className="mt-5 space-y-3 text-muted-foreground">
                  {[
                    "Os critérios de avaliação",
                    "Os especialistas",
                    "As salvaguardas específicas de cada política",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="mt-1 text-primary" aria-hidden="true">
                        ↻
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            </div>

            <p className="mt-8 rounded-xl border border-border bg-card p-5 text-sm leading-relaxed text-muted-foreground">
              A experiência na educação fundamenta a adaptação do método. Ela
              não transfere critérios pedagógicos nem comprova resultados em
              outras áreas.
            </p>
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
              href="/ciclo"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 font-semibold text-primary-foreground transition hover:brightness-95 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
            >
              Próxima etapa: Ciclo de testagem
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
