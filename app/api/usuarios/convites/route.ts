import { NextResponse, type NextRequest } from "next/server";

import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

type Perfil = "participante" | "gestor" | "especialista" | "administrador";

function isPerfil(value: unknown): value is Perfil {
  return (
    value === "participante" ||
    value === "gestor" ||
    value === "especialista" ||
    value === "administrador"
  );
}

export async function POST(request: NextRequest) {
  // 1. Validar a sessão de quem está enviando o convite.
  const supabase = await createClient();
  const { data: sessao, error: erroSessao } = await supabase.auth.getClaims();

  const userId = sessao?.claims?.sub;

  if (erroSessao || typeof userId !== "string") {
    return NextResponse.json(
      { erro: "Você precisa estar autenticado." },
      { status: 401 },
    );
  }

  // 2. Consultar o perfil de quem está enviando o convite.
  const { data: perfilAtual, error: erroPerfil } = await supabase
    .from("profiles")
    .select("perfil")
    .eq("id", userId)
    .maybeSingle();

  if (erroPerfil || !perfilAtual) {
    return NextResponse.json(
      { erro: "Não foi possível validar suas permissões." },
      { status: 403 },
    );
  }

  const papelAtual = perfilAtual.perfil;

  if (papelAtual !== "administrador" && papelAtual !== "gestor") {
    return NextResponse.json(
      { erro: "Você não tem permissão para enviar convites." },
      { status: 403 },
    );
  }

  // 3. Validar os dados recebidos.
  const body = (await request.json().catch(() => null)) as {
    email?: unknown;
    nome?: unknown;
    instituicao?: unknown;
    perfil?: unknown;
  } | null;

  if (!body) {
    return NextResponse.json({ erro: "Dados inválidos." }, { status: 400 });
  }

  const email =
    typeof body.email === "string" ? body.email.trim().toLowerCase() : "";

  const nome = typeof body.nome === "string" ? body.nome.trim() : "";

  const instituicao =
    typeof body.instituicao === "string" ? body.instituicao.trim() : "";

  const perfilConvidado = body.perfil;

  if (
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
    nome.length < 2 ||
    !isPerfil(perfilConvidado)
  ) {
    return NextResponse.json(
      { erro: "Informe um nome, e-mail e perfil válidos." },
      { status: 400 },
    );
  }

  // 4. Gestores não podem convidar outros gestores ou administradores.
  if (
    papelAtual === "gestor" &&
    perfilConvidado !== "participante" &&
    perfilConvidado !== "especialista"
  ) {
    return NextResponse.json(
      { erro: "Seu perfil não pode conceder essa permissão." },
      { status: 403 },
    );
  }

  // 5. Enviar o convite usando o cliente administrativo do servidor.
  const admin = createAdminClient();

  const { data: convite, error: erroConvite } =
    await admin.auth.admin.inviteUserByEmail(email, {
      redirectTo: `${request.nextUrl.origin}/auth/confirm`,
      data: {
        nome,
        instituicao: instituicao || null,
        perfil: perfilConvidado,
      },
    });

  if (erroConvite || !convite.user) {
    return NextResponse.json(
      {
        erro: "Não foi possível enviar o convite. Verifique se o e-mail já está cadastrado e tente novamente.",
      },
      { status: 400 },
    );
  }

  // 6. Criar o perfil necessário para acessar o dashboard.
  const { error: erroCriacaoPerfil } = await admin.from("profiles").insert({
    id: convite.user.id,
    nome,
    instituicao: instituicao || null,
    perfil: perfilConvidado,
  });

  if (erroCriacaoPerfil) {
    console.error(
      "Erro ao criar o perfil do usuário convidado:",
      erroCriacaoPerfil,
    );

    // Tentar desfazer a criação caso o perfil não possa ser registrado.
    const { error: erroExclusao } = await admin.auth.admin.deleteUser(
      convite.user.id,
    );

    if (erroExclusao) {
      console.error(
        "Não foi possível desfazer a criação do usuário convidado.",
        erroExclusao,
      );
    }

    return NextResponse.json(
      {
        erro: "Não foi possível concluir o cadastro do convidado. Verifique os logs do servidor.",
      },
      { status: 500 },
    );
  }

  return NextResponse.json(
    { mensagem: "Convite enviado com sucesso." },
    { status: 201 },
  );
}
