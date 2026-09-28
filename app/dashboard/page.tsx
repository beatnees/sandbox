import { FolderKanban, FileCheck2, Building2, ArrowRight } from "lucide-react";

export default function DashboardPage() {
  return (
    <>
      <div className="mx-auto max-w-7xl px-6 py-10">
        {/* Boas-vindas */}
        <div>
          <span className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
            Visão geral
          </span>

          <h2 className="mt-3 text-3xl font-bold text-foreground md:text-4xl">
            Bem-vindo ao Sandbox
          </h2>

          <p className="mt-3 max-w-2xl text-muted-foreground">
            Acompanhe seus projetos, experimentações e evidências em um único
            ambiente.
          </p>
        </div>

        {/* Indicadores */}
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          <div className="rounded-3xl border border-border bg-card p-6 shadow-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Projetos</p>

                <p className="mt-2 text-3xl font-bold text-foreground">3</p>
              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-soft text-primary">
                <FolderKanban size={23} />
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-border bg-card p-6 shadow-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Evidências</p>

                <p className="mt-2 text-3xl font-bold text-foreground">12</p>
              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-success-soft text-success">
                <FileCheck2 size={23} />
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-border bg-card p-6 shadow-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Instituições</p>

                <p className="mt-2 text-3xl font-bold text-foreground">2</p>
              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-warning-soft text-warning">
                <Building2 size={23} />
              </div>
            </div>
          </div>
        </div>

        {/* Projetos recentes */}
        <section className="mt-12">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-foreground">
                Meus projetos
              </h2>

              <p className="mt-1 text-sm text-muted-foreground">
                Projetos vinculados ao seu perfil.
              </p>
            </div>

            <button className="flex items-center gap-2 text-sm font-semibold text-primary">
              Ver todos
              <ArrowRight size={17} />
            </button>
          </div>

          <div className="mt-6 rounded-3xl border border-border bg-card shadow-card">
            <div className="flex flex-col gap-5 p-6 md:flex-row md:items-center md:justify-between">
              <div>
                <div className="flex flex-wrap gap-2">
                  <span className="rounded-full bg-primary-soft px-3 py-1 text-xs font-semibold text-primary">
                    IA generativa
                  </span>

                  <span className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">
                    Ensino médio
                  </span>
                </div>

                <h3 className="mt-4 text-lg font-bold text-foreground">
                  Tutor de IA generativa para reforço em Matemática
                </h3>

                <p className="mt-2 text-sm text-muted-foreground">
                  IFPE · Experimentação
                </p>
              </div>

              <div className="min-w-45">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Progresso</span>

                  <span className="font-semibold text-foreground">64%</span>
                </div>

                <div className="mt-2 h-2 overflow-hidden rounded-full bg-primary-soft">
                  <div className="h-full w-[64%] rounded-full bg-primary" />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
