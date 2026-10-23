"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type FormEvent,
  type ChangeEvent,
} from "react";
import {
  CheckCircle2,
  Clock3,
  ExternalLink,
  FileText,
  Link as LinkIcon,
  Upload,
  XCircle,
} from "lucide-react";
import { createClient } from "@/lib/supabase/cliente";

type Projeto = {
  id: string;
  titulo: string;
  descricao: string | null;
  instituicao: string | null;
  responsavel: string | null;
  etapa: string;
  status: string;
  progresso: number;
  tags: string[];
  data_inicio: string | null;
  data_fim: string | null;
  criado_por: string;
  created_at: string;
  organizacao_id: string | null;
  publico: boolean;
};

type Autor = {
  id: string;
  nome: string;
};

type StatusEvidencia = "pendente" | "em_analise" | "aprovada" | "rejeitada";

type Evidencia = {
  id: string;
  projeto_id: string;
  enviado_por: string;
  titulo: string;
  descricao: string | null;
  status: StatusEvidencia;
  comentario_avaliacao: string | null;
  avaliado_por: string | null;
  avaliado_em: string | null;
  created_at: string;
};

type Anexo = {
  id: string;
  evidencia_id: string;
  tipo: "arquivo" | "link";
  nome: string;
  storage_path: string | null;
  url: string | null;
  created_at: string;
};

const statusLabels: Record<StatusEvidencia, string> = {
  pendente: "Pendente",
  em_analise: "Em análise",
  aprovada: "Aprovada",
  rejeitada: "Rejeitada",
};

const statusClasses: Record<StatusEvidencia, string> = {
  pendente: "bg-amber-100 text-amber-800",
  em_analise: "bg-primary-soft text-primary",
  aprovada: "bg-success-soft text-success",
  rejeitada: "bg-red-100 text-red-700",
};

const perfisRevisores = ["gestor", "especialista", "administrador"];

const formatosAceitos = [
  "application/pdf",
  "image/jpeg",
  "image/png",
  "image/webp",
  "text/plain",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "application/vnd.ms-powerpoint",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation",
];

const extensoesAceitas =
  ".pdf,.jpg,.jpeg,.png,.webp,.txt,.doc,.docx,.xls,.xlsx,.ppt,.pptx";

function formatarData(data: string) {
  return new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(new Date(data));
}

export default function EvidenciasPage() {
  const supabase = useMemo(() => createClient(), []);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [savingReview, setSavingReview] = useState<string | null>(null);

  const [userId, setUserId] = useState<string | null>(null);
  const [perfil, setPerfil] = useState<string | null>(null);

  const [projetos, setProjetos] = useState<Projeto[]>([]);
  const [autores, setAutores] = useState<Autor[]>([]);
  const [evidencias, setEvidencias] = useState<Evidencia[]>([]);
  const [filtroProjeto, setFiltroProjeto] = useState("todos");
  const [filtroStatus, setFiltroStatus] = useState("todos");
  const [anexos, setAnexos] = useState<Anexo[]>([]);
  const [comentarios, setComentarios] = useState<Record<string, string>>({});

  const [projetoId, setProjetoId] = useState("");
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [arquivos, setArquivos] = useState<File[]>([]);
  const [nomeLink, setNomeLink] = useState("");
  const [urlLink, setUrlLink] = useState("");

  const [erro, setErro] = useState<string | null>(null);
  const [sucesso, setSucesso] = useState<string | null>(null);

  const ehRevisor = perfil !== null && perfisRevisores.includes(perfil);
  const podeEnviar = perfil === "participante";

  const carregarDados = useCallback(async () => {
    const {
      data: { user },
      error: erroUsuario,
    } = await supabase.auth.getUser();

    if (erroUsuario || !user) {
      setErro("Não foi possível identificar sua sessão. Entre novamente.");
      setLoading(false);
      return;
    }

    setUserId(user.id);

    const [resultadoPerfil, resultadoProjetos, resultadoEvidencias] =
      await Promise.all([
        supabase
          .from("profiles")
          .select("perfil")
          .eq("id", user.id)
          .maybeSingle(),

        supabase
          .from("projetos")
          .select(
            `
    id,
    titulo,
    descricao,
    instituicao,
    responsavel,
    etapa,
    status,
    progresso,
    tags,
    data_inicio,
    data_fim,
    criado_por,
    created_at,
    organizacao_id,
    publico
  `,
          )
          .order("created_at", { ascending: false }),

        supabase
          .from("evidencias")
          .select(
            "id, projeto_id, enviado_por, titulo, descricao, status, comentario_avaliacao, avaliado_por, avaliado_em, created_at",
          )
          .order("created_at", { ascending: false }),
      ]);

    if (resultadoPerfil.error || !resultadoPerfil.data) {
      setErro("Não foi possível carregar seu perfil.");
      setLoading(false);
      return;
    }

    if (resultadoProjetos.error) {
      setErro("Não foi possível carregar os projetos disponíveis.");
      setLoading(false);
      return;
    }

    if (resultadoEvidencias.error) {
      setErro("Não foi possível carregar as evidências.");
      setLoading(false);
      return;
    }

    const listaEvidencias = (resultadoEvidencias.data ??
      []) as unknown as Evidencia[];

    setPerfil(resultadoPerfil.data.perfil);
    setProjetos((resultadoProjetos.data ?? []) as Projeto[]);
    setEvidencias(listaEvidencias);

    const idsAutores = [
      ...new Set(listaEvidencias.map((evidencia) => evidencia.enviado_por)),
    ];

    if (idsAutores.length > 0) {
      const { data: dadosAutores, error: erroAutores } = await supabase
        .from("profiles")
        .select("id, nome")
        .in("id", idsAutores);

      if (erroAutores) {
        console.error("Erro ao carregar autores:", erroAutores);
        setAutores([]);
      } else {
        setAutores((dadosAutores ?? []) as Autor[]);
      }
    } else {
      setAutores([]);
    }

    setComentarios((anteriores) => {
      const novos = { ...anteriores };

      for (const evidencia of listaEvidencias) {
        if (!(evidencia.id in novos)) {
          novos[evidencia.id] = evidencia.comentario_avaliacao ?? "";
        }
      }

      return novos;
    });

    if (listaEvidencias.length > 0) {
      const resultadoAnexos = await supabase
        .from("evidencia_anexos")
        .select("id, evidencia_id, tipo, nome, storage_path, url, created_at")
        .in(
          "evidencia_id",
          listaEvidencias.map((evidencia) => evidencia.id),
        )
        .order("created_at", { ascending: true });

      if (resultadoAnexos.error) {
        setErro(
          "As evidências foram carregadas, mas houve um erro ao buscar os anexos.",
        );
        setAnexos([]);
      } else {
        setAnexos((resultadoAnexos.data ?? []) as Anexo[]);
      }
    } else {
      setAnexos([]);
    }

    setLoading(false);
  }, [supabase]);

  useEffect(() => {
    void Promise.resolve().then(() => carregarDados());
  }, [carregarDados]);

  function selecionarArquivos(evento: ChangeEvent<HTMLInputElement>) {
    setArquivos(Array.from(evento.target.files ?? []));
  }

  async function enviarEvidencia(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault();
    setErro(null);
    setSucesso(null);

    if (!userId || perfil !== "participante") {
      setErro("Somente participantes podem enviar evidências por esta tela.");
      return;
    }

    if (!projetoId || !titulo.trim()) {
      setErro("Selecione um projeto e informe o título da evidência.");
      return;
    }

    if (arquivos.some((arquivo) => arquivo.size > 10 * 1024 * 1024)) {
      setErro("Cada arquivo deve ter no máximo 10 MB.");
      return;
    }

    if (
      arquivos.some(
        (arquivo) => arquivo.type && !formatosAceitos.includes(arquivo.type),
      )
    ) {
      setErro("Um ou mais arquivos possuem um formato não permitido.");
      return;
    }

    let urlValidada: URL | null = null;

    if (urlLink.trim()) {
      try {
        urlValidada = new URL(urlLink.trim());

        if (
          urlValidada.protocol !== "https:" &&
          urlValidada.protocol !== "http:"
        ) {
          setErro("O link precisa começar com http:// ou https://.");
          return;
        }
      } catch {
        setErro("Informe uma URL válida para o link externo.");
        return;
      }
    }

    setSaving(true);

    const { data: novaEvidencia, error: erroCriacao } = await supabase
      .from("evidencias")
      .insert({
        projeto_id: projetoId,
        titulo: titulo.trim(),
        descricao: descricao.trim() || null,
      })
      .select("id")
      .single();

    if (erroCriacao || !novaEvidencia) {
      setErro(
        "Não foi possível cadastrar a evidência. Confira se você tem acesso ao projeto selecionado.",
      );
      setSaving(false);
      return;
    }

    const falhas: string[] = [];

    for (const [indice, arquivo] of arquivos.entries()) {
      const nomeSeguro = arquivo.name
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-zA-Z0-9._()-]/g, "_");

      const caminho = `${userId}/${novaEvidencia.id}/${Date.now()}-${indice}-${nomeSeguro || "arquivo"}`;

      const { error: erroUpload } = await supabase.storage
        .from("evidencias")
        .upload(caminho, arquivo, {
          upsert: false,
          contentType: arquivo.type || undefined,
        });

      if (erroUpload) {
        falhas.push(`Arquivo "${arquivo.name}"`);
        continue;
      }

      const { error: erroAnexo } = await supabase
        .from("evidencia_anexos")
        .insert({
          evidencia_id: novaEvidencia.id,
          tipo: "arquivo",
          nome: arquivo.name,
          storage_path: caminho,
          url: null,
        });

      if (erroAnexo) {
        await supabase.storage.from("evidencias").remove([caminho]);
        falhas.push(`Registro do arquivo "${arquivo.name}"`);
      }
    }

    if (urlValidada) {
      const { error: erroLink } = await supabase
        .from("evidencia_anexos")
        .insert({
          evidencia_id: novaEvidencia.id,
          tipo: "link",
          nome: nomeLink.trim() || urlValidada.hostname,
          storage_path: null,
          url: urlValidada.href,
        });

      if (erroLink) {
        falhas.push("Link externo");
      }
    }

    setTitulo("");
    setDescricao("");
    setProjetoId("");
    setArquivos([]);
    setNomeLink("");
    setUrlLink("");

    const formulario = document.getElementById(
      "form-evidencia",
    ) as HTMLFormElement | null;

    formulario?.reset();

    await carregarDados();

    if (falhas.length > 0) {
      setErro(
        `A evidência foi criada, mas não foi possível salvar: ${falhas.join(", ")}. Verifique os anexos.`,
      );
    } else {
      setSucesso("Evidência enviada com sucesso!");
    }

    setSaving(false);
  }

  async function avaliarEvidencia(
    evidencia: Evidencia,
    novoStatus: StatusEvidencia,
  ) {
    if (!userId || !ehRevisor) return;

    if (evidencia.avaliado_por && evidencia.avaliado_por !== userId) {
      setErro("Esta evidência já foi avaliada por outro revisor.");
      return;
    }

    setErro(null);
    setSucesso(null);
    setSavingReview(evidencia.id);

    const finalizada = novoStatus === "aprovada" || novoStatus === "rejeitada";

    const agora = new Date().toISOString();

    const { error: erroAvaliacao } = await supabase
      .from("evidencias")
      .update({
        status: novoStatus,
        comentario_avaliacao: comentarios[evidencia.id]?.trim() || null,
        avaliado_por: finalizada ? userId : null,
        avaliado_em: finalizada ? agora : null,
        updated_at: agora,
      })
      .eq("id", evidencia.id);

    if (erroAvaliacao) {
      setErro(
        "Não foi possível salvar a avaliação. Verifique suas permissões e tente novamente.",
      );
      setSavingReview(null);
      return;
    }

    await carregarDados();
    setSucesso("Avaliação atualizada com sucesso.");
    setSavingReview(null);
  }

  async function abrirAnexo(anexo: Anexo) {
    setErro(null);

    if (anexo.tipo === "link" && anexo.url) {
      window.open(anexo.url, "_blank", "noopener,noreferrer");
      return;
    }

    if (!anexo.storage_path) {
      setErro("O caminho deste arquivo não está disponível.");
      return;
    }

    const novaAba = window.open("about:blank", "_blank");

    if (!novaAba) {
      setErro("Permita a abertura de novas abas para visualizar o arquivo.");
      return;
    }

    novaAba.opener = null;

    const { data, error: erroUrl } = await supabase.storage
      .from("evidencias")
      .createSignedUrl(anexo.storage_path, 300);

    if (erroUrl || !data?.signedUrl) {
      novaAba.close();
      setErro("Não foi possível gerar o acesso temporário ao arquivo.");
      return;
    }

    novaAba.location.href = data.signedUrl;
  }

  if (loading) {
    return (
      <div className="rounded-2xl border border-border bg-card p-8 text-muted-foreground">
        Carregando evidências...
      </div>
    );
  }

  return (
    <>
      <header className="flex flex-col gap-3">
        <span className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
          Evidências
        </span>

        <h1 className="text-3xl font-bold text-foreground md:text-4xl">
          Evidências dos projetos
        </h1>

        <p className="max-w-2xl text-muted-foreground">
          Registre resultados, documentos e outros materiais que demonstrem o
          andamento das iniciativas educacionais.
        </p>
      </header>

      {erro && (
        <div
          role="alert"
          className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
        >
          {erro}
        </div>
      )}

      {sucesso && (
        <div
          role="status"
          className="mt-6 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800"
        >
          {sucesso}
        </div>
      )}

      {podeEnviar && (
        <section className="mt-8 rounded-3xl border border-border bg-card p-6 shadow-card md:p-8">
          <div className="flex items-start gap-3">
            <div className="rounded-xl bg-primary-soft p-3 text-primary">
              <Upload size={22} />
            </div>

            <div>
              <h2 className="text-xl font-bold text-foreground">
                Enviar nova evidência
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Vincule o registro a um projeto e adicione arquivos ou links.
              </p>
            </div>
          </div>

          <form
            id="form-evidencia"
            onSubmit={enviarEvidencia}
            className="mt-6 space-y-5"
          >
            <div>
              <label
                htmlFor="projeto"
                className="mb-2 block text-sm font-semibold text-foreground"
              >
                Projeto *
              </label>

              <select
                id="projeto"
                value={projetoId}
                onChange={(evento) => setProjetoId(evento.target.value)}
                required
                className="h-12 w-full rounded-xl border border-border bg-background px-3 text-foreground outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="">Selecione um projeto</option>
                {projetos.map((projeto) => (
                  <option key={projeto.id} value={projeto.id}>
                    {projeto.titulo}
                  </option>
                ))}
              </select>

              {projetos.length === 0 && (
                <p className="mt-2 text-sm text-muted-foreground">
                  Nenhum projeto disponível para seleção. Verifique se você tem
                  acesso a algum projeto.
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="titulo"
                className="mb-2 block text-sm font-semibold text-foreground"
              >
                Título da evidência *
              </label>

              <input
                id="titulo"
                value={titulo}
                onChange={(evento) => setTitulo(evento.target.value)}
                maxLength={150}
                required
                placeholder="Ex.: Relatório da etapa de experimentação"
                className="h-12 w-full rounded-xl border border-border bg-background px-3 text-foreground outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label
                htmlFor="descricao"
                className="mb-2 block text-sm font-semibold text-foreground"
              >
                Descrição
              </label>

              <textarea
                id="descricao"
                value={descricao}
                onChange={(evento) => setDescricao(evento.target.value)}
                rows={4}
                placeholder="Explique o que esta evidência demonstra e em qual contexto foi produzida."
                className="w-full rounded-xl border border-border bg-background p-3 text-foreground outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label
                htmlFor="arquivos"
                className="mb-2 block text-sm font-semibold text-foreground"
              >
                Arquivos
              </label>

              <input
                id="arquivos"
                type="file"
                multiple
                accept={extensoesAceitas}
                onChange={selecionarArquivos}
                className="block w-full text-sm text-muted-foreground file:mr-4 file:rounded-lg file:border-0 file:bg-primary-soft file:px-4 file:py-2 file:font-semibold file:text-primary"
              />

              <p className="mt-2 text-xs text-muted-foreground">
                PDF, imagens, TXT, Word, Excel e PowerPoint. Até 10 MB por
                arquivo.
              </p>

              {arquivos.length > 0 && (
                <ul className="mt-3 space-y-2">
                  {arquivos.map((arquivo, indice) => (
                    <li
                      key={`${arquivo.name}-${indice}`}
                      className="flex items-center gap-2 text-sm text-foreground"
                    >
                      <FileText size={16} className="text-primary" />
                      <span className="break-all">{arquivo.name}</span>
                      <span className="shrink-0 text-xs text-muted-foreground">
                        {(arquivo.size / (1024 * 1024)).toFixed(2)} MB
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="rounded-2xl border border-border p-4">
              <div className="flex items-center gap-2">
                <LinkIcon size={18} className="text-primary" />
                <h3 className="font-semibold text-foreground">
                  Link externo (opcional)
                </h3>
              </div>

              <div className="mt-4 space-y-3">
                <input
                  value={nomeLink}
                  onChange={(evento) => setNomeLink(evento.target.value)}
                  maxLength={200}
                  placeholder="Nome do link (ex.: Relatório no Drive)"
                  aria-label="Nome do link externo"
                  className="h-11 w-full rounded-xl border border-border bg-background px-3 text-foreground outline-none focus:ring-2 focus:ring-primary"
                />

                <input
                  type="url"
                  value={urlLink}
                  onChange={(evento) => setUrlLink(evento.target.value)}
                  placeholder="https://..."
                  aria-label="URL do link externo"
                  className="h-11 w-full rounded-xl border border-border bg-background px-3 text-foreground outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={saving || projetos.length === 0}
              className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-primary px-5 font-semibold text-primary-foreground transition hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <Upload size={18} />
              {saving ? "Enviando..." : "Enviar evidência"}
            </button>
          </form>
        </section>
      )}

      {ehRevisor && (
        <div className="mt-8 rounded-2xl border border-border bg-card p-5">
          <h2 className="font-bold text-foreground">Área de análise</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Consulte as submissões e registre a avaliação de cada evidência.
          </p>
        </div>
      )}

      {!podeEnviar && !ehRevisor && (
        <div className="mt-8 rounded-2xl border border-border bg-card p-5 text-sm text-muted-foreground">
          Seu perfil não possui permissão para enviar ou avaliar evidências.
        </div>
      )}

      <section className="mt-10">
        <div className="mb-5 flex items-center justify-between gap-3">
          <h2 className="text-xl font-bold text-foreground">
            {ehRevisor ? "Evidências recebidas" : "Minhas evidências"}
          </h2>

          <span className="rounded-full bg-primary-soft px-3 py-1 text-sm font-semibold text-primary">
            {evidencias.length}{" "}
            {evidencias.length === 1 ? "registro" : "registros"}
          </span>
        </div>

        {evidencias.length === 0 && (
          <div className="rounded-3xl border border-border bg-card px-6 py-12 text-center shadow-card">
            <FileText size={32} className="mx-auto text-muted-foreground" />

            <h3 className="mt-4 text-lg font-bold text-foreground">
              Nenhuma evidência encontrada
            </h3>

            <p className="mt-2 text-sm text-muted-foreground">
              {ehRevisor
                ? "As evidências enviadas aparecerão aqui para análise."
                : "Quando você enviar uma evidência, poderá acompanhar seu status por aqui."}
            </p>
          </div>
        )}

        <div className="grid gap-6">
          {ehRevisor && (
            <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="filtro-projeto"
                  className="mb-2 block text-sm font-medium text-foreground"
                >
                  Filtrar por projeto
                </label>

                <select
                  id="filtro-projeto"
                  value={filtroProjeto}
                  onChange={(event) => setFiltroProjeto(event.target.value)}
                  className="w-full rounded-lg border border-slate-200 bg-background px-3 py-2.5 text-sm text-foreground dark:border-slate-700"
                >
                  <option value="todos">Todos os projetos</option>
                  {projetos.map((projeto) => (
                    <option key={projeto.id} value={projeto.id}>
                      {projeto.titulo}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="filtro-status"
                  className="mb-2 block text-sm font-medium text-foreground"
                >
                  Filtrar por status
                </label>

                <select
                  id="filtro-status"
                  value={filtroStatus}
                  onChange={(event) => setFiltroStatus(event.target.value)}
                  className="w-full rounded-lg border border-slate-200 bg-background px-3 py-2.5 text-sm text-foreground dark:border-slate-700"
                >
                  <option value="todos">Todos os status</option>
                  <option value="pendente">Pendente</option>
                  <option value="em_analise">Em análise</option>
                  <option value="aprovada">Aprovada</option>
                  <option value="rejeitada">Rejeitada</option>
                </select>
              </div>
            </div>
          )}
          {evidencias
            .filter(
              (evidencia) =>
                (filtroProjeto === "todos" ||
                  evidencia.projeto_id === filtroProjeto) &&
                (filtroStatus === "todos" || evidencia.status === filtroStatus),
            )
            .map((evidencia) => {
              const anexosDaEvidencia = anexos.filter(
                (anexo) => anexo.evidencia_id === evidencia.id,
              );

              const projetoDaEvidencia = projetos.find(
                (projeto) => projeto.id === evidencia.projeto_id,
              );

              const nomeProjeto =
                projetoDaEvidencia?.titulo ?? "Projeto vinculado";

              const nomeAutor =
                autores.find((autor) => autor.id === evidencia.enviado_por)
                  ?.nome ?? "Autor não identificado";

              const outroRevisor =
                Boolean(evidencia.avaliado_por) &&
                evidencia.avaliado_por !== userId;

              return (
                <article
                  key={evidencia.id}
                  className="rounded-3xl border border-border bg-card p-6 shadow-card md:p-7"
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div className="min-w-0">
                      <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                        {nomeProjeto}
                      </span>

                      <h3 className="mt-2 wrap-break-words text-xl font-bold text-foreground">
                        {evidencia.titulo}
                      </h3>

                      <p className="mt-2 text-xs text-muted-foreground">
                        Enviado por{" "}
                        <span className="font-medium text-foreground">
                          {nomeAutor}
                        </span>
                        {" · "}Enviada em {formatarData(evidencia.created_at)}
                      </p>
                      {projetoDaEvidencia && (
                        <details className="mt-4 overflow-hidden rounded-lg border border-slate-200/70 dark:border-slate-700/60">
                          <summary className="cursor-pointer px-4 py-3 text-sm font-medium text-slate-600 transition-colors hover:text-teal-700 dark:text-slate-300 dark:hover:text-teal-300">
                            Informações do projeto
                          </summary>
                          <div className="border-t border-slate-200/70 px-4 py-4 dark:border-slate-700/60">
                            {projetoDaEvidencia.descricao && (
                              <div className="mb-3">
                                <p className="text-xs font-medium text-slate-500">
                                  Descrição
                                </p>
                                <p className="mt-1 whitespace-pre-wrap text-sm text-slate-700 dark:text-slate-300">
                                  {projetoDaEvidencia.descricao}
                                </p>
                              </div>
                            )}

                            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                              <div>
                                <p className="text-xs font-medium text-slate-500">
                                  Instituição
                                </p>
                                <p className="mt-1 text-sm text-slate-800 dark:text-slate-200">
                                  {projetoDaEvidencia.instituicao ||
                                    "Não informada"}
                                </p>
                              </div>

                              <div>
                                <p className="text-xs font-medium text-slate-500">
                                  Responsável
                                </p>
                                <p className="mt-1 text-sm text-slate-800 dark:text-slate-200">
                                  {projetoDaEvidencia.responsavel ||
                                    "Não informado"}
                                </p>
                              </div>

                              <div>
                                <p className="text-xs font-medium text-slate-500">
                                  Etapa
                                </p>
                                <p className="mt-1 text-sm text-slate-800 dark:text-slate-200">
                                  {projetoDaEvidencia.etapa.replace(/_/g, " ")}
                                </p>
                              </div>

                              <div>
                                <p className="text-xs font-medium text-slate-500">
                                  Status do projeto
                                </p>
                                <p className="mt-1 text-sm text-slate-800 dark:text-slate-200">
                                  {projetoDaEvidencia.status.replace(/_/g, " ")}
                                </p>
                              </div>

                              <div>
                                <p className="text-xs font-medium text-slate-500">
                                  Início
                                </p>
                                <p className="mt-1 text-sm text-slate-800 dark:text-slate-200">
                                  {projetoDaEvidencia.data_inicio
                                    ? formatarData(
                                        projetoDaEvidencia.data_inicio,
                                      )
                                    : "Não informado"}
                                </p>
                              </div>

                              <div>
                                <p className="text-xs font-medium text-slate-500">
                                  Término previsto
                                </p>
                                <p className="mt-1 text-sm text-slate-800 dark:text-slate-200">
                                  {projetoDaEvidencia.data_fim
                                    ? formatarData(projetoDaEvidencia.data_fim)
                                    : "Não informado"}
                                </p>
                              </div>
                            </div>

                            <div className="mt-4">
                              <div className="mb-2 flex items-center justify-between gap-2">
                                <p className="text-xs font-medium text-slate-500">
                                  Progresso do projeto
                                </p>
                                <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                                  {projetoDaEvidencia.progresso}%
                                </span>
                              </div>

                              <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
                                <div
                                  className="h-full rounded-full bg-teal-600"
                                  style={{
                                    width: `${Math.min(100, Math.max(0, projetoDaEvidencia.progresso))}%`,
                                  }}
                                />
                              </div>
                            </div>

                            {projetoDaEvidencia.tags.length > 0 && (
                              <div className="mt-4">
                                <p className="mb-2 text-xs font-medium text-slate-500">
                                  Etiquetas
                                </p>
                                <div className="flex flex-wrap gap-2">
                                  {projetoDaEvidencia.tags.map((tag) => (
                                    <span
                                      key={tag}
                                      className="rounded-full bg-white px-3 py-1 text-xs text-slate-700 ring-1 ring-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:ring-slate-700"
                                    >
                                      {tag}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            )}

                            <p className="mt-4 text-xs text-slate-500">
                              Visibilidade:{" "}
                              {projetoDaEvidencia.publico
                                ? "Público"
                                : "Restrito"}
                            </p>
                          </div>
                        </details>
                      )}
                    </div>

                    <span
                      className={`inline-flex w-fit shrink-0 items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold ${statusClasses[evidencia.status]}`}
                    >
                      {evidencia.status === "aprovada" ? (
                        <CheckCircle2 size={15} />
                      ) : evidencia.status === "rejeitada" ? (
                        <XCircle size={15} />
                      ) : (
                        <Clock3 size={15} />
                      )}

                      {statusLabels[evidencia.status]}
                    </span>
                  </div>

                  {evidencia.descricao && (
                    <p className="mt-5 whitespace-pre-wrap text-sm leading-relaxed text-muted-foreground">
                      {evidencia.descricao}
                    </p>
                  )}

                  {anexosDaEvidencia.length > 0 && (
                    <div className="mt-5 border-t border-border pt-5">
                      <h4 className="text-sm font-semibold text-foreground">
                        Arquivos e links
                      </h4>

                      <ul className="mt-3 space-y-3">
                        {anexosDaEvidencia.map((anexo) => (
                          <li
                            key={anexo.id}
                            className="flex flex-wrap items-center justify-between gap-3 rounded-xl bg-background p-3"
                          >
                            <div className="flex min-w-0 items-center gap-3">
                              {anexo.tipo === "arquivo" ? (
                                <FileText
                                  size={18}
                                  className="shrink-0 text-primary"
                                />
                              ) : (
                                <LinkIcon
                                  size={18}
                                  className="shrink-0 text-primary"
                                />
                              )}

                              <span className="break-all text-sm text-foreground">
                                {anexo.nome}
                              </span>
                            </div>

                            <button
                              type="button"
                              onClick={() => void abrirAnexo(anexo)}
                              className="inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-primary hover:underline"
                            >
                              <ExternalLink size={16} />
                              Abrir
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {evidencia.comentario_avaliacao && (
                    <div className="mt-5 rounded-xl border border-border bg-background p-4">
                      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        Comentário da avaliação
                      </p>

                      <p className="mt-2 whitespace-pre-wrap text-sm text-foreground">
                        {evidencia.comentario_avaliacao}
                      </p>
                    </div>
                  )}

                  {ehRevisor && (
                    <div className="mt-6 border-t border-border pt-5">
                      <label
                        htmlFor={`comentario-${evidencia.id}`}
                        className="mb-2 block text-sm font-semibold text-foreground"
                      >
                        Comentário da avaliação
                      </label>

                      <textarea
                        id={`comentario-${evidencia.id}`}
                        value={comentarios[evidencia.id] ?? ""}
                        onChange={(evento) =>
                          setComentarios((anteriores) => ({
                            ...anteriores,
                            [evidencia.id]: evento.target.value,
                          }))
                        }
                        rows={3}
                        disabled={outroRevisor || savingReview === evidencia.id}
                        placeholder="Registre observações, justificativas ou recomendações."
                        className="w-full rounded-xl border border-border bg-background p-3 text-foreground outline-none focus:ring-2 focus:ring-primary disabled:opacity-60"
                      />

                      {outroRevisor && (
                        <p className="mt-2 text-sm text-muted-foreground">
                          Esta evidência já foi avaliada por outro revisor.
                        </p>
                      )}

                      <div className="mt-4 flex flex-wrap gap-3">
                        <button
                          type="button"
                          onClick={() =>
                            void avaliarEvidencia(evidencia, "em_analise")
                          }
                          disabled={
                            outroRevisor || savingReview === evidencia.id
                          }
                          className="inline-flex h-10 items-center gap-2 rounded-xl border border-border px-4 text-sm font-semibold text-foreground transition hover:bg-background disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          <Clock3 size={16} />
                          Em análise
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            void avaliarEvidencia(evidencia, "aprovada")
                          }
                          disabled={
                            outroRevisor || savingReview === evidencia.id
                          }
                          className="inline-flex h-10 items-center gap-2 rounded-xl bg-primary px-4 text-sm font-semibold text-primary-foreground transition hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          <CheckCircle2 size={16} />
                          Aprovar
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            void avaliarEvidencia(evidencia, "rejeitada")
                          }
                          disabled={
                            outroRevisor || savingReview === evidencia.id
                          }
                          className="inline-flex h-10 items-center gap-2 rounded-xl border border-red-200 px-4 text-sm font-semibold text-red-700 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          <XCircle size={16} />
                          Rejeitar
                        </button>

                        {savingReview === evidencia.id && (
                          <span className="self-center text-sm text-muted-foreground">
                            Salvando avaliação...
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                </article>
              );
            })}
        </div>
      </section>
    </>
  );
}
