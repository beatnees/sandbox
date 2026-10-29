import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Link from "next/link";
import { Code, Scale } from "lucide-react";

export default function OQueEPage() {
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
                O que é o sandbox de IA
              </p>

              <h1 className="mt-5 text-4xl font-bold leading-tight tracking-tight sm:text-5xl md:text-6xl">
                Testar benefícios e riscos antes de ampliar
              </h1>

              <p className="mt-7 max-w-3xl text-base leading-relaxed text-white/80 sm:text-lg md:text-xl">
                Em escala delimitada, o gestor observa o desempenho, os efeitos
                no cuidado ou no ensino e os riscos de uma solução antes de
                decidir sobre seu uso.
              </p>
            </div>
          </div>
        </section>

        <section className="px-6 py-16 md:py-20">
          <div className="mx-auto max-w-7xl">
            <div className="max-w-3xl">
              <h2 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
                O que é um sandbox
              </h2>

              <p className="mt-5 text-base leading-relaxed text-muted-foreground md:text-lg">
                Sandbox é um arranjo de experimentação supervisionada. Antes do
                teste, definem-se o problema, a solução ou versão, o escopo, os
                participantes, os dados, o período, as métricas, a supervisão e
                as regras de entrada e saída. O ambiente pode combinar dados
                históricos, simulações e atividades reais autorizadas. Não é
                necessário criar uma nova plataforma.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-muted/40 px-6 py-16 md:py-20">
          <div className="mx-auto max-w-7xl">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-widest text-primary">
                Da experimentação à decisão
              </p>

              <h2 className="mt-4 text-2xl font-bold tracking-tight text-foreground md:text-3xl">
                Da solução promissora à decisão fundamentada
              </h2>

              <p className="mt-5 text-base leading-relaxed text-muted-foreground md:text-lg">
                O processo organiza a experimentação em etapas para produzir
                evidências que apoiem decisões sobre o uso de uma solução.
              </p>
            </div>

            <ol className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {[
                "Definir o problema e o resultado esperado",
                "Testar no contexto de uso",
                "Comparar resultados, erros e desigualdades",
                "Definir condições para ampliar ou parar",
              ].map((etapa, index) => (
                <li
                  key={etapa}
                  className="rounded-2xl border border-border bg-card p-6 shadow-sm"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground">
                    {index + 1}
                  </span>

                  <h3 className="mt-5 text-lg font-semibold leading-snug text-card-foreground">
                    {etapa}
                  </h3>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="bg-background px-6 py-16 md:py-20">
          <div className="mx-auto max-w-7xl">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-widest text-primary">
                Dois focos que podem coexistir
              </p>

              <h2 className="mt-4 text-2xl font-bold tracking-tight text-foreground md:text-3xl">
                Avaliar soluções e experimentar regras
              </h2>

              <p className="mt-5 text-base leading-relaxed text-muted-foreground md:text-lg">
                Os dois focos têm objetivos diferentes, mas podem coexistir em
                uma mesma iniciativa de experimentação.
              </p>
            </div>

            <div className="mt-10 grid gap-6 md:grid-cols-2">
              <article className="rounded-3xl border border-border bg-card p-7 shadow-sm md:p-9">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-2xl text-primary">
                  <Code size={24} strokeWidth={1.8} aria-hidden="true" />
                </div>

                <h3 className="mt-6 text-xl font-bold text-card-foreground md:text-2xl">
                  Sandbox algorítmico
                </h3>

                <p className="mt-4 leading-relaxed text-muted-foreground">
                  Avalia uma solução digital com dados e profissionais: acertos,
                  falsos alertas, diferenças entre grupos e efeitos no trabalho
                  da equipe.
                </p>
              </article>

              <article className="rounded-3xl border border-border bg-card p-7 shadow-sm md:p-9">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-secondary/20 text-2xl text-primary">
                  <Scale size={24} strokeWidth={1.8} aria-hidden="true" />
                </div>

                <h3 className="mt-6 text-xl font-bold text-card-foreground md:text-2xl">
                  Sandbox regulatório
                </h3>

                <p className="mt-4 leading-relaxed text-muted-foreground">
                  Com autoridade competente, experimenta uma solução sob regras
                  específicas e supervisão. Os resultados orientam requisitos,
                  limites de uso e eventual revisão normativa.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section className="bg-muted/40 px-6 py-16 md:py-20">
          <div className="mx-auto max-w-7xl">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-widest text-primary">
                Por que utilizar
              </p>

              <h2 className="mt-4 text-2xl font-bold tracking-tight text-foreground md:text-3xl">
                Para que serve o sandbox
              </h2>

              <p className="mt-5 text-base leading-relaxed text-muted-foreground md:text-lg">
                A experimentação supervisionada organiza o teste e transforma
                seus resultados em informações úteis para a tomada de decisão.
              </p>
            </div>

            <div className="mt-10 grid gap-5 sm:grid-cols-2">
              <article className="rounded-2xl border border-border bg-card p-6">
                <h3 className="text-lg font-bold text-card-foreground">
                  Segurança na decisão
                </h3>
                <p className="mt-3 leading-relaxed text-muted-foreground">
                  O plano delimita o que é testado e como. Riscos previstos
                  ficam registrados desde o início.
                </p>
              </article>

              <article className="rounded-2xl border border-border bg-card p-6">
                <h3 className="text-lg font-bold text-card-foreground">
                  Evidência comparável
                </h3>
                <p className="mt-3 leading-relaxed text-muted-foreground">
                  Usa métodos e referências reconhecidos e compara a solução com
                  a rotina atual.
                </p>
              </article>

              <article className="rounded-2xl border border-border bg-card p-6">
                <h3 className="text-lg font-bold text-card-foreground">
                  Previsibilidade
                </h3>
                <p className="mt-3 leading-relaxed text-muted-foreground">
                  Cronograma, entregas e recursos são conhecidos antes do teste.
                </p>
              </article>

              <article className="rounded-2xl border border-border bg-card p-6">
                <h3 className="text-lg font-bold text-card-foreground">
                  Aprendizado reutilizável
                </h3>
                <p className="mt-3 leading-relaxed text-muted-foreground">
                  O órgão recebe guia e formação para conduzir novos ciclos.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section className="bg-background px-6 py-16 md:py-20">
          <div className="mx-auto max-w-7xl">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-widest text-primary">
                Limites da experimentação
              </p>

              <h2 className="mt-4 text-2xl font-bold tracking-tight text-foreground md:text-3xl">
                O que o sandbox não é
              </h2>

              <p className="mt-5 text-base leading-relaxed text-muted-foreground md:text-lg">
                Participar de um sandbox não elimina obrigações legais,
                regulatórias ou éticas, nem garante que uma solução será
                aprovada para uso.
              </p>
            </div>

            <ul className="mt-10 space-y-4">
              {[
                {
                  titulo: "Não é certificação",
                  descricao:
                    "Não é certificação nem selo de aprovação do produto testado.",
                },
                {
                  titulo: "Não substitui outras exigências",
                  descricao:
                    "Não substitui a LGPD, a ética em pesquisa nem as autorizações setoriais aplicáveis, como as da Anvisa em saúde.",
                },
                {
                  titulo: "Não concede dispensa de normas",
                  descricao:
                    "Flexibilização regulatória depende de competência e de ato da autoridade responsável.",
                },
                {
                  titulo: "Não garante resultado positivo",
                  descricao:
                    "Concluir que uma solução não deve avançar também cumpre a finalidade do ciclo.",
                },
                {
                  titulo: "Não é consultoria de desenvolvimento",
                  descricao:
                    "Implementar funcionalidades do produto avaliado é outro escopo.",
                },
              ].map((item) => (
                <li
                  key={item.titulo}
                  className="flex items-start gap-4 rounded-2xl border border-border bg-card p-5 sm:p-6"
                >
                  <span
                    aria-hidden="true"
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-destructive/10 font-bold text-destructive"
                  >
                    !
                  </span>

                  <div>
                    <h3 className="font-bold text-card-foreground">
                      {item.titulo}
                    </h3>

                    <p className="mt-2 leading-relaxed text-muted-foreground">
                      {item.descricao}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
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
              href="/governanca"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 font-semibold text-primary-foreground transition hover:brightness-95 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
            >
              Próxima etapa: quem participa
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
