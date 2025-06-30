import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Image from "next/image";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import Layout from "../../components/Layout";
import { API_ENDPOINTS, apiRequest } from "../../config/api";
import {
  EyeIcon,
  CalendarIcon,
  UserIcon,
  ArrowLeftIcon,
  ShareIcon,
  ChatBubbleLeftRightIcon,
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
  published_at: string;
  view_count: number;
  tags: string;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

const ArticlePage: React.FC = () => {
  const router = useRouter();
  const { slug } = router.query;
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchArticle = useCallback(async () => {
    if (!slug) return;
    setLoading(true);
    setError(null);
    try {
      const data = await apiRequest(
        API_ENDPOINTS.ARTICLE_BY_SLUG(slug as string)
      );
      if (!data.is_published) {
        throw new Error("Este artigo ainda não foi publicado");
      }
      setArticle(data);
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Artigo não encontrado"
      );
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
      `Olá! Li a história "${
        article.title
      }" no site da RYV e fiquei impressionado com a conexão que vocês fazem entre ${article.category.toLowerCase()} e bem-estar. Gostaria de saber mais sobre como vocês podem me ajudar!`
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
          message: `Interessado na história: ${article.title}`,
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

  const getCategoryClass = (category: string) => {
    switch (category.toLowerCase()) {
      case "saúde mental":
        return "ryv-category-badge ryv-category-saude-mental";
      case "ótica":
        return "ryv-category-badge ryv-category-otica";
      case "optometria":
        return "ryv-category-badge ryv-category-optometria";
      case "dicas de saúde":
        return "ryv-category-badge ryv-category-dicas";
      default:
        return "ryv-category-badge bg-ryv-secondary text-ryv-dark";
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex justify-center items-center min-h-screen">
          <div className="spinner"></div>
          <span className="ml-3 text-ryv-dark-light">
            Conectando história...
          </span>
        </div>
      </Layout>
    );
  }

  if (error || !article) {
    return (
      <Layout title="História não encontrada">
        <div className="flex flex-col items-center justify-center min-h-screen text-center">
          <h1 className="text-4xl font-bold text-ryv-dark mb-4">
            História não encontrada
          </h1>
          <p className="text-ryv-dark-light mb-8">
            A história que você está procurando não existe ou foi removida.
          </p>
          <button onClick={() => router.push("/")} className="btn-primary">
            <ArrowLeftIcon className="h-5 w-5 mr-2" />
            Voltar às Histórias
          </button>
        </div>
      </Layout>
    );
  }

  return (
    <>
      <Head>
        <title>
          {article ? `${article.title} | RYV Blog` : "Artigo | RYV Blog"}
        </title>
        <meta
          name="description"
          content={
            article?.excerpt || "Artigo do blog RYV sobre saúde mental e visão"
          }
        />
        <meta
          name="keywords"
          content={`${
            article?.tags || ""
          }, saúde mental, visão, óptica, bem-estar, RYV`}
        />
        <meta name="author" content={article?.author || "RYV"} />

        {/* Open Graph */}
        <meta
          property="og:title"
          content={article?.title || "Artigo | RYV Blog"}
        />
        <meta
          property="og:description"
          content={
            article?.excerpt || "Artigo do blog RYV sobre saúde mental e visão"
          }
        />
        <meta property="og:type" content="article" />
        <meta
          property="og:url"
          content={`https://ryv.com.br/artigo/${article?.slug}`}
        />
        <meta
          property="og:image"
          content={
            article?.imageURL ||
            "https://ryv.com.br/mental-health-illustration.svg"
          }
        />
        <meta
          property="article:published_time"
          content={article?.published_at}
        />
        <meta property="article:author" content={article?.author} />
        <meta property="article:section" content={article?.category} />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content={article?.title || "Artigo | RYV Blog"}
        />
        <meta
          name="twitter:description"
          content={
            article?.excerpt || "Artigo do blog RYV sobre saúde mental e visão"
          }
        />
        <meta
          name="twitter:image"
          content={
            article?.imageURL ||
            "https://ryv.com.br/mental-health-illustration.svg"
          }
        />

        {/* Canonical */}
        <link
          rel="canonical"
          href={`https://ryv.com.br/artigo/${article?.slug}`}
        />
      </Head>
      <Layout title={article.title} description={article.excerpt}>
        {/* Article Header */}
        <div className="ryv-section border-b border-ryv-secondary">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Breadcrumb */}
            <nav className="flex items-center space-x-2 text-sm text-ryv-dark-lighter mb-6">
              <button
                onClick={() => router.push("/")}
                className="hover:text-ryv-primary transition-colors"
              >
                Histórias
              </button>
              <span>/</span>
              <span className="text-ryv-dark">{article.category}</span>
            </nav>

            {/* Category Badge */}
            <div className="mb-6">
              <span className={getCategoryClass(article.category)}>
                {article.category}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-ryv-dark mb-6 leading-tight">
              {article.title}
            </h1>

            {/* Meta Information */}
            <div className="flex flex-wrap items-center justify-between text-sm text-ryv-dark-lighter mb-6">
              <div className="flex items-center space-x-6">
                <div className="flex items-center">
                  <UserIcon className="h-4 w-4 mr-2" />
                  <span>{article.author}</span>
                </div>
                <div className="flex items-center">
                  <CalendarIcon className="h-4 w-4 mr-2" />
                  <span>{formatDate(article.published_at)}</span>
                </div>
                <div className="flex items-center">
                  <EyeIcon className="h-4 w-4 mr-2" />
                  <span>{article.view_count} visualizações</span>
                </div>
              </div>

              <button
                onClick={handleShare}
                className="flex items-center text-ryv-dark-lighter hover:text-ryv-primary transition-colors"
              >
                <ShareIcon className="h-4 w-4 mr-1" />
                Compartilhar
              </button>
            </div>

            {/* Excerpt */}
            <p className="text-xl text-ryv-dark-light leading-relaxed mb-8">
              {article.excerpt}
            </p>
          </div>
        </div>

        {/* Article Content */}
        <div className="ryv-section">
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
              <div className="mt-12 pt-8 border-t border-ryv-secondary">
                <h3 className="text-lg font-semibold text-ryv-dark mb-4">
                  Tags:
                </h3>
                <div className="flex flex-wrap gap-2">
                  {article.tags.split(",").map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-ryv-secondary text-ryv-dark text-sm rounded-full"
                    >
                      {tag.trim()}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* CTA Section */}
            <div className="mt-12 p-8 bg-gradient-to-r from-ryv-secondary to-ryv-secondary-light rounded-xl">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-ryv-dark mb-4">
                  Gostou desta história?
                </h3>
                <p className="text-ryv-dark-light mb-6">
                  Tem dúvidas sobre {article.category.toLowerCase()}? Nossa
                  equipe está pronta para conectar você com os melhores
                  cuidados!
                </p>
                <button
                  onClick={handleWhatsAppClick}
                  className="btn-whatsapp text-lg px-8 py-4"
                >
                  <ChatBubbleLeftRightIcon className="h-6 w-6" />
                  Vamos Conversar?
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Related Articles CTA */}
        <section className="py-16 ryv-section-alt">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-ryv-dark mb-4">
              Quer descobrir mais histórias?
            </h2>
            <p className="text-xl text-ryv-dark-light mb-8">
              Explore nosso blog e descubra mais sobre como saúde mental e visão
              se conectam.
            </p>
            <button
              onClick={() => router.push("/")}
              className="btn-primary text-lg px-8 py-4"
            >
              <ArrowLeftIcon className="h-5 w-5 mr-2" />
              Ver Todas as Histórias
            </button>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default ArticlePage;
