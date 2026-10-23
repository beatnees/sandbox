import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

type Projeto = {
  id: string;
  titulo: string;
  descricao: string | null;
  instituicao: string | null;
  responsavel: string | null;
  etapa: string;
  status: string;
  progresso: number | null;
  tags: string[] | null;
  data_inicio: string | null;
  data_fim: string | null;
  created_at: string;
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
  concluido: "Co ncluído",
};

function formatarData(data: string | null) {
  if (!data) return "Não informada";

  return new Date(`${data.slice(0, 10)}T12:00:00`).toLocaleDateString("pt-BR");
}

export default async function ProjetoDetalhePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("projetos")
    .select(
      "id, titulo, descricao, instituicao, responsavel, etapa, status, progresso, tags, data_inicio, data_fim, created_at",
    )
    .eq("id", id)
    .maybeSingle();

  if (error) {
    return (
      <div className="space-y-6">
        <Link
          href="/dashboard/projetos"
          className="inline-flex items-center gap-2 text-sm font-semibold text-primary"
        >
          <ArrowLeft size={18} />
          Voltar para meus projetos
        </Link>

        <div className="rounded-2xl border border-border bg-card p-6">
          <h1 className="text-xl font-bold text-foreground">
            Não foi possível carregar o projeto
          </h1>
          <p className="mt-2 text-muted-foreground">
            Tente atualizar a página. Se o problema continuar, verifique a
            conexão com o Supabase.
          </p>
        </div>
      </div>
    );
  }

  const projeto = data as Projeto | null;

  if (!projeto) {
    notFound();
  }

  const progresso = Math.max(0, Math.min(100, projeto.progresso ?? 0));

  return (
    <>
      <Link
        href="/dashboard/projetos"
        className="inline-flex items-center gap-2 text-sm font-semibold text-primary transition hover:gap-3"
      >
        <ArrowLeft size={18} />
        Voltar para meus projetos
      </Link>

      <div className="mt-8">
        <span className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
          Detalhes do projeto
        </span>

        <div className="mt-3 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h1 className="max-w-3xl text-3xl font-bold text-foreground md:text-4xl">
              {projeto.titulo}
            </h1>

            <p className="mt-3 text-muted-foreground">
              Consulte as informações e acompanhe o progresso deste projeto.
            </p>
          </div>

          <span
            className={`inline-flex w-fit shrink-0 rounded-full px-4 py-2 text-sm font-semibold ${
              projeto.status === "concluido"
                ? "bg-success-soft text-success"
                : "bg-primary-soft text-primary"
            }`}
          >
            {statusLabels[projeto.status] ?? projeto.status}
          </span>
        </div>
      </div>

      {/* Resumo do projeto */}
      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <div className="rounded-2xl border border-border bg-card p-5 shadow-card">
          <p className="text-sm text-muted-foreground">Etapa atual</p>
          <p className="mt-2 text-lg font-bold text-foreground">
            {etapas[projeto.etapa] ?? projeto.etapa}
          </p>
        </div>

        <div className="rounded-2xl border border-border bg-card p-5 shadow-card">
          <p className="text-sm text-muted-foreground">Progresso</p>
          <p className="mt-2 text-lg font-bold text-foreground">{progresso}%</p>
          <div className="mt-3 h-2.5 overflow-hidden rounded-full bg-primary-soft">
            <div
              className="h-full rounded-full bg-primary"
              style={{ width: `${progresso}%` }}
            />
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-5 shadow-card">
          <p className="text-sm text-muted-foreground">Data de cadastro</p>
          <p className="mt-2 text-lg font-bold text-foreground">
            {formatarData(projeto.created_at)}
          </p>
        </div>
      </div>

      {/* Descrição */}
      <section className="mt-8 rounded-3xl border border-border bg-card p-6 shadow-card md:p-8">
        <h2 className="text-xl font-bold text-foreground">Sobre o projeto</h2>

        <p className="mt-4 whitespace-pre-wrap leading-7 text-muted-foreground">
          {projeto.descricao || "Nenhuma descrição foi informada."}
        </p>
      </section>

      {/* Informações */}
      <section className="mt-8 rounded-3xl border border-border bg-card p-6 shadow-card md:p-8">
        <h2 className="text-xl font-bold text-foreground">
          Informações do projeto
        </h2>

        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Instituição
            </p>
            <p className="mt-2 font-semibold text-foreground">
              {projeto.instituicao || "Não informada"}
            </p>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Responsável
            </p>
            <p className="mt-2 font-semibold text-foreground">
              {projeto.responsavel || "Não informado"}
            </p>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Data de início
            </p>
            <p className="mt-2 font-semibold text-foreground">
              {formatarData(projeto.data_inicio)}
            </p>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Data de encerramento
            </p>
            <p className="mt-2 font-semibold text-foreground">
              {formatarData(projeto.data_fim)}
            </p>
          </div>
        </div>
      </section>

      {/* Tags */}
      <section className="mt-8 rounded-3xl border border-border bg-card p-6 shadow-card md:p-8">
        <h2 className="text-xl font-bold text-foreground">
          Temas e áreas relacionadas
        </h2>

        {projeto.tags && projeto.tags.length > 0 ? (
          <div className="mt-4 flex flex-wrap gap-2">
            {projeto.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-primary-soft px-3 py-2 text-sm font-medium text-primary"
              >
                {tag}
              </span>
            ))}
          </div>
        ) : (
          <p className="mt-4 text-muted-foreground">
            Nenhuma tag foi cadastrada.
          </p>
        )}
      </section>
    </>
  );
}
