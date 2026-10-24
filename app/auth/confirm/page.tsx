"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/cliente";

export default function ConfirmarConvitePage() {
  const router = useRouter();
  const [mensagem, setMensagem] = useState("Validando seu convite...");

  useEffect(() => {
    let ativo = true;
    let redirecionado = false;

    // O Supabase envia o tipo do convite no fragmento da URL.
    // Verificamos isso antes de inicializar o cliente.
    const parametros = new URLSearchParams(window.location.hash.slice(1));

    if (parametros.get("type") !== "invite") {
      router.replace("/login?error=link_invalido");
      return;
    }

    const supabase = createClient();

    function irParaDefinirSenha() {
      if (!ativo || redirecionado) return;

      redirecionado = true;
      router.replace("/definir-senha");
    }

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_evento, sessao) => {
      if (sessao) {
        irParaDefinirSenha();
      }
    });

    void supabase.auth.getSession().then(({ data, error }) => {
      if (!ativo || redirecionado) return;

      if (error || !data.session) {
        setMensagem(
          "Não foi possível validar o convite. Ele pode ter expirado ou já ter sido utilizado. Solicite um novo convite.",
        );
        return;
      }

      irParaDefinirSenha();
    });

    return () => {
      ativo = false;
      subscription.unsubscribe();
    };
  }, [router]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-6">
      <section className="w-full max-w-md rounded-2xl border border-border bg-card p-8 text-center shadow-sm">
        <h1 className="text-2xl font-bold text-foreground">
          Confirmando convite
        </h1>

        <p className="mt-4 text-sm text-muted-foreground">{mensagem}</p>
      </section>
    </main>
  );
}
