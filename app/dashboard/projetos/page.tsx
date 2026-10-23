import Link from "next/link";
import { ArrowRight, Plus } from "lucide-react";
import { createClient } from "@/lib/supabase/server";

type Projeto = {
  id: string;
  titulo: string;
  instituicao: string | null;
  responsavel: string | null;
  etapa: string;
  status: string;
  tags: string[] | null;
  progresso: number | null;
};

const etapas: Record<string, string> = {
  planejamento: "Planejamento",
  analise: "Análise",
  experimentacao: "Experimentação",
  evidencias: "Coleta de evidências",
  avaliacao: "Avaliação",
  concluido: "Concluído",
};

const statusLabels: Record<string, string> = {
  rascunho: "Rascunho",
  "em-andamento": "Em andamento",
  pausado: "Pausado",
  concluido: "Concluído",
};

export default async function ProjetosPage() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("projetos")
    .select(
      "id, titulo, instituicao, responsavel, etapa, status, tags, progresso, created_at",
    )
    .order("created_at", { ascending: false });

  const projetos = (data ?? []) as Projeto[];

  const emAndamento = projetos.filter(
    (projeto) => projeto.status === "em-andamento",
  ).length;

  const concluidos = projetos.filter(
    (projeto) => projeto.status === "concluido",
  ).length;

  return (
    <>
      {/* Cabeçalho */}
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <span className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
            Projetos
          </span>

          <h1 className="mt-3 text-3xl font-bold text-foreground md:text-4xl">
            Meus projetos
          </h1>

          <p className="mt-3 max-w-2xl text-muted-foreground">
            Acompanhe seus projetos e registre novas experimentações.
          </p>
        </div>

        <Link
          href="/dashboard/projetos/novo"
          className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-primary px-5 font-semibold text-primary-foreground transition hover:brightness-95"
        >
          <Plus size={19} />
          Novo projeto
        </Link>
      </div>

      {/* Erro ao carregar */}
      {error && (
        <div
          role="alert"
          className="mt-8 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
        >
          Não foi possível carregar seus projetos. Atualize a página e tente
          novamente.
        </div>
      )}

      {/* Resumo */}
      {!error && (
        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-border bg-card p-5 shadow-card">
            <p className="text-sm text-muted-foreground">Total de projetos</p>
            <p className="mt-2 text-3xl font-bold text-foreground">
              {projetos.length}
            </p>
          </div>

          <div className="rounded-2xl border border-border bg-card p-5 shadow-card">
            <p className="text-sm text-muted-foreground">Em andamento</p>
            <p className="mt-2 text-3xl font-bold text-primary">
              {emAndamento}
            </p>
          </div>

          <div className="rounded-2xl border border-border bg-card p-5 shadow-card">
            <p className="text-sm text-muted-foreground">Concluídos</p>
            <p className="mt-2 text-3xl font-bold text-primary">{concluidos}</p>
          </div>
        </div>
      )}

      {/* Lista de projetos */}
      <section className="mt-10">
        {!error && projetos.length === 0 && (
          <div className="rounded-3xl border border-border bg-card px-6 py-12 text-center shadow-card">
            <h2 className="text-xl font-bold text-foreground">
              Você ainda não tem projetos cadastrados
            </h2>
            <p className="mt-3 text-muted-foreground">
              Cadastre seu primeiro projeto para começar a acompanhar seu
              progresso.
            </p>
            <Link
              href="/dashboard/projetos/novo"
              className="mt-6 inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-primary px-5 font-semibold text-primary-foreground transition hover:brightness-95"
            >
              <Plus size={19} />
              Cadastrar projeto
            </Link>
          </div>
        )}

        {!error && projetos.length > 0 && (
          <div className="grid gap-6 xl:grid-cols-2">
            {projetos.map((projeto) => {
              const progresso = Math.max(
                0,
                Math.min(100, projeto.progresso ?? 0),
              );

              return (
                <article
                  key={projeto.id}
                  className="card-hover flex flex-col rounded-3xl border border-border bg-card p-7 shadow-card"
                >
                  {/* Status e etapa */}
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <span
                      className={`rounded-full px-3 py-1.5 text-xs font-semibold ${
                        projeto.status === "concluido"
                          ? "bg-success-soft text-success"
                          : "bg-primary-soft text-primary"
                      }`}
                    >
                      {statusLabels[projeto.status] ?? projeto.status}
                    </span>

                    <span className="text-sm text-muted-foreground">
                      {etapas[projeto.etapa] ?? projeto.etapa}
                    </span>
                  </div>

                  {/* Título */}
                  <h2 className="mt-5 text-xl font-bold leading-snug text-foreground">
                    {projeto.titulo}
                  </h2>

                  {/* Tags */}
                  <div className="mt-4 flex flex-wrap gap-2">
                    {(projeto.tags ?? []).map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-primary-soft px-3 py-1.5 text-xs font-medium text-primary"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Informações */}
                  <div className="mt-6 grid gap-5 border-t border-border pt-5 sm:grid-cols-2">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        Instituição
                      </p>
                      <p className="mt-1 text-sm font-semibold text-foreground">
                        {projeto.instituicao || "Não informada"}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        Responsável
                      </p>
                      <p className="mt-1 text-sm font-semibold text-foreground">
                        {projeto.responsavel || "Não informado"}
                      </p>
                    </div>
                  </div>

                  {/* Progresso */}
                  <div className="mt-6">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Progresso</span>
                      <span className="font-semibold text-foreground">
                        {progresso}%
                      </span>
                    </div>

                    <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-primary-soft">
                      <div
                        className="h-full rounded-full bg-primary"
                        style={{ width: `${progresso}%` }}
                      />
                    </div>
                  </div>

                  {/* Ação */}
                  <div className="mt-7 flex justify-end border-t border-border pt-5">
                    <Link
                      href={`/dashboard/projetos/${projeto.id}`}
                      className="inline-flex items-center gap-2 text-sm font-semibold text-primary transition hover:gap-3"
                    >
                      Abrir projeto
                      <ArrowRight size={17} />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>
    </>
  );
}
