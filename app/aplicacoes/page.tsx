import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Link from "next/link";

export default function AplicacoesPage() {
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
              Aplicações
            </p>

            <h1 className="max-w-4xl text-4xl font-bold leading-tight md:text-5xl">
              Duas formas de usar o sandbox
            </h1>

            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-white/85">
              O método pode avaliar soluções existentes ou acompanhar soluções
              desenvolvidas pelo NEES. As duas formas podem ser combinadas.
              Comece por uma solução e por uma pergunta de decisão.
            </p>
          </div>
        </section>

        <section className="px-6 py-16 md:py-20">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-6 lg:grid-cols-2">
              <article className="rounded-2xl border border-[#fed7aa] bg-[#fff7ed] p-8 md:p-10">
                <span className="mb-5 inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#ea580c] text-lg font-bold text-white">
                  A
                </span>

                <h2 className="text-2xl font-bold text-[#172b4d] md:text-3xl">
                  Sandbox como produto
                </h2>

                <p className="mt-5 leading-relaxed text-slate-700">
                  Avalia uma solução existente do órgão ou de parceiros e
                  orienta a decisão de uso. A solução pode ter qualquer origem
                  elegível. Não é preciso contratar desenvolvimento do NEES.
                </p>

                <div className="mt-8 rounded-xl bg-white/80 p-5">
                  <p className="text-sm font-semibold uppercase tracking-wider text-[#ea580c]">
                    Fluxo
                  </p>
                  <p className="mt-2 font-semibold text-[#172b4d]">
                    Solução existente → Sandbox → Decisão
                  </p>
                </div>
              </article>

              <article className="rounded-2xl border border-[#fed7aa] bg-[#fff7ed] p-8 md:p-10">
                <span className="mb-5 inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#ea580c] text-lg font-bold text-white">
                  B
                </span>

                <h2 className="text-2xl font-bold text-[#172b4d] md:text-3xl">
                  Sandbox integrado
                </h2>

                <p className="mt-5 leading-relaxed text-slate-700">
                  Quando o NEES desenvolve a solução, o teste acompanha as
                  versões aptas e devolve os achados para correção antes da
                  decisão do órgão. Falhas identificadas voltam ao
                  desenvolvimento para correção e novo teste.
                </p>

                <div className="mt-8 rounded-xl bg-white/80 p-5">
                  <p className="text-sm font-semibold uppercase tracking-wider text-[#ea580c]">
                    Fluxo
                  </p>
                  <p className="mt-2 font-semibold text-[#172b4d]">
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

        <section className="bg-[#f5f8fc] px-6 py-16 md:py-20">
          <div className="mx-auto max-w-7xl">
            <div className="mb-10 max-w-3xl">
              <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-[#ea580c]">
                Áreas de aplicação
              </p>

              <h2 className="text-3xl font-bold text-[#172b4d] md:text-4xl">
                Onde o método se aplica
              </h2>

              <p className="mt-4 leading-relaxed text-slate-600">
                O mesmo método pode apoiar decisões em diferentes áreas de
                políticas públicas, respeitando as particularidades de cada
                contexto.
              </p>
            </div>

            <article className="mb-8 rounded-2xl border border-[#fed7aa] bg-white p-7 md:p-9">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h3 className="text-2xl font-bold text-[#172b4d]">Educação</h3>

                <span className="rounded-full bg-[#fff7ed] px-4 py-2 text-xs font-semibold text-[#ea580c]">
                  Experiência realizada
                </span>
              </div>

              <p className="mt-4 max-w-3xl leading-relaxed text-slate-600">
                Experiência realizada no Sandbox de IA na Educação do MEC.
              </p>

              <Link
                href="/experiencia-mec"
                className="mt-5 inline-flex items-center gap-2 font-semibold text-[#ea580c] transition-colors hover:text-[#c2410c]"
              >
                Conheça a experiência do MEC →
              </Link>
            </article>

            <div className="mb-8">
              <div className="flex flex-wrap items-center gap-3">
                <h3 className="text-2xl font-bold text-[#172b4d]">
                  Saúde: exemplos de aplicação
                </h3>

                <span className="rounded-full bg-[#fff7ed] px-4 py-2 text-xs font-semibold text-[#ea580c]">
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
              <article className="rounded-2xl border border-slate-200 bg-white p-6">
                <h4 className="text-lg font-bold text-[#ea580c]">
                  Vigilância de dengue
                </h4>
                <p className="mt-3 leading-relaxed text-slate-600">
                  Quando um alerta pode orientar a mobilização da vigilância e a
                  preparação dos serviços? O teste mede a antecedência útil, os
                  surtos não detectados e os falsos alertas, em comparação com a
                  rotina.
                </p>
              </article>

              <article className="rounded-2xl border border-slate-200 bg-white p-6">
                <h4 className="text-lg font-bold text-[#ea580c]">
                  Diabetes na atenção primária
                </h4>
                <p className="mt-3 leading-relaxed text-slate-600">
                  Os estratos de risco são válidos e quais ofertas de cuidado
                  podem ser acionadas com segurança? O teste verifica erros e
                  diferenças entre grupos e territórios.
                </p>
              </article>

              <article className="rounded-2xl border border-slate-200 bg-white p-6">
                <h4 className="text-lg font-bold text-[#ea580c]">
                  Saúde mental
                </h4>
                <p className="mt-3 leading-relaxed text-slate-600">
                  Quais sinais justificam revisão pela equipe e como agir sem
                  expor ou estigmatizar usuários? O teste verifica se a ausência
                  de registro representa interrupção real do cuidado.
                </p>
              </article>

              <article className="rounded-2xl border border-slate-200 bg-white p-6">
                <h4 className="text-lg font-bold text-[#ea580c]">
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
            <div className="rounded-2xl border-l-4 border-[#fed7aa] bg-[#fff7ed] p-7 md:p-9">
              <p className="mb-3 text-sm font-bold uppercase tracking-wider text-[#ea580c]">
                Importante
              </p>

              <h2 className="text-xl font-bold text-[#172b4d] md:text-2xl">
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

        <section className="border-t border-slate-200 px-6 py-10">
          <div className="mx-auto flex max-w-7xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <Link
              href="/governanca"
              className="inline-flex items-center justify-center rounded-xl border border-slate-300 px-6 py-3 text-sm font-semibold text-[#172b4d] transition-colors hover:bg-slate-100"
            >
              ← Governança e salvaguardas
            </Link>

            <Link
              href="/referencias"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 font-semibold text-white transition hover:bg-primary/90"
            >
              Próxima página: Referências →
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
