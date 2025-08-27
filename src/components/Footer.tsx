import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full bg-background border-t border-border py-12 px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logo e Nome */}
          <div className="flex items-center gap-3">
            <Image
              src="/logo-ryv.webp"
              alt="Logo Ryv"
              width={32}
              height={32}
              className="rounded-lg"
            />
            <span className="text-2xl font-semibold text-primary tracking-tight">
              Ryv
            </span>
          </div>

          {/* Links de Navegação */}
          <nav className="flex gap-8 justify-center">
            <Link
              href="/sobre"
              className="text-secondary hover:text-primary transition-colors duration-200 font-medium"
            >
              Sobre
            </Link>
            <Link
              href="/noticias"
              className="text-secondary hover:text-primary transition-colors duration-200 font-medium"
            >
              Notícias
            </Link>
            <Link
              href="/login"
              className="text-secondary hover:text-primary transition-colors duration-200 font-medium"
            >
              Entrar
            </Link>
          </nav>

          {/* Copyright */}
          <div className="text-sm text-black text-center md:text-right">
            © {new Date().getFullYear()} Ryv. Todos os direitos reservados.
          </div>
        </div>

        {/* Linha de separação */}
        <div className="mt-8 pt-8 border-t border-border/50">
          <p className="text-center text-sm text-secondary max-w-2xl mx-auto">
            Conectando saúde mental e visão para uma vida mais plena e
            equilibrada.
          </p>
        </div>
      </div>
    </footer>
  );
}
