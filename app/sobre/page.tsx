import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Link from "next/link";

export default function SobrePage() {
  return (
    <>
      <Header />

      <main className="bg-background">
        {/* Abertura */}
        <section className="bg-gradient-hero px-6 py-16 text-white md:py-24">
          <div className="mx-auto max-w-7xl">
            <Link
              href="/#mapa-sandbox"
              className="inline-flex items-center gap-2 text-sm font-medium text-white/80 transition hover:text-white"
            >
              <span aria-hidden="true">←</span>
              Voltar ao mapa
            </Link>

            <div className="mt-10 max-w-4xl">
              <p className="text-sm font-semibold uppercase tracking-widest text-white/70">
                Sobre o NEES
              </p>

              <h1 className="mt-5 text-4xl font-bold leading-tight tracking-tight sm:text-5xl md:text-6xl">
                Pesquisa aplicada e avaliação de IA para políticas públicas
              </h1>

              <p className="mt-7 max-w-3xl text-base leading-relaxed text-white/80 sm:text-lg md:text-xl">
                Pesquisa aplicada na UFAL, experiência com o MEC e segurança da
                informação certificada.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-background px-6 py-16 md:py-24">
          <div className="mx-auto max-w-7xl">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-widest text-primary">
                Sobre o NEES
              </p>

              <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                Por que o NEES para o sandbox de IA?
              </h2>

              <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
                Pesquisa aplicada na UFAL, experiência com o MEC e segurança da
                informação certificada.
              </p>
            </div>

            <div className="mt-12 grid gap-6 md:grid-cols-2">
              <article className="rounded-2xl border border-border bg-card p-7 shadow-sm">
                <h3 className="text-xl font-semibold text-foreground">
                  15 anos de atuação
                </h3>
                <p className="mt-3 leading-relaxed text-muted-foreground">
                  Pesquisa e desenvolvimento de tecnologias sociais para
                  políticas públicas, com vínculo à UFAL.
                </p>
              </article>

              <article className="rounded-2xl border border-border bg-card p-7 shadow-sm">
                <h3 className="text-xl font-semibold text-foreground">
                  Experiência com o MEC/SEGAPE
                </h3>
                <p className="mt-3 leading-relaxed text-muted-foreground">
                  O NEES desenvolveu método e instrumentos para selecionar e
                  avaliar IA no sandbox da educação.
                </p>
              </article>

              <article className="rounded-2xl border border-border bg-card p-7 shadow-sm">
                <h3 className="text-xl font-semibold text-foreground">
                  Equipe e método de avaliação
                </h3>
                <p className="mt-3 leading-relaxed text-muted-foreground">
                  Equipe multidisciplinar e framework de avaliação de IA que
                  organiza requisitos, riscos e critérios de teste. Em cada
                  caso, a experiência do NEES se combina à revisão de
                  especialistas da área.
                </p>
              </article>

              <article className="rounded-2xl border border-border bg-card p-7 shadow-sm">
                <h3 className="text-xl font-semibold text-foreground">
                  ISO/IEC 27001
                </h3>
                <p className="mt-3 leading-relaxed text-muted-foreground">
                  Sistema de gestão da segurança da informação certificado no
                  âmbito da UFAL/IC/NEES. O selo refere-se a esse escopo e não
                  certifica o desempenho das soluções avaliadas.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section className="bg-muted/40 px-6 py-16 md:py-24">
          <div className="mx-auto max-w-5xl">
            <div className="mb-10 max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-widest text-primary">
                Dúvidas frequentes
              </p>

              <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                Perguntas frequentes
              </h2>

              <p className="mt-5 leading-relaxed text-muted-foreground">
                Entenda alguns pontos importantes sobre o funcionamento e os
                limites do sandbox.
              </p>
            </div>

            <div className="space-y-4">
              <details
                open
                className="group rounded-2xl border border-border bg-card p-6 shadow-sm"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-foreground">
                  O sandbox substitui autorizações, como a da Anvisa ou a
                  análise ética?
                  <span className="text-primary transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-4 leading-relaxed text-muted-foreground">
                  Não. Cada experimento segue as regras aplicáveis ao seu caso.
                </p>
              </details>

              <details className="group rounded-2xl border border-border bg-card p-6 shadow-sm">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-foreground">
                  Quanto tempo leva?
                  <span className="text-primary transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-4 leading-relaxed text-muted-foreground">
                  A referência é de no mínimo seis meses de testagem para uma
                  solução apta e dados acessíveis.
                </p>
              </details>

              <details className="group rounded-2xl border border-border bg-card p-6 shadow-sm">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-foreground">
                  Posso testar a solução de outro fornecedor?
                  <span className="text-primary transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-4 leading-relaxed text-muted-foreground">
                  Sim. A solução pode ter qualquer origem elegível. Não é
                  preciso contratar desenvolvimento do NEES.
                </p>
              </details>

              <details className="group rounded-2xl border border-border bg-card p-6 shadow-sm">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-foreground">
                  E se o resultado for negativo?
                  <span className="text-primary transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-4 leading-relaxed text-muted-foreground">
                  Também é uma entrega válida. O dossiê indica as condições para
                  corrigir, restringir ou encerrar o uso.
                </p>
              </details>

              <details className="group rounded-2xl border border-border bg-card p-6 shadow-sm">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-foreground">
                  Que dados são necessários?
                  <span className="text-primary transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-4 leading-relaxed text-muted-foreground">
                  Os dados mínimos para a pergunta do teste, com base legal e
                  acesso autorizado. O plano de proteção de dados é definido na
                  preparação.
                </p>
              </details>

              <details className="group rounded-2xl border border-border bg-card p-6 shadow-sm">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-foreground">
                  O NEES avalia o que ele mesmo desenvolveu?
                  <span className="text-primary transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-4 leading-relaxed text-muted-foreground">
                  Sim.
                </p>
              </details>

              <details className="group rounded-2xl border border-border bg-card p-6 shadow-sm">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-foreground">
                  O sandbox dá um selo de aprovação?
                  <span className="text-primary transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-4 leading-relaxed text-muted-foreground">
                  Não. O resultado é uma recomendação técnica com condições, e a
                  decisão é do órgão responsável.
                </p>
              </details>
            </div>
          </div>
        </section>

        <section className="bg-background px-6 py-16 md:py-24">
          <div className="mx-auto max-w-7xl">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-widest text-primary">
                Prepare-se para conversar
              </p>

              <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                Antes de falar conosco
              </h2>

              <p className="mt-5 leading-relaxed text-muted-foreground">
                Algumas perguntas ajudam a organizar a conversa e identificar o
                escopo inicial do experimento.
              </p>
            </div>

            <div className="mt-10 grid gap-5 sm:grid-cols-2">
              {[
                "Qual solução temos interesse em testar?",
                "Qual decisão o órgão precisa tomar?",
                "Quais dados e responsáveis estão disponíveis?",
                "Qual escopo de avaliação cabe no primeiro ciclo?",
              ].map((question, index) => (
                <div
                  key={question}
                  className="flex items-start gap-4 rounded-2xl border border-border bg-card p-6 shadow-sm"
                >
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                    {index + 1}
                  </span>

                  <p className="pt-1 font-medium leading-relaxed text-foreground">
                    {question}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="contato" className="bg-muted/40 px-6 py-16 md:py-24">
          <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2">
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-primary">
                Entre em contato
              </p>

              <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                Vamos conversar sobre sua solução?
              </h2>

              <p className="mt-6 leading-relaxed text-muted-foreground">
                Conte um pouco sobre a solução de inteligência artificial que
                você gostaria de testar e qual decisão precisa apoiar. Nossa
                equipe poderá entender melhor sua demanda e orientar os próximos
                passos.
              </p>
            </div>

            <form
              action="https://formsubmit.co/beatriz.costa@nees.ufal.br"
              method="POST"
              className="rounded-2xl border border-border bg-card p-6 shadow-sm md:p-8"
            >
              <input
                type="hidden"
                name="_subject"
                value="Novo contato pelo site do Sandbox NEES"
              />
              <input type="hidden" name="_captcha" value="false" />
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="nome"
                    className="mb-2 block text-sm font-medium text-foreground"
                  >
                    Nome *
                  </label>
                  <input
                    id="nome"
                    name="nome"
                    type="text"
                    required
                    className="w-full rounded-lg border border-border bg-background px-4 py-3 text-foreground outline-none transition focus:border-primary"
                    placeholder="Seu nome"
                  />
                </div>

                <div>
                  <label
                    htmlFor="instituicao"
                    className="mb-2 block text-sm font-medium text-foreground"
                  >
                    Instituição
                  </label>
                  <input
                    id="instituicao"
                    name="instituicao"
                    type="text"
                    className="w-full rounded-lg border border-border bg-background px-4 py-3 text-foreground outline-none transition focus:border-primary"
                    placeholder="Nome da instituição"
                  />
                </div>

                <div>
                  <label
                    htmlFor="cargo"
                    className="mb-2 block text-sm font-medium text-foreground"
                  >
                    Cargo
                  </label>
                  <input
                    id="cargo"
                    name="cargo"
                    type="text"
                    className="w-full rounded-lg border border-border bg-background px-4 py-3 text-foreground outline-none transition focus:border-primary"
                    placeholder="Seu cargo"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-medium text-foreground"
                  >
                    E-mail *
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="w-full rounded-lg border border-border bg-background px-4 py-3 text-foreground outline-none transition focus:border-primary"
                    placeholder="voce@instituicao.gov.br"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="solucao"
                    className="mb-2 block text-sm font-medium text-foreground"
                  >
                    Qual solução gostaria de testar?
                  </label>
                  <input
                    id="solucao"
                    name="solucao"
                    type="text"
                    className="w-full rounded-lg border border-border bg-background px-4 py-3 text-foreground outline-none transition focus:border-primary"
                    placeholder="Descreva brevemente a solução"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="decisao"
                    className="mb-2 block text-sm font-medium text-foreground"
                  >
                    Qual decisão gostaria de apoiar?
                  </label>
                  <input
                    id="decisao"
                    name="decisao"
                    type="text"
                    className="w-full rounded-lg border border-border bg-background px-4 py-3 text-foreground outline-none transition focus:border-primary"
                    placeholder="Que decisão precisa tomar?"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="mensagem"
                    className="mb-2 block text-sm font-medium text-foreground"
                  >
                    Mensagem
                  </label>
                  <textarea
                    id="mensagem"
                    name="mensagem"
                    rows={5}
                    className="w-full resize-y rounded-lg border border-border bg-background px-4 py-3 text-foreground outline-none transition focus:border-primary"
                    placeholder="Conte mais sobre sua necessidade..."
                  />
                </div>
              </div>

              <button
                type="submit"
                className="mt-6 w-full rounded-lg bg-primary px-6 py-3 font-semibold text-primary-foreground transition hover:opacity-90"
              >
                Enviar mensagem
              </button>

              <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
                Usaremos seus dados apenas para responder a este contato,
                conforme a Lei Geral de Proteção de Dados (LGPD).
              </p>
            </form>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
