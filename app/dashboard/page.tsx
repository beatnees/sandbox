import {
  FolderKanban,
  FileCheck2,
  Building2,
  ArrowRight,
  Plus,
} from "lucide-react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

type Projeto = {
  id: string;
  titulo: string;
  descricao: string | null;
  instituicao: string | null;
  etapa: string;
  status: string;
  progresso: number;
  tags: string[] | null;
  created_at: string;
};

const etapas: Record<string, string> = {
  planejamento: "Planejamento",
  analise: "Análise",
  experimentacao: "Experimentação",
  evidencias: "Evidências",
  avaliacao: "Avaliação",
  concluido: "Concluído",
};

const statusLabels: Record<string, string> = {
  rascunho: "Rascunho",
  "em-andamento": "Em andamento",
  pausado: "Pausado",
  concluido: "Concluído",
};

export default async function DashboardPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return (
      <main className="mx-auto max-w-7xl px-6 py-10">
        <p className="text-muted-foreground">
          Não foi possível identificar sua sessão. Entre novamente no sistema.
        </p>
      </main>
    );
  }

  const [
    resultadoContagemProjetos,
    resultadoProjetos,
    resultadoEvidencias,
    resultadoOrganizacoes,
  ] = await Promise.all([
    supabase
      .from("projetos")
      .select("id", { count: "exact", head: true })
      .eq("criado_por", user.id),

    supabase
      .from("projetos")
      .select(
        "id, titulo, descricao, instituicao, etapa, status, progresso, tags, created_at",
      )
      .eq("criado_por", user.id)
      .order("created_at", { ascending: false })
      .limit(3),

    supabase.from("evidencias").select("*", { count: "exact", head: true }),

    supabase
      .from("organizacao_membros")
      .select("organizacao_id", { count: "exact", head: true })
      .eq("usuario_id", user.id)
      .eq("status", "ativo"),
  ]);

  const projetos = (resultadoProjetos.data ?? []) as Projeto[];

  const indicadores = [
    {
      titulo: "Projetos",
      valor: resultadoContagemProjetos.error
        ? "—"
        : (resultadoContagemProjetos.count ?? 0),
      descricao: "Projetos criados por você",
      Icon: FolderKanban,
      estilo: "bg-primary-soft text-primary",
    },
    {
      titulo: "Evidências",
      valor: resultadoEvidencias.error ? "—" : (resultadoEvidencias.count ?? 0),
      descricao: resultadoEvidencias.error
        ? "Dados ainda não disponíveis"
        : "Registros no sistema",
      Icon: FileCheck2,
      estilo: "bg-success-soft text-success",
    },
    {
      titulo: "Organizações",
      valor: resultadoOrganizacoes.error
        ? "—"
        : (resultadoOrganizacoes.count ?? 0),
      descricao: "Vínculos ativos",
      Icon: Building2,
      estilo: "bg-warning-soft text-warning",
    },
  ];

  return (
    <main className="mx-auto max-w-7xl px-6 py-10">
      <section>
        <span className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
          Visão geral
        </span>

        <h1 className="mt-3 text-3xl font-bold text-foreground md:text-4xl">
          Bem-vindo ao Sandbox
        </h1>

        <p className="mt-3 max-w-2xl text-muted-foreground">
          Acompanhe seus projetos, experimentações e evidências em um único
          ambiente.
        </p>
      </section>

      {/* Indicadores */}
      <section
        aria-label="Indicadores do dashboard"
        className="mt-10 grid gap-5 md:grid-cols-3"
      >
        {indicadores.map(({ titulo, valor, descricao, Icon, estilo }) => (
          <div
            key={titulo}
            className="rounded-3xl border border-border bg-card p-6 shadow-card"
          >
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm text-muted-foreground">{titulo}</p>
                <p className="mt-2 text-3xl font-bold text-foreground">
                  {valor}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {descricao}
                </p>
              </div>

              <div
                className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${estilo}`}
              >
                <Icon size={23} />
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Projetos recentes */}
      <section className="mt-12">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-foreground">
              Meus projetos
            </h2>

            <p className="mt-1 text-sm text-muted-foreground">
              Os projetos mais recentes vinculados ao seu perfil.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <Link
              href="/dashboard/projetos/novo"
              className="inline-flex items-center gap-2 text-sm font-semibold text-primary transition hover:opacity-80"
            >
              <Plus size={17} />
              Novo projeto
            </Link>

            <Link
              href="/dashboard/projetos"
              className="inline-flex items-center gap-2 text-sm font-semibold text-primary transition hover:gap-3"
            >
              Ver todos
              <ArrowRight size={17} />
            </Link>
          </div>
        </div>

        <div className="mt-6 space-y-4">
          {resultadoProjetos.error ? (
            <div className="rounded-3xl border border-border bg-card p-6 text-sm text-muted-foreground">
              Não foi possível carregar seus projetos. Atualize a página e tente
              novamente.
            </div>
          ) : projetos.length === 0 ? (
            <div className="rounded-3xl border border-border bg-card p-8 text-center shadow-card">
              <FolderKanban
                size={36}
                className="mx-auto text-muted-foreground"
              />

              <h3 className="mt-4 text-lg font-bold text-foreground">
                Você ainda não tem projetos
              </h3>

              <p className="mt-2 text-sm text-muted-foreground">
                Crie seu primeiro projeto para acompanhar seu progresso por
                aqui.
              </p>

              <Link
                href="/dashboard/projetos/novo"
                className="mt-5 inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
              >
                <Plus size={17} />
                Criar projeto
              </Link>
            </div>
          ) : (
            projetos.map((projeto) => {
              const progresso = Math.max(
                0,
                Math.min(100, Number(projeto.progresso ?? 0)),
              );

              const statusClass =
                projeto.status === "concluido"
                  ? "bg-success-soft text-success"
                  : projeto.status === "pausado"
                    ? "bg-warning-soft text-warning"
                    : "bg-secondary text-secondary-foreground";

              return (
                <Link
                  key={projeto.id}
                  href={`/dashboard/projetos/${projeto.id}`}
                  className="block rounded-3xl border border-border bg-card p-6 shadow-card transition hover:border-primary/40"
                >
                  <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="rounded-full bg-primary-soft px-3 py-1 text-xs font-semibold text-primary">
                          {etapas[projeto.etapa] ?? projeto.etapa}
                        </span>

                        <span
                          className={`rounded-full px-3 py-1 text-xs font-medium ${statusClass}`}
                        >
                          {statusLabels[projeto.status] ?? projeto.status}
                        </span>
                      </div>

                      <h3 className="mt-4 text-lg font-bold text-foreground">
                        {projeto.titulo}
                      </h3>

                      <p className="mt-2 text-sm text-muted-foreground">
                        {projeto.instituicao || "Instituição não informada"}
                      </p>

                      {projeto.descricao && (
                        <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
                          {projeto.descricao}
                        </p>
                      )}

                      {projeto.tags && projeto.tags.length > 0 && (
                        <div className="mt-3 flex flex-wrap gap-2">
                          {projeto.tags.slice(0, 3).map((tag, index) => (
                            <span
                              key={`${projeto.id}-${tag}-${index}`}
                              className="rounded-full bg-secondary px-3 py-1 text-xs text-secondary-foreground"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="w-full md:w-44 md:shrink-0">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Progresso</span>

                        <span className="font-semibold text-foreground">
                          {progresso}%
                        </span>
                      </div>

                      <div className="mt-2 h-2 overflow-hidden rounded-full bg-primary-soft">
                        <div
                          className="h-full rounded-full bg-primary transition-all"
                          style={{ width: `${progresso}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })
          )}
        </div>
      </section>
    </main>
  );
}
