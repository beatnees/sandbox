import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Building2, CalendarDays, UserRound } from "lucide-react";

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

type PaginaProps = {
  params: Promise<{ id: string }>;
};

export default async function ProjetoPublicoPage({ params }: PaginaProps) {
  const { id } = await params;
  const supabase = await createClient();

  const { data, error } = await supabase.rpc("obter_projeto_publico", {
    p_id: id,
  });

  const projeto: ProjetoPublico | null =
    !error && data?.length ? (data[0] as ProjetoPublico) : null;

  if (!projeto) {
    notFound();
  }

  const progresso = Math.min(100, Math.max(0, projeto.progresso ?? 0));

  const dataPublicacao = new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "long",
  }).format(new Date(projeto.created_at));

  return (
    <>
      <Header />

      <main className="min-h-screen bg-background">
        <section className="mx-auto max-w-5xl px-6 py-12 md:py-16">
          <Link
            href="/projetos"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground transition hover:text-foreground"
          >
            <ArrowLeft size={16} />
            Voltar aos projetos
          </Link>

          <div className="mt-8 rounded-3xl border border-border bg-card p-6 md:p-10">
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                {nomesEtapas[projeto.etapa] ?? projeto.etapa}
              </span>

              <span className="rounded-full border border-border px-3 py-1 text-sm text-muted-foreground">
                {nomesStatus[projeto.status] ?? projeto.status}
              </span>
            </div>

            <h1 className="mt-6 text-3xl font-bold tracking-tight text-card-foreground md:text-5xl">
              {projeto.titulo}
            </h1>

            <p className="mt-6 whitespace-pre-wrap text-base leading-8 text-muted-foreground">
              {projeto.descricao ||
                "Este projeto ainda não possui uma descrição."}
            </p>

            <div className="mt-8 grid gap-5 border-t border-border pt-8 sm:grid-cols-2">
              {projeto.instituicao && (
                <div className="flex items-start gap-3">
                  <Building2 size={20} className="mt-1 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Instituição</p>
                    <p className="mt-1 font-medium text-card-foreground">
                      {projeto.instituicao}
                    </p>
                  </div>
                </div>
              )}

              {projeto.responsavel && (
                <div className="flex items-start gap-3">
                  <UserRound size={20} className="mt-1 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Responsável</p>
                    <p className="mt-1 font-medium text-card-foreground">
                      {projeto.responsavel}
                    </p>
                  </div>
                </div>
              )}

              <div className="flex items-start gap-3">
                <CalendarDays size={20} className="mt-1 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Publicado em</p>
                  <p className="mt-1 font-medium text-card-foreground">
                    {dataPublicacao}
                  </p>
                </div>
              </div>
            </div>

            {projeto.tags && projeto.tags.length > 0 && (
              <div className="mt-8 border-t border-border pt-8">
                <h2 className="text-lg font-semibold text-card-foreground">
                  Temas do projeto
                </h2>

                <div className="mt-4 flex flex-wrap gap-2">
                  {projeto.tags.map((tag, index) => (
                    <span
                      key={`${tag}-${index}`}
                      className="rounded-full border border-border px-3 py-1.5 text-sm text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-8 border-t border-border pt-8">
              <div className="mb-3 flex items-center justify-between gap-4">
                <h2 className="text-lg font-semibold text-card-foreground">
                  Progresso do projeto
                </h2>
                <span className="font-semibold text-card-foreground">
                  {progresso}%
                </span>
              </div>

              <div
                className="h-3 overflow-hidden rounded-full bg-muted"
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
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
