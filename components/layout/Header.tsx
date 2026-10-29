"use client";
import LoginModal from "../auth/LoginModal";
import { useState } from "react";
import Link from "next/link";
import { Menu, X, Bot } from "lucide-react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-surface/80 backdrop-blur">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-4">
        {/* Primeira linha: logo e acesso */}
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary font-bold text-primary-foreground">
              <Bot size={24} strokeWidth={2} />
            </div>

            <div>
              <span className="block font-display text-lg font-bold text-foreground sm:inline">
                Sandbox
              </span>
              <span className="text-sm text-muted-foreground sm:ml-1">
                IA na Educação
              </span>
            </div>
          </Link>

          <div className="flex shrink-0 items-center gap-3">
            <LoginModal
              label="Acessar plataforma"
              className="hidden rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition hover:brightness-95 sm:block"
            />

            <button
              type="button"
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-border text-foreground md:hidden"
              aria-label="Abrir menu"
            >
              {menuOpen ? <X size={21} /> : <Menu size={21} />}
            </button>
          </div>
        </div>

        {/* Segunda linha: navegação desktop */}
        <nav className="hidden flex-wrap items-center justify-center gap-x-5 gap-y-2 border-t border-border pt-4 xl:flex">
          <Link
            href="/"
            className="text-sm font-medium text-muted-foreground transition hover:text-primary"
          >
            Início
          </Link>

          <Link
            href="/o-que-e"
            className="text-sm font-medium text-muted-foreground transition hover:text-primary"
          >
            O que é
          </Link>

          <Link
            href="/experiencia-mec"
            className="text-sm font-medium text-muted-foreground transition hover:text-primary"
          >
            Experiência MEC
          </Link>

          <Link
            href="/ciclo"
            className="text-sm font-medium text-muted-foreground transition hover:text-primary"
          >
            Ciclo
          </Link>

          <Link
            href="/cronograma"
            className="text-sm font-medium text-muted-foreground transition hover:text-primary"
          >
            Cronograma
          </Link>

          <Link
            href="/plano-do-ciclo"
            className="text-sm font-medium text-muted-foreground transition hover:text-primary"
          >
            Plano do ciclo
          </Link>

          <Link
            href="/entregas"
            className="text-sm font-medium text-muted-foreground transition hover:text-primary"
          >
            Entregas
          </Link>

          <Link
            href="/governanca"
            className="text-sm font-medium text-muted-foreground transition hover:text-primary"
          >
            Governança
          </Link>

          <Link
            href="/aplicacoes"
            className="text-sm font-medium text-muted-foreground transition hover:text-primary"
          >
            Aplicações
          </Link>

          <Link
            href="/referencias"
            className="text-sm font-medium text-muted-foreground transition hover:text-primary"
          >
            Referências
          </Link>

          <Link
            href="/sobre"
            className="text-sm font-medium text-muted-foreground transition hover:text-primary"
          >
            Sobre
          </Link>
        </nav>
      </div>

      {/* navegação mobile */}
      {menuOpen && (
        <div className="border-t border-border bg-surface px-6 py-5 md:hidden">
          <nav className="flex flex-col gap-1">
            <Link
              href="/"
              onClick={() => setMenuOpen(false)}
              className="rounded-xl px-4 py-3 font-medium text-muted-foreground transition hover:bg-primary-soft hover:text-primary"
            >
              Início
            </Link>

            <Link
              href="/o-que-e"
              onClick={() => setMenuOpen(false)}
              className="rounded-xl px-4 py-3 font-medium text-muted-foreground transition hover:bg-primary-soft hover:text-primary"
            >
              O que é
            </Link>

            <Link
              href="/experiencia-mec"
              onClick={() => setMenuOpen(false)}
              className="rounded-xl px-4 py-3 font-medium text-muted-foreground transition hover:bg-primary-soft hover:text-primary"
            >
              Experiência MEC
            </Link>

            <Link
              href="/ciclo"
              onClick={() => setMenuOpen(false)}
              className="rounded-xl px-4 py-3 font-medium text-muted-foreground transition hover:bg-primary-soft hover:text-primary"
            >
              Ciclo
            </Link>

            <Link
              href="/cronograma"
              onClick={() => setMenuOpen(false)}
              className="rounded-xl px-4 py-3 font-medium text-muted-foreground transition hover:bg-primary-soft hover:text-primary"
            >
              Cronograma
            </Link>

            <Link
              href="/plano-do-ciclo"
              onClick={() => setMenuOpen(false)}
              className="rounded-xl px-4 py-3 font-medium text-muted-foreground transition hover:bg-primary-soft hover:text-primary"
            >
              Plano do ciclo
            </Link>

            <Link
              href="/entregas"
              onClick={() => setMenuOpen(false)}
              className="rounded-xl px-4 py-3 font-medium text-muted-foreground transition hover:bg-primary-soft hover:text-primary"
            >
              Entregas
            </Link>

            <Link
              href="/governanca"
              onClick={() => setMenuOpen(false)}
              className="rounded-xl px-4 py-3 font-medium text-muted-foreground transition hover:bg-primary-soft hover:text-primary"
            >
              Governança
            </Link>

            <Link
              href="/aplicacoes"
              onClick={() => setMenuOpen(false)}
              className="rounded-xl px-4 py-3 font-medium text-muted-foreground transition hover:bg-primary-soft hover:text-primary"
            >
              Aplicações
            </Link>

            <Link
              href="/referencias"
              onClick={() => setMenuOpen(false)}
              className="rounded-xl px-4 py-3 font-medium text-muted-foreground transition hover:bg-primary-soft hover:text-primary"
            >
              Referências
            </Link>

            <Link
              href="/sobre"
              onClick={() => setMenuOpen(false)}
              className="rounded-xl px-4 py-3 font-medium text-muted-foreground transition hover:bg-primary-soft hover:text-primary"
            >
              Sobre o NEES e contato
            </Link>

            <LoginModal
              label="Acessar plataforma"
              className="mt-3 rounded-xl bg-primary px-5 py-3 text-center font-semibold text-primary-foreground"
            />
          </nav>
        </div>
      )}
    </header>
  );
}
