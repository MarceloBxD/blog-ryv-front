import { useEffect, useState } from "react";
import Link from "next/link";

const mockArticles = [
  {
    id: 1,
    slug: "lentes-azuis-e-saude-visual",
    title: "Lentes Azuis e Saúde Visual",
    summary:
      "Descubra como as lentes de proteção azul podem melhorar sua saúde ocular no dia a dia.",
    image: "/husky-oculos.webp",
  },
  {
    id: 2,
    slug: "tecnologia-e-bem-estar",
    title: "Tecnologia e Bem-Estar",
    summary:
      "Como a tecnologia pode ser aliada do seu bem-estar mental e visual.",
    image: "/sunglass.avif",
  },
  {
    id: 3,
    slug: "dicas-para-visao-saudavel",
    title: "Dicas para uma Visão Saudável",
    summary:
      "Veja dicas práticas para manter sua visão saudável em todas as idades.",
    image: "/mental.webp",
  },
  {
    id: 4,
    slug: "novidades-em-otica",
    title: "Novidades em Óptica",
    summary:
      "Fique por dentro das últimas tendências e inovações do mundo óptico.",
    image: "/logo-ryv.webp",
  },
];

export default function NewsSwiper() {
  const [articles, setArticles] = useState([]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);

    fetch("/api/articles")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data.articles) && data.articles.length > 0) {
          setArticles(data.articles);
        } else {
          setArticles(mockArticles);
        }
      })
      .catch(() => setArticles(mockArticles));
  }, []);

  return (
    <section className="w-full px-8 py-16 bg-background">
      <div className="max-w-7xl mx-auto">
        <div
          className={`mb-12 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}
        >
          <h2 className="text-4xl font-bold text-primary mb-4">
            Notícias Quentinhas
          </h2>
          <p className="text-xl text-secondary max-w-2xl">
            Fique por dentro das últimas novidades sobre saúde visual e
            bem-estar mental.
          </p>
        </div>

        <div className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory scrollbar-hide">
          {articles.map((article, index) => (
            <Link
              key={article.id}
              href={`/artigo/${article.slug}`}
              className={`min-w-[320px] max-w-xs bg-card rounded-2xl shadow-sm border border-border p-6 flex-shrink-0 snap-start transition-all duration-300 hover:shadow-lg hover:-translate-y-2 group ${
                isVisible ? "animate-fade-in-up" : "opacity-0"
              }`}
              style={{ animationDelay: `${0.2 + index * 0.1}s` }}
            >
              <div className="h-48 w-full bg-gray-100 rounded-xl mb-4 overflow-hidden group-hover:scale-105 transition-transform duration-300">
                {article.image && (
                  <img
                    src={article.image}
                    alt={article.title}
                    className="object-cover w-full h-full"
                  />
                )}
              </div>
              <h3 className="font-semibold text-lg mb-3 text-primary line-clamp-2 group-hover:text-accent transition-colors duration-200">
                {article.title}
              </h3>
              <p className="text-secondary text-sm line-clamp-3 leading-relaxed">
                {article.summary}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
