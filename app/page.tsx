import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { ShieldCheck, TrendingUp, Lightbulb, UsersRound } from "lucide-react";

export default function Home() {
  const projetos = [
    {
      id: 1,
      titulo: "Tutor de IA generativa para reforço em Matemática",
      tags: ["IA generativa", "Ensino médio"],
      instituicao: "IFPE",
      responsavel: "Nome do responsável",
      etapa: "Experimentação",
      progresso: 64,
    },
    {
      id: 2,
      titulo: "Correção assistida de redações em escala",
      tags: ["Avaliação", "Linguagens"],
      instituicao: "SEDUC-SP",
      responsavel: "Nome do responsável",
      etapa: "Avaliação",
      progresso: 78,
    },
    {
      id: 3,
      titulo: "Navegação adaptativa por leitor de tela",
      tags: ["Acessibilidade", "Inclusão"],
      instituicao: "Instituto Benjamin Constant",
      responsavel: "Nome do responsável",
      etapa: "Coleta de evidências",
      progresso: 45,
    },
  ];

  return (
    <>
      <Header />

      <main className="bg-background)">
        {/* hero */}
        <section className="relative overflow-hidden bg-gradient-hero px-6 py-16 text-white md:py-24">
          {/* textura decorativa */}
          <div
            className="
      pointer-events-none
      absolute inset-0
      opacity-[0.08]
      [bg-image:radial-gradient(circle_at_center,var(--background)_1px,transparent_1px)]
      [bg-size:32px_32px]
    "
          />

          <div className="relative mx-auto max-w-7xl">
            {/* CONTEÚDO PRINCIPAL */}
            <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
              {/* TEXTO */}
              <div>
                {/* Badge */}
                <div className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-2 backdrop-blur-sm">
                  <span className="h-2 w-2 rounded-full bg-secondary" />

                  <span className="text-sm font-semibold text-white">
                    Ciclo 2026
                  </span>
                </div>

                {/* Título */}
                <h1 className="mt-8 max-w-3xl text-4xl font-bold leading-[1.05] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
                  Um espaço para experimentar o futuro da educação.
                </h1>

                {/* Descrição */}
                <p className="mt-7 max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg md:text-xl">
                  Ambiente controlado para testar, documentar e avaliar o uso de
                  Inteligência Artificial em contextos educacionais reais.
                </p>

                {/* Botões */}
                <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                  <button className="rounded-2xl bg-white px-7 py-4 font-semibold text-primary shadow-lg transition hover:-translate-y-1 hover:shadow-xl">
                    Acessar plataforma →
                  </button>
                  <a
                    href="#sobre"
                    className="rounded-2xl border border-white/30 bg-white/10 px-7 py-4 text-center font-semibold text-white backdrop-blur-sm transition hover:bg-white/20"
                  >
                    Conheça o Sandbox
                  </a>
                </div>
              </div>

              {/* PAINEL */}
              <div className="relative">
                <div className="rounded-4xl border border-border bg-card p-6 text-card-foreground shadow-2xl sm:p-8 md:p-10">
                  {/* Topo do painel */}
                  <div className="flex items-center gap-4">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-primary text-2xl text-primary-foreground">
                      ✦
                    </div>

                    <div>
                      <h2 className="text-lg font-bold text-foreground sm:text-xl">
                        Sandbox Regulatório
                      </h2>

                      <p className="mt-1 text-sm text-muted-foreground">
                        Inteligência Artificial na Educação
                      </p>
                    </div>
                  </div>

                  {/* Lista */}
                  <div className="mt-8 space-y-5">
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 border-success text-xs font-bold text-success">
                        ✓
                      </div>

                      <p className="leading-relaxed text-foreground">
                        Experimentação responsável em ambientes educacionais.
                      </p>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 border-success text-xs font-bold text-success">
                        ✓
                      </div>

                      <p className="leading-relaxed text-foreground">
                        Evidências acompanhadas e documentadas durante a
                        jornada.
                      </p>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 border-success text-xs font-bold text-success">
                        ✓
                      </div>

                      <p className="leading-relaxed text-foreground">
                        Colaboração entre instituições, especialistas e
                        participantes.
                      </p>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 border-success text-xs font-bold text-success">
                        ✓
                      </div>

                      <p className="leading-relaxed text-foreground">
                        Acompanhamento para apoiar decisões responsáveis sobre
                        IA.
                      </p>
                    </div>
                  </div>

                  {/* Botão interno */}
                  <button className="mt-8 w-full rounded-2xl bg-primary px-6 py-4 font-semibold text-primary-foreground transition hover:brightness-95">
                    Conheça a plataforma
                  </button>
                </div>
              </div>
            </div>

            {/* INDICADORES */}
            <div className="mt-16 grid grid-cols-2 gap-8 border-t border-white/20 pt-10 md:grid-cols-4 lg:mt-20">
              <div>
                <div className="text-3xl font-bold text-white md:text-4xl">
                  —
                </div>
                <p className="mt-2 text-sm text-white/70">projetos ativos</p>
              </div>

              <div>
                <div className="text-3xl font-bold text-white md:text-4xl">
                  —
                </div>
                <p className="mt-2 text-sm text-white/70">instituições</p>
              </div>

              <div>
                <div className="text-3xl font-bold text-white md:text-4xl">
                  —
                </div>
                <p className="mt-2 text-sm text-white/70">
                  evidências registradas
                </p>
              </div>

              <div>
                <div className="text-3xl font-bold text-white md:text-4xl">
                  —
                </div>
                <p className="mt-2 text-sm text-white/70">participantes</p>
              </div>
            </div>
          </div>
        </section>

        {/* SOBRE */}
        <section id="sobre" className="bg-background px-6 py-20 md:py-28">
          <div className="mx-auto max-w-7xl">
            {/* cabeçalho */}
            <div className="mx-auto max-w-3xl text-center">
              <span className="text-sm font-semibold uppercase tracking-widest text-primary">
                Sobre o Sandbox
              </span>

              <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground md:text-5xl">
                Um ambiente seguro para experimentar, aprender e evoluir.{" "}
              </h2>

              <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
                O Sandbox é um espaço colaborativo para desenvolver, testar e
                acompanhar soluções de Inteligência Artificial que podem
                transformar a educação.
              </p>
            </div>
          </div>
        </section>

        {/* como funciona */}
        <section id="como-funciona" className="bg-surface px-6 py-20 md:py-28">
          <div className="mx-auto max-w-7xl">
            {/* cabeçalho */}
            <div className="mx-auto max-w-3xl text-center">
              <span className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
                Como funciona
              </span>

              <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground md:text-5xl">
                Pilares para inovação responsável.
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
                O Sandbox organiza a experimentação em etapas claras, garantindo
                que cada inovação seja testada cocm segurança, ética e
                colaboração.
              </p>
            </div>

            {/* pilares */}
            <div className="mt-16 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              {/* pilar 1 */}
              <div className="relative rounded-3xl border border-border bg-background p-8 shadow-sm transition hover:translate-y-1 hover:shadow-lg">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-soft text-primary">
                  <ShieldCheck size={24} strokeWidth={2} />
                </div>

                <h3 className="mt-6 text-xl font-bold text-foreground">
                  Governança e proteção de dados
                </h3>
                <p className="mt-3 leading-relaxed text-muted-foreground">
                  A proposta é submetida com informações sobre a solução,
                  objetivos, público e contexto.
                </p>
              </div>

              {/* pilar 2 */}
              <div className="relative rounded-3xl border border-border bg-background p-8 shadow-sm transition hover:translate-y-1 hover:shadow-lg">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-soft text-primary">
                  <UsersRound size={24} strokeWidth={2} />
                </div>

                <h3 className="mt-6 text-xl font-bold text-foreground">
                  Colaboração institucional
                </h3>
                <p className="mt-3 leading-relaxed text-muted-foreground">
                  A proposta é submetida com informações sobre a solução,
                  objetivos, público e contexto.
                </p>
              </div>

              {/* pilar 3 */}

              <div className="relative rounded-3xl border border-border bg-background p-8 shadow-sm transition hover:translate-y-1 hover:shadow-lg">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-soft text-primary">
                  <TrendingUp size={24} strokeWidth={2} />
                </div>

                <h3 className="mt-6 text-xl font-bold text-foreground">
                  Evidências para política pública
                </h3>
                <p className="mt-3 leading-relaxed text-muted-foreground">
                  A proposta é submetida com informações sobre a solução,
                  objetivos, público e contexto.
                </p>
              </div>

              {/* pilar 4 */}

              <div className="relative rounded-3xl border border-border bg-background p-8 shadow-sm transition hover:translate-y-1 hover:shadow-lg">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-soft text-primary">
                  <Lightbulb size={24} strokeWidth={2} />
                </div>

                <h3 className="mt-6 text-xl font-bold text-foreground">
                  Inovação com supervisão humana
                </h3>
                <p className="mt-3 leading-relaxed text-muted-foreground">
                  A proposta é submetida com informações sobre a solução,
                  objetivos, público e contexto.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* PROJETOS */}
        <section id="projetos" className="bg-background px-6 py-20 md:py-28">
          <div className="mx-auto max-w-7xl">
            {/* Cabeçalho */}
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div className="max-w-2xl">
                <span className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
                  Projetos
                </span>

                <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground md:text-5xl">
                  Experimentos em destaque
                </h2>

                <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
                  Conheça alguns dos projetos que estão experimentando o uso
                  responsável da Inteligência Artificial na educação.
                </p>
              </div>

              <a
                href="#"
                className="font-semibold text-primary transition hover:text-accent"
              >
                Ver todos os projetos →
              </a>
            </div>

            {/* Cards */}
            <div className="mt-14 grid gap-6 lg:grid-cols-3">
              {projetos.map((projeto) => (
                <article
                  key={projeto.id}
                  className="card-hover flex min-h-85 flex-col rounded-3xl border border-border bg-card p-8 shadow-card"
                >
                  {/* Título */}
                  <h3 className="text-2xl font-bold leading-snug text-card-foreground">
                    {projeto.titulo}
                  </h3>

                  {/* Tags */}
                  <div className="mt-5 flex flex-wrap gap-2">
                    {projeto.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-primary-soft px-4 py-2 text-sm font-medium text-primary"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Instituição + etapa */}
                  <div className="mt-7">
                    <p className="text-sm font-semibold text-foreground">
                      {projeto.instituicao}
                    </p>

                    <p className="mt-1 text-sm text-muted-foreground">
                      {projeto.etapa}
                    </p>
                  </div>

                  {/* Responsável */}
                  <div className="mt-5 border-t border-border pt-5">
                    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Responsável
                    </p>

                    <p className="mt-1 text-sm font-medium text-foreground">
                      {projeto.responsavel}
                    </p>
                  </div>

                  {/* Progresso */}
                  <div className="mt-auto pt-8">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-muted-foreground">
                        Progresso
                      </span>

                      <span className="text-sm font-semibold text-foreground">
                        {projeto.progresso}%
                      </span>
                    </div>

                    <div className="mt-3 h-2.5 overflow-hidden rounded-full bg-primary-soft">
                      <div
                        className="h-full rounded-full bg-primary"
                        style={{
                          width: `${projeto.progresso}%`,
                        }}
                      />
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer></Footer>
    </>
  );
}
