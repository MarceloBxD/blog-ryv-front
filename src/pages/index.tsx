import React, { useState, useEffect, useCallback } from "react";
import Head from "next/head";
import Layout from "../components/Layout";
import HeroSection from "../components/HeroSection";
import ArticleCard from "../components/ArticleCard";
import {
  MagnifyingGlassIcon,
  FunnelIcon,
  ChatBubbleLeftRightIcon,
} from "@heroicons/react/24/outline";

interface Article {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  imageURL: string;
  category: string;
  author: string;
  publishedAt: string;
  viewCount: number;
  tags: string;
}

interface Category {
  id: number;
  name: string;
  slug: string;
  description: string;
  color: string;
}

const HomePage: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Carregar artigos da API
  const fetchArticles = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: "9",
      });

      if (selectedCategory) {
        params.append("category", selectedCategory);
      }

      const response = await fetch(
        `http://localhost:3001/api/articles?${params}`
      );
      const data = await response.json();

      setArticles(data.articles || []);
      setTotalPages(data.pagination?.pages || 1);
    } catch (error) {
      console.error("Erro ao carregar artigos:", error);
    } finally {
      setLoading(false);
    }
  }, [currentPage, selectedCategory]);

  // Carregar categorias
  const fetchCategories = useCallback(async () => {
    try {
      const response = await fetch(
        "http://localhost:3001/api/articles/categories"
      );
      const data = await response.json();
      setCategories(data || []);
    } catch (error) {
      console.error("Erro ao carregar categorias:", error);
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  useEffect(() => {
    fetchArticles();
  }, [fetchArticles]);

  // Filtrar artigos por busca
  const filteredArticles = articles.filter(
    (article) =>
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.tags.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // A busca é feita localmente nos artigos já carregados
  };

  return (
    <>
      <Head>
        <title>RYV - Conectando Saúde Mental e Visão | Blog Oficial</title>
        <meta
          name="description"
          content="Descubra como cuidar da sua visão pode transformar sua saúde mental. Blog da RYV com conteúdo exclusivo sobre óptica, bem-estar e conexão mente-corpo."
        />
        <meta
          name="keywords"
          content="saúde mental, visão, óptica, bem-estar, oftalmologia, saúde ocular, RYV, blog, conexão mente-corpo"
        />

        {/* Open Graph */}
        <meta
          property="og:title"
          content="RYV - Conectando Saúde Mental e Visão"
        />
        <meta
          property="og:description"
          content="Descubra como cuidar da sua visão pode transformar sua saúde mental. Blog da RYV com conteúdo exclusivo sobre óptica e bem-estar."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://ryv.com.br/" />
        <meta
          property="og:image"
          content="https://ryv.com.br/mental-health-illustration.svg"
        />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="RYV - Conectando Saúde Mental e Visão"
        />
        <meta
          name="twitter:description"
          content="Descubra como cuidar da sua visão pode transformar sua saúde mental. Blog da RYV com conteúdo exclusivo sobre óptica e bem-estar."
        />
        <meta
          name="twitter:image"
          content="https://ryv.com.br/mental-health-illustration.svg"
        />

        {/* Canonical */}
        <link rel="canonical" href="https://ryv.com.br/" />
      </Head>
      <Layout>
        <HeroSection />
        <section id="artigos" className="py-16 ryv-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Section Header */}
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-ryv-dark mb-4">
                Histórias que Conectam
              </h2>
              <p className="text-xl text-ryv-dark-light max-w-3xl mx-auto">
                Conteúdo exclusivo sobre como saúde mental e visão se conectam.
                Aprenda como cuidar da sua visão pode transformar seu bem-estar
                emocional.
              </p>
            </div>
            <div className="mb-8 space-y-4">
              <form onSubmit={handleSearch} className="max-w-md mx-auto">
                <div className="relative">
                  <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-ryv-dark-lighter" />
                  <input
                    type="text"
                    placeholder="Encontre o que você procura..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-ryv-secondary rounded-lg focus:ring-2 focus:ring-ryv-primary focus:border-transparent"
                  />
                </div>
              </form>
              <div className="flex flex-wrap justify-center gap-2">
                <button
                  onClick={() => handleCategoryChange("")}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedCategory === ""
                      ? "bg-ryv-primary text-ryv-white"
                      : "bg-ryv-secondary text-ryv-dark hover:bg-ryv-secondary-dark"
                  }`}
                >
                  Todas as Histórias
                </button>
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => handleCategoryChange(category.name)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      selectedCategory === category.name
                        ? "bg-ryv-primary text-ryv-white"
                        : "bg-ryv-secondary text-ryv-dark hover:bg-ryv-secondary-dark"
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>
            {loading && (
              <div className="flex justify-center items-center py-12">
                <div className="spinner"></div>
                <span className="ml-3 text-ryv-dark-light">
                  Conectando histórias...
                </span>
              </div>
            )}
            {!loading && (
              <>
                {filteredArticles.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                    {filteredArticles.map((article) => (
                      <ArticleCard key={article.id} article={article} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <FunnelIcon className="h-12 w-12 text-ryv-dark-lighter mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-ryv-dark mb-2">
                      Nenhuma história encontrada
                    </h3>
                    <p className="text-ryv-dark-light">
                      Tente ajustar os filtros ou termos de busca.
                    </p>
                  </div>
                )}
                {totalPages > 1 && (
                  <div className="flex justify-center items-center space-x-2">
                    <button
                      onClick={() =>
                        setCurrentPage(Math.max(1, currentPage - 1))
                      }
                      disabled={currentPage === 1}
                      className="px-4 py-2 text-sm font-medium text-ryv-dark-lighter bg-ryv-white border border-ryv-secondary rounded-md hover:bg-ryv-secondary disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Anterior
                    </button>

                    <span className="px-4 py-2 text-sm text-ryv-dark">
                      Página {currentPage} de {totalPages}
                    </span>

                    <button
                      onClick={() =>
                        setCurrentPage(Math.min(totalPages, currentPage + 1))
                      }
                      disabled={currentPage === totalPages}
                      className="px-4 py-2 text-sm font-medium text-ryv-dark-lighter bg-ryv-white border border-ryv-secondary rounded-md hover:bg-ryv-secondary disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Próxima
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </section>
        <section className="py-16 gradient-bg">
          <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-ryv-dark mb-6">
              Pronto para Conectar?
            </h2>
            <p className="text-xl text-ryv-dark-light mb-8">
              Nossa equipe está pronta para conectar você com os melhores
              cuidados para sua visão e bem-estar mental.
            </p>
            <div className="flex justify-center">
              <button
                onClick={() => {
                  const message = encodeURIComponent(
                    "Olá! Vi o site da RYV e gostaria de saber mais sobre como vocês podem me ajudar com minha saúde ocular e bem-estar. Podemos conversar?"
                  );
                  const phone = "5511999999999";
                  window.open(
                    `https://wa.me/${phone}?text=${message}`,
                    "_blank"
                  );
                }}
                className="btn-whatsapp text-lg px-8 py-4"
              >
                <ChatBubbleLeftRightIcon className="h-6 w-6" />
                Vamos Conversar?
              </button>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default HomePage;
