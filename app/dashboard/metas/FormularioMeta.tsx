
"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";
import { createClient } from "@/lib/supabase/cliente";

type Organizacao = {
  id: string;
  nome: string;
  tipo: "instituicao" | "equipe";
};

type Props = {
  organizacoes: Organizacao[];
};

export default function FormularioMeta({ organizacoes }: Props) {
  const router = useRouter();

  const [organizacaoId, setOrganizacaoId] = useState(
    organizacoes[0]?.id ?? "",
  );
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [tipo, setTipo] = useState<
    "projetos_criados" | "projetos_concluidos"
  >("projetos_concluidos");
  const [valorMeta, setValorMeta] = useState("5");
  const [dataLimite, setDataLimite] = useState("");
  const [salvando, setSalvando] = useState(false);
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");

  async function criarMeta(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setErro("");
    setSucesso("");

    if (!organizacaoId) {
      setErro("Selecione uma organização.");
      return;
    }

    const valor = Number(valorMeta);

    if (!Number.isInteger(valor) || valor <= 0) {
      setErro("A meta precisa ter um valor inteiro maior que zero.");
      return;
    }

    setSalvando(true);

    const supabase = createClient();

    const { error } = await supabase
      .from("metas_coletivas")
      .insert({
        organizacao_id: organizacaoId,
        titulo: titulo.trim(),
        descricao: descricao.trim() || null,
        tipo,
        valor_meta: valor,
        data_limite: dataLimite || null,
      });

    if (error) {
      setErro(
        "Não foi possível criar a meta. " + error.message,
      );
      setSalvando(false);
      return;
    }

    setTitulo("");
    setDescricao("");
    setValorMeta("5");
    setDataLimite("");
    setSucesso("Meta criada com sucesso!");

    router.refresh();
    setSalvando(false);
  }

  return (
    <form onSubmit={criarMeta} className="mt-6 space-y-5">
      {erro && (
        <p role="alert" className="text-sm text-destructive">
          {erro}
        </p>
      )}

      {sucesso && (
        <p role="status" className="text-sm text-primary">
          {sucesso}
        </p>
      )}

      <div>
        <label
          htmlFor="organizacaoMeta"
          className="mb-2 block text-sm font-medium text-foreground"
        >
          Organização ou equipe
        </label>

        <select
          id="organizacaoMeta"
          value={organizacaoId}
          onChange={(event) => setOrganizacaoId(event.target.value)}
          required
          className="w-full rounded-xl border border-border bg-background px-4 py-3 text-foreground"
        >
          {organizacoes.map((organizacao) => (
            <option key={organizacao.id} value={organizacao.id}>
              {organizacao.nome}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label
          htmlFor="tituloMeta"
          className="mb-2 block text-sm font-medium text-foreground"
        >
          Título da meta
        </label>

        <input
          id="tituloMeta"
          value={titulo}
          onChange={(event) => setTitulo(event.target.value)}
          placeholder="Ex.: Concluir 5 projetos de pesquisa"
          minLength={3}
          maxLength={120}
          required
          className="w-full rounded-xl border border-border bg-background px-4 py-3 text-foreground"
        />
      </div>

      <div>
        <label
          htmlFor="descricaoMeta"
          className="mb-2 block text-sm font-medium text-foreground"
        >
          Descrição (opcional)
        </label>

        <textarea
          id="descricaoMeta"
          value={descricao}
          onChange={(event) => setDescricao(event.target.value)}
          placeholder="Descreva o objetivo coletivo."
          rows={3}
          className="w-full rounded-xl border border-border bg-background px-4 py-3 text-foreground"
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label
            htmlFor="tipoMeta"
            className="mb-2 block text-sm font-medium text-foreground"
          >
            Indicador
          </label>

          <select
            id="tipoMeta"
            value={tipo}
            onChange={(event) =>
              setTipo(
                event.target.value as
                  | "projetos_criados"
                  | "projetos_concluidos",
              )
            }
            className="w-full rounded-xl border border-border bg-background px-4 py-3 text-foreground"
          >
            <option value="projetos_concluidos">
              Projetos concluídos
            </option>
            <option value="projetos_criados">
              Projetos criados
            </option>
          </select>
        </div>

        <div>
          <label
            htmlFor="valorMeta"
            className="mb-2 block text-sm font-medium text-foreground"
          >
            Quantidade desejada
          </label>

          <input
            id="valorMeta"
            type="number"
            min={1}
            step={1}
            value={valorMeta}
            onChange={(event) => setValorMeta(event.target.value)}
            required
            className="w-full rounded-xl border border-border bg-background px-4 py-3 text-foreground"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="dataLimiteMeta"
          className="mb-2 block text-sm font-medium text-foreground"
        >
          Prazo (opcional)
        </label>

        <input
          id="dataLimiteMeta"
          type="date"
          value={dataLimite}
          onChange={(event) => setDataLimite(event.target.value)}
          className="w-full rounded-xl border border-border bg-background px-4 py-3 text-foreground"
        />
      </div>

      <button
        type="submit"
        disabled={salvando}
        className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 font-medium text-primary-foreground transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
      >
        <Plus size={18} />
        {salvando ? "Criando meta..." : "Criar meta coletiva"}
      </button>
    </form>
  );
}
