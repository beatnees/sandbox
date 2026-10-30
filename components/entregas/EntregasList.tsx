"use client";

import { Fragment, useState } from "react";

const entregas = [
  {
    id: 1,
    nome: "Plano do ciclo",
    fase: 1,
    descricao:
      "Escopo, versão, responsáveis, decisões a apoiar, cronograma e governança.",
    indice: [
      "Identificação da solução e versão",
      "Problema e objetivo do teste",
      "Responsáveis e governança",
      "Cronograma e decisões a apoiar",
    ],
  },
  {
    id: 2,
    nome: "Elegibilidade e riscos",
    fase: 1,
    descricao:
      "Prontidão da solução, framework de riscos técnico-jurídica e controles.",
    indice: [
      "Critérios de elegibilidade",
      "Diagnóstico de prontidão",
      "Matriz de riscos",
      "Controles e medidas de mitigação",
    ],
  },
  {
    id: 3,
    nome: "Protocolo de teste",
    fase: 2,
    descricao:
      "Comparador, medidas de resultado, subgrupos, limites de erro e regras de interrupção.",
    indice: [
      "Objetivo e desenho do teste",
      "Rotina atual como comparador",
      "Métricas e subgrupos avaliados",
      "Limites de erro e regras de interrupção",
      "Procedimentos de execução",
    ],
  },
  {
    id: 4,
    nome: "Ambiente de teste",
    fase: 2,
    descricao:
      "Configuração, acessos, rastreabilidade, publicações e controle de envio de informações e arquivos.",
    indice: [
      "Configuração do ambiente",
      "Perfis de acesso e permissões",
      "Rastreabilidade e registros",
      "Plano de proteção de dados",
      "Controle de informações e arquivos",
    ],
  },
  {
    id: 5,
    nome: "Execução",
    fase: 3,
    descricao:
      "Testes realizados, registro de incidentes e justificativa de desvios, entrevistas com participantes.",
    indice: [
      "Registro dos testes realizados",
      "Resultados e observações",
      "Incidentes e falhas identificadas",
      "Justificativas de desvios",
      "Entrevistas com participantes",
    ],
  },
  {
    id: 6,
    nome: "Relatório e síntese executiva",
    fase: 4,
    descricao:
      "Resultados reproduzíveis, limitações, incerteza e achados para a gestão.",
    indice: [
      "Método e recorte da avaliação",
      "Resultados frente ao comparador",
      "Erros e diferenças entre grupos",
      "Segurança e utilidade operacional",
      "Limitações, incertezas e custos observáveis",
      "Síntese executiva",
    ],
  },
  {
    id: 7,
    nome: "Recomendação",
    fase: 4,
    descricao:
      "Condições para usar, corrigir, restringir ou interromper e etapas adicionais necessárias.",
    indice: [
      "Conclusão da avaliação",
      "Condições para uso",
      "Correções ou restrições necessárias",
      "Critérios para interrupção",
      "Etapas adicionais recomendadas",
    ],
  },
  {
    id: 8,
    nome: "Transferência",
    fase: 4,
    descricao:
      "Guia reutilizável para novos ciclos, instrumentos e formação da equipe indicada.",
    indice: [
      "Guia para condução de novos ciclos",
      "Instrumentos e materiais reutilizáveis",
      "Orientações para a equipe",
      "Registro da formação realizada",
    ],
  },
];

const fases = [
  { id: 1, nome: "Desenho", periodo: "Mês 1" },
  { id: 2, nome: "Preparação", periodo: "Mês 2" },
  { id: 3, nome: "Experimentação", periodo: "Meses 3 a 5" },
  { id: 4, nome: "Evidência", periodo: "Mês 6" },
];

const estiloFase: Record<number, string> = {
  1: "border-[#176b73] bg-[#e8f3f3] text-[#176b73]",
  2: "border-[#477b68] bg-[#eaf3ed] text-[#477b68]",
  3: "border-[#637c91] bg-[#eef2f6] text-[#637c91]",
  4: "border-[#b66a24] bg-[#fff1df] text-[#b66a24]",
};

export default function EntregasList() {
  const [faseAtiva, setFaseAtiva] = useState<number | null>(null);
  const [entregaAberta, setEntregaAberta] = useState<number | null>(null);

  const entregasFiltradas = entregas.filter(
    (entrega) => faseAtiva === null || entrega.fase === faseAtiva,
  );

  return (
    <section className="px-6 py-16 md:py-20">
      <div className="mx-auto w-full max-w-[1600px]">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-primary">
              O dossiê do ciclo
            </p>
            <h2 className="text-3xl font-bold text-foreground md:text-4xl">
              Oito entregas, um percurso documentado
            </h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              Cada fase produz documentos e registros que compõem o dossiê do
              teste. Explore os itens para conhecer um exemplo de índice de cada
              documento.
            </p>
          </div>

          <div
            className="rounded-2xl border border-border bg-muted/30 p-6"
            aria-label="Ilustração de um dossiê com oito entregas"
          >
            <div className="mx-auto max-w-sm">
              <div className="mb-2 ml-5 h-3 w-28 rounded-t-lg bg-[#176b73]" />
              <div className="rounded-xl border-2 border-[#176b73] bg-white p-4 shadow-sm">
                <div className="mb-4 flex items-center justify-between">
                  <span className="font-bold text-[#176b73]">
                    Dossiê do teste
                  </span>
                  <span className="text-xs text-muted-foreground">8 itens</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {entregas.map((entrega) => (
                    <div
                      key={entrega.id}
                      className="flex items-center gap-2 rounded-lg border border-[#d6e5e5] bg-[#f5f9f9] p-2 text-sm"
                    >
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded bg-[#e8f3f3] text-xs font-bold text-[#176b73]">
                        {entrega.id}
                      </span>
                      <span className="text-xs font-medium text-foreground">
                        {entrega.nome}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <p className="mt-3 text-center text-xs text-muted-foreground">
                Instrumentos, resultados e orientações para novos ciclos
              </p>
            </div>
          </div>
        </div>

        <div className="mt-14">
          <div className="mb-6">
            <h3 className="text-xl font-bold text-foreground">
              Entregas por fase
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Selecione uma fase para filtrar a tabela. Clique em uma entrega
              para abrir um exemplo de índice do documento.
            </p>
          </div>

          <div className="mb-6 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => {
                setFaseAtiva(null);
                setEntregaAberta(null);
              }}
              aria-pressed={faseAtiva === null}
              className={`rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${
                faseAtiva === null
                  ? "border-primary bg-primary text-white"
                  : "border-border bg-background text-foreground hover:bg-muted"
              }`}
            >
              Todas as fases
            </button>

            {fases.map((fase) => (
              <button
                key={fase.id}
                type="button"
                onClick={() => {
                  setFaseAtiva(fase.id);
                  setEntregaAberta(null);
                }}
                aria-pressed={faseAtiva === fase.id}
                className={`rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${
                  faseAtiva === fase.id
                    ? "border-[#176b73] bg-[#176b73] text-white"
                    : "border-[#176b73]/30 bg-[#e8f3f3] text-[#176b73] hover:bg-[#dcecec]"
                }`}
              >
                Fase {fase.id} · {fase.nome}
              </button>
            ))}
          </div>

          <div className="overflow-x-auto rounded-xl border border-border">
            <table className="w-full min-w-180 border-collapse text-left">
              <thead className="bg-muted/60">
                <tr>
                  <th className="px-5 py-4 text-sm font-semibold text-foreground">
                    Entrega
                  </th>
                  <th className="px-5 py-4 text-sm font-semibold text-foreground">
                    O que contém
                  </th>
                  <th className="px-5 py-4 text-sm font-semibold text-foreground">
                    Fase
                  </th>
                  <th className="px-5 py-4 text-sm font-semibold text-foreground">
                    Índice
                  </th>
                </tr>
              </thead>

              <tbody>
                {entregasFiltradas.map((entrega) => {
                  const fase = fases.find((item) => item.id === entrega.fase);
                  const aberta = entregaAberta === entrega.id;

                  return (
                    <Fragment key={entrega.id}>
                      <tr className="border-t border-border align-top transition-colors hover:bg-muted/30">
                        <td className="px-5 py-4 text-sm font-semibold text-foreground">
                          {entrega.id}. {entrega.nome}
                        </td>

                        <td className="px-5 py-4 text-sm leading-relaxed text-muted-foreground">
                          {entrega.descricao}
                        </td>

                        <td className="px-5 py-4">
                          <span
                            className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${estiloFase[entrega.fase]}`}
                          >
                            {fase?.id} · {fase?.nome}
                          </span>
                        </td>

                        <td className="px-5 py-4">
                          <button
                            type="button"
                            onClick={() =>
                              setEntregaAberta(aberta ? null : entrega.id)
                            }
                            aria-expanded={aberta}
                            className="text-sm font-semibold text-primary underline-offset-4 hover:underline"
                          >
                            {aberta ? "Fechar índice" : "Ver índice"}
                          </button>
                        </td>
                      </tr>

                      {aberta && (
                        <tr className="border-t border-border bg-muted/30">
                          <td colSpan={4} className="px-5 py-5">
                            <div className="max-w-3xl">
                              <p className="mb-3 text-sm font-bold text-foreground">
                                Exemplo de índice · {entrega.nome}
                              </p>

                              <ol className="list-inside list-decimal space-y-2 text-sm leading-relaxed text-muted-foreground">
                                {entrega.indice.map((item) => (
                                  <li key={item}>{item}</li>
                                ))}
                              </ol>

                              <p className="mt-4 text-xs text-muted-foreground">
                                Estrutura ilustrativa. O conteúdo final será
                                definido conforme o Plano do Ciclo.
                              </p>
                            </div>
                          </td>
                        </tr>
                      )}
                    </Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>

          <p className="mt-3 text-xs text-muted-foreground">
            Em telas menores, deslize horizontalmente para consultar todas as
            colunas da tabela.
          </p>
        </div>
      </div>
    </section>
  );
}
