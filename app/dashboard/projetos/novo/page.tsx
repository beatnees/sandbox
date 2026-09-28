import Link from "next/link";
import { ArrowLeft, Save } from "lucide-react";

export default function NovoProjetoPage() {
  return (
    <>
      {/* Voltar */}
      <Link
        href="/dashboard/projetos"
        className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition hover:text-primary"
      >
        <ArrowLeft size={17} />
        Voltar para projetos
      </Link>

      {/* Cabeçalho */}
      <div className="mt-6">
        <span className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
          Projetos
        </span>

        <h1 className="mt-3 text-3xl font-bold text-foreground md:text-4xl">
          Novo projeto
        </h1>

        <p className="mt-3 max-w-2xl text-muted-foreground">
          Cadastre as informações principais da iniciativa que será acompanhada
          no Sandbox Regulatório.
        </p>
      </div>

      {/* Formulário */}
      <form className="mt-10 space-y-8">
        {/* Informações principais */}
        <section className="rounded-3xl border border-border bg-card p-6 shadow-card md:p-8">
          <div>
            <h2 className="text-xl font-bold text-foreground">
              Informações principais
            </h2>

            <p className="mt-1 text-sm text-muted-foreground">
              Identifique o projeto e descreva brevemente sua proposta.
            </p>
          </div>

          <div className="mt-7 grid gap-6">
            {/* Título */}
            <div>
              <label
                htmlFor="titulo"
                className="text-sm font-semibold text-foreground"
              >
                Título do projeto
              </label>

              <input
                id="titulo"
                name="titulo"
                type="text"
                placeholder="Ex.: Tutor de IA para apoio à aprendizagem"
                className="mt-2 h-12 w-full rounded-xl border border-border bg-background px-4 text-foreground outline-none transition placeholder:text-muted-foreground/60 focus:border-primary focus:ring-2 focus:ring-primary/15"
              />
            </div>

            {/* Descrição */}
            <div>
              <label
                htmlFor="descricao"
                className="text-sm font-semibold text-foreground"
              >
                Descrição
              </label>

              <textarea
                id="descricao"
                name="descricao"
                rows={5}
                placeholder="Descreva brevemente a proposta, o contexto e o que será experimentado."
                className="mt-2 w-full resize-none rounded-xl border border-border bg-background px-4 py-3 text-foreground outline-none transition placeholder:text-muted-foreground/60 focus:border-primary focus:ring-2 focus:ring-primary/15"
              />
            </div>
          </div>
        </section>

        {/* Instituição */}
        <section className="rounded-3xl border border-border bg-card p-6 shadow-card md:p-8">
          <div>
            <h2 className="text-xl font-bold text-foreground">
              Instituição e responsável
            </h2>

            <p className="mt-1 text-sm text-muted-foreground">
              Informe quem está conduzindo o projeto.
            </p>
          </div>

          <div className="mt-7 grid gap-6 md:grid-cols-2">
            {/* Instituição */}
            <div>
              <label
                htmlFor="instituicao"
                className="text-sm font-semibold text-foreground"
              >
                Instituição
              </label>

              <input
                id="instituicao"
                name="instituicao"
                type="text"
                placeholder="Nome da instituição"
                className="mt-2 h-12 w-full rounded-xl border border-border bg-background px-4 text-foreground outline-none transition placeholder:text-muted-foreground/60 focus:border-primary focus:ring-2 focus:ring-primary/15"
              />
            </div>

            {/* Responsável */}
            <div>
              <label
                htmlFor="responsavel"
                className="text-sm font-semibold text-foreground"
              >
                Responsável
              </label>

              <input
                id="responsavel"
                name="responsavel"
                type="text"
                placeholder="Nome do responsável"
                className="mt-2 h-12 w-full rounded-xl border border-border bg-background px-4 text-foreground outline-none transition placeholder:text-muted-foreground/60 focus:border-primary focus:ring-2 focus:ring-primary/15"
              />
            </div>
          </div>
        </section>

        {/* Classificação */}
        <section className="rounded-3xl border border-border bg-card p-6 shadow-card md:p-8">
          <div>
            <h2 className="text-xl font-bold text-foreground">
              Classificação e acompanhamento
            </h2>

            <p className="mt-1 text-sm text-muted-foreground">
              Essas informações serão usadas nos cards e filtros da plataforma.
            </p>
          </div>

          <div className="mt-7 grid gap-6 md:grid-cols-2">
            {/* Etapa */}
            <div>
              <label
                htmlFor="etapa"
                className="text-sm font-semibold text-foreground"
              >
                Etapa atual
              </label>

              <select
                id="etapa"
                name="etapa"
                defaultValue=""
                className="mt-2 h-12 w-full rounded-xl border border-border bg-background px-4 text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15"
              >
                <option value="" disabled>
                  Selecione uma etapa
                </option>

                <option value="planejamento">Planejamento</option>

                <option value="analise">Análise</option>

                <option value="experimentacao">Experimentação</option>

                <option value="evidencias">Coleta de evidências</option>

                <option value="avaliacao">Avaliação</option>

                <option value="concluido">Concluído</option>
              </select>
            </div>

            {/* Status */}
            <div>
              <label
                htmlFor="status"
                className="text-sm font-semibold text-foreground"
              >
                Status
              </label>

              <select
                id="status"
                name="status"
                defaultValue="em-andamento"
                className="mt-2 h-12 w-full rounded-xl border border-border bg-background px-4 text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15"
              >
                <option value="rascunho">Rascunho</option>

                <option value="em-andamento">Em andamento</option>

                <option value="pausado">Pausado</option>

                <option value="concluido">Concluído</option>
              </select>
            </div>

            {/* Progresso */}
            <div>
              <label
                htmlFor="progresso"
                className="text-sm font-semibold text-foreground"
              >
                Progresso (%)
              </label>

              <input
                id="progresso"
                name="progresso"
                type="number"
                min="0"
                max="100"
                defaultValue="0"
                className="mt-2 h-12 w-full rounded-xl border border-border bg-background px-4 text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15"
              />
            </div>

            {/* Tags */}
            <div>
              <label
                htmlFor="tags"
                className="text-sm font-semibold text-foreground"
              >
                Tags
              </label>

              <input
                id="tags"
                name="tags"
                type="text"
                placeholder="IA generativa, Ensino médio, Matemática"
                className="mt-2 h-12 w-full rounded-xl border border-border bg-background px-4 text-foreground outline-none transition placeholder:text-muted-foreground/60 focus:border-primary focus:ring-2 focus:ring-primary/15"
              />

              <p className="mt-2 text-xs text-muted-foreground">
                Separe as tags por vírgulas.
              </p>
            </div>
          </div>
        </section>

        {/* Período */}
        <section className="rounded-3xl border border-border bg-card p-6 shadow-card md:p-8">
          <div>
            <h2 className="text-xl font-bold text-foreground">Período</h2>

            <p className="mt-1 text-sm text-muted-foreground">
              Informe o período previsto para a experimentação.
            </p>
          </div>

          <div className="mt-7 grid gap-6 md:grid-cols-2">
            <div>
              <label
                htmlFor="inicio"
                className="text-sm font-semibold text-foreground"
              >
                Data de início
              </label>

              <input
                id="inicio"
                name="inicio"
                type="date"
                className="mt-2 h-12 w-full rounded-xl border border-border bg-background px-4 text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15"
              />
            </div>

            <div>
              <label
                htmlFor="fim"
                className="text-sm font-semibold text-foreground"
              >
                Previsão de término
              </label>

              <input
                id="fim"
                name="fim"
                type="date"
                className="mt-2 h-12 w-full rounded-xl border border-border bg-background px-4 text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15"
              />
            </div>
          </div>
        </section>

        {/* Ações */}
        <div className="flex flex-col-reverse gap-3 border-t border-border pt-6 sm:flex-row sm:justify-end">
          <Link
            href="/dashboard/projetos"
            className="inline-flex h-12 items-center justify-center rounded-xl border border-border bg-card px-6 font-semibold text-foreground transition hover:bg-muted"
          >
            Cancelar
          </Link>

          <button
            type="submit"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-primary px-6 font-semibold text-primary-foreground transition hover:brightness-95"
          >
            <Save size={18} />
            Salvar projeto
          </button>
        </div>
      </form>
    </>
  );
}
