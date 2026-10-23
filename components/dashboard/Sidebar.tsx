"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  FolderKanban,
  FileCheck2,
  UserRound,
  LogOut,
  X,
  type LucideIcon,
} from "lucide-react";
import { createClient } from "@/lib/supabase/cliente";

type SidebarProps = {
  aberto?: boolean;
  fechar?: () => void;
  nome?: string;
  perfil?: string;
};

type PerfilCodigo =
  | "participante"
  | "gestor"
  | "especialista"
  | "administrador";

type LinkSidebar = {
  nome: string;
  href: string;
  icon: LucideIcon;
  perfisPermitidos: PerfilCodigo[];
};

const todosPerfis: PerfilCodigo[] = [
  "participante",
  "gestor",
  "especialista",
  "administrador",
];

const links: LinkSidebar[] = [
  {
    nome: "Visão geral",
    href: "/dashboard",
    icon: LayoutDashboard,
    perfisPermitidos: todosPerfis,
  },
  {
    nome: "Projetos",
    href: "/dashboard/projetos",
    icon: FolderKanban,
    perfisPermitidos: todosPerfis,
  },
  {
    nome: "Evidências",
    href: "/dashboard/evidencias",
    icon: FileCheck2,
    perfisPermitidos: ["gestor", "especialista", "administrador"],
  },
  {
    nome: "Perfil",
    href: "/dashboard/perfil",
    icon: UserRound,
    perfisPermitidos: todosPerfis,
  },
];

function obterCodigoPerfil(perfil: string): PerfilCodigo | null {
  const valor = perfil.trim().toLocaleLowerCase("pt-BR");

  if (valor.includes("administrador")) return "administrador";
  if (valor.includes("especialista")) return "especialista";
  if (valor.includes("gestor")) return "gestor";
  if (valor.includes("participante")) return "participante";

  return null;
}

export default function Sidebar({
  aberto = false,
  fechar,
  nome = "Usuário",
  perfil = "Usuário da plataforma",
}: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  const perfilCodigo = obterCodigoPerfil(perfil);

  const linksVisiveis = links.filter((item) => {
    // Se o perfil ainda não foi identificado, não exibe Evidências.
    if (!perfilCodigo) {
      return item.href !== "/dashboard/evidencias";
    }

    return item.perfisPermitidos.includes(perfilCodigo);
  });

  const sair = async () => {
    const supabase = createClient();

    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error("Erro ao sair:", error.message);
      return;
    }

    router.replace("/");
    router.refresh();
  };

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
          <Link
            href="/dashboard"
            className="flex items-center gap-3"
            onClick={fechar}
          >
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

        {/* Navegação conforme o perfil */}
        <nav className="flex-1 space-y-1 px-4 py-6">
          {linksVisiveis.map((item) => {
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
              {nome.trim().charAt(0).toUpperCase() || "U"}
            </div>

            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-foreground">
                {nome}
              </p>

              <p className="truncate text-xs text-muted-foreground">{perfil}</p>
            </div>
          </div>

          <button
            type="button"
            onClick={sair}
            className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-muted-foreground transition hover:bg-destructive-soft hover:text-destructive"
          >
            <LogOut size={19} />
            Sair
          </button>
        </div>
      </aside>
    </>
  );
}
