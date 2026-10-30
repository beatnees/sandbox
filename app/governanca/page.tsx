import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Link from "next/link";

export default function GovernancaPage() {
  return (
    <>
      <Header />

      <main className="pb-20">
        <section className="bg-gradient-hero px-6 py-16 text-white md:py-24">
          <div className="mx-auto max-w-7xl">
            <Link
              href="/"
              className="mb-8 inline-flex text-sm text-white/80 transition-colors hover:text-white"
            >
              ← Voltar ao mapa do sandbox
            </Link>

            <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-white/70">
              Governança e salvaguardas
            </p>

            <h1 className="max-w-4xl text-4xl font-bold leading-tight md:text-5xl">
              Papéis definidos para supervisionar cada experimento
            </h1>

            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-white/85">
              Cada experimento define quem supervisiona, quem corrige falhas e
              quem decide sobre o uso. A governança aproveita instâncias e
              fluxos que o órgão já tem, sem criar uma estrutura de decisão
              paralela.
            </p>
          </div>
        </section>

        <section className="px-6 py-16 md:py-20">
          <div className="mx-auto max-w-7xl">
            <div className="mb-10 max-w-3xl">
              <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-[#ea580c]">
                Responsabilidades
              </p>

              <h2 className="text-3xl font-bold text-[#172b4d] md:text-4xl">
                Quem faz o quê
              </h2>

              <p className="mt-4 leading-relaxed text-slate-600">
                Cada participante tem responsabilidades definidas para garantir
                acompanhamento, correção de falhas e decisões dentro de suas
                competências.
              </p>
            </div>
            <div className="mt-10 rounded-3xl border border-[#fed7aa] bg-[#fff7ed] p-5 md:p-10">
              <div className="mx-auto grid max-w-5xl grid-cols-1 items-center gap-4 md:grid-cols-3 md:gap-6">
                {/* Órgão demandante */}
                <div className="md:col-start-2">
                  <article className="rounded-2xl border-2 border-border bg-card p-5 text-center">
                    <h3 className="font-bold text-[#172b4d]">
                      Órgão demandante
                    </h3>
                    <span className="mt-3 inline-flex rounded-full border border-orange-300 bg-orange-50 px-4 py-1 text-sm font-bold text-[#ea580c]">
                      define
                    </span>
                  </article>
                </div>

                {/* Equipes e especialistas */}
                <div className="md:col-start-1 md:row-start-2">
                  <article className="rounded-2xl border-2 border-border bg-card p-5 text-center">
                    <h3 className="font-bold text-[#172b4d]">
                      Equipes e especialistas
                    </h3>
                    <span className="mt-3 inline-flex rounded-full border border-orange-300 bg-orange-50 px-4 py-1 text-sm font-bold text-[#ea580c]">
                      avalia
                    </span>
                  </article>
                </div>

                {/* Teste central */}
                <div className="flex min-h-40 items-center justify-center rounded-full border-2 border-primary bg-primary p-8 text-center text-white shadow-lg md:col-start-2 md:row-start-2">
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-widest text-white/70">
                      Centro do processo
                    </span>
                    <h3 className="mt-2 text-2xl font-bold">TESTE</h3>
                  </div>
                </div>

                {/* NEES */}
                <div className="md:col-start-3 md:row-start-2">
                  <article className="rounded-2xl border-2 border-border bg-card p-5 text-center">
                    <h3 className="font-bold text-[#172b4d]">NEES</h3>
                    <span className="mt-3 inline-flex rounded-full border border-orange-300 bg-orange-50 px-4 py-1 text-sm font-bold text-[#ea580c]">
                      opera
                    </span>
                  </article>
                </div>

                {/* Responsável pela solução */}
                <div className="md:col-start-2 md:row-start-3">
                  <article className="rounded-2xl border-2 border-border bg-card p-5 text-center">
                    <h3 className="font-bold text-[#172b4d]">
                      Responsável pela solução
                    </h3>
                    <span className="mt-3 inline-flex rounded-full border border-orange-300 bg-orange-50 px-4 py-1 text-sm font-bold text-[#ea580c]">
                      corrige
                    </span>
                  </article>
                </div>
              </div>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <article className="rounded-2xl border border-slate-200 bg-white p-6">
                <h3 className="text-xl font-bold text-[#ea580c]">
                  Órgão demandante
                </h3>
                <p className="mt-3 leading-relaxed text-slate-600">
                  Define prioridades, indica áreas e participantes e delibera
                  sobre o uso, no âmbito de suas competências.
                </p>
              </article>

              <article className="rounded-2xl border border-slate-200 bg-white p-6">
                <h3 className="text-xl font-bold text-[#ea580c]">NEES</h3>
                <p className="mt-3 leading-relaxed text-slate-600">
                  Estrutura o protocolo, opera os testes, documenta resultados e
                  recomenda condições de uso.
                </p>
              </article>

              <article className="rounded-2xl border border-slate-200 bg-white p-6">
                <h3 className="text-xl font-bold text-[#ea580c]">
                  Equipes e especialistas
                </h3>
                <p className="mt-3 leading-relaxed text-slate-600">
                  Avaliam utilidade, segurança e implicações do domínio da
                  política.
                </p>
              </article>

              <article className="rounded-2xl border border-slate-200 bg-white p-6">
                <h3 className="text-xl font-bold text-[#ea580c]">
                  Responsável pela solução
                </h3>
                <p className="mt-3 leading-relaxed text-slate-600">
                  Disponibiliza versão e documentação, responde a falhas e
                  implementa as correções acordadas.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section className="bg-[#fff7ed] px-6 py-16 md:py-20">
          <div className="mx-auto max-w-7xl">
            <div className="mb-10 max-w-3xl">
              <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-[#ea580c]">
                Proteção e responsabilidade
              </p>

              <h2 className="text-3xl font-bold text-[#172b4d] md:text-4xl">
                Salvaguardas em cada experimento
              </h2>

              <p className="mt-4 leading-relaxed text-slate-600">
                Cada experimento deve observar cuidados específicos para
                proteger as pessoas envolvidas, os dados utilizados e a
                integridade do processo.
              </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              <article className="rounded-2xl border border-slate-200 bg-white p-6">
                <h3 className="text-lg font-bold text-[#ea580c]">
                  Dados pessoais
                </h3>
                <p className="mt-3 leading-relaxed text-slate-600">
                  Base legal e acesso controlado.
                </p>
              </article>

              <article className="rounded-2xl border border-slate-200 bg-white p-6">
                <h3 className="text-lg font-bold text-[#ea580c]">
                  Supervisão humana
                </h3>
                <p className="mt-3 leading-relaxed text-slate-600">
                  Revisão e resposta a incidentes.
                </p>
              </article>

              <article className="rounded-2xl border border-slate-200 bg-white p-6">
                <h3 className="text-lg font-bold text-[#ea580c]">
                  Autorizações setoriais
                </h3>
                <p className="mt-3 leading-relaxed text-slate-600">
                  Enquadramento pela autoridade competente quando aplicável (por
                  exemplo, a Anvisa, em saúde).
                </p>
              </article>

              <article className="rounded-2xl border border-slate-200 bg-white p-6">
                <h3 className="text-lg font-bold text-[#ea580c]">
                  Pesquisa com pessoas
                </h3>
                <p className="mt-3 leading-relaxed text-slate-600">
                  Análise ética aplicável.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section className="px-6 py-16 md:py-20">
          <div className="mx-auto max-w-7xl">
            <div className="rounded-2xl border border-[#fed7aa] bg-[#fff7ed] p-8 md:p-10">
              <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-[#ea580c]">
                Independência na avaliação
              </p>

              <h2 className="max-w-3xl text-2xl font-bold text-[#172b4d] md:text-3xl">
                Quando o NEES desenvolve e avalia
              </h2>

              <p className="mt-5 max-w-4xl text-base leading-relaxed text-slate-700">
                Se a solução testada foi desenvolvida pelo próprio NEES, a
                avaliação é feita por equipe separada, com revisão independente
                e regras de conflito de interesses.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-[#fff7ed] px-6 py-16 md:py-20">
          <div className="mx-auto max-w-7xl">
            <div className="mb-10 max-w-3xl">
              <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-[#ea580c]">
                Critérios de execução
              </p>

              <h2 className="text-3xl font-bold text-[#172b4d] md:text-4xl">
                Regras de cada experimento
              </h2>

              <p className="mt-4 leading-relaxed text-slate-600">
                Cada tipo de atividade possui condições próprias. A participação
                no sandbox não substitui autorizações nem afasta as regras
                aplicáveis.
              </p>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white">
              <table className="w-full min-w-212.5 border-collapse text-left">
                <thead>
                  <tr className="bg-[#ea580c] text-white">
                    <th className="px-5 py-4 text-sm font-semibold">
                      Enquadramento
                    </th>
                    <th className="px-5 py-4 text-sm font-semibold">
                      Aplicação
                    </th>
                    <th className="px-5 py-4 text-sm font-semibold">
                      Condição de execução
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-200 text-sm leading-relaxed text-slate-600">
                  <tr className="bg-white">
                    <td className="px-5 py-5 font-semibold text-[#172b4d]">
                      Testagem algorítmica e operacional
                    </td>
                    <td className="px-5 py-5">
                      Avaliar desempenho, segurança, utilidade e integração da
                      solução nas condições definidas.
                    </td>
                    <td className="px-5 py-5">
                      Protocolo, supervisão e cumprimento das regras aplicáveis.
                      Ingressar no sandbox não autoriza uso em produção.
                    </td>
                  </tr>

                  <tr className="bg-[#fff7ed]">
                    <td className="px-5 py-5 font-semibold text-[#172b4d]">
                      Sandbox regulatório
                    </td>
                    <td className="px-5 py-5">
                      Examinar uma barreira normativa específica que impeça um
                      experimento relevante.
                    </td>
                    <td className="px-5 py-5">
                      Autoridade com competência setorial, ato próprio e limites
                      de alcance e duração (LC 182/2021).
                    </td>
                  </tr>

                  <tr className="bg-white">
                    <td className="px-5 py-5 font-semibold text-[#172b4d]">
                      Dados pessoais
                    </td>
                    <td className="px-5 py-5">
                      Tratar só os dados necessários, em ambiente com controle e
                      rastreabilidade.
                    </td>
                    <td className="px-5 py-5">
                      Base legal, responsabilidades e salvaguardas da LGPD.
                      Acesso autorizado e avaliação de risco antes dos testes.
                    </td>
                  </tr>

                  <tr className="bg-[#fff7ed]">
                    <td className="px-5 py-5 font-semibold text-[#172b4d]">
                      Autorizações setoriais e pesquisa
                    </td>
                    <td className="px-5 py-5">
                      Verificar se a finalidade exige autorização do regulador
                      do setor ou análise de ética em pesquisa.
                    </td>
                    <td className="px-5 py-5">
                      Órgãos e instâncias competentes, quando aplicável. O
                      sandbox não substitui essas autorizações.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="mt-4 text-sm text-slate-500">
              Em telas menores, deslize horizontalmente para consultar todas as
              colunas da tabela.
            </p>
          </div>
        </section>

        <section className="border-t border-slate-200 px-6 py-10">
          <div className="mx-auto flex max-w-7xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <Link
              href="/entregas"
              className="inline-flex items-center justify-center rounded-xl border border-slate-300 px-6 py-3 text-sm font-semibold text-[#172b4d] transition-colors hover:bg-slate-100"
            >
              ← Entregas
            </Link>

            <Link
              href="/aplicacoes"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 font-semibold text-white transition hover:bg-primary/90"
            >
              Próxima página: Aplicações →
            </Link>
          </div>
        </section>
      </main>
      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-orange-300 bg-[#ea580c] px-4 py-4 text-center text-sm font-bold text-white shadow-lg md:text-base">
        O contrato não flexibiliza normas
      </div>
      <Footer />
    </>
  );
}
