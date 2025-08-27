import { useState } from "react";
import Link from "next/link";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <img
              src="/logo-ryv.webp"
              alt="Logo Ryv"
              className="w-8 h-8 rounded-lg transition-transform group-hover:scale-105"
            />
            <span className="text-xl font-semibold text-primary tracking-tight">
              Ryv
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="/"
              className="text-secondary hover:text-primary transition-colors duration-200 font-medium"
            >
              Notícias
            </Link>
            <Link
              href="/sobre"
              className="text-secondary hover:text-primary transition-colors duration-200 font-medium"
            >
              Sobre
            </Link>
            <Link
              href="/admin/login"
              className="text-secondary hover:text-primary transition-colors duration-200 font-medium"
            >
              Entrar
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg text-secondary hover:text-primary hover:bg-gray-100 transition-colors duration-200"
          >
            {isMenuOpen ? (
              <XMarkIcon className="h-6 w-6" />
            ) : (
              <Bars3Icon className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-border/50 bg-background/95 backdrop-blur-md">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link
                href="/"
                className="block px-3 py-2 text-secondary hover:text-primary hover:bg-gray-50 rounded-md transition-colors duration-200 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Notícias
              </Link>
              <Link
                href="/sobre"
                className="block px-3 py-2 text-secondary hover:text-primary hover:bg-gray-50 rounded-md transition-colors duration-200 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Sobre
              </Link>
              <Link
                href="/admin/login"
                className="block px-3 py-2 text-secondary hover:text-primary hover:bg-gray-50 rounded-md transition-colors duration-200 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Entrar
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
