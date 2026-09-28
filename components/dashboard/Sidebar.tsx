"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FolderKanban,
  FileCheck2,
  UserRound,
  LogOut,
  X,
} from "lucide-react";

type SidebarProps = {
  aberto?: boolean;
  fechar?: () => void;
};

const links = [
  {
    nome: "Visão geral",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    nome: "Projetos",
    href: "/dashboard/projetos",
    icon: FolderKanban,
  },
  {
    nome: "Evidências",
    href: "/dashboard/evidencias",
    icon: FileCheck2,
  },
  {
    nome: "Perfil",
    href: "/dashboard/perfil",
    icon: UserRound,
  },
];

export default function Sidebar({ aberto = false, fechar }: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Fundo mobile */}
      {aberto && (
        <div
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          onClick={fechar}
        />
      )}

      <aside
        className={`
          fixed inset-y-0 left-0 z-50
          flex w-72 flex-col
          border-r border-border
          bg-card
          transition-transform duration-300

          lg:translate-x-0

          ${aberto ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Logo */}
        <div className="flex h-20 items-center justify-between border-b border-border px-6">
          <Link href="/dashboard" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary font-bold text-primary-foreground">
              S
            </div>

            <div>
              <p className="font-display font-bold text-foreground">Sandbox</p>

              <p className="text-xs text-muted-foreground">IA na Educação</p>
            </div>
          </Link>

          {/* Fechar no mobile */}
          <button
            type="button"
            onClick={fechar}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted lg:hidden"
            aria-label="Fechar menu"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navegação */}
        <nav className="flex-1 space-y-1 px-4 py-6">
          {links.map((item) => {
            const Icon = item.icon;

            const ativo =
              item.href === "/dashboard"
                ? pathname === "/dashboard"
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={fechar}
                className={`
                  flex items-center gap-3 rounded-xl px-4 py-3
                  text-sm font-medium transition

                  ${
                    ativo
                      ? "bg-primary-soft text-primary"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }
                `}
              >
                <Icon size={20} />

                {item.nome}
              </Link>
            );
          })}
        </nav>

        {/* Usuário */}
        <div className="border-t border-border p-4">
          <div className="mb-4 flex items-center gap-3 px-2">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-soft font-semibold text-primary">
              A
            </div>

            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-foreground">
                Usuário
              </p>

              <p className="truncate text-xs text-muted-foreground">
                Participante
              </p>
            </div>
          </div>

          <Link
            href="/"
            className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-muted-foreground transition hover:bg-destructive-soft hover:text-destructive"
          >
            <LogOut size={19} />
            Sair
          </Link>
        </div>
      </aside>
    </>
  );
}
