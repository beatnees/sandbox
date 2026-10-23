import { redirect } from "next/navigation";
import { Target, CalendarDays, CheckCircle2 } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import FormularioMeta from "./FormularioMeta";

type Organizacao = {
  id: string;
  nome: string;
  tipo: "instituicao" | "equipe";
};

type Membro = {
  organizacao_id: string;
  papel: "administrador" | "gestor" | "membro";
};

type Meta = {
  id: string;
  organizacao_id: string;
  titulo: string;
  descricao: string | null;
  tipo: "projetos_criados" | "projetos_concluidos";
  valor_meta: number;
  progresso_atual: number;
  data_limite: string | null;
  created_at: string;
};

function formatarData(data: string) {
  return new Date(`${data}T12:00:00`).toLocaleDateString("pt-BR");
}

export default async function MetasPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: organizacoesData, error: erroOrganizacoes } = await supabase
    .from("organizacoes")
    .select("id, nome, tipo")
    .order("nome");

  const { data: membrosData, error: erroMembros } = await supabase
    .from("organizacao_membros")
    .select("organizacao_id, papel")
    .eq("usuario_id", user.id)
    .eq("status", "ativo");

  const { data: metasData, error: erroMetas } = await supabase
    .from("metas_coletivas")
    .select(
      "id, organizacao_id, titulo, descricao, tipo, valor_meta, progresso_atual, data_limite, created_at",
    )
    .order("created_at", { ascending: false });

  const organizacoes = (organizacoesData ?? []) as Organizacao[];
  const membros = (membrosData ?? []) as Membro[];
  const metas = (metasData ?? []) as Meta[];

  const organizacoesPorId = new Map(
    organizacoes.map((organizacao) => [organizacao.id, organizacao]),
  );

  const papeisPorOrganizacao = new Map(
    membros.map((membro) => [membro.organizacao_id, membro.papel]),
  );

  const organizacoesGerenciaveis = organizacoes.filter((organizacao) => {
    const papel = papeisPorOrganizacao.get(organizacao.id);

    return papel === "administrador" || papel === "gestor";
  });

  const totalConcluidas = metas.filter(
    (meta) => meta.progresso_atual >= meta.valor_meta,
  ).length;

  return (
    <div className="space-y-8">
      <header>
        <div className="mb-3 flex items-center gap-3 text-primary">
          <Target size={28} />
          <span className="text-sm font-semibold">Colaboração e impacto</span>
        </div>

        <h1 className="text-3xl font-bold text-foreground md:text-4xl">
          Metas coletivas
        </h1>

        <p className="mt-3 max-w-2xl text-muted-foreground">
          Acompanhe os objetivos das instituições e equipes participantes do
          Sandbox IA na Educação.
        </p>
      </header>

      {(erroOrganizacoes || erroMembros || erroMetas) && (
        <div
          role="alert"
          className="rounded-xl border border-destructive/30 p-4 text-sm text-destructive"
        >
          Não foi possível carregar todos os dados. Verifique a conexão com o
          Supabase e as permissões de acesso.
          {erroOrganizacoes && <p>Organizações: {erroOrganizacoes.message}</p>}
          {erroMembros && <p>Membros: {erroMembros.message}</p>}
          {erroMetas && <p>Metas: {erroMetas.message}</p>}
        </div>
      )}

      <section className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-border bg-card p-5">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-primary/10 p-3 text-primary">
              <Target size={22} />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Metas cadastradas</p>
              <p className="text-2xl font-bold text-foreground">
                {metas.length}
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-5">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-primary/10 p-3 text-primary">
              <CheckCircle2 size={22} />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Metas alcançadas</p>
              <p className="text-2xl font-bold text-foreground">
                {totalConcluidas}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-border bg-card p-6">
        <h2 className="text-xl font-semibold text-foreground">
          Criar nova meta
        </h2>

        <p className="mt-2 text-sm text-muted-foreground">
          Defina um objetivo mensurável para uma instituição ou equipe.
        </p>

        {organizacoesGerenciaveis.length > 0 ? (
          <FormularioMeta organizacoes={organizacoesGerenciaveis} />
        ) : (
          <p className="mt-4 rounded-xl bg-muted/40 p-4 text-sm text-muted-foreground">
            Para criar metas, você precisa ser administrador ou gestor de uma
            organização. Você ainda pode visualizar as metas das organizações
            das quais participa.
          </p>
        )}
      </section>

      <section>
        <h2 className="text-xl font-semibold text-foreground">
          Acompanhamento das metas
        </h2>

        {metas.length === 0 ? (
          <div className="mt-4 rounded-2xl border border-dashed border-border p-8 text-center">
            <Target size={32} className="mx-auto mb-3 text-muted-foreground" />
            <p className="font-medium text-foreground">
              Nenhuma meta cadastrada
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              As metas das suas organizações aparecerão aqui quando forem
              criadas.
            </p>
          </div>
        ) : (
          <div className="mt-4 grid gap-4 lg:grid-cols-2">
            {metas.map((meta) => {
              const organizacao = organizacoesPorId.get(meta.organizacao_id);

              const percentual = Math.min(
                100,
                Math.round((meta.progresso_atual / meta.valor_meta) * 100),
              );

              const concluida = meta.progresso_atual >= meta.valor_meta;

              return (
                <article
                  key={meta.id}
                  className="rounded-2xl border border-border bg-card p-5"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <h3 className="font-semibold text-foreground">
                        {meta.titulo}
                      </h3>

                      <p className="mt-1 text-sm text-muted-foreground">
                        {organizacao?.nome ?? "Organização"}
                      </p>
                    </div>

                    <span
                      className={`shrink-0 rounded-full px-3 py-1 text-xs font-medium ${
                        concluida
                          ? "bg-primary/10 text-primary"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {concluida ? "Concluída" : "Em andamento"}
                    </span>
                  </div>

                  {meta.descricao && (
                    <p className="mt-4 text-sm text-muted-foreground">
                      {meta.descricao}
                    </p>
                  )}

                  <p className="mt-4 text-sm text-muted-foreground">
                    Objetivo:{" "}
                    {meta.tipo === "projetos_criados"
                      ? "Projetos criados"
                      : "Projetos concluídos"}
                  </p>

                  <div className="mt-4 flex items-center justify-between gap-3">
                    <span className="text-sm text-foreground">Progresso</span>
                    <span className="text-sm font-semibold text-foreground">
                      {meta.progresso_atual} de {meta.valor_meta}
                    </span>
                  </div>

                  <div
                    className="mt-2 h-2.5 overflow-hidden rounded-full bg-muted"
                    role="progressbar"
                    aria-label={`Progresso da meta ${meta.titulo}`}
                    aria-valuenow={percentual}
                    aria-valuemin={0}
                    aria-valuemax={100}
                  >
                    <div
                      className="h-full rounded-full bg-primary transition-all"
                      style={{ width: `${percentual}%` }}
                    />
                  </div>

                  <div className="mt-2 text-right text-xs text-muted-foreground">
                    {percentual}% alcançado
                  </div>

                  {meta.data_limite && (
                    <p className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
                      <CalendarDays size={16} />
                      Prazo: {formatarData(meta.data_limite)}
                    </p>
                  )}
                </article>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
