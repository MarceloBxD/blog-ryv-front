import React from "react";
import Link from "next/link";
import Image from "next/image";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { EyeIcon, CalendarIcon, UserIcon } from "@heroicons/react/24/outline";

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

interface ArticleCardProps {
  article: Article;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => {
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

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "dd 'de' MMMM 'de' yyyy", {
        locale: ptBR,
      });
    } catch {
      return "Data não disponível";
    }
  };

  return (
    <article className="card group animate-fade-in">
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <Image
          src={article.imageURL}
          alt={article.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ryv-dark/50 to-transparent" />
        <div className="absolute top-4 left-4">
          <span className={getCategoryClass(article.category)}>
            {article.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-ryv-dark mb-3 group-hover:text-ryv-primary transition-colors">
          <Link href={`/artigo/${article.slug}`}>{article.title}</Link>
        </h3>

        <p className="text-ryv-dark-light mb-4 line-clamp-3">
          {article.excerpt}
        </p>

        {/* Meta Information */}
        <div className="flex items-center justify-between text-sm text-ryv-dark-lighter">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <UserIcon className="h-4 w-4 mr-1" />
              <span>{article.author}</span>
            </div>
            <div className="flex items-center">
              <CalendarIcon className="h-4 w-4 mr-1" />
              <span>{formatDate(article.publishedAt)}</span>
            </div>
          </div>
          <div className="flex items-center">
            <EyeIcon className="h-4 w-4 mr-1" />
            <span>{article.viewCount} visualizações</span>
          </div>
        </div>

        {/* Tags */}
        {article.tags && (
          <div className="mt-4 flex flex-wrap gap-2">
            {article.tags
              .split(",")
              .slice(0, 3)
              .map((tag, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-ryv-secondary text-ryv-dark text-xs rounded-md"
                >
                  {tag.trim()}
                </span>
              ))}
          </div>
        )}

        {/* Read More Button */}
        <div className="mt-6">
          <Link
            href={`/artigo/${article.slug}`}
            className="inline-flex items-center text-ryv-primary hover:text-ryv-primary-dark font-medium transition-colors"
          >
            Ler mais
            <svg
              className="ml-2 h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        </div>
      </div>
    </article>
  );
};

export default ArticleCard;
