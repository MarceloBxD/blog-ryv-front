import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import Layout from "../../components/Layout";
import {
  EyeIcon,
  CalendarIcon,
  UserIcon,
  ArrowLeftIcon,
  ShareIcon,
} from "@heroicons/react/24/outline";

interface Article {
  id: number;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  imageURL: string;
  category: string;
  author: string;
  publishedAt: string;
  viewCount: number;
  tags: string;
}

const ArticlePage: React.FC = () => {
  const router = useRouter();
  const { slug } = router.query;
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchArticle = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `http://localhost:8080/api/articles/${slug}`
      );

      if (!response.ok) {
        throw new Error("Artigo não encontrado");
      }

      const data = await response.json();
      setArticle(data);
    } catch (error) {
      console.error("Erro ao carregar artigo:", error);
      setError("Artigo não encontrado");
    } finally {
      setLoading(false);
    }
  }, [slug]);

  useEffect(() => {
    if (slug) {
      fetchArticle();
    }
  }, [slug, fetchArticle]);

  const handleWhatsAppClick = async () => {
    if (!article) return;

    const message = encodeURIComponent(
      `Olá! Li o artigo "${
        article.title
      }" e gostaria de saber mais sobre ${article.category.toLowerCase()}.`
    );
    const phone = "5511999999999"; // Substitua pelo número real

    // Registrar contato no banco de dados
    try {
      await fetch("http://localhost:8080/api/whatsapp/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: "Visitante do Site",
          phone: "Não informado",
          message: `Interessado no artigo: ${article.title}`,
          source: window.location.href,
          articleID: article.id,
        }),
      });
    } catch (error) {
      console.log("Erro ao registrar contato:", error);
    }

    // Abrir WhatsApp
    window.open(`https://wa.me/${phone}?text=${message}`, "_blank");
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: article?.title,
        text: article?.excerpt,
        url: window.location.href,
      });
    } else {
      // Fallback para copiar URL
      navigator.clipboard.writeText(window.location.href);
      alert("Link copiado para a área de transferência!");
    }
  };

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "dd 'de' MMMM 'de' yyyy", {
        locale: ptBR,
      });
    } catch {
      return "Data não disponível";
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case "saúde mental":
        return "bg-green-100 text-green-800";
      case "ótica":
        return "bg-blue-100 text-blue-800";
      case "optometria":
        return "bg-purple-100 text-purple-800";
      case "dicas de saúde":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex justify-center items-center min-h-screen">
          <div className="spinner"></div>
          <span className="ml-3 text-gray-600">Carregando artigo...</span>
        </div>
      </Layout>
    );
  }

  if (error || !article) {
    return (
      <Layout title="Artigo não encontrado">
        <div className="flex flex-col items-center justify-center min-h-screen text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Artigo não encontrado
          </h1>
          <p className="text-gray-600 mb-8">
            O artigo que você está procurando não existe ou foi removido.
          </p>
          <button onClick={() => router.push("/")} className="btn-primary">
            <ArrowLeftIcon className="h-5 w-5 mr-2" />
            Voltar ao Blog
          </button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title={article.title} description={article.excerpt}>
      {/* Article Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Breadcrumb */}
          <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-6">
            <button
              onClick={() => router.push("/")}
              className="hover:text-blue-600 transition-colors"
            >
              Blog
            </button>
            <span>/</span>
            <span className="text-gray-900">{article.category}</span>
          </nav>

          {/* Category Badge */}
          <div className="mb-6">
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(
                article.category
              )}`}
            >
              {article.category}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            {article.title}
          </h1>

          {/* Meta Information */}
          <div className="flex flex-wrap items-center justify-between text-sm text-gray-500 mb-6">
            <div className="flex items-center space-x-6">
              <div className="flex items-center">
                <UserIcon className="h-4 w-4 mr-2" />
                <span>{article.author}</span>
              </div>
              <div className="flex items-center">
                <CalendarIcon className="h-4 w-4 mr-2" />
                <span>{formatDate(article.publishedAt)}</span>
              </div>
              <div className="flex items-center">
                <EyeIcon className="h-4 w-4 mr-2" />
                <span>{article.viewCount} visualizações</span>
              </div>
            </div>

            <button
              onClick={handleShare}
              className="flex items-center text-gray-500 hover:text-blue-600 transition-colors"
            >
              <ShareIcon className="h-4 w-4 mr-1" />
              Compartilhar
            </button>
          </div>

          {/* Excerpt */}
          <p className="text-xl text-gray-600 leading-relaxed mb-8">
            {article.excerpt}
          </p>
        </div>
      </div>

      {/* Article Content */}
      <div className="bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Featured Image */}
          <div className="relative mb-12 h-64 md:h-96">
            <Image
              src={article.imageURL}
              alt={article.title}
              fill
              className="object-cover rounded-xl shadow-lg"
            />
          </div>

          {/* Content */}
          <div
            className="article-content prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />

          {/* Tags */}
          {article.tags && (
            <div className="mt-12 pt-8 border-t border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Tags:
              </h3>
              <div className="flex flex-wrap gap-2">
                {article.tags.split(",").map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
                  >
                    {tag.trim()}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* CTA Section */}
          <div className="mt-12 p-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Gostou do artigo?
              </h3>
              <p className="text-gray-600 mb-6">
                Tem dúvidas sobre {article.category.toLowerCase()}? Nossa equipe
                está pronta para ajudar você!
              </p>
              <button
                onClick={handleWhatsAppClick}
                className="btn-whatsapp text-lg px-8 py-4"
              >
                <EyeIcon className="h-6 w-6" />
                Falar com Especialista
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Related Articles CTA */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Quer ler mais artigos?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Explore nosso blog e descubra mais sobre saúde mental, ótica e
            optometria.
          </p>
          <button
            onClick={() => router.push("/")}
            className="btn-primary text-lg px-8 py-4"
          >
            <ArrowLeftIcon className="h-5 w-5 mr-2" />
            Ver Todos os Artigos
          </button>
        </div>
      </section>
    </Layout>
  );
};

export default ArticlePage;
