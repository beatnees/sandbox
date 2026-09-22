"use client";
import { useState } from "react";
import Link from "next/link";
import { Menu, X, Bot } from "lucide-react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-surface)/95 backdrop-blur">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        {/* Logo */}
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

        {/* Navegação desktop */}
        <nav className="hidden items-center gap-8 md:flex">
          <a
            href="#"
            className="text-sm font-medium text-muted-foreground transition hover:text-primary"
          >
            Início
          </a>

          <a
            href="#sobre"
            className="text-sm font-medium text-muted-foreground transition hover:text-primary"
          >
            Sobre
          </a>

          <a
            href="#como-funciona"
            className="text-sm font-medium text-muted-foreground transition hover:text-primary"
          >
            Como funciona
          </a>

          <a
            href="#projetos"
            className="text-sm font-medium text-muted-foreground transition hover:text-primary"
          >
            Projetos
          </a>
        </nav>

        {/* área direita */}
        <div className="flex items-center gap-3">
          {/* botão desktop */}
          <Link
            href="/login"
            className="hidden rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition hover:brightness-95 sm:block"
          >
            Acessar plataforma
          </Link>

          {/* menu mobile */}
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

      {/* navegação mobile */}
      {menuOpen && (
        <div className="border-t border-border bg-surface px-6 py-5 md:hidden">
          <nav className="flex flex-col gap-1">
            <a
              href="#"
              onClick={() => setMenuOpen(false)}
              className="rounded-xl px-4 py-3 font-medium text-muted-foreground transition hover:bg-primary-soft hover:text-primary"
            >
              Início
            </a>
            <a
              href="#"
              onClick={() => setMenuOpen(false)}
              className="rounded-xl px-4 py-3 font-medium text-muted-foreground transition hover:bg-primary-soft hover:text-primary"
            >
              Sobre
            </a>
            <a
              href="#"
              onClick={() => setMenuOpen(false)}
              className="rounded-xl px-4 py-3 font-medium text-muted-foreground transition hover:bg-primary-soft hover:text-primary"
            >
              Como funciona
            </a>
            <a
              href="#"
              onClick={() => setMenuOpen(false)}
              className="rounded-xl px-4 py-3 font-medium text-muted-foreground transition hover:bg-primary-soft hover:text-primary"
            >
              Projetos
            </a>

            <Link
              href="/login"
              className="mt-3 rounded-xl bg-primary px-5 py-3 text-center font-semibold text-primary-foreground"
            >
              Acessar plataforma
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
