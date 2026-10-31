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
                Sobre o NEES e contato
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
      </main>

      <Footer />
    </>
  );
}
