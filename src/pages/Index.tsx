import { useState, useEffect } from 'react';
import { useGames } from '@/hooks/useGames';
import { Header } from '@/components/layout/Header';
import { HeroSection } from '@/components/sections/HeroSection';
import { GamesPreviewSection } from '@/components/sections/GamesPreviewSection';
import { HowItWorksSection } from '@/components/sections/HowItWorksSection';
import { CatalogSection } from '@/components/sections/CatalogSection';
import { AboutSection } from '@/components/sections/AboutSection';
import { TestimonialsSection } from '@/components/sections/TestimonialsSection';
import { PricingSection } from '@/components/sections/PricingSection';
import { GuaranteeSection } from '@/components/sections/GuaranteeSection';
import { FAQSection } from '@/components/sections/FAQSection';
import { Footer } from '@/components/layout/Footer';
import { GameModal } from '@/components/ui/GameModal';
import type { Game } from '@/types/game';

const Index = () => {
  const { games, aaaGames, loading, totalGames, searchGames, getGamesByCategory } = useGames();
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [featuredIndex, setFeaturedIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Rotate featured game with smooth transition
  useEffect(() => {
    if (aaaGames.length === 0) return;
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setFeaturedIndex((prev) => (prev + 1) % aaaGames.length);
        setTimeout(() => setIsTransitioning(false), 100);
      }, 600);
    }, 8000);
    return () => clearInterval(interval);
  }, [aaaGames.length]);

  const featuredGame = aaaGames[featuredIndex];

  const handlePrevFeatured = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setFeaturedIndex((prev) => (prev - 1 + aaaGames.length) % aaaGames.length);
      setTimeout(() => setIsTransitioning(false), 100);
    }, 500);
  };

  const handleNextFeatured = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setFeaturedIndex((prev) => (prev + 1) % aaaGames.length);
      setTimeout(() => setIsTransitioning(false), 100);
    }, 500);
  };

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="loading-content">
          <div className="loading-logo">
            <span className="logo-white">OVER</span>
            <span className="logo-green">ISE</span>
          </div>
          <div className="loading-bar">
            <div className="loading-bar-fill" />
          </div>
        </div>

        <style>{`
          .loading-screen {
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            background: var(--bg);
          }
          
          .loading-content {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 32px;
            animation: fadeIn 0.8s ease-out;
          }
          
          .loading-logo {
            display: flex;
            align-items: center;
            gap: 0;
          }
          
          .logo-white {
            font-size: 42px;
            font-weight: 950;
            letter-spacing: 2px;
            color: #fff;
          }
          
          .logo-green {
            font-size: 42px;
            font-weight: 950;
            letter-spacing: 2px;
            color: var(--neon);
          }
          
          .loading-bar {
            width: 140px;
            height: 3px;
            background: rgba(255,255,255,.1);
            border-radius: 3px;
            overflow: hidden;
          }
          
          .loading-bar-fill {
            height: 100%;
            width: 40%;
            background: var(--neon);
            border-radius: 3px;
            animation: barMove 1.2s ease-in-out infinite;
          }
          
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(12px); }
            to { opacity: 1; transform: translateY(0); }
          }
          
          @keyframes barMove {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(400%); }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header />
      
      <HeroSection 
        featuredGame={featuredGame}
        isTransitioning={isTransitioning}
        onPrev={handlePrevFeatured}
        onNext={handleNextFeatured}
        onOpenDetails={setSelectedGame}
      />
      
      <GamesPreviewSection 
        games={games} 
        totalGames={totalGames}
        onOpenDetails={setSelectedGame}
      />
      
      <HowItWorksSection />
      
      <CatalogSection 
        games={games}
        totalGames={totalGames}
        getGamesByCategory={getGamesByCategory}
        searchGames={searchGames}
        onOpenDetails={setSelectedGame}
      />
      
      <AboutSection />
      
      <TestimonialsSection />
      
      <PricingSection />
      
      <GuaranteeSection />
      
      <FAQSection />
      
      <Footer />

      {selectedGame && (
        <GameModal 
          game={selectedGame} 
          onClose={() => setSelectedGame(null)} 
        />
      )}
    </div>
  );
};

export default Index;
