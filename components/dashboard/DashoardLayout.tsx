"use client";

import { useState } from "react";
import { Menu } from "lucide-react";
import Sidebar from "@/components/dashboard/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [menuAberto, setMenuAberto] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Sidebar aberto={menuAberto} fechar={() => setMenuAberto(false)} />

      {/* Conteúdo */}
      <div className="lg:pl-72">
        {/* Header mobile / interno */}
        <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-border bg-background/95 px-6 backdrop-blur">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setMenuAberto(true)}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-border text-foreground lg:hidden"
              aria-label="Abrir menu"
            >
              <Menu size={20} />
            </button>

            <div>
              <p className="text-xs text-muted-foreground">
                Sandbox Regulatório
              </p>

              <p className="font-semibold text-foreground">Plataforma</p>
            </div>
          </div>

          {/* Avatar */}
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-soft font-semibold text-primary">
            A
          </div>
        </header>

        <main className="p-6 md:p-8 lg:p-10">{children}</main>
      </div>
    </div>
  );
}
