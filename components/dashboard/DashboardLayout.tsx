"use client";

import { useState, useEffect } from "react";
import { Menu } from "lucide-react";
import Sidebar from "@/components/dashboard/Sidebar";
import { createClient } from "@/lib/supabase/cliente";

type Usuario = {
  nome: string;
  perfil: string;
  instituicao: string | null;
  email: string;
};

const nomesPerfis: Record<string, string> = {
  participante: "Participante",
  gestor: "Gestor",
  especialista: "Especialista / Avaliador",
  administrador: "Administrador",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [menuAberto, setMenuAberto] = useState(false);

  const [usuario, setUsuario] = useState<Usuario>({
    nome: "Usuário",
    perfil: "",
    instituicao: null,
    email: "",

  });

  useEffect(() => {
    let ativo = true;
    const carregarPerfil = async () => {
      const supabase = createClient();

      // Usuário autenticado
      const{
        data: { user },
      } = await supabase.auth.getUser();

      if (!user || !ativo) return;

      // perfil cadastrado na tabela
      const { data: profile } = await supabase
      .from("profiles")
      .select("nome, perfil, instituição")
      .eq("id", user.id)
      .single();

      if (!ativo) return;

      setUsuario({
        nome: profile?.nome || user.email?.split("@")[0] || "Usuário",
        perfil: profile?perfil || "",
        instituicao: profile.instituicao || null,
        email: user.email || "",
      });
    };

    carregarPerfil();

    return () => {
      ativo = false;
    };
  }, []);

  const nomePerfil = 
  nomesPerfis[usuario.perfil] || "Usuário da plataforma";

  const inicial = 
  usuario.nome.trim().charAt(0).toUpperCase() || "U";



  return (
    <div className="min-h-screen bg-background">
      
      <Sidebar 
      aberto={menuAberto} 
      fechar={() => setMenuAberto(false)} 
      nome={usuario.nome}
      perfil={nomePerfil}
      />

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
          <div className="flex items-center gap-3">
            <div className="hidden text-right sm:block">
              <p className="">

              </p>

            </div>

          </div>
        </header>

        <main className="p-6 md:p-8 lg:p-10">{children}</main>
      </div>
    </div>
  );
}
