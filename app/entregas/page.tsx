import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Link from "next/link";

export default function EntregasPage() {
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
              Entregas
            </p>

            <h1 className="max-w-4xl text-4xl font-bold leading-tight md:text-5xl">
              Evidências e resultados para orientar decisões
            </h1>

            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-white/85">
              As entregas do sandbox organizam os registros, as análises e os
              resultados produzidos durante o ciclo de testagem, permitindo
              avaliar a solução e fundamentar decisões sobre seus próximos
              passos.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
