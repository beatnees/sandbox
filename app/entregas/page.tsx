import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import EntregasList from "@/components/entregas/EntregasList";
import Link from "next/link";

export default function EntregasPage() {
  return (
    <>
      <Header />

      <main>
        <section className="bg-gradient-hero px-6 py-16 text-white md:py-24">
          <div className="mx-auto max-w-7xl">
            <Link
              href="/"
              className="mb-8 inline-flex text-sm text-white/80 transition-colors hover:text-white"
            >
              ← Voltar ao mapa do sandbox
            </Link>

            <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-white/70">
              Entregas
            </p>

            <h1 className="max-w-4xl text-4xl font-bold leading-tight md:text-5xl">
              Evidências e resultados para orientar decisões
            </h1>

            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-white/85">
              As entregas do sandbox organizam os registros, as análises e os
              resultados produzidos durante o ciclo de testagem, permitindo
              avaliar a solução e fundamentar decisões sobre seus próximos
              passos.
            </p>
          </div>
        </section>

        <section className="px-6 py-16 md:py-20">
          <div className="mx-auto max-w-7xl">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-wider text-primary">
                O resultado do ciclo
              </p>

              <h2 className="mt-3 text-3xl font-bold text-foreground">
                Um dossiê para transformar testes em decisões
              </h2>

              <p className="mt-5 leading-relaxed text-muted-foreground">
                O órgão recebe os instrumentos do teste, os resultados, uma
                recomendação clara e a formação necessária para conduzir novos
                ciclos.
              </p>

              <p className="mt-4 leading-relaxed text-muted-foreground">
                O dossiê reúne o desempenho da solução frente ao comparador, os
                erros, as diferenças por grupo, a segurança, a integração, a
                utilidade operacional, os limites e os custos observáveis no
                recorte avaliado.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-muted/30 px-6 py-16 md:py-20">
          <div className="mx-auto max-w-7xl">
            <div className="w-full">
              <EntregasList />
            </div>
          </div>
        </section>

        <section className="px-6 py-16">
          <div className="mx-auto max-w-7xl">
            <div className="rounded-2xl border border-primary/20 bg-primary/5 p-6 md:p-8">
              <p className="text-sm font-semibold uppercase tracking-wider text-primary">
                Importante
              </p>

              <h2 className="mt-3 text-2xl font-bold text-foreground">
                Uma avaliação negativa também é uma entrega válida
              </h2>

              <p className="mt-4 max-w-4xl leading-relaxed text-muted-foreground">
                O aceite considera a execução e a qualidade da avaliação, e não
                uma conclusão positiva. Concluir que uma solução não deve
                avançar também cumpre a finalidade do ciclo.
              </p>

              <p className="mt-4 max-w-4xl leading-relaxed text-muted-foreground">
                A recomendação técnica não substitui a decisão do órgão, a
                aprovação sanitária (quando aplicável), a autorização ética nem
                o instrumento de contratação.
              </p>
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
            href="/governanca"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 font-semibold text-primary-foreground transition hover:brightness-95 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
          >
            Próxima etapa: Governança e Salvaguardas
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>

      <Footer />
    </>
  );
}
