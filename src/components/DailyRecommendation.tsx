import React, { useState, useEffect } from "react";
import {
  BookOpenIcon,
  SparklesIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

interface Recommendation {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  slug: string;
  imageURL: string;
  motivation: string;
  readingTime: string;
}

const DailyRecommendation: React.FC = () => {
  const [recommendation, setRecommendation] = useState<Recommendation | null>(
    null
  );
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    // Verificar se já mostrou a recomendação hoje
    const today = new Date().toDateString();
    const lastShown = localStorage.getItem("daily-recommendation-date");

    if (lastShown !== today) {
      fetchDailyRecommendation();
      setIsVisible(true);
    }
  }, []);

  const fetchDailyRecommendation = async () => {
    try {
      const response = await fetch(
        "http://localhost:3001/api/articles/daily-recommendation"
      );
      if (response.ok) {
        const data = await response.json();
        setRecommendation(data);
      }
    } catch (error) {
      console.error("Erro ao buscar recomendação:", error);
    }
  };

  const handleClose = () => {
    setIsVisible(false);
    const today = new Date().toDateString();
    localStorage.setItem("daily-recommendation-date", today);
  };

  const getMotivationalMessage = (category: string) => {
    const messages = {
      "Saúde Mental": [
        "💡 Desbloqueie insights poderosos sobre sua mente",
        "🧠 Conecte-se com seu bem-estar emocional",
        "🌟 Transforme sua perspectiva sobre saúde mental",
      ],
      Ótica: [
        "👁️ Descubra como cuidar da sua visão",
        "🔍 Veja o mundo com novos olhos",
        "✨ Tecnologia que transforma sua experiência visual",
      ],
      Optometria: [
        "🔬 Ciência avançada para sua saúde ocular",
        "📊 Dados que revelam a verdade sobre sua visão",
        "🎯 Soluções precisas para problemas visuais",
      ],
      "Dicas de Saúde": [
        "💪 Pequenas mudanças, grandes resultados",
        "🌱 Cultive hábitos que transformam sua vida",
        "⚡ Energia e vitalidade ao seu alcance",
      ],
    };

    const categoryMessages =
      messages[category as keyof typeof messages] || messages["Saúde Mental"];
    return categoryMessages[
      Math.floor(Math.random() * categoryMessages.length)
    ];
  };

  if (!isVisible || !recommendation) return null;

  return (
    <div className="fixed bottom-4 left-4 z-40 max-w-sm">
      <div
        className={`bg-ryv-white rounded-lg shadow-xl border border-ryv-secondary transition-all duration-300 ${
          isExpanded ? "w-96" : "w-80"
        }`}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-ryv-primary to-ryv-primary-light rounded-t-lg p-4 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <SparklesIcon className="h-5 w-5" />
              <span className="font-semibold text-sm">Recomendação do Dia</span>
            </div>
            <button
              onClick={handleClose}
              className="text-ryv-white hover:text-ryv-secondary transition-colors"
            >
              <XMarkIcon className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0">
              <div className="w-16 h-16 bg-gradient-to-br from-ryv-primary to-ryv-primary-light rounded-lg flex items-center justify-center">
                <BookOpenIcon className="h-8 w-8 text-white" />
              </div>
            </div>

            <div className="flex-1 min-w-0">
              <div className="mb-2">
                <span className="inline-block px-2 py-1 bg-ryv-secondary text-ryv-dark text-xs font-medium rounded-full">
                  {recommendation.category}
                </span>
              </div>

              <h3 className="font-bold text-ryv-dark text-sm mb-2 line-clamp-2">
                {recommendation.title}
              </h3>

              <p className="text-ryv-dark-light text-xs mb-3 line-clamp-2">
                {recommendation.excerpt}
              </p>

              <div className="flex items-center justify-between">
                <span className="text-xs text-ryv-dark-lighter">
                  ⏱️ {recommendation.readingTime} de leitura
                </span>
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="text-xs text-ryv-primary hover:text-ryv-primary-light font-medium"
                >
                  {isExpanded ? "Ver menos" : "Ver mais"}
                </button>
              </div>
            </div>
          </div>

          {/* Expanded Content */}
          {isExpanded && (
            <div className="mt-4 pt-4 border-t border-ryv-secondary">
              <div className="bg-gradient-to-r from-ryv-secondary to-ryv-secondary-dark p-3 rounded-lg mb-3">
                <p className="text-ryv-dark text-sm font-medium">
                  {getMotivationalMessage(recommendation.category)}
                </p>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() =>
                    (window.location.href = `/artigo/${recommendation.slug}`)
                  }
                  className="flex-1 bg-ryv-primary hover:bg-ryv-primary-light text-white text-sm font-medium py-2 px-4 rounded-lg transition-colors"
                >
                  Ler Agora
                </button>
                <button
                  onClick={handleClose}
                  className="px-4 py-2 text-ryv-dark-lighter hover:text-ryv-dark text-sm transition-colors"
                >
                  Depois
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DailyRecommendation;
