import Link from "next/link";
import { ArrowRight, Plus } from "lucide-react";

const projetos = [
  {
    id: 1,
    titulo: "Tutor de IA generativo para reforço em Matemática",
    instituição: "IFPE",
    responsavel: "Nome do responsavel",
    etapa: "Experimentação",
    status: "Em andamento",
    tags: ["IA generativa", "Ensino medio"],
    progresso: 64,
  },
  {
    id: 2,
    titulo: "Correção assistida de redações em escala",
    instituicao: "SEDUC-SP",
    responsavel: "Nome do responsável",
    etapa: "Avaliação",
    status: "Em andamento",
    tags: ["Avaliação", "Linguagens"],
    progresso: 78,
  },
  {
    id: 3,
    titulo: "Navegação adaptativa por leitor de tela",
    instituicao: "Instituto Benjamin Constant",
    responsavel: "Nome do responsável",
    etapa: "Coleta de evidências",
    status: "Em andamento",
    tags: ["Acessibilidade", "Inclusão"],
    progresso: 45,
  },
];

export default function ProjetosPage() {
  return (
    <>
      {/* cabeçalho */}
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <span className="text-sm font-semibold uppercase trackin-[0.18em] text-primary">
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

      {/* resumo */}
      <div className="mt-10 grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-border bg-card p-5 shadow-card">
          <p className="text-sm text-muted-foreground">Total de projetos</p>
          <p className="mt-2 text-3xl font-bold text-foreground">
            {projetos.length}
          </p>
        </div>

        <div className="rounded-2xl border border-border bg-card p-5 shadow-card">
          <p className="text-sm text-muted-foreground">Em andamento</p>
          <p className="mt-2 text-3xl font-bold text-primary">3</p>
        </div>

        <div className="rounded-2xl border border-border bg-card p-5 shadow-card">
          <p className="text-sm text-muted-foreground">Concluídos</p>
          <p className="mt-2 text-3xl font-bold text-primary">0</p>
        </div>
      </div>

      {/* lista */}
      <section className="mt-10">
        <div className="grid gap-6 xl:grid-cols-2">
          {projetos.map((projeto) => (
            <article
              key={projeto.id}
              className="card-hover flex flex-col rounded-3xl border border-border bg-card p-7 shadow-card"
            >
              {/* status */}
              <div className="flex flex-wrap items-center justify-between gap-3">
                <span className="rounded-full bg-sucess-soft px-3 py-1.5 text-xs font-semibold text-success">
                  {projeto.status}
                </span>

                <span className="text-sm text-muted-foreground">
                  {projeto.etapa}
                </span>
              </div>

              {/* título */}
              <h2 className="mt-5 text-xl font-bold leading-snug text-foreground">
                {projeto.titulo}
              </h2>

              {/* tags */}
              <div className="mt-4 flex flex-wrap gap-2">
                {projeto.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-primary-soft px-3 py-1.5 text-xs font-medium text-primary"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* informações */}
              <div className="mt-6 grid gap-5 border-t border-border pt-5 sm:grid-cols-2">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Instituição
                  </p>

                  <p className="mt-1 text-sm font-semibold text-foreground">
                    {projeto.instituicao}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Responsável
                  </p>
                  <p className="mt-1 text-sm font-semibold text-foreground">
                    {projeto.responsavel}
                  </p>
                </div>
              </div>

              {/* progresso */}
              <div className="mt-6">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Progresso</span>

                  <span className="font-semibold text-foreground">
                    {projeto.progresso}%
                  </span>
                </div>

                <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-primary-soft">
                  <div
                    className="h-full rounded-full bg-primary"
                    style={{
                      width: `${projeto.progresso}%`,
                    }}
                  />
                </div>
              </div>

              {/* ação */}

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
          ))}
        </div>
      </section>
    </>
  );
}
