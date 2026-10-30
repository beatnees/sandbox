"use client";

import { useEffect, useState } from "react";
type PlanSection = {
  number: string;
  title: string;
  description: string;
  purpose?: string;
  questions?: string[];
  example?: string;
  checklist?: string[];
  requiredAttachments?: string[];
  optionalAttachments?: string[];
};

const sections: PlanSection[] = [
  {
    number: "5.1",
    title: "Objeto e perfil técnico",
    description:
      "Delimita a solução que será testada, sua versão, arquitetura, dados e maturidade tecnológica.",
    purpose:
      "Delimitar exatamente o que será testado. Isso permite escolher os métodos de teste adequados.",
    questions: [
      "Qual é a versão da solução e a sua arquitetura? É proprietária ou aberta?",
      "Quais dados entram e o que a solução entrega?",
      "Como o fluxo de dados está estruturado e como os dados são preparados?",
      "Em que nível de maturidade tecnológica (TRL, de 1 a 9) a solução está? Já foi validada em ambiente relevante ou apenas em laboratório?",
    ],
    example:
      "Assistente de apoio à leitura, versão 2.3, baseado em modelo de linguagem ajustado com dados sintéticos. Entrada: perguntas de estudantes. Saída: respostas com indicação de fonte. Maturidade: TRL 6, validado em ambiente simulado.",
  },
  {
    number: "5.2",
    title: "Transparência e explicabilidade",
    description:
      "Define como as pessoas serão informadas sobre o teste e como as decisões serão explicadas.",
    purpose:
      "Definir como as pessoas envolvidas serão informadas de que a solução está em fase de teste e como poderão compreender ou questionar suas respostas e decisões.",
    questions: [
      "Onde e como os usuários serão informados de que a solução está em teste? Quais riscos e limitações serão comunicados?",
      "Como uma decisão ou resposta automatizada será explicada às pessoas afetadas?",
      "Quais métodos de explicabilidade serão utilizados, como SHAP ou LIME? Haverá revisão humana?",
      "Quais referências éticas e técnicas serão consideradas, como recomendações da UNESCO e da OCDE, NIST AI RMF e ISO/IEC 42001?",
    ],
    example:
      "Um aplicativo apresenta um aviso informando que está em teste supervisionado. O aviso inclui um link para consultar os riscos e limitações da solução e um canal para contestar uma resposta.",
  },
  {
    number: "5.3",
    title: "Riscos e segurança",
    description:
      "Mapeia os riscos da solução, seus impactos e os controles de segurança.",
    purpose:
      "Identificar os principais riscos da solução e acompanhar como eles podem mudar ao longo das fases de testagem. Um risco considerado baixo com dados históricos, por exemplo, pode se tornar alto quando a solução passa a interagir com pessoas reais.",
    questions: [
      "Quais são os três principais riscos identificados? Qual é a probabilidade de ocorrência e o impacto de cada um?",
      "A solução utiliza dados sensíveis ou envolve crianças e grupos em situação de vulnerabilidade?",
      "A solução pode tomar decisões sem revisão humana?",
      "Quais controles serão utilizados para proteger os dados, como controle de acesso, criptografia, anonimização e procedimentos para incidentes?",
      "Existem riscos específicos de IA, como vieses, informações falsas, ataques ou falta de explicabilidade?",
    ],
    example:
      "Risco identificado: exposição de dados de estudantes. Probabilidade média e impacto alto. Mitigação: acesso restrito por perfil e uso de dados pseudonimizados. Risco residual estimado: baixo.",
  },
  {
    number: "5.4",
    title: "Métricas de sucesso e regras de interrupção",
    description:
      "Estabelece critérios para avaliar os resultados e condições para interromper o teste.",
    purpose:
      "Definir, antes do início da testagem, quais resultados serão considerados satisfatórios e quais situações exigirão a interrupção do experimento.",
    questions: [
      "Qual é o desempenho mínimo esperado em cada fase, considerando critérios como acurácia, taxa de falsos alertas e robustez?",
      "Quais diferenças de erro entre grupos de pessoas ou territórios serão consideradas aceitáveis?",
      "Os resultados podem ser interpretados e utilizados? É possível explicar decisões que forem contestadas?",
      "Quais incidentes ou limites atingidos deverão provocar a interrupção automática do teste?",
    ],
    example:
      "A passagem para a próxima fase depende de uma taxa de falsos alertas igual ou inferior a 10% e de uma diferença de erros entre territórios de, no máximo, 5 pontos percentuais. Valores meramente ilustrativos.",
  },
  {
    number: "5.5",
    title: "Salvaguardas de dados e plano de saída",
    description:
      "Define como os dados serão tratados ao final ou em caso de interrupção do teste.",
    purpose:
      "Garantir que, ao término ou à interrupção do experimento, não permaneçam dados ou acessos ativos sem tratamento adequado. O plano deve prever o que acontecerá com todas as informações utilizadas durante a testagem.",
    questions: [
      "Se o teste terminasse hoje, o que aconteceria com os dados coletados e utilizados?",
      "Quais dados deverão ser eliminados, anonimizados ou preservados? Qual será a justificativa?",
      "Como as pessoas afetadas serão informadas sobre o encerramento do teste?",
      "Quais sistemas, ambientes, cópias e acessos precisarão ser desativados?",
    ],
    example:
      "Ao encerrar o teste, a equipe elimina ou anonimiza todas as cópias dos dados, informa as pessoas envolvidas, desativa o ambiente de experimentação, revoga os acessos e registra os procedimentos na documentação final.",
    checklist: [
      "Dados apagados ou anonimizados em todas as cópias",
      "Pessoas afetadas informadas sobre o encerramento",
      "Ambiente de teste desativado",
      "Acessos revogados",
      "Documentação final registrada",
    ],
  },
  {
    number: "5.6",
    title: "Informações sigilosas e publicação",
    description:
      "Distingue informações de interesse público de conteúdos comerciais ou industriais sigilosos.",
    purpose:
      "Estabelecer quais informações poderão ser divulgadas publicamente e quais precisam permanecer protegidas por sigilo comercial ou industrial, sem impedir a publicação dos resultados relevantes para o interesse público.",
    questions: [
      "Quais partes da solução envolvem lógica proprietária, segredos comerciais ou informações industriais?",
      "A divulgação de determinada informação poderia causar prejuízo competitivo ou comercial?",
      "Quais informações já são públicas ou podem ser divulgadas sem comprometer a segurança e os direitos envolvidos?",
      "Como será preparada uma versão pública dos resultados, incluindo desempenho, riscos e medidas de mitigação?",
    ],
    example:
      "O relatório público apresenta os resultados de desempenho, os riscos identificados e as medidas de mitigação adotadas. Detalhes exclusivamente comerciais ou industriais, como componentes proprietários protegidos, permanecem sob sigilo.",
  },
  {
    number: "5.7",
    title: "Anexos",
    description:
      "Reúne documentos técnicos e materiais complementares necessários à avaliação.",
    purpose:
      "Reunir documentos que ajudem a compreender a solução, avaliar seus riscos e acompanhar a execução do experimento. Devem ser incluídos apenas os materiais relevantes para a avaliação do projeto.",
    questions: [
      "O projeto possui um diagrama de arquitetura e fluxo de dados?",
      "A matriz de riscos está documentada, com probabilidade, impacto e medidas de mitigação?",
      "Existe um cronograma de execução, como um gráfico de Gantt?",
      "Há documentos técnicos, certificações de segurança, estudos de caso, parecer jurídico, feedback de usuários ou cartas de apoio que contribuam para a avaliação?",
    ],
    example:
      "Anexos principais: diagrama de arquitetura e fluxo de dados, matriz de riscos e cronograma de execução. Anexos complementares: documentação técnica da solução, certificações de segurança e registros de feedback dos usuários.",
    requiredAttachments: [
      "Diagrama da arquitetura e do fluxo de dados",
      "Matriz de riscos",
      "Cronograma de execução em formato Gantt",
    ],
    optionalAttachments: [
      "Documento técnico da solução",
      "Certificações de segurança",
      "Estudos de caso",
      "Parecer jurídico",
      "Feedback de usuários",
      "Cartas de apoio",
    ],
  },
];

export default function PlanoSections() {
  const [selected, setSelected] = useState<string | null>(null);
  const [columns, setColumns] = useState(2);

  useEffect(() => {
    const updateColumns = () => {
      setColumns(window.innerWidth >= 1024 ? 4 : 2);
    };

    updateColumns();
    window.addEventListener("resize", updateColumns);

    return () => {
      window.removeEventListener("resize", updateColumns);
    };
  }, []);

  const rows = [];

  for (let i = 0; i < sections.length; i += columns) {
    rows.push(sections.slice(i, i + columns));
  }

  return (
    <div className="space-y-8">
      {rows.map((row, rowIndex) => {
        const activeSection = row.find(
          (section) => section.number === selected,
        );

        return (
          <section key={rowIndex} className="space-y-5">
            <div
              className={`grid gap-5 ${
                columns === 4 ? "grid-cols-4" : "grid-cols-2"
              }`}
            >
              {row.map((section) => (
                <button
                  key={section.number}
                  type="button"
                  onClick={() =>
                    setSelected(
                      selected === section.number ? null : section.number,
                    )
                  }
                  aria-expanded={selected === section.number}
                  aria-controls={
                    selected === section.number
                      ? "plano-section-content"
                      : undefined
                  }
                  className={`rounded-2xl border p-6 text-left shadow-sm transition-all hover:-translate-y-1 hover:border-primary ${
                    selected === section.number
                      ? "border-primary bg-primary/5"
                      : "border-border bg-card"
                  }`}
                >
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-sm font-bold text-primary">
                    {section.number}
                  </span>

                  <h3 className="mt-5 font-bold text-foreground">
                    {section.title}
                  </h3>

                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {section.description}
                  </p>

                  <span className="mt-5 block text-sm font-semibold text-primary">
                    {selected === section.number
                      ? "Fechar seção ↑"
                      : "Ver detalhes ↓"}
                  </span>
                </button>
              ))}
            </div>

            {activeSection && (
              <div
                id="plano-section-content"
                className="rounded-2xl border border-primary/20 bg-card p-6 shadow-sm md:p-8"
              >
                <h3 className="text-xl font-bold text-foreground">
                  {activeSection.number} — {activeSection.title}
                </h3>

                <div className="mt-6">
                  <h4 className="font-bold text-foreground">Para que serve</h4>
                  <p className="mt-2 leading-relaxed text-muted-foreground">
                    {activeSection.purpose ?? activeSection.description}
                  </p>
                </div>

                {activeSection.questions && (
                  <div className="mt-6">
                    <h4 className="font-bold text-foreground">
                      Perguntas norteadoras
                    </h4>

                    <ul className="mt-3 list-disc space-y-2 pl-6 text-muted-foreground">
                      {activeSection.questions.map((question, index) => (
                        <li key={index}>{question}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {activeSection.example && (
                  <div className="mt-6 rounded-xl border border-primary/20 bg-primary/5 p-5">
                    <h4 className="font-bold text-primary">
                      Exemplo ilustrativo
                    </h4>

                    <p className="mt-2 leading-relaxed text-muted-foreground">
                      {activeSection.example}
                    </p>
                  </div>
                )}

                {activeSection.number === "5.7" && (
                  <div className="mt-8 grid gap-6 md:grid-cols-2">
                    <div className="rounded-xl border border-primary/20 bg-primary/5 p-5">
                      <h4 className="font-bold text-foreground">
                        Anexos obrigatórios
                      </h4>

                      <ul className="mt-4 space-y-3">
                        {activeSection.requiredAttachments?.map((item) => (
                          <li key={item} className="flex items-start gap-3">
                            <span className="font-bold text-primary">✓</span>
                            <span className="text-sm leading-relaxed text-muted-foreground">
                              {item}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="rounded-xl border border-border bg-muted/30 p-5">
                      <h4 className="font-bold text-foreground">
                        Anexos facultativos
                      </h4>

                      <ul className="mt-4 space-y-3">
                        {activeSection.optionalAttachments?.map((item) => (
                          <li key={item} className="flex items-start gap-3">
                            <span className="text-muted-foreground">•</span>
                            <span className="text-sm leading-relaxed text-muted-foreground">
                              {item}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                {activeSection.number === "5.7" && (
                  <p className="mt-4 text-sm text-muted-foreground">
                    Inclua somente os materiais que contribuam para a avaliação
                    do projeto.
                  </p>
                )}

                {activeSection.number === "5.6" && (
                  <div className="mt-8">
                    <h4 className="font-bold text-foreground">
                      O que pode ser publicado e o que deve permanecer sigiloso?
                    </h4>

                    <p className="mt-2 text-sm text-muted-foreground">
                      A análise considera quatro critérios para distinguir
                      informações de interesse público de informações protegidas
                      por sigilo comercial ou industrial.
                    </p>

                    <div className="mt-5 overflow-x-auto">
                      <table className="w-full min-w-140 border-collapse text-left text-sm">
                        <thead>
                          <tr>
                            <th className="border border-border bg-muted/50 p-3 font-semibold text-foreground">
                              Critério
                            </th>
                            <th className="border border-border bg-green-50 p-3 font-semibold text-green-800">
                              Publicável
                            </th>
                            <th className="border border-border bg-orange-50 p-3 font-semibold text-orange-800">
                              Sigiloso
                            </th>
                          </tr>
                        </thead>

                        <tbody className="text-muted-foreground">
                          <tr>
                            <td className="border border-border p-3 font-medium text-foreground">
                              Origem da informação
                            </td>
                            <td className="border border-border p-3">
                              Resultados de testes e informações de interesse
                              público.
                            </td>
                            <td className="border border-border p-3">
                              Lógica proprietária e segredos comerciais ou
                              industriais.
                            </td>
                          </tr>

                          <tr>
                            <td className="border border-border p-3 font-medium text-foreground">
                              Interesse
                            </td>
                            <td className="border border-border p-3">
                              Transparência sobre desempenho, segurança e
                              limitações.
                            </td>
                            <td className="border border-border p-3">
                              Proteção de informações exclusivamente comerciais.
                            </td>
                          </tr>

                          <tr>
                            <td className="border border-border p-3 font-medium text-foreground">
                              Dano
                            </td>
                            <td className="border border-border p-3">
                              Divulgação sem prejuízo indevido a direitos
                              protegidos.
                            </td>
                            <td className="border border-border p-3">
                              Divulgação que possa causar prejuízo competitivo
                              ou comercial.
                            </td>
                          </tr>

                          <tr>
                            <td className="border border-border p-3 font-medium text-foreground">
                              Exemplo
                            </td>
                            <td className="border border-border p-3">
                              Métricas de desempenho, riscos identificados e
                              medidas de mitigação.
                            </td>
                            <td className="border border-border p-3">
                              Detalhes técnicos protegidos da implementação
                              proprietária.
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
                      A classificação deve considerar o interesse público, os
                      direitos envolvidos e a legislação aplicável.
                    </p>
                  </div>
                )}

                {activeSection.number === "5.3" && (
                  <div className="mt-8">
                    <h4 className="font-bold text-foreground">
                      Matriz de riscos — probabilidade × impacto
                    </h4>

                    <p className="mt-2 text-sm text-muted-foreground">
                      Esquema visual ilustrativo para apoiar a classificação dos
                      riscos.
                    </p>

                    <div className="mt-5">
                      <p className="mb-3 text-center text-sm font-semibold text-foreground">
                        Impacto
                      </p>

                      <div className="grid grid-cols-[auto_1fr] gap-3">
                        <div className="flex items-center justify-center">
                          <span className="-rotate-90 whitespace-nowrap text-sm font-semibold text-foreground">
                            Probabilidade
                          </span>
                        </div>

                        <div className="space-y-2">
                          <div className="grid grid-cols-4 gap-2 text-center text-xs text-muted-foreground">
                            <span>Baixo</span>
                            <span>Moderado</span>
                            <span>Alto</span>
                            <span>Muito alto</span>
                          </div>

                          <div className="grid grid-cols-4 gap-2">
                            <div className="h-12 rounded-lg bg-yellow-200" />
                            <div className="h-12 rounded-lg bg-orange-200" />
                            <div className="h-12 rounded-lg bg-red-300" />
                            <div className="h-12 rounded-lg bg-red-400" />

                            <div className="h-12 rounded-lg bg-lime-200" />
                            <div className="h-12 rounded-lg bg-yellow-200" />
                            <div className="h-12 rounded-lg bg-orange-200" />
                            <div className="h-12 rounded-lg bg-red-300" />

                            <div className="h-12 rounded-lg bg-green-200" />
                            <div className="h-12 rounded-lg bg-lime-200" />
                            <div className="h-12 rounded-lg bg-yellow-200" />
                            <div className="h-12 rounded-lg bg-orange-200" />

                            <div className="h-12 rounded-lg bg-green-200" />
                            <div className="h-12 rounded-lg bg-green-200" />
                            <div className="h-12 rounded-lg bg-lime-200" />
                            <div className="h-12 rounded-lg bg-yellow-200" />
                          </div>

                          <div className="grid grid-cols-4 gap-2 text-center text-xs text-muted-foreground">
                            <span>Muito alta</span>
                            <span>Alta</span>
                            <span>Média</span>
                            <span>Baixa</span>
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 flex flex-wrap justify-center gap-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-2">
                          <span className="h-3 w-3 rounded-sm bg-green-200" />
                          Menor criticidade
                        </span>
                        <span className="flex items-center gap-2">
                          <span className="h-3 w-3 rounded-sm bg-yellow-200" />
                          Atenção
                        </span>
                        <span className="flex items-center gap-2">
                          <span className="h-3 w-3 rounded-sm bg-orange-200" />
                          Elevada
                        </span>
                        <span className="flex items-center gap-2">
                          <span className="h-3 w-3 rounded-sm bg-red-300" />
                          Maior criticidade
                        </span>
                      </div>
                    </div>
                    <div className="mt-8">
                      <h4 className="font-bold text-foreground">
                        Exemplo de evolução do risco entre fases
                      </h4>

                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                        Um mesmo risco pode mudar de criticidade conforme o
                        ambiente e o nível de exposição da solução.
                      </p>

                      <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                        {[
                          {
                            phase: "Dados históricos",
                            risk: "Baixo",
                            detail:
                              "Dados pseudonimizados, sem interação com usuários reais.",
                            color: "bg-green-100 text-green-800",
                          },
                          {
                            phase: "Simulação",
                            risk: "Moderado",
                            detail:
                              "Cenários simulados permitem identificar falhas antes do uso.",
                            color: "bg-yellow-100 text-yellow-800",
                          },
                          {
                            phase: "Observação em paralelo",
                            risk: "Elevado",
                            detail:
                              "A solução é observada em contexto real, sem orientar condutas.",
                            color: "bg-orange-100 text-orange-800",
                          },
                          {
                            phase: "Piloto real",
                            risk: "Alto",
                            detail:
                              "A interação com usuários exige controles e supervisão reforçados.",
                            color: "bg-red-100 text-red-800",
                          },
                        ].map((item) => (
                          <div
                            key={item.phase}
                            className="rounded-xl border border-border bg-muted/30 p-4"
                          >
                            <p className="font-semibold text-foreground">
                              {item.phase}
                            </p>

                            <span
                              className={`mt-3 inline-flex rounded-full px-3 py-1 text-xs font-bold ${item.color}`}
                            >
                              Risco {item.risk}
                            </span>

                            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                              {item.detail}
                            </p>
                          </div>
                        ))}
                      </div>

                      <p className="mt-3 text-xs text-muted-foreground">
                        Classificações meramente ilustrativas. A avaliação real
                        depende da solução, dos dados utilizados e das
                        salvaguardas adotadas.
                      </p>
                    </div>
                  </div>
                )}
                {activeSection.checklist && (
                  <div className="mt-6">
                    <h4 className="font-bold text-foreground">
                      Checklist de encerramento
                    </h4>

                    <ul className="mt-3 space-y-3">
                      {activeSection.checklist.map((item, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border border-primary/40 text-xs text-primary">
                            ✓
                          </span>
                          <span className="text-muted-foreground">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </section>
        );
      })}
    </div>
  );
}
