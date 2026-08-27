import Header from "@/components/layout/Header";

export default function Home() {
  return (
    <>
      <Header />

      <main className="min-h-screen bg-(--background) px-6 py-16">
        <div className="mx-auto max-w-4xl">
          <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-(--secondary)">
            Sandbox IA na Educação
          </p>

          <h1 className="max-w-2xl text-5xl font-bold leading-tight text-(--foreground)">
            Um espaço para experimentar o futuro da educação.
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-(--muted)">
            Plataforma para acompanhamento de iniciativas de Inteligência
            Artificial na educação.
          </p>

          <div className="mt-10 flex gap-4">
            <button className="rounded-xl bg-(--primary) px-6 py-3 font-semibold text-white transition hover:bg-(--primary-dark)">
              Conheça o Sandbox
            </button>

            <button className="rounded-xl border border-(--border) bg-(--surface) px-6 py-3 font-semibold text-(--foreground) transition hover:bg-(--primary-light)">
              Saiba mais
            </button>
          </div>
        </div>
      </main>
    </>
  );
}
