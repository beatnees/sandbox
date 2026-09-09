export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-(--border) bg-(--surface)/95 backdrop-blur">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <a href="/sandbox" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-(--blue) text-xl text-(--t-white) shadow-sm">
            ✦
          </div>

          <div className="flex flex-col sm:block">
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
            className="text-sm font-medium text-(--muted) transition hover:text-(--blue)"
          >
            Início
          </a>

          <a
            href="#sobre"
            className="text-sm font-medium text-(--muted) transition hover:text-(--blue)"
          >
            Sobre
          </a>

          <a
            href="#como-funciona"
            className="text-sm font-medium text-(--muted) transition hover:text-(--blue)"
          >
            Como funciona
          </a>

          <a
            href="#jornada"
            className="text-sm font-medium text-(--muted) transition hover:text-(--blue)"
          >
            Publicações
          </a>
        </nav>

        {/* Ação */}
        <button className="rounded-xl bg-(--blue) px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-(--blue-dark)">
          Acessar Plataforma
        </button>
      </div>
    </header>
  );
}
