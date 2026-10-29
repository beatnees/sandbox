"use client";

import Link from "next/link";
import { useState } from "react";

const blocos = [
  {
    numero: 1,
    titulo: "O que se testa",
    relacao: "avalia",
    descricao:
      "Sistemas de IA, serviços digitais e usos de dados, em versões existentes ou em desenvolvimento.",
    href: "/o-que-e",

    posicao: { left: "39%", top: "2%", width: "22%" },
  },
  {
    numero: 2,
    titulo: "Quem participa",
    relacao: "reúne",
    descricao:
      "Órgão público demandante, NEES, especialistas e o responsável pela solução.",
    href: "/governanca",

    posicao: { left: "73%", top: "9%", width: "22%" },
  },
  {
    numero: 3,
    titulo: "Com quais regras",
    relacao: "respeita",
    descricao:
      "LGPD, ética em pesquisa, autorizações setoriais e supervisão humana. Participar do Sandbox não dispensa essas exigências.",
    href: "/governanca",

    posicao: { left: "74%", top: "36%", width: "22%" },
  },
  {
    numero: 4,
    titulo: "Como funciona",
    relacao: "segue",
    descricao:
      "Ciclo de seis meses em quatro fases: desenho, preparação, experimentação e evidência, com portões de decisão.",
    href: "/ciclo",

    posicao: { left: "65%", top: "73%", width: "25%" },
  },
  {
    numero: 5,
    titulo: "O que entrega",
    relacao: "gera",
    descricao:
      "Plano, protocolo, relatório técnico, recomendação e guia para novos ciclos.",
    href: "/entregas",

    posicao: { left: "10%", top: "73%", width: "25%" },
  },
  {
    numero: 6,
    titulo: "Que decisão apoia",
    relacao: "subsidia",
    descricao:
      "Ampliar, corrigir, restringir ou encerrar o uso, com condições registradas.",
    href: "/entregas",

    posicao: { left: "4%", top: "36%", width: "22%" },
  },
  {
    numero: 7,
    titulo: "Por que testar",
    relacao: "abre novos ciclos",
    descricao:
      "Transformar incertezas sobre utilidade, segurança e viabilidade em evidências sobre um uso definido.",
    href: "/o-que-e",
    posicao: { left: "5%", top: "9%", width: "22%" },
  },
];

export default function MapaSandbox() {
  const [mostrarCaminho, setMostrarCaminho] = useState(false);

  return (
    <section id="mapa-sandbox" className="bg-background px-6 py-20 md:py-28">
      <div className="mx-auto max-w-7xl">
        <header className="mx-auto max-w-3xl text-center">
          <span className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
            Mapa conceitual
          </span>

          <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground md:text-5xl">
            Como o Sandbox transforma testes em decisões
          </h2>

          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
            Explore o mapa. Clique em cada bloco para ver como o sandbox
            funciona.
          </p>
        </header>

        <div className="mt-10 text-center">
          <button
            type="button"
            onClick={() => setMostrarCaminho(true)}
            aria-pressed={mostrarCaminho}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 font-semibold text-primary-foreground transition hover:brightness-95 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
          >
            {mostrarCaminho ? "Caminho destacado" : "Ver o caminho completo"}
            <span aria-hidden="true">→</span>
          </button>
        </div>

        {/* Mapa visual para telas médias e grandes */}
        <div
          role="group"
          aria-label="Mapa conceitual interativo do Sandbox de IA"
          className="relative mx-auto mt-10 hidden aspect-10/7 max-w-6xl md:block"
        >
          <svg
            viewBox="0 0 1000 700"
            className="absolute inset-0 h-full w-full"
            fill="none"
            aria-hidden="true"
          >
            <defs>
              <marker
                id="seta-laranja-sandbox"
                markerWidth="8"
                markerHeight="8"
                refX="6"
                refY="3"
                orient="auto"
              >
                <path d="M0,0 L6,3 L0,6 Z" fill="#ea580c" />
              </marker>
            </defs>

            {/* Conexões entre os blocos e o Sandbox central */}
            <g stroke="#94a3b8" strokeWidth="1.5" strokeLinecap="round">
              <path d="M430 290 L270 190" />
              <path d="M500 275 L500 145" />
              <path d="M570 290 L730 190" />
              <path d="M610 345 L740 310" />
              <path d="M570 425 L650 510" />
              <path d="M430 425 L350 510" />
              <path d="M390 345 L260 310" />
            </g>

            {/* Relações indicadas no documento */}
            <g
              fill="#475569"
              fontSize="14"
              fontWeight="600"
              textAnchor="middle"
            >
              <text x="335" y="238">
                avalia
              </text>
              <text x="520" y="215">
                reúne
              </text>
              <text x="665" y="238">
                respeita
              </text>
              <text x="680" y="325">
                segue
              </text>

              {/* 4 → 5 */}
              <text
                x="500"
                y="560"
                opacity={mostrarCaminho ? 1 : 0}
                style={{ transition: "opacity 500ms ease" }}
              >
                gera
              </text>

              {/* 5 → 6 */}
              <text
                x="220"
                y="435"
                opacity={mostrarCaminho ? 1 : 0}
                style={{ transition: "opacity 500ms ease 550ms" }}
              >
                subsidia
              </text>

              {/* 6 → 7 */}
              <text
                x="205"
                y="205"
                opacity={mostrarCaminho ? 1 : 0}
                style={{ transition: "opacity 500ms ease 1100ms" }}
              >
                <tspan x="205" dy="0">
                  abre novos
                </tspan>
                <tspan x="205" dy="18">
                  ciclos
                </tspan>
              </text>
            </g>

            {/* Percurso laranja: ciclo, entregas, decisão e novos ciclos */}
            <g
              stroke="#ea580c"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
              markerEnd="url(#seta-laranja-sandbox)"
              opacity={mostrarCaminho ? 1 : 0}
            >
              {/* 4 → 5: Como funciona → O que entrega */}
              <path
                d="M650 575 L350 575"
                pathLength="100"
                strokeDasharray="100"
                strokeDashoffset={mostrarCaminho ? 0 : 100}
                style={{
                  transition: "stroke-dashoffset 700ms ease",
                }}
              />

              {/* 5 → 6: O que entrega → Que decisão apoia */}
              <path
                d="M225 510 L150 370"
                pathLength="100"
                strokeDasharray="100"
                strokeDashoffset={mostrarCaminho ? 0 : 100}
                style={{
                  transition: "stroke-dashoffset 700ms ease 550ms",
                }}
              />

              {/* 6 → 7: Que decisão apoia → Por que testar */}
              <path
                d="M150 250 L160 165"
                pathLength="100"
                strokeDasharray="100"
                strokeDashoffset={mostrarCaminho ? 0 : 100}
                style={{
                  transition: "stroke-dashoffset 700ms ease 1100ms",
                }}
              />
            </g>
          </svg>

          {/* Sandbox central */}
          <div className="absolute left-[39%] top-[39%] flex h-[21.5%] w-[22%] flex-col items-center justify-center rounded-3xl border-2 border-primary bg-primary px-3 text-center text-primary-foreground shadow-xl">
            <span className="mt-2 text-xl font-bold leading-tight lg:text-2xl">
              Sandbox de IA
            </span>
            <span className="mt-2 text-xs leading-relaxed opacity-90">
              Testar com supervisão para decidir com evidências
            </span>
          </div>

          {/* Blocos navegáveis */}
          {blocos.map((bloco) => {
            const fazParteDoCaminho = bloco.numero >= 4;

            return (
              <Link
                key={bloco.numero}
                href={bloco.href}
                aria-label={`${bloco.numero}. ${bloco.titulo}. ${bloco.descricao}`}
                style={{
                  ...bloco.posicao,
                  transitionDelay:
                    mostrarCaminho && fazParteDoCaminho
                      ? `${(bloco.numero - 4) * 350}ms`
                      : "0ms",
                }}
                className={`group absolute z-10 flex min-h-29.5 flex-col justify-center rounded-2xl border-2 p-4 shadow-md transition-[border-color,background-color,box-shadow] duration-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${
                  fazParteDoCaminho
                    ? mostrarCaminho
                      ? "border-orange-500 bg-orange-50 shadow-orange-200 dark:bg-orange-950/40"
                      : "border-orange-300 bg-card"
                    : "border-border bg-card hover:border-primary"
                }`}
              >
                <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  {bloco.numero} - {bloco.titulo}
                </span>

                <span className="mt-2 hidden text-sm leading-relaxed text-muted-foreground group-hover:block group-focus-visible:block">
                  {bloco.descricao}
                </span>

                <span className="mt-2 text-xs font-semibold text-primary">
                  Abrir conteúdo →
                </span>
              </Link>
            );
          })}
        </div>

        {/* Lista acessível para celulares e leitores de tela */}
        <ol className="mt-10 grid gap-4 md:hidden">
          {blocos.map((bloco) => {
            const fazParteDoCaminho = bloco.numero >= 4;

            return (
              <li key={bloco.numero}>
                <Link
                  href={bloco.href}
                  className={`block rounded-2xl border-2 p-5 transition hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${
                    fazParteDoCaminho
                      ? "border-orange-300 bg-orange-50/70 dark:bg-orange-950/30"
                      : "border-border bg-card"
                  }`}
                >
                  <span className="text-sm font-semibold text-muted-foreground">
                    {bloco.relacao}
                  </span>

                  <span className="mt-1 block text-lg font-bold text-card-foreground">
                    {bloco.numero} - {bloco.titulo}
                  </span>

                  <span className="mt-2 block text-sm leading-relaxed text-muted-foreground">
                    {bloco.descricao}
                  </span>

                  <span className="mt-3 block text-sm font-semibold text-primary">
                    Conhecer esta etapa →
                  </span>
                </Link>
              </li>
            );
          })}
        </ol>

        {/* Faixa de credibilidade */}
        <div className="mt-14 grid gap-4 md:grid-cols-3">
          <article className="rounded-2xl border border-border bg-card p-6">
            <p className="text-2xl font-bold text-primary">15 anos</p>
            <h3 className="mt-2 font-semibold text-card-foreground">
              Pesquisa aplicada
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Pesquisa em tecnologias sociais para políticas públicas, com
              vínculo à UFAL.
            </p>
          </article>

          <article className="rounded-2xl border border-border bg-card p-6">
            <h3 className="text-lg font-bold text-card-foreground">
              Experiência com o MEC
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Método e instrumentos para selecionar e avaliar IA no Sandbox de
              IA na Educação.
            </p>
          </article>

          <article className="rounded-2xl border border-border bg-card p-6">
            <h3 className="text-lg font-bold text-card-foreground">
              Segurança da informação
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Certificação ISO/IEC 27001 no escopo UFAL/IC/NEES.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}
