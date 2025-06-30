import React, { useState, useEffect } from "react";
import {
  TrophyIcon,
  FireIcon,
  StarIcon,
  BookOpenIcon,
  // HeartIcon,
  // ShareIcon,
  // EyeIcon,
} from "@heroicons/react/24/outline";

interface UserStats {
  articlesRead: number;
  streakDays: number;
  totalPoints: number;
  level: number;
  achievements: string[];
  lastReadDate: string;
}

const Gamification: React.FC = () => {
  const [stats, setStats] = useState<UserStats>({
    articlesRead: 0,
    streakDays: 0,
    totalPoints: 0,
    level: 1,
    achievements: [],
    lastReadDate: "",
  });
  const [showStats, setShowStats] = useState(false);
  const [showAchievement, setShowAchievement] = useState<string | null>(null);

  useEffect(() => {
    loadUserStats();
    checkForAchievements();
  }, [checkForAchievements]);

  const loadUserStats = () => {
    const savedStats = localStorage.getItem("user-stats");
    if (savedStats) {
      setStats(JSON.parse(savedStats));
    }
  };

  const updateStats = (action: string) => {
    const today = new Date().toDateString();
    const newStats = { ...stats };

    switch (action) {
      case "read_article":
        newStats.articlesRead += 1;
        newStats.totalPoints += 10;

        // Verificar streak
        if (newStats.lastReadDate !== today) {
          const yesterday = new Date();
          yesterday.setDate(yesterday.getDate() - 1);
          const yesterdayStr = yesterday.toDateString();

          if (newStats.lastReadDate === yesterdayStr) {
            newStats.streakDays += 1;
            newStats.totalPoints += 5; // Bônus de streak
          } else if (newStats.lastReadDate !== today) {
            newStats.streakDays = 1;
          }
        }

        newStats.lastReadDate = today;
        break;

      case "share_article":
        newStats.totalPoints += 5;
        break;

      case "like_article":
        newStats.totalPoints += 2;
        break;
    }

    // Calcular nível
    newStats.level = Math.floor(newStats.totalPoints / 50) + 1;

    setStats(newStats);
    localStorage.setItem("user-stats", JSON.stringify(newStats));

    checkForAchievements(newStats);
  };

  const checkForAchievements = (currentStats = stats) => {
    const newAchievements = [];

    if (
      currentStats.articlesRead >= 5 &&
      !currentStats.achievements.includes("first_reader")
    ) {
      newAchievements.push("first_reader");
      showAchievementNotification("🎉 Primeiro Leitor! Você leu 5 artigos!");
    }

    if (
      currentStats.streakDays >= 7 &&
      !currentStats.achievements.includes("week_warrior")
    ) {
      newAchievements.push("week_warrior");
      showAchievementNotification(
        "🔥 Guerreiro da Semana! 7 dias seguidos lendo!"
      );
    }

    if (
      currentStats.totalPoints >= 100 &&
      !currentStats.achievements.includes("century_club")
    ) {
      newAchievements.push("century_club");
      showAchievementNotification(
        "💎 Clube dos 100! Você alcançou 100 pontos!"
      );
    }

    if (
      currentStats.level >= 5 &&
      !currentStats.achievements.includes("knowledge_seeker")
    ) {
      newAchievements.push("knowledge_seeker");
      showAchievementNotification(
        "🌟 Buscador do Conhecimento! Nível 5 alcançado!"
      );
    }

    if (newAchievements.length > 0) {
      const updatedStats = {
        ...currentStats,
        achievements: [...currentStats.achievements, ...newAchievements],
      };
      setStats(updatedStats);
      localStorage.setItem("user-stats", JSON.stringify(updatedStats));
    }
  };

  const showAchievementNotification = (message: string) => {
    setShowAchievement(message);
    setTimeout(() => setShowAchievement(null), 4000);
  };

  const getLevelTitle = (level: number) => {
    const titles = [
      "Iniciante",
      "Curioso",
      "Aprendiz",
      "Conhecedor",
      "Especialista",
      "Mestre",
      "Sábio",
      "Guru",
      "Lenda",
      "Ícone",
    ];
    return titles[Math.min(level - 1, titles.length - 1)];
  };

  const getNextLevelProgress = () => {
    const pointsForNextLevel = stats.level * 50;
    const currentLevelPoints = (stats.level - 1) * 50;
    const progress =
      ((stats.totalPoints - currentLevelPoints) /
        (pointsForNextLevel - currentLevelPoints)) *
      100;
    return Math.min(progress, 100);
  };

  return (
    <>
      {/* Floating Stats Button */}
      <div className="fixed bottom-4 right-4 z-40">
        <button
          onClick={() => setShowStats(!showStats)}
          className="bg-ryv-primary hover:bg-ryv-primary-light text-white p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
        >
          <TrophyIcon className="h-6 w-6" />
        </button>
      </div>

      {/* Stats Panel */}
      {showStats && (
        <div className="fixed bottom-20 right-4 z-40 w-80 bg-ryv-white rounded-lg shadow-xl border border-ryv-secondary">
          <div className="bg-gradient-to-r from-ryv-primary to-ryv-primary-light rounded-t-lg p-4 text-white">
            <div className="flex items-center justify-between">
              <h3 className="font-bold">Seu Progresso</h3>
              <button
                onClick={() => setShowStats(false)}
                className="text-ryv-white hover:text-ryv-secondary"
              >
                ×
              </button>
            </div>
          </div>

          <div className="p-4">
            {/* Level Progress */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-ryv-dark">
                  Nível {stats.level} - {getLevelTitle(stats.level)}
                </span>
                <span className="text-xs text-ryv-dark-lighter">
                  {stats.totalPoints} pts
                </span>
              </div>
              <div className="w-full bg-ryv-secondary rounded-full h-2">
                <div
                  className="bg-ryv-primary h-2 rounded-full transition-all duration-300"
                  style={{ width: `${getNextLevelProgress()}%` }}
                ></div>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="text-center p-3 bg-ryv-secondary rounded-lg">
                <BookOpenIcon className="h-6 w-6 text-ryv-primary mx-auto mb-1" />
                <div className="text-lg font-bold text-ryv-dark">
                  {stats.articlesRead}
                </div>
                <div className="text-xs text-ryv-dark-light">Artigos Lidos</div>
              </div>

              <div className="text-center p-3 bg-ryv-secondary rounded-lg">
                <FireIcon className="h-6 w-6 text-ryv-primary mx-auto mb-1" />
                <div className="text-lg font-bold text-ryv-dark">
                  {stats.streakDays}
                </div>
                <div className="text-xs text-ryv-dark-light">Dias Seguidos</div>
              </div>
            </div>

            {/* Achievements */}
            {stats.achievements.length > 0 && (
              <div className="mb-4">
                <h4 className="text-sm font-medium text-ryv-dark mb-2">
                  Conquistas
                </h4>
                <div className="flex flex-wrap gap-2">
                  {stats.achievements.map((achievement, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center gap-1 px-2 py-1 bg-ryv-primary text-white text-xs rounded-full"
                    >
                      <StarIcon className="h-3 w-3" />
                      {achievement}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Quick Actions */}
            <div className="text-center">
              <p className="text-xs text-ryv-dark-lighter mb-2">
                Continue lendo para ganhar mais pontos!
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Achievement Notification */}
      {showAchievement && (
        <div className="fixed top-4 right-4 z-50 bg-gradient-to-r from-ryv-primary to-ryv-primary-light text-white p-4 rounded-lg shadow-lg animate-bounce">
          <div className="flex items-center gap-2">
            <TrophyIcon className="h-5 w-5" />
            <span className="text-sm font-medium">{showAchievement}</span>
          </div>
        </div>
      )}
    </>
  );
};

export default Gamification;
