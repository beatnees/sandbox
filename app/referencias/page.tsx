import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Link from "next/link";

export default function ReferenciasPage() {
  return (
    <>
      <Header />

      <main className="min-h-screen bg-background">
        {/* Abertura da página */}
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
                referências
              </p>

              <h1 className="mt-5 text-4xl font-bold leading-tight tracking-tight sm:text-5xl md:text-6xl">
                Experiências que inspiram o método
              </h1>

              <p className="mt-7 max-w-3xl text-base leading-relaxed text-white/80 sm:text-lg md:text-xl">
                Conheça experiências nacionais e internacionais que ajudam a
                compreender como ambientes de experimentação podem produzir
                evidências e orientar decisões.
              </p>
            </div>
          </div>
        </section>

        {/* Experiências internacionais */}
        <section className="bg-white px-6 py-16">
          <div className="mx-auto max-w-6xl">
            <div className="mb-10 max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-widest text-primary">
                Experiências internacionais
              </p>

              <h2 className="mt-4 text-2xl font-bold tracking-tight text-foreground md:text-3xl">
                O que outros países aprenderam com a experimentação
              </h2>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {/* Singapura */}
              <article className="rounded-2xl border border-border bg-card p-7">
                <span className="mb-4 inline-flex rounded-full bg-primary px-4 py-1 text-sm font-semibold text-white">
                  Singapura
                </span>

                <h3 className="mb-4 text-2xl font-bold text-foreground">
                  Telemedicina com regras para proteger o paciente
                </h3>

                <p className="leading-relaxed text-slate-700">
                  No programa LEAP, 11 prestadores realizaram mais de 40 mil
                  teleconsultas entre 2018 e 2021. Novos modelos de atendimento
                  remoto exigiam critérios comuns para identificar pacientes e
                  responder a urgências.
                </p>

                <p className="mt-4 leading-relaxed text-slate-700">
                  O sandbox produziu protocolos de identificação, localização em
                  emergências e encaminhamento, além de formação profissional.
                </p>
              </article>

              {/* Reino Unido */}
              <article className="rounded-2xl border border-border bg-card p-7">
                <span className="mb-4 inline-flex rounded-full bg-primary px-4 py-1 text-sm font-semibold text-white">
                  Reino Unido
                </span>

                <h3 className="mb-4 text-2xl font-bold text-foreground">
                  Testar a IA revelou limites que exigiam mais controle
                </h3>

                <p className="leading-relaxed text-slate-700">
                  No AI Airlock da MHRA, o caso TORTUS avaliou uma IA que
                  transforma consultas em registros clínicos. Com controles
                  ativos, as notas fora da finalidade prevista caíram 19 pontos
                  percentuais.
                </p>

                <p className="mt-4 leading-relaxed text-slate-700">
                  Ainda assim, uma em cada cinco notas apresentou desvio. O
                  achado orienta revisão clínica e limites de uso.
                </p>

                <p className="mt-5 rounded-lg border-l-4 border-[#ea580c] bg-white p-4 text-sm text-slate-600">
                  Os percentuais referem-se a notas, não a danos.
                </p>
              </article>
            </div>
          </div>
        </section>

        {/* Experiências brasileiras */}
        <section className="bg-muted/40 px-6 py-16 md:py-20">
          <div className="mx-auto max-w-7xl">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-widest text-primary">
                Experiências brasileiras
              </p>

              <h2 className="mt-4 text-2xl font-bold tracking-tight text-foreground md:text-3xl">
                Sandboxes que já estruturam a proteção de direitos
              </h2>
            </div>

            <div className="mt-10 grid gap-5 sm:grid-cols-2">
              <article className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                <h3 className="text-xl font-bold text-card-foreground">
                  ANS — Saúde suplementar
                </h3>
                <p className="mt-4 leading-relaxed text-muted-foreground">
                  Testes de planos de consultas e exames sob regras temporárias,
                  com acompanhamento dos riscos aos beneficiários.
                </p>
              </article>

              <article className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                <h3 className="text-xl font-bold text-card-foreground">
                  ANPD — IA e dados pessoais
                </h3>
                <p className="mt-4 leading-relaxed text-muted-foreground">
                  Piloto de sandbox em IA, com metodologia de testagem elaborada
                  pelo CIAAM/USP. O primeiro ciclo revelou ajustes necessários
                  no protocolo de dados sintéticos antes dos testes completos.
                </p>
              </article>

              <article className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                <h3 className="text-xl font-bold text-card-foreground">
                  Anvisa — Controle sanitário
                </h3>
                <p className="mt-4 leading-relaxed text-muted-foreground">
                  Piloto de cosméticos personalizados sob supervisão, para
                  produzir evidências de segurança e orientar futuras regras.
                </p>
              </article>

              <article className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                <h3 className="text-xl font-bold text-card-foreground">
                  MEC/SEGAPE — IA na educação
                </h3>
                <p className="mt-4 leading-relaxed text-muted-foreground">
                  Testes de IA educacional com apoio do NEES.
                </p>

                <Link
                  href="/experiencia-mec"
                  className="mt-5 inline-flex font-semibold text-primary transition hover:underline"
                >
                  Conheça a experiência com o MEC →
                </Link>
              </article>
            </div>

            <div className="mt-8 rounded-2xl border border-border bg-card p-6">
              <p className="leading-relaxed text-muted-foreground">
                <strong className="text-card-foreground">Importante:</strong>{" "}
                Cada iniciativa tem objeto e estágio específicos. Esta página
                descreve o que cada uma permite aprender ou decidir, não compara
                resultados.
              </p>
            </div>
          </div>
        </section>

        {/* Referências e documentos */}
        <section className="bg-background px-6 py-16 md:py-20">
          <div className="mx-auto max-w-7xl">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-widest text-primary">
                Fontes e documentos
              </p>

              <h2 className="mt-4 text-2xl font-bold tracking-tight text-foreground md:text-3xl">
                Para ler e aprofundar
              </h2>

              <p className="mt-5 leading-relaxed text-muted-foreground">
                Documentos legais, guias e relatórios que fundamentam as
                experiências apresentadas nesta página.
              </p>
            </div>

            <div className="mt-10 grid gap-8 md:grid-cols-2">
              <div className="rounded-2xl border border-border bg-card p-6">
                <h3 className="text-xl font-bold text-card-foreground">
                  Para aprofundar
                </h3>

                <ul className="mt-5 space-y-4">
                  <li>
                    <a
                      href="https://www.planalto.gov.br/ccivil_03/leis/lcp/lcp182.htm"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-primary hover:underline"
                    >
                      Lei Complementar 182/2021
                    </a>
                  </li>

                  <li>
                    <a
                      href="https://www.gov.br/agu/pt-br/assuntos-1/labori/GUIAREFERENCIALDESANDBOXREGULATRIO18112024.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-primary hover:underline"
                    >
                      AGU — Guia Referencial de Sandbox Regulatório (2024)
                    </a>
                  </li>
                </ul>
              </div>

              <div className="rounded-2xl border border-border bg-card p-6">
                <h3 className="text-xl font-bold text-card-foreground">
                  Para contexto
                </h3>

                <ul className="mt-5 space-y-4">
                  {[
                    {
                      titulo: "LGPD — Lei 13.709/2018",
                      url: "https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709.htm",
                    },
                    {
                      titulo: "Lei 14.874/2024",
                      url: "https://www.planalto.gov.br/ccivil_03/_ato2023-2026/2024/lei/l14874.htm",
                    },
                    {
                      titulo: "Decreto 12.651/2025",
                      url: "https://www.planalto.gov.br/ccivil_03/_ato2023-2026/2025/decreto/d12651.htm",
                    },
                    {
                      titulo: "MHRA — AI Airlock Phase 2 Programme Report",
                      url: "https://assets.publishing.service.gov.uk/media/6a676af523e57bd0a0ea6852/AI_Airlock_Phase_2_Programme_Report_v2.pdf",
                    },
                    {
                      titulo: "Ministério da Saúde de Singapura — LEAP",
                      url: "https://www.moh.gov.sg/newsroom/voluntary-listing-of-direct-telemedicine-service-providers-to-help-patients-make-informed-choices/",
                    },
                    {
                      titulo: "ANS — Sandbox regulatório",
                      url: "https://www.gov.br/ans/pt-br/acesso-a-informacao/sandbox-regulatorio-ambiente-regulatorio-experimental",
                    },
                    {
                      titulo: "ANPD — Primeiros resultados do sandbox de IA",
                      url: "https://www.gov.br/anpd/pt-br/assuntos/noticias/publicados-primeiros-resultados-do-sandbox-regulatorio-em-inteligencia-artificial",
                    },
                    {
                      titulo: "Anvisa — Projeto-piloto de sandbox",
                      url: "https://www.gov.br/anvisa/pt-br/assuntos/regulamentacao/sandbox/projeto-piloto",
                    },
                  ].map((referencia) => (
                    <li key={referencia.titulo}>
                      <a
                        href={referencia.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium text-primary hover:underline"
                      >
                        {referencia.titulo}
                      </a>
                    </li>
                  ))}
                </ul>
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

            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="/aplicacoes"
                className="inline-flex items-center justify-center rounded-xl border border-border px-6 py-3 font-semibold text-foreground transition hover:bg-muted"
              >
                ← Aplicações
              </Link>

              <Link
                href="/sobre"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 font-semibold text-primary-foreground transition hover:brightness-95"
              >
                Sobre o NEES e contato
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
