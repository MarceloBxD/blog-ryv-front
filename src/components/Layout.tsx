import React from "react";
import Head from "next/head";
import Link from "next/link";
import { PhoneIcon, EyeIcon } from "@heroicons/react/24/outline";

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
}

const Layout: React.FC<LayoutProps> = ({
  children,
  title = "RYV Blog - Saúde Mental e Ótica",
  description = "Blog especializado em saúde mental, ótica e optometria. Dicas, informações e cuidados para sua visão e bem-estar.",
}) => {
  const handleWhatsAppClick = async () => {
    const message = encodeURIComponent(
      "Olá! Gostaria de agendar uma consulta ou tirar dúvidas sobre óculos e saúde ocular."
    );
    const phone = "5511999999999"; // Substitua pelo número real

    // Registrar contato no banco de dados
    try {
      await fetch("http://localhost:3001/api/whatsapp/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: "Visitante do Site",
          phone: "Não informado",
          message: "Cliqueu no botão WhatsApp",
          source: window.location.href,
        }),
      });
    } catch (error) {
      console.log("Erro ao registrar contato:", error);
    }

    // Abrir WhatsApp
    window.open(`https://wa.me/${phone}?text=${message}`, "_blank");
  };

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
      </Head>

      <div className="min-h-screen flex flex-col">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              {/* Logo */}
              <div className="flex items-center">
                <EyeIcon className="h-8 w-8 text-blue-600" />
                <div className="ml-3">
                  <h1 className="text-xl font-bold text-gray-900">RYV</h1>
                  <p className="text-sm text-gray-600">Saúde & Visão</p>
                </div>
              </div>

              {/* Navigation */}
              <nav className="hidden md:flex space-x-8">
                <Link
                  href="/"
                  className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Início
                </Link>
                <Link
                  href="/?category=saude-mental"
                  className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Saúde Mental
                </Link>
                <Link
                  href="/?category=otica"
                  className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Ótica
                </Link>
                <Link
                  href="/?category=optometria"
                  className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Optometria
                </Link>
              </nav>

              {/* Contact Button */}
              <div className="flex items-center space-x-4">
                <button onClick={handleWhatsAppClick} className="btn-whatsapp">
                  <PhoneIcon className="h-5 w-5" />
                  Agendar
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1">{children}</main>

        {/* Footer */}
        <footer className="bg-gray-900 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {/* Company Info */}
              <div className="col-span-1 md:col-span-2">
                <div className="flex items-center mb-4">
                  <EyeIcon className="h-8 w-8 text-blue-400" />
                  <div className="ml-3">
                    <h3 className="text-xl font-bold">RYV</h3>
                    <p className="text-gray-400">Saúde & Visão</p>
                  </div>
                </div>
                <p className="text-gray-300 mb-4">
                  Especialistas em saúde ocular e bem-estar mental. Oferecemos
                  soluções personalizadas para cuidar da sua visão e qualidade
                  de vida.
                </p>
                <div className="flex space-x-4">
                  <button
                    onClick={handleWhatsAppClick}
                    className="btn-whatsapp"
                  >
                    <PhoneIcon className="h-4 w-4" />
                    WhatsApp
                  </button>
                </div>
              </div>

              {/* Services */}
              <div>
                <h4 className="text-lg font-semibold mb-4">Nossos Serviços</h4>
                <ul className="space-y-2 text-gray-300">
                  <li>Exames Oftalmológicos</li>
                  <li>Óculos e Lentes</li>
                  <li>Lentes de Contato</li>
                  <li>Óculos de Sol</li>
                  <li>Consultoria em Saúde Ocular</li>
                </ul>
              </div>

              {/* Contact Info */}
              <div>
                <h4 className="text-lg font-semibold mb-4">Contato</h4>
                <div className="space-y-2 text-gray-300">
                  <p>📍 Rua das Flores, 123</p>
                  <p>📞 (11) 99999-9999</p>
                  <p>✉️ contato@ryv.com.br</p>
                  <p>🕒 Seg-Sex: 8h-18h</p>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
              <p>
                &copy; 2024 RYV - Saúde & Visão. Todos os direitos reservados.
              </p>
            </div>
          </div>
        </footer>

        {/* Floating WhatsApp Button */}
        <button
          onClick={handleWhatsAppClick}
          className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 z-50"
          aria-label="Contato WhatsApp"
        >
          <PhoneIcon className="h-6 w-6" />
        </button>
      </div>
    </>
  );
};

export default Layout;
