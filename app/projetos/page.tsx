import Link from "next/link";
import { ArrowLeft, FolderKanban } from "lucide-react";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { createClient } from "@/lib/supabase/server";

type ProjetoPublico = {
  id: string;
  titulo: string;
  descricao: string | null;
  instituicao: string | null;
  responsavel: string | null;
  etapa: string;
  status: string;
  progresso: number;
  tags: string[] | null;
  created_at: string;
};

const nomesEtapas: Record<string, string> = {
  planejamento: "Planejamento",
  analise: "Análise",
  experimentacao: "Experimentação",
  evidencias: "Evidências",
  avaliacao: "Avaliação",
  concluido: "Concluído",
};

const nomesStatus: Record<string, string> = {
  rascunho: "Rascunho",
  "em-andamento": "Em andamento",
  pausado: "Pausado",
  concluido: "Concluído",
};

export default async function ProjetosPublicosPage() {
  const supabase = await createClient();

  const { data, error } = await supabase.rpc("obter_todos_projetos_publicos");

  const projetos: ProjetoPublico[] = error
    ? []
    : ((data ?? []) as ProjetoPublico[]);

  return (
    <>
      <Header />

      <main className="min-h-screen bg-background">
        <section className="mx-auto max-w-7xl px-6 py-12 md:py-16">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground transition hover:text-foreground"
          >
            <ArrowLeft size={16} />
            Voltar ao início
          </Link>

          <div className="mt-8 max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-wider text-primary">
              Sandbox IA na Educação
            </p>

            <h1 className="mt-3 text-3xl font-bold tracking-tight text-foreground md:text-5xl">
              Projetos públicos
            </h1>

            <p className="mt-4 text-base leading-7 text-muted-foreground md:text-lg">
              Conheça os projetos publicados no Sandbox e acompanhe suas etapas,
              seus objetivos e seu progresso.
            </p>
          </div>

          <div className="mt-8">
            <span className="text-sm text-muted-foreground">
              {error
                ? "Não foi possível carregar os projetos."
                : `${projetos.length} ${
                    projetos.length === 1
                      ? "projeto publicado"
                      : "projetos publicados"
                  }`}
            </span>
          </div>

          {error ? (
            <div className="mt-8 rounded-3xl border border-border bg-card px-6 py-12 text-center">
              <h2 className="text-xl font-semibold text-card-foreground">
                Não foi possível carregar os projetos
              </h2>

              <p className="mt-3 text-muted-foreground">
                Tente atualizar a página em alguns instantes.
              </p>
            </div>
          ) : projetos.length > 0 ? (
            <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {projetos.map((projeto) => {
                const progresso = Math.min(
                  100,
                  Math.max(0, projeto.progresso ?? 0),
                );

                return (
                  <article
                    key={projeto.id}
                    className="flex flex-col rounded-3xl border border-border bg-card p-6 transition hover:-translate-y-1 hover:shadow-md"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                        {nomesEtapas[projeto.etapa] ?? projeto.etapa}
                      </span>

                      <span className="text-xs text-muted-foreground">
                        {nomesStatus[projeto.status] ?? projeto.status}
                      </span>
                    </div>

                    <h2 className="mt-5 text-xl font-semibold text-card-foreground">
                      {projeto.titulo}
                    </h2>

                    <p className="mt-3 flex-1 text-sm leading-6 text-muted-foreground">
                      {projeto.descricao || "Descrição não informada."}
                    </p>

                    {(projeto.instituicao || projeto.responsavel) && (
                      <div className="mt-5 space-y-2 text-sm text-muted-foreground">
                        {projeto.instituicao && (
                          <p>
                            <span className="font-medium text-card-foreground">
                              Instituição:
                            </span>{" "}
                            {projeto.instituicao}
                          </p>
                        )}

                        {projeto.responsavel && (
                          <p>
                            <span className="font-medium text-card-foreground">
                              Responsável:
                            </span>{" "}
                            {projeto.responsavel}
                          </p>
                        )}
                      </div>
                    )}

                    {projeto.tags && projeto.tags.length > 0 && (
                      <div className="mt-5 flex flex-wrap gap-2">
                        {projeto.tags.map((tag, index) => (
                          <span
                            key={`${projeto.id}-${tag}-${index}`}
                            className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="mt-6 border-t border-border pt-5">
                      <div className="mb-2 flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Progresso</span>

                        <span className="font-semibold text-card-foreground">
                          {progresso}%
                        </span>
                      </div>

                      <div
                        className="h-2 overflow-hidden rounded-full bg-muted"
                        role="progressbar"
                        aria-label={`Progresso de ${projeto.titulo}`}
                        aria-valuenow={progresso}
                        aria-valuemin={0}
                        aria-valuemax={100}
                      >
                        <div
                          className="h-full rounded-full bg-primary transition-all"
                          style={{ width: `${progresso}%` }}
                        />
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          ) : (
            <div className="mt-8 rounded-3xl border border-border bg-card px-6 py-12 text-center">
              <FolderKanban
                size={36}
                className="mx-auto text-muted-foreground"
              />

              <h2 className="mt-4 text-xl font-semibold text-card-foreground">
                Novos projetos em breve
              </h2>

              <p className="mt-3 text-muted-foreground">
                Os projetos publicados no Sandbox aparecerão aqui.
              </p>
            </div>
          )}
        </section>
      </main>

      <Footer />
    </>
  );
}
