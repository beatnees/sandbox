import Header from "@/components/layout/Header";
import LoginModal from "@/components/auth/LoginModal";
import Footer from "@/components/layout/Footer";
import MapaSandbox from "@/components/home/MapaSandbox";
import { createClient } from "@/lib/supabase/server";

export default async function Home() {
  const supabase = await createClient();

  const { data: dadosIndicadores, error: erroIndicadores } = await supabase.rpc(
    "obter_indicadores_publicos",
  );

  const indicadores = !erroIndicadores ? dadosIndicadores?.[0] : null;

  const formatarNumero = (valor: number | null | undefined) =>
    typeof valor === "number" ? valor.toLocaleString("pt-BR") : "—";

  return (
    <>
      <Header />

      <main className="bg-background">
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
                  Sandbox de IA: testar com supervisão para decidir com
                  evidências
                </h1>

                {/* Descrição */}
                <p className="mt-7 max-w-2xl text-base font-medium leading-relaxed text-white sm:text-lg">
                  Metodologia do NEES/UFAL, construída na experiência do Sandbox
                  de IA na Educação do MEC, para avaliar soluções de
                  inteligência artificial antes de ampliar seu uso em políticas
                  públicas.
                </p>
                <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg md:text-xl">
                  Soluções de IA prometem ganhos, mas trazem incertezas sobre
                  utilidade, segurança e viabilidade. O sandbox cria um ambiente
                  delimitado e supervisionado para observar desempenho, erros,
                  efeitos desiguais e impactos no trabalho das equipes. O
                  resultado é uma decisão documentada: ampliar, corrigir,
                  restringir ou encerrar o uso.
                </p>

                {/* Botões */}
                <div className="mt-10">
                  <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                    <a
                      href="/o-que-e"
                      className="inline-flex items-center justify-center rounded-xl bg-white px-6 py-3.5 text-center font-semibold text-primary shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl"
                    >
                      Entenda o que é
                      <span className="ml-2" aria-hidden="true">
                        →
                      </span>
                    </a>

                    <a
                      href="/ciclo"
                      className="inline-flex items-center justify-center rounded-xl border border-white/40 px-6 py-3.5 text-center font-semibold text-white transition hover:bg-white/10"
                    >
                      Veja o ciclo de testagem
                    </a>
                    <a
                      href="/sobre"
                      className="inline-flex items-center justify-center rounded-xl border border-white/40 px-6 py-3.5 text-center font-semibold text-white transition hover:bg-white/10"
                    >
                      Fale com o NEES
                    </a>
                  </div>
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

                  {/* Botão de acesso à plataforma */}
                  <LoginModal
                    label="Acessar plataforma →"
                    className="mt-8 w-full rounded-2xl bg-primary px-6 py-4 font-semibold text-primary-foreground transition hover:brightness-95"
                  />
                </div>
              </div>
            </div>

            {/* INDICADORES */}
            <div className="mt-16 grid grid-cols-2 gap-8 border-t border-white/20 pt-10 md:grid-cols-4 lg:mt-20">
              <div>
                <div className="text-3xl font-bold text-white md:text-4xl">
                  {formatarNumero(indicadores?.projetos_ativos)}
                </div>
                <p className="mt-2 text-sm text-white/70">projetos ativos</p>
              </div>

              <div>
                <div className="text-3xl font-bold text-white md:text-4xl">
                  {formatarNumero(indicadores?.instituicoes)}
                </div>
                <p className="mt-2 text-sm text-white/70">instituições</p>
              </div>

              <div>
                <div className="text-3xl font-bold text-white md:text-4xl">
                  {formatarNumero(indicadores?.evidencias_registradas)}
                </div>
                <p className="mt-2 text-sm text-white/70">
                  evidências registradas
                </p>
              </div>

              <div>
                <div className="text-3xl font-bold text-white md:text-4xl">
                  {formatarNumero(indicadores?.participantes)}
                </div>
                <p className="mt-2 text-sm text-white/70">participantes</p>
              </div>
            </div>
          </div>
        </section>

        <MapaSandbox />

        {/* sobre 
        <section id="sobre" className="bg-background px-6 py-20 md:py-28">
          <div className="mx-auto max-w-7xl">
            {/* cabeçalho 
            <div className="mx-auto max-w-4xl text-center">
              <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-primary md:text-sm">
                Sobre o Sandbox
              </span>

              <h2 className="mt-5 text-3xl font-bold leading-tight tracking-tight text-foreground md:text-5xl md:leading-[1.15]">
                Um ambiente seguro para experimentar, aprender e evoluir.{" "}
              </h2>

              <p className="mx-auto mt-7 max-w-2xl text-base leading-8 text-muted-foreground md:text-lg md:leading-9">
                O Sandbox de IA do NEES/UFAL utiliza uma metodologia construída
                a partir da experiência com o MEC para avaliar soluções de
                Inteligência Artificial em um ambiente delimitado e
                supervisionado. O objetivo é produzir evidências que apoiem
                decisões sobre ampliar, corrigir, restringir ou encerrar seu uso
                em políticas públicas.
              </p>
            </div>
          </div>
        </section>
        */}
      </main>

      <Footer></Footer>
    </>
  );
}
