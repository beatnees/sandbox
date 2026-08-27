export default function Header() {
  return (
    <header className="w-full border-b border-(--border) bg-(--surface)">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <a href="/sandbox" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-(--primary)">
            <span className="font-bold text-white">S</span>
          </div>

          <div>
            <span className="font-(--font-sora) text-lg text-(--foreground)">
              Sandbox
            </span>

            <span className="ml-1 text-sm text-(--muted)">IA na Educação</span>
          </div>
        </a>

        {/* Navegação */}
        <nav className="hidden items-center gap-8 md:flex">
          <a
            href="#"
            className="text-sm font-medium text-(--muted) transition hover:text-(--primary)"
          >
            Início
          </a>

          <a
            href="#sobre"
            className="text-sm font-medium text-(--muted) transition hover:text-(--primary)"
          >
            Sobre
          </a>

          <a
            href="#como-funciona"
            className="text-sm font-medium text-(--muted) transition hover:text-(--primary)"
          >
            Como funciona
          </a>

          <a
            href="#jornada"
            className="text-sm font-medium text-(--muted) transition hover:text-(--primary)"
          >
            Jornada
          </a>
        </nav>

        {/* Ação */}
        <button className="rounded-xl bg-(--primary) px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-(--primary-dark)">
          Acessar Plataforma
        </button>
      </div>
    </header>
  );
}
