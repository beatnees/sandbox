import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Link from "next/link";

export default function CicloPage() {
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
                Ciclo de testagem
              </p>

              <h1 className="mt-5 text-4xl font-bold leading-tight tracking-tight sm:text-5xl md:text-6xl">
                Um processo comum, em quatro fases
              </h1>

              <p className="mt-7 max-w-3xl text-base leading-relaxed text-white/80 sm:text-lg md:text-xl">
                Todo sandbox do NEES segue o mesmo processo, seja para uma
                solução do órgão, de um parceiro ou desenvolvida pelo próprio
                NEES. Cada fase termina em um portão de decisão: só se avança
                quando os critérios pactuados foram cumpridos.
              </p>
            </div>
          </div>
        </section>

        <section className="px-6 py-16 md:py-20">
          <div className="mx-auto max-w-7xl">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-widest text-primary">
                Da preparação à decisão
              </p>

              <h2 className="mt-4 text-2xl font-bold tracking-tight text-foreground md:text-3xl">
                Cinco passos para conduzir a testagem
              </h2>

              <p className="mt-5 text-base leading-relaxed text-muted-foreground md:text-lg">
                O processo organiza as atividades necessárias para transformar
                uma solução promissora em uma decisão fundamentada.
              </p>
            </div>

            <ol className="relative mt-10 grid gap-8 before:absolute before:bottom-5 before:left-5 before:top-5 before:w-px before:bg-border before:content-[''] md:grid-cols-5 md:gap-4 md:before:bottom-auto md:before:left-[10%] md:before:right-[10%] md:before:top-5 md:before:h-px md:before:w-auto">
              {[
                {
                  titulo: "Escolher o problema",
                  descricao:
                    "Selecionar a solução e o resultado que se quer verificar.",
                },
                {
                  titulo: "Confirmar prontidão",
                  descricao:
                    "Checar versão, dados, equipe, autorizações e riscos.",
                },
                {
                  titulo: "Pactuar o protocolo",
                  descricao:
                    "Definir comparador, medidas, limites e supervisão.",
                },
                {
                  titulo: "Testar e corrigir",
                  descricao:
                    "Observar resultados e falhas, ajustar e repetir quando necessário.",
                },
                {
                  titulo: "Decidir com evidências",
                  descricao:
                    "Documentar condições para usar, ampliar, corrigir ou parar.",
                },
              ].map((passo, index) => (
                <li
                  key={passo.titulo}
                  className="relative flex gap-4 md:flex-col md:gap-5"
                >
                  <span className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-primary bg-background text-sm font-bold text-primary md:mx-auto">
                    {index + 1}
                  </span>

                  <div className="md:text-center">
                    <h3 className="text-lg font-bold text-foreground">
                      {passo.titulo}
                    </h3>

                    <p className="mt-2 leading-relaxed text-muted-foreground">
                      {passo.descricao}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Diagrama do ciclo */}
        <section className="bg-background px-6 py-16 md:py-20">
          <div className="mx-auto max-w-6xl">
            <div className="mb-10 max-w-2xl">
              <span className="text-sm font-semibold uppercase tracking-wider text-primary">
                Visão geral
              </span>

              <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                Da preparação à decisão
              </h2>

              <p className="mt-4 leading-relaxed text-muted-foreground">
                O ciclo organiza a testagem em quatro fases conectadas por
                portões de decisão. Cada etapa precisa cumprir seus critérios
                antes de avançar.
              </p>
            </div>

            {/* Fases do ciclo */}
            <div className="relative mt-12 pt-24">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-[1fr_24px_1fr_24px_2fr_24px_1fr_24px] md:items-center">
                <div className="rounded-xl border-2 border-primary/70 bg-primary/5 p-5 text-center">
                  <span className="text-xs font-bold uppercase tracking-wider text-primary">
                    Fase 1
                  </span>
                  <h3 className="mt-2 font-bold text-foreground">Desenho</h3>
                  <p className="mt-1 text-sm text-muted-foreground">Mês 1</p>
                  <p className="mt-3 text-sm text-muted-foreground">
                    Problema, solução, dados e equipe
                  </p>
                  <p className="mt-4 border-t border-orange-200 pt-3 text-xs font-semibold text-orange-600">
                    Entrada confirmada
                  </p>
                </div>

                <div className="hidden text-center text-xl font-bold text-orange-500 md:block">
                  ◆
                </div>

                <div className="rounded-xl border-2 border-primary/70 bg-primary/5 p-5 text-center">
                  <span className="text-xs font-bold uppercase tracking-wider text-primary">
                    Fase 2
                  </span>
                  <h3 className="mt-2 font-bold text-foreground">Preparação</h3>
                  <p className="mt-1 text-sm text-muted-foreground">Mês 2</p>
                  <p className="mt-3 text-sm text-muted-foreground">
                    Ambiente e protocolo
                  </p>
                  <p className="mt-4 border-t border-orange-200 pt-3 text-xs font-semibold text-orange-600">
                    Protocolo aprovado
                  </p>
                </div>

                <div className="hidden text-center text-xl font-bold text-orange-500 md:block">
                  ◆
                </div>

                <div className="rounded-xl border-2 border-primary/70 bg-primary/5 p-5 text-center">
                  <span className="text-xs font-bold uppercase tracking-wider text-primary">
                    Fase 3
                  </span>
                  <h3 className="mt-2 font-bold text-foreground">
                    Experimentação
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Meses 3 a 5
                  </p>
                  <p className="mt-3 text-sm text-muted-foreground">
                    Testes, falhas, correções e repetição
                  </p>
                  <p className="mt-4 border-t border-orange-200 pt-3 text-xs font-semibold text-orange-600">
                    Avançar ou corrigir
                  </p>
                </div>

                <div className="hidden text-center text-xl font-bold text-orange-500 md:block">
                  ◆
                </div>

                <div className="rounded-xl border-2 border-primary/70 bg-primary/5 p-5 text-center">
                  <span className="text-xs font-bold uppercase tracking-wider text-primary">
                    Fase 4
                  </span>
                  <h3 className="mt-2 font-bold text-foreground">Evidência</h3>
                  <p className="mt-1 text-sm text-muted-foreground">Mês 6</p>
                  <p className="mt-3 text-sm text-muted-foreground">
                    Dossiê, recomendação e transferência
                  </p>
                  <p className="mt-4 border-t border-orange-200 pt-3 text-xs font-semibold text-orange-600">
                    Decisão registrada pelo órgão
                  </p>
                </div>
                <div className="hidden text-center text-xl font-bold text-orange-500 md:block">
                  ◆
                </div>
              </div>

              {/* Laço de correção */}
              <div className="pointer-events-none absolute inset-x-0 top-0 hidden md:grid md:grid-cols-[1fr_24px_1fr_24px_2fr_24px_1fr_24px] md:gap-4">
                <div className="col-start-5">
                  <div className="mb-1 text-center text-xs font-semibold text-orange-600">
                    Corrigir e repetir
                  </div>

                  <svg
                    viewBox="0 0 300 65"
                    className="h-16 w-full"
                    fill="none"
                    aria-label="Laço de correção e repetição durante a experimentação"
                    role="img"
                  >
                    <defs>
                      <marker
                        id="seta-correcao"
                        markerWidth="8"
                        markerHeight="8"
                        refX="6"
                        refY="3"
                        orient="auto"
                      >
                        <path d="M0 0 L6 3 L0 6" fill="#ea580c" />
                      </marker>
                    </defs>

                    <path
                      d="M 25 55 C 25 5, 275 5, 275 55"
                      stroke="#ea580c"
                      strokeWidth="2"
                      strokeLinecap="round"
                      markerEnd="url(#seta-correcao)"
                    />
                  </svg>
                </div>
              </div>

              {/* Progressão técnica */}
              <div className="mt-24 border-t border-border pt-12">
                <h3 className="mb-6 text-lg font-bold text-foreground">
                  Progressão técnica da testagem
                </h3>

                <div className="grid grid-cols-1 items-end gap-3 sm:grid-cols-2 md:grid-cols-4">
                  <div className="rounded-t-xl border-t-4 border-primary bg-primary/5 p-5 md:mb-0">
                    <span className="text-xs font-bold uppercase tracking-wider text-primary">
                      Nível 1
                    </span>
                    <p className="mt-2 font-semibold text-foreground">
                      Dados históricos
                    </p>
                  </div>

                  <div className="rounded-t-xl border-t-4 border-primary bg-primary/5 p-5 md:mb-4">
                    <span className="text-xs font-bold uppercase tracking-wider text-primary">
                      Nível 2
                    </span>
                    <p className="mt-2 font-semibold text-foreground">
                      Simulação
                    </p>
                  </div>

                  <div className="rounded-t-xl border-t-4 border-primary bg-primary/5 p-5 md:mb-8">
                    <span className="text-xs font-bold uppercase tracking-wider text-primary">
                      Nível 3
                    </span>
                    <p className="mt-2 font-semibold text-foreground">
                      Observação em paralelo
                    </p>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Sem orientar condutas
                    </p>
                  </div>

                  <div className="rounded-t-xl border-t-4 border-dashed border-orange-500 bg-orange-500/5 p-5 md:mb-12">
                    <span className="text-xs font-bold uppercase tracking-wider text-orange-600">
                      Nível 4
                    </span>
                    <p className="mt-2 font-semibold text-foreground">
                      Piloto real
                    </p>
                    <p className="mt-2 text-sm font-semibold text-orange-600">
                      Só se autorizado
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-muted/40 px-6 py-16 md:py-20">
          <div className="mx-auto max-w-7xl">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-widest text-primary">
                Etapas do ciclo
              </p>

              <h2 className="mt-4 text-2xl font-bold tracking-tight text-foreground md:text-3xl">
                As quatro fases
              </h2>

              <p className="mt-5 text-base leading-relaxed text-muted-foreground md:text-lg">
                Cada fase possui objetivos, atividades e entregas próprias. A
                passagem para a próxima depende do cumprimento dos critérios
                definidos.
              </p>
            </div>

            <div className="mt-10 space-y-4">
              <details
                open
                className="group rounded-2xl border border-border bg-card shadow-sm"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-6 md:p-8">
                  <div>
                    <span className="text-sm font-semibold uppercase tracking-widest text-primary">
                      Fase 1 · Mês 1
                    </span>
                    <h3 className="mt-2 text-xl font-bold text-card-foreground">
                      Desenho
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Transformar o interesse em uma pergunta testável.
                    </p>
                  </div>

                  <span className="text-2xl text-primary transition-transform group-open:rotate-180">
                    ⌄
                  </span>
                </summary>

                <div className="border-t border-border px-6 py-6 md:px-8">
                  <div className="grid gap-8 md:grid-cols-2">
                    <div>
                      <h4 className="font-bold text-foreground">
                        O que acontece
                      </h4>
                      <p className="mt-3 leading-relaxed text-muted-foreground">
                        Seleção da solução, definição do problema e do resultado
                        esperado, confirmação de dados, equipe e viabilidade
                        (diagnóstico de prontidão).
                      </p>
                    </div>

                    <div>
                      <h4 className="font-bold text-foreground">
                        Perguntas-guia
                      </h4>
                      <ul className="mt-3 list-disc space-y-2 pl-5 leading-relaxed text-muted-foreground">
                        <li>Que decisão o resultado vai apoiar?</li>
                        <li>
                          Existe versão testável e um responsável por ela?
                        </li>
                        <li>Os dados estão acessíveis e autorizados?</li>
                        <li>Há especialistas do domínio envolvidos?</li>
                      </ul>
                    </div>
                  </div>

                  <div className="mt-8 grid gap-4 md:grid-cols-2">
                    <div className="rounded-xl bg-muted/60 p-5">
                      <h4 className="font-bold text-foreground">Entregas</h4>
                      <p className="mt-2 leading-relaxed text-muted-foreground">
                        Plano do ciclo; critérios de elegibilidade e matriz de
                        riscos.
                      </p>
                    </div>

                    <div className="rounded-xl border-l-4 border-orange-500 bg-orange-500/5 p-5">
                      <h4 className="font-bold text-foreground">
                        Portão de decisão
                      </h4>
                      <p className="mt-2 leading-relaxed text-muted-foreground">
                        Entrada confirmada. Dados e solução aptos. Se o
                        diagnóstico não confirmar a prontidão, o órgão recebe um
                        plano de adequação e decide entre reformular, suspender
                        ou contratar depois.
                      </p>
                    </div>
                  </div>
                </div>
              </details>
              <details className="group rounded-2xl border border-border bg-card shadow-sm">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-6 md:p-8">
                  <div>
                    <span className="text-sm font-semibold uppercase tracking-widest text-primary">
                      Fase 2 · Mês 2
                    </span>
                    <h3 className="mt-2 text-xl font-bold text-card-foreground">
                      Preparação
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Fixar as regras do teste antes de começar.
                    </p>
                  </div>

                  <span className="text-2xl text-primary transition-transform group-open:rotate-180">
                    ⌄
                  </span>
                </summary>

                <div className="border-t border-border px-6 py-6 md:px-8">
                  <div className="grid gap-8 md:grid-cols-2">
                    <div>
                      <h4 className="font-bold text-foreground">
                        O que acontece
                      </h4>
                      <p className="mt-3 leading-relaxed text-muted-foreground">
                        Configuração do ambiente e pactuação do protocolo:
                        rotina atual como comparador, medidas de resultado,
                        subgrupos, limites de erro e regras de interrupção.
                        Também é elaborado o plano de proteção de dados.
                      </p>
                    </div>

                    <div>
                      <h4 className="font-bold text-foreground">
                        Perguntas-guia
                      </h4>
                      <ul className="mt-3 list-disc space-y-2 pl-5 leading-relaxed text-muted-foreground">
                        <li>Contra o que vamos comparar?</li>
                        <li>Quais medidas definem sucesso?</li>
                        <li>Quando o teste deve parar?</li>
                        <li>Quem acessa quais dados?</li>
                      </ul>
                    </div>
                  </div>

                  <div className="mt-8 grid gap-4 md:grid-cols-2">
                    <div className="rounded-xl bg-muted/60 p-5">
                      <h4 className="font-bold text-foreground">Entregas</h4>
                      <p className="mt-2 leading-relaxed text-muted-foreground">
                        Protocolo de teste; ambiente configurado e plano de
                        proteção de dados.
                      </p>
                    </div>

                    <div className="rounded-xl border-l-4 border-orange-500 bg-orange-500/5 p-5">
                      <h4 className="font-bold text-foreground">
                        Portão de decisão
                      </h4>
                      <p className="mt-2 leading-relaxed text-muted-foreground">
                        Teste autorizado. O protocolo precisa estar aprovado
                        antes do início da experimentação.
                      </p>
                    </div>
                  </div>
                </div>
              </details>
              <details className="group rounded-2xl border border-border bg-card shadow-sm">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-6 md:p-8">
                  <div>
                    <span className="text-sm font-semibold uppercase tracking-widest text-primary">
                      Fase 3 · Meses 3 a 5
                    </span>
                    <h3 className="mt-2 text-xl font-bold text-card-foreground">
                      Experimentação
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Observar a solução em condições definidas e corrigir o que
                      falhar.
                    </p>
                  </div>

                  <span className="text-2xl text-primary transition-transform group-open:rotate-180">
                    ⌄
                  </span>
                </summary>

                <div className="border-t border-border px-6 py-6 md:px-8">
                  <div className="grid gap-8 md:grid-cols-2">
                    <div>
                      <h4 className="font-bold text-foreground">
                        O que acontece
                      </h4>
                      <p className="mt-3 leading-relaxed text-muted-foreground">
                        Execução dos testes, registro de falhas, incidentes e
                        correções. Os achados voltam ao responsável pela solução
                        e, quando necessário, o teste é repetido.
                      </p>
                    </div>

                    <div>
                      <h4 className="font-bold text-foreground">
                        Perguntas-guia
                      </h4>
                      <ul className="mt-3 list-disc space-y-2 pl-5 leading-relaxed text-muted-foreground">
                        <li>
                          A solução se mantém dentro dos limites de risco?
                        </li>
                        <li>As falhas foram corrigidas e retestadas?</li>
                        <li>Há diferenças entre grupos ou territórios?</li>
                        <li>
                          A equipe consegue interpretar e usar os resultados?
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="mt-8 grid gap-4 md:grid-cols-2">
                    <div className="rounded-xl bg-muted/60 p-5">
                      <h4 className="font-bold text-foreground">Entregas</h4>
                      <p className="mt-2 leading-relaxed text-muted-foreground">
                        Registro de testes, falhas, incidentes e correções
                        realizadas.
                      </p>
                    </div>

                    <div className="rounded-xl border-l-4 border-orange-500 bg-orange-500/5 p-5">
                      <h4 className="font-bold text-foreground">
                        Portão de decisão
                      </h4>
                      <p className="mt-2 leading-relaxed text-muted-foreground">
                        Avançar ou corrigir. Os limites de risco precisam
                        permanecer monitorados. Quando necessário, a solução é
                        corrigida e testada novamente antes de avançar.
                      </p>
                    </div>
                  </div>
                </div>
              </details>

              <details className="group rounded-2xl border border-border bg-card shadow-sm">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-6 md:p-8">
                  <div>
                    <span className="text-sm font-semibold uppercase tracking-widest text-primary">
                      Fase 4 · Mês 6
                    </span>
                    <h3 className="mt-2 text-xl font-bold text-card-foreground">
                      Evidência
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Transformar os resultados do teste em uma decisão.
                    </p>
                  </div>

                  <span className="text-2xl text-primary transition-transform group-open:rotate-180">
                    ⌄
                  </span>
                </summary>

                <div className="border-t border-border px-6 py-6 md:px-8">
                  <div className="grid gap-8 md:grid-cols-2">
                    <div>
                      <h4 className="font-bold text-foreground">
                        O que acontece
                      </h4>
                      <p className="mt-3 leading-relaxed text-muted-foreground">
                        Consolidação dos resultados, elaboração do relatório
                        técnico e da síntese executiva, recomendação sobre o uso
                        da solução e formação da equipe, com guia para novos
                        ciclos.
                      </p>
                    </div>

                    <div>
                      <h4 className="font-bold text-foreground">
                        Perguntas-guia
                      </h4>
                      <ul className="mt-3 list-disc space-y-2 pl-5 leading-relaxed text-muted-foreground">
                        <li>O que funcionou e o que falhou?</li>
                        <li>Em que condições o uso é seguro?</li>
                        <li>
                          Que etapas adicionais, como autorizações ou pilotos,
                          são necessárias?
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="mt-8 grid gap-4 md:grid-cols-2">
                    <div className="rounded-xl bg-muted/60 p-5">
                      <h4 className="font-bold text-foreground">Entregas</h4>
                      <p className="mt-2 leading-relaxed text-muted-foreground">
                        Relatório técnico e síntese executiva; recomendação;
                        guia para novos ciclos.
                      </p>
                    </div>

                    <div className="rounded-xl border-l-4 border-orange-500 bg-orange-500/5 p-5">
                      <h4 className="font-bold text-foreground">
                        Portão de decisão
                      </h4>
                      <p className="mt-2 leading-relaxed text-muted-foreground">
                        Decisão do órgão responsável registrada. A recomendação
                        documenta as condições de uso e os próximos passos.
                      </p>
                    </div>
                  </div>
                </div>
              </details>
            </div>
          </div>
        </section>

        {/* O que medimos */}
        <section className="bg-background px-6 py-16 md:py-20">
          <div className="mx-auto max-w-7xl">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-widest text-primary">
                Critérios de avaliação
              </p>

              <h2 className="mt-4 text-2xl font-bold tracking-tight text-foreground md:text-3xl">
                O que medimos durante a testagem
              </h2>

              <p className="mt-5 text-base leading-relaxed text-muted-foreground md:text-lg">
                A avaliação considera diferentes dimensões para compreender não
                apenas o desempenho técnico, mas também os riscos, as limitações
                e a utilidade da solução no contexto avaliado.
              </p>
            </div>

            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  titulo: "Desempenho",
                  descricao: "Acertos, erros e falsos alertas.",
                },
                {
                  titulo: "Equidade",
                  descricao:
                    "Diferenças de desempenho entre grupos e territórios.",
                },
                {
                  titulo: "Segurança e riscos",
                  descricao:
                    "Incidentes, limites de erro e regras de interrupção.",
                },
                {
                  titulo: "Dados e integração",
                  descricao:
                    "Consistência dos dados e funcionamento das integrações.",
                },
                {
                  titulo: "Utilidade operacional",
                  descricao:
                    "Se profissionais e serviços conseguem interpretar e usar os resultados.",
                },
                {
                  titulo: "Limitações e incerteza",
                  descricao: "O que o teste não permite afirmar.",
                },
                {
                  titulo: "Custos",
                  descricao: "Custos observáveis no recorte avaliado.",
                },
              ].map((item) => (
                <article
                  key={item.titulo}
                  className="rounded-2xl border border-border bg-card p-6"
                >
                  <h3 className="text-lg font-bold text-card-foreground">
                    {item.titulo}
                  </h3>

                  <p className="mt-3 leading-relaxed text-muted-foreground">
                    {item.descricao}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>
        {/* Limites das evidências */}
        <section className="bg-muted/40 px-6 py-12 md:py-16">
          <div className="mx-auto max-w-7xl">
            <div className="rounded-2xl border-l-4 border-orange-500 bg-card p-6 shadow-sm md:p-8">
              <p className="text-sm font-semibold uppercase tracking-widest text-orange-600">
                Um limite importante
              </p>

              <h2 className="mt-3 text-xl font-bold text-foreground md:text-2xl">
                Testar não significa comprovar todos os benefícios
              </h2>

              <p className="mt-4 leading-relaxed text-muted-foreground">
                O teste técnico mostra se a solução funciona no recorte
                avaliado. Benefício clínico ou pedagógico depende de desenho e
                tempo adequados, e não é demonstrado por um ciclo técnico. A
                decisão final é sempre do órgão responsável.
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

            <Link
              href="/cronograma"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 font-semibold text-primary-foreground transition hover:brightness-95 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
            >
              Próxima etapa: Cronograma
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
