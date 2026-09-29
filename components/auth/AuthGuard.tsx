"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { createClient } from "@/lib/supabase/cliente";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const verificarUsuario = async () => {
      const supabase = createClient();

      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();

      if (error || !user) {
        router.replace("/");
        return;
      }

      setCarregando(false);
    };

    verificarUsuario();
  }, [router]);

  if (carregando) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="text-center">
          <div className="mx-auto h-9 w-9 animate-spin rounded-full border-4 border-primary-soft border-t-primary" />

          <p className="mt-4 text-sm text-muted-foreground">
            Verificando acesso...
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
