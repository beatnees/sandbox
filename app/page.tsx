import Header from "@/components/layout/Header";

export default function Home() {
  return (
    <>
      <Header />

      <main className="bg-(--background)">
        {/* HERO */}
        <section className="relative min-h-[calc(100vh-80px)] px-6 py-12 md:py-24">
          {/* Fundo decorativo */}

          <div className="relative mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-2">
            {/* texto */}
            <div>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-(--border) bg-(--surface) px-4 py-2">
                <span className="h-2 w-2 rounded-full bg-(--secondary)" />

                <span className="text-sm font-medium text-(--muted)">
                  Sandbox de IA na Educação
                </span>
              </div>

              <h1 className="max-w-3xl text-5xl font-bold leading-[1.1] tracking-tight text-(--foreground) md:text-6xl lg:text-7xl">
                Um espaço para{" "}
                <span className="text-(--primary)">experimentar</span> o futuro
                da educação.
              </h1>

              <p className="mt-8 max-w-xl text-lg leading-relaxed text-(--muted) md:text-xl">
                Um ambiente colaborativo para desenvolver, testar e acompanhar
                soluções de Inteligência Artificial que podem transformar a
                educação.
              </p>

              {/* botões */}
              <div className="mt-10 flex flex-wrap gap-4">
                <button className="rounded-2xl bg-(--primary) px-7 py-4 font-semibold text-white shadow-lg transition hover:-translate-y-1 hover:bg-(--primary-dark)">
                  Conheça o Sandbox →
                </button>

                <button className="rounded-2xl border border-(--border) bg-(--surface) px-7 py-4 font-semibold text-(--foreground) transition hover:bg-(--primary-light)">
                  Como funciona
                </button>
              </div>
            </div>

            {/* ELEMENTO VISUAL */}
            <div className="relative flex min-h-125 items-center justify-center py-12 md:min-h-125 md:py-0">
              {/* círculo externo */}
              <div className="absolute left-1/2 top-1/2 h-105 w-105 -translate-x-1/2 -translate-y-1/2 rounded-full border border-(--border)" />

              {/* círculo interno */}
              <div className="absolute left-1/2 top-1/2 h-85 w-85 -translate-x-1/2 -translate-y-1/2 rounded-full bg-(--primary-light)" />

              {/* card principal */}
              <div className="relative z-10 w-full max-w-sm rounded-3xl border border-(--border) bg-(--surface) p-6 shadow-xl md:p-8">
                <div className="flex items-center justify-between">
                  <span className="rounded-xl bg-(--primary-light) px-3 py-2 text-sm font-semibold text-(--primary)">
                    EM DESENVOLVIMENTO
                  </span>

                  <span className="text-2xl">✦</span>
                </div>

                <h2 className="mt-8 text-2xl font-bold text-(--foreground)">
                  Ideias em movimento
                </h2>

                <p className="mt-3 leading-relaxed text-(--muted)">
                  Um ecossistema para transformar ideias em soluções reais para
                  a educação.
                </p>

                {/* barra */}
                <div className="mt-8">
                  <div className="mb-3 flex justify-between text-sm">
                    <span className="text-(--muted)">Jornada</span>

                    <span className="font-semibold text-(--primary)">68%</span>
                  </div>

                  <div className="h-3 overflow-hidden rounded-full bg-(--primary-light)">
                    <div className="h-full w-[68%] rounded-full bg-(--primary)" />
                  </div>
                </div>
              </div>

              {/* projetos */}
              <div className="absolute left-0 top-16 z-20 rounded-2xl bg-(--surface) px-5 py-4 shadow-lg">
                <div className="text-sm text-(--muted)">Projetos</div>

                <div className="mt-1 text-2xl font-bold text-(--primary)">
                  +24
                </div>
              </div>

              {/* progresso */}
              <div className="absolute bottom-8 right-0 z-20 rounded-2xl bg-(--surface) px-5 py-4 shadow-lg">
                <div className="text-sm text-(--muted)">Progresso</div>

                <div className="mt-1 text-2xl font-bold text-(--secondary)">
                  ✦ Evoluindo
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SOBRE */}
        <section id="sobre" className="px-6 py-12 md:py-24">
          <div className="mx-auto max-w-7xl">
            {/* cabeçalho */}
            <div className="mx-auto max-w-3xl text-center">
              <span className="inline-flex items-center rounded-full bg-(--secondary-light) px-4 py-2 text-sm font-semibold text-(--secondary)">
                Sobre o Sandbox
              </span>
              <h2 className="mt-6 text-3xl font-bold tracking-tight text-(--foreground) md:text-5xl">
                Experimentar também é uma forma de
                <span className="text-(--primary)"> construir o futuro.</span>
              </h2>

              <p className="mt-6 text-lg leading-relaxed text-(--muted)">
                O Sandbox é um espaço colaborativo para desenvolver, testar e
                acompanhar soluções de Inteligência Artificial que podem
                transformar a educação.
              </p>
            </div>

            {/* cards */}
            <div className="mt-16 grid gap-6 md:grid-cols-3">
              {/* card 1 */}
              <div className="rounded-3xl border border-(--border) bg-(--surface) p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-(--primary-light) text-2xl">
                  ✦
                </div>
                <h3 className="mt-6 text-xl font-bold text-(--foreground)">
                  Explorar
                </h3>
                <p className="mt-3 leading-relaxed text-(--muted)">
                  Descubra possibilidades e identifique oportunidades para o uso
                  responsável da Inteligência Artificial na educação.
                </p>
              </div>

              {/* card 2 */}
              <div className="rounded-3xl border border-(--border) bg-(--surface) p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-(--primary-light) text-2xl">
                  ✦
                </div>
                <h3 className="mt-6 text-xl font-bold text-(--foreground)">
                  Experimentar
                </h3>
                <p className="mt-3 leading-relaxed text-(--muted)">
                  Teste ideias em um ambiente seguro, acompanhe resultados e
                  aprenda com cada experiência.
                </p>
              </div>

              {/* card 3 */}
              <div className="rounded-3xl border border-(--border) bg-(--surface) p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-(--primary-light) text-2xl">
                  ↗
                </div>
                <h3 className="mt-6 text-xl font-bold text-(--foreground)">
                  Evoluir
                </h3>
                <p className="mt-3 leading-relaxed text-(--muted)">
                  Transforme aprendizados em soluções que possam gerar impacto
                  real para estudantes, educadores e instituições.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
