import Link from "next/link";
import {
  ArrowLeft,
  Award,
  CheckCircle2,
  Layers,
  Sprout,
  Sparkles,
  Trophy,
  Zap,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { createClient } from "@/lib/supabase/server";

type Movimentacao = {
  id: string;
  pontos: number;
  evento: string;
  created_at: string;
};

type Conquista = {
  id: string;
  codigo: string;
  nome: string;
  descricao: string;
  icone: string;
};

type ConquistaUsuario = {
  conquista_id: string;
  desbloqueada_em: string;
};

const niveis = [
  { nome: "Iniciante", minimo: 0, maximo: 49 },
  { nome: "Explorador", minimo: 50, maximo: 149 },
  { nome: "Pesquisador", minimo: 150, maximo: 349 },
  { nome: "Inovador", minimo: 350, maximo: 699 },
  { nome: "Referência", minimo: 700, maximo: null },
];

const iconesConquista: Record<string, LucideIcon> = {
  sprout: Sprout,
  layers: Layers,
  "check-circle": CheckCircle2,
};

const nomesEventos: Record<string, string> = {
  primeiro_projeto: "Primeiro projeto cadastrado",
  projeto_concluido: "Projeto concluído",
};

function formatarData(data: string) {
  return new Date(data).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default async function GamificacaoPage() {
  const supabase = await createClient();

  const [
    { data: movimentacoesData, error: erroXP },
    { data: conquistasUsuarioData, error: erroUsuario },
    { data: catalogoData, error: erroCatalogo },
  ] = await Promise.all([
    supabase
      .from("xp_movimentacoes")
      .select("id, pontos, evento, created_at")
      .order("created_at", { ascending: false }),

    supabase.from("usuario_conquistas").select("conquista_id, desbloqueada_em"),

    supabase
      .from("conquistas")
      .select("id, codigo, nome, descricao, icone")
      .order("created_at", { ascending: true }),
  ]);

  const erro = erroXP || erroUsuario || erroCatalogo;

  const movimentacoes = (movimentacoesData ?? []) as Movimentacao[];
  const conquistasUsuario = (conquistasUsuarioData ?? []) as ConquistaUsuario[];
  const catalogo = (catalogoData ?? []) as Conquista[];

  const totalXP = movimentacoes.reduce((total, item) => total + item.pontos, 0);

  const indiceNivel = niveis.findIndex(
    (nivel) => totalXP <= (nivel.maximo ?? Infinity),
  );

  const nivelAtual = niveis[indiceNivel] ?? niveis[niveis.length - 1];

  const proximoNivel = niveis[indiceNivel + 1];

  const progressoNivel = proximoNivel
    ? Math.max(
        0,
        Math.min(
          100,
          Math.round(
            ((totalXP - nivelAtual.minimo) /
              (proximoNivel.minimo - nivelAtual.minimo)) *
              100,
          ),
        ),
      )
    : 100;

  const faltaXP = proximoNivel ? Math.max(0, proximoNivel.minimo - totalXP) : 0;

  const idsDesbloqueados = new Set(
    conquistasUsuario.map((item) => item.conquista_id),
  );

  const conquistasDesbloqueadas = catalogo.filter((conquista) =>
    idsDesbloqueados.has(conquista.id),
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground md:text-4xl">
            Minha jornada
          </h1>

          <p className="mt-3 max-w-2xl text-muted-foreground">
            Acompanhe sua evolução, seus pontos de experiência e as conquistas
            que você desbloqueou no Sandbox IA na Educação.
          </p>
        </div>

        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition hover:text-foreground"
        >
          <ArrowLeft size={17} />
          Voltar ao painel
        </Link>
      </div>

      {erro ? (
        <div
          role="alert"
          className="rounded-xl border border-red-200 bg-red-50 p-5 text-sm text-red-800"
        >
          Não foi possível carregar seus dados de gamificação. Verifique a
          conexão com o Supabase e as permissões das tabelas.
        </div>
      ) : (
        <>
          <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            <div className="rounded-2xl border border-border bg-card p-6">
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">XP acumulado</p>
                <Zap size={21} className="text-primary" />
              </div>

              <p className="mt-4 text-3xl font-bold text-foreground">
                {totalXP} XP
              </p>

              <p className="mt-2 text-sm text-muted-foreground">
                Experiência conquistada em suas atividades.
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-card p-6">
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">Nível atual</p>
                <Sparkles size={21} className="text-primary" />
              </div>

              <p className="mt-4 text-3xl font-bold text-foreground">
                {nivelAtual.nome}
              </p>

              <p className="mt-2 text-sm text-muted-foreground">
                {proximoNivel
                  ? `Faltam ${faltaXP} XP para o próximo nível.`
                  : "Você alcançou o nível máximo atual."}
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-card p-6">
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">Conquistas</p>
                <Trophy size={21} className="text-primary" />
              </div>

              <p className="mt-4 text-3xl font-bold text-foreground">
                {conquistasDesbloqueadas.length}
                <span className="text-lg font-medium text-muted-foreground">
                  {" "}
                  / {catalogo.length}
                </span>
              </p>

              <p className="mt-2 text-sm text-muted-foreground">
                Medalhas desbloqueadas na sua trajetória.
              </p>
            </div>
          </section>

          <section className="rounded-2xl border border-border bg-card p-6 md:p-8">
            <div className="flex items-start gap-4">
              <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary-soft text-primary">
                <Award size={25} />
              </div>

              <div className="flex-1">
                <p className="text-sm font-medium text-muted-foreground">
                  Seu nível
                </p>

                <h2 className="mt-1 text-2xl font-bold text-foreground">
                  {nivelAtual.nome}
                </h2>

                <p className="mt-2 text-sm text-muted-foreground">
                  {proximoNivel
                    ? `Próximo nível: ${proximoNivel.nome}`
                    : "Você chegou ao topo da progressão atual."}
                </p>
              </div>

              <span className="rounded-full bg-primary-soft px-3 py-1 text-sm font-semibold text-primary">
                {progressoNivel}%
              </span>
            </div>

            <div
              className="mt-6 h-3 overflow-hidden rounded-full bg-muted"
              role="progressbar"
              aria-label="Progresso para o próximo nível"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={progressoNivel}
            >
              <div
                className="h-full rounded-full bg-primary transition-all"
                style={{ width: `${progressoNivel}%` }}
              />
            </div>

            <div className="mt-3 flex justify-between gap-4 text-xs text-muted-foreground">
              <span>{totalXP} XP acumulados</span>
              <span>
                {proximoNivel
                  ? `${proximoNivel.minimo} XP para avançar`
                  : "Nível máximo"}
              </span>
            </div>
          </section>

          <section className="space-y-4">
            <div>
              <h2 className="text-xl font-bold text-foreground">
                Minhas conquistas
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Cada conquista representa uma etapa da sua jornada.
              </p>
            </div>

            {catalogo.length === 0 ? (
              <div className="rounded-xl border border-border bg-card p-6 text-sm text-muted-foreground">
                Nenhuma conquista cadastrada ainda.
              </div>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {catalogo.map((conquista) => {
                  const desbloqueada = idsDesbloqueados.has(conquista.id);
                  const Icone = iconesConquista[conquista.icone] ?? Award;

                  return (
                    <div
                      key={conquista.id}
                      className={`rounded-2xl border p-5 ${
                        desbloqueada
                          ? "border-primary/30 bg-primary-soft/30"
                          : "border-border bg-card opacity-70"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className={`flex size-11 shrink-0 items-center justify-center rounded-xl ${
                            desbloqueada
                              ? "bg-primary-soft text-primary"
                              : "bg-muted text-muted-foreground"
                          }`}
                        >
                          <Icone size={23} />
                        </div>

                        <div className="min-w-0 flex-1">
                          <h3 className="font-semibold text-foreground">
                            {conquista.nome}
                          </h3>

                          <p className="mt-1 text-sm text-muted-foreground">
                            {conquista.descricao}
                          </p>
                        </div>
                      </div>

                      <div className="mt-4 flex items-center gap-2 text-sm">
                        {desbloqueada ? (
                          <>
                            <CheckCircle2 size={16} className="text-primary" />
                            <span className="font-medium text-primary">
                              Desbloqueada
                            </span>
                          </>
                        ) : (
                          <span className="text-muted-foreground">
                            Ainda não desbloqueada
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </section>

          <section className="space-y-4">
            <div>
              <h2 className="text-xl font-bold text-foreground">
                Histórico de XP
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Veja de onde vieram seus pontos de experiência.
              </p>
            </div>

            <div className="overflow-hidden rounded-2xl border border-border bg-card">
              {movimentacoes.length === 0 ? (
                <p className="p-6 text-sm text-muted-foreground">
                  Você ainda não tem movimentações de XP.
                </p>
              ) : (
                <div className="divide-y divide-border">
                  {movimentacoes.map((item) => (
                    <div
                      key={item.id}
                      className="flex flex-col gap-2 p-4 sm:flex-row sm:items-center sm:justify-between"
                    >
                      <div>
                        <p className="font-medium text-foreground">
                          {nomesEventos[item.evento] ?? item.evento}
                        </p>
                        <p className="mt-1 text-xs text-muted-foreground">
                          {formatarData(item.created_at)}
                        </p>
                      </div>

                      <span className="font-semibold text-primary">
                        +{item.pontos} XP
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>
        </>
      )}
    </div>
  );
}
