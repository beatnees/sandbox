import Header from "@/components/layout/Header";

export default function Home() {
  return (
    <>
      <Header />

      <main className="overflow-hidden bg-(--background)">
        {/* HERO */}
        <section className="relative min-h-[calc(100vh-80px)] px-6 py-20">
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
            <div className="relative flex min-h-112.5 items-center justify-center">
              {/* círculo externo */}
              <div className="absolute h-95 w-95 rounded-full border border-(--border)" />

              {/* círculo interno */}
              <div className="absolute h-70 w-70 rounded-full bg-(--primary-light)" />

              {/* Card principal */}
              <div className="relative z-10 w-full max-w-sm rounded-3xl border border-(--border) bg-(--surface) p-8 shadow-xl">
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

                {/* Barra */}
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

              {/* Elementos flutuantes */}
              <div className="absolute left-0 top-12 rounded-2xl bg-(--surface) px-5 py-4 shadow-lg">
                <div className="text-sm text-(--muted)">Projetos</div>

                <div className="mt-1 text-2xl font-bold text-(--primary)">
                  +24
                </div>
              </div>

              <div className="absolute bottom-12 z-20 right-0 rounded-2xl bg-(--surface) px-5 py-4 shadow-lg">
                <div className="text-sm text-(--muted)">Progresso</div>

                <div className="mt-1 text-2xl font-bold text-(--secondary)">
                  ✦ Evoluindo
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
