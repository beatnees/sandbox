import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Link from "next/link";

export default function AplicacoesPage() {
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
                Aplicações
              </p>

              <h1 className="mt-5 text-4xl font-bold leading-tight tracking-tight sm:text-5xl md:text-6xl">
                Duas formas de usar o sandbox
              </h1>

              <p className="mt-6 max-w-3xl text-lg leading-relaxed text-white/85">
                O método pode avaliar soluções existentes ou acompanhar soluções
                desenvolvidas pelo NEES. As duas formas podem ser combinadas.
                Comece por uma solução e por uma pergunta de decisão.
              </p>
            </div>
          </div>
        </section>

        <section className="px-6 py-16 md:py-20">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-6 lg:grid-cols-2">
              <article className="rounded-2xl border border-border bg-muted/40 p-8 md:p-10">
                <span className="mb-5 inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary text-lg font-bold text-white">
                  A
                </span>

                <h2 className="text-2xl font-bold text-foreground md:text-3xl">
                  Sandbox como produto
                </h2>

                <p className="mt-5 leading-relaxed text-slate-700">
                  Avalia uma solução existente do órgão ou de parceiros e
                  orienta a decisão de uso. A solução pode ter qualquer origem
                  elegível. Não é preciso contratar desenvolvimento do NEES.
                </p>

                <div className="mt-8 rounded-xl bg-card/80 p-5">
                  <p className="text-sm font-semibold uppercase tracking-wider text-primary">
                    Fluxo
                  </p>
                  <p className="mt-2 font-semibold text-foreground">
                    Solução existente → Sandbox → Decisão
                  </p>
                </div>
              </article>

              <article className="rounded-2xl border border-border bg-muted/40 p-8 md:p-10">
                <span className="mb-5 inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary text-lg font-bold text-white">
                  B
                </span>

                <h2 className="text-2xl font-bold text-foreground md:text-3xl">
                  Sandbox integrado
                </h2>

                <p className="mt-5 leading-relaxed text-slate-700">
                  Quando o NEES desenvolve a solução, o teste acompanha as
                  versões aptas e devolve os achados para correção antes da
                  decisão do órgão. Falhas identificadas voltam ao
                  desenvolvimento para correção e novo teste.
                </p>

                <div className="mt-8 rounded-xl bg-card/80 p-5">
                  <p className="text-sm font-semibold uppercase tracking-wider text-primary">
                    Fluxo
                  </p>
                  <p className="mt-2 font-semibold text-foreground">
                    NEES desenvolve → Sandbox avalia → Órgão decide
                  </p>
                  <p className="mt-3 text-sm text-slate-600">
                    Falhas identificadas retornam ao desenvolvimento para
                    correção.
                  </p>
                </div>
              </article>
            </div>

            <p className="mx-auto mt-8 max-w-3xl text-center text-base leading-relaxed text-slate-600">
              As duas formas podem ser combinadas. Comece por uma solução e por
              uma pergunta de decisão.
            </p>
          </div>
        </section>

        <section className="bg-background px-6 py-16 md:py-20">
          <div className="mx-auto max-w-7xl">
            <div className="mb-10 max-w-3xl">
              <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-primary">
                Áreas de aplicação
              </p>

              <h2 className="text-3xl font-bold text-foreground md:text-4xl">
                Onde o método se aplica
              </h2>

              <p className="mt-4 leading-relaxed text-slate-600">
                O mesmo método pode apoiar decisões em diferentes áreas de
                políticas públicas, respeitando as particularidades de cada
                contexto.
              </p>
            </div>

            <article className="mb-8 rounded-2xl border border-border bg-card p-7 md:p-9">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h3 className="text-2xl font-bold text-foreground">Educação</h3>

                <span className="rounded-full bg-muted/40 px-4 py-2 text-xs font-semibold text-primary">
                  Experiência realizada
                </span>
              </div>

              <p className="mt-4 max-w-3xl leading-relaxed text-slate-600">
                Experiência realizada no Sandbox de IA na Educação do MEC.
              </p>

              <Link
                href="/experiencia-mec"
                className="mt-5 inline-flex items-center gap-2 font-semibold text-primary transition-colors hover:text-primary/80"
              >
                Conheça a experiência do MEC →
              </Link>
            </article>

            <div className="mb-8">
              <div className="flex flex-wrap items-center gap-3">
                <h3 className="text-2xl font-bold text-foreground">
                  Saúde: exemplos de aplicação
                </h3>

                <span className="rounded-full bg-muted/40 px-4 py-2 text-xs font-semibold text-primary">
                  Exemplos de aplicação
                </span>
              </div>

              <p className="mt-4 max-w-4xl leading-relaxed text-slate-600">
                O mesmo método pode apoiar decisões na saúde pública. Cada
                exemplo tem um ponto de partida diferente, e a entrada no teste
                depende de versão testável, dados adequados e protocolo.
              </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <article className="rounded-2xl border border-border bg-card p-6">
                <h4 className="text-lg font-bold text-primary">
                  Vigilância de dengue
                </h4>
                <p className="mt-3 leading-relaxed text-slate-600">
                  Quando um alerta pode orientar a mobilização da vigilância e a
                  preparação dos serviços? O teste mede a antecedência útil, os
                  surtos não detectados e os falsos alertas, em comparação com a
                  rotina.
                </p>
              </article>

              <article className="rounded-2xl border border-border bg-card p-6">
                <h4 className="text-lg font-bold text-primary">
                  Diabetes na atenção primária
                </h4>
                <p className="mt-3 leading-relaxed text-slate-600">
                  Os estratos de risco são válidos e quais ofertas de cuidado
                  podem ser acionadas com segurança? O teste verifica erros e
                  diferenças entre grupos e territórios.
                </p>
              </article>

              <article className="rounded-2xl border border-border bg-card p-6">
                <h4 className="text-lg font-bold text-primary">Saúde mental</h4>
                <p className="mt-3 leading-relaxed text-slate-600">
                  Quais sinais justificam revisão pela equipe e como agir sem
                  expor ou estigmatizar usuários? O teste verifica se a ausência
                  de registro representa interrupção real do cuidado.
                </p>
              </article>

              <article className="rounded-2xl border border-border bg-card p-6">
                <h4 className="text-lg font-bold text-primary">
                  Violência contra mulheres
                </h4>
                <p className="mt-3 leading-relaxed text-slate-600">
                  Os fluxos apoiam a resposta sem expor as pessoas atendidas?
                  Finalidade e governança precisam ser pactuadas com os órgãos
                  responsáveis.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section className="px-6 py-12 md:py-16">
          <div className="mx-auto max-w-7xl">
            <div className="rounded-2xl border-l-4 border-border bg-muted/40 p-7 md:p-9">
              <p className="mb-3 text-sm font-bold uppercase tracking-wider text-primary">
                Importante
              </p>

              <h2 className="text-xl font-bold text-foreground md:text-2xl">
                Testar tecnicamente não é comprovar impacto na saúde
              </h2>

              <p className="mt-4 max-w-4xl leading-relaxed text-slate-700">
                Um ciclo técnico não comprova redução de hospitalizações, crises
                ou óbitos. O impacto buscado no cuidado indica a finalidade da
                aplicação, não um resultado já alcançado.
              </p>
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

            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="/governanca"
                className="inline-flex items-center justify-center rounded-xl border border-border px-6 py-3 font-semibold text-foreground transition hover:bg-muted"
              >
                ← Governança
              </Link>

              <Link
                href="/referencias"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 font-semibold text-primary-foreground transition hover:brightness-95"
              >
                Referências
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
