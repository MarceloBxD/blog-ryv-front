import React, { useState, useEffect, useCallback } from "react";
import Layout from "../components/Layout";
import HeroSection from "../components/HeroSection";
import ArticleCard from "../components/ArticleCard";
import { MagnifyingGlassIcon, FunnelIcon } from "@heroicons/react/24/outline";

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
    <Layout>
      <HeroSection />
      <section id="artigos" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Artigos Especializados
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Conteúdo exclusivo sobre saúde mental, ótica e optometria. Aprenda
              como cuidar da sua visão e bem-estar.
            </p>
          </div>
          <div className="mb-8 space-y-4">
            <form onSubmit={handleSearch} className="max-w-md mx-auto">
              <div className="relative">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Buscar artigos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </form>
            <div className="flex flex-wrap justify-center gap-2">
              <button
                onClick={() => handleCategoryChange("")}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === ""
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                Todos
              </button>
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => handleCategoryChange(category.name)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedCategory === category.name
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
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
              <span className="ml-3 text-gray-600">Carregando artigos...</span>
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
                  <FunnelIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Nenhum artigo encontrado
                  </h3>
                  <p className="text-gray-600">
                    Tente ajustar os filtros ou termos de busca.
                  </p>
                </div>
              )}
              {totalPages > 1 && (
                <div className="flex justify-center items-center space-x-2">
                  <button
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Anterior
                  </button>

                  <span className="px-4 py-2 text-sm text-gray-700">
                    Página {currentPage} de {totalPages}
                  </span>

                  <button
                    onClick={() =>
                      setCurrentPage(Math.min(totalPages, currentPage + 1))
                    }
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
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
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Precisa de Ajuda com sua Visão?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Nossa equipe de especialistas está pronta para ajudar você a
            encontrar a solução ideal para sua saúde ocular.
          </p>
          <button
            onClick={() => {
              const message = encodeURIComponent(
                "Olá! Gostaria de agendar uma consulta ou tirar dúvidas sobre óculos e saúde ocular."
              );
              const phone = "5511999999999";
              window.open(`https://wa.me/${phone}?text=${message}`, "_blank");
            }}
            className="btn-whatsapp text-lg px-8 py-4"
          >
            <MagnifyingGlassIcon className="h-6 w-6" />
            Agendar Consulta Gratuita
          </button>
        </div>
      </section>
    </Layout>
  );
};

export default HomePage;
