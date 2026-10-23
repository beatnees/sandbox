import { redirect } from "next/navigation";
import type { ReactNode } from "react";

import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { createClient } from "@/lib/supabase/server";

export default async function Layout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const supabase = await createClient();

  // Valida a sessão no servidor.
  const { data, error } = await supabase.auth.getClaims();

  if (error || !data?.claims) {
    redirect("/");
  }

  // Confirma que o usuário possui um perfil cadastrado.
  const userId = data.claims.sub;

  if (typeof userId !== "string") {
    redirect("/");
  }

  const { data: perfil, error: erroPerfil } = await supabase
    .from("profiles")
    .select("id")
    .eq("id", userId)
    .maybeSingle();

  if (erroPerfil || !perfil) {
    redirect("/");
  }

  return <DashboardLayout>{children}</DashboardLayout>;
}
