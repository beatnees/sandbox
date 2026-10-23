import { redirect } from "next/navigation";
import type { ReactNode } from "react";

import { createClient } from "@/lib/supabase/server";

const perfisPermitidos = ["gestor", "especialista", "administrador"];

export default async function EvidenciasLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getClaims();

  if (error || !data?.claims || typeof data.claims.sub !== "string") {
    redirect("/");
  }

  const { data: perfil, error: erroPerfil } = await supabase
    .from("profiles")
    .select("perfil")
    .eq("id", data.claims.sub)
    .maybeSingle();

  if (erroPerfil || !perfil) {
    redirect("/dashboard");
  }

  if (!perfisPermitidos.includes(perfil.perfil)) {
    redirect("/dashboard");
  }

  return <>{children}</>;
}
