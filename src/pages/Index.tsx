import { useState, useEffect } from 'react';
import { useGames } from '@/hooks/useGames';
import { Header } from '@/components/layout/Header';
import { HeroSection } from '@/components/sections/HeroSection';
import { GamesPreviewSection } from '@/components/sections/GamesPreviewSection';
import { HowItWorksSection } from '@/components/sections/HowItWorksSection';
import { CatalogSection } from '@/components/sections/CatalogSection';
import { AboutSection } from '@/components/sections/AboutSection';
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
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--bg)' }}>
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full" style={{ background: 'var(--neon)', boxShadow: '0 0 14px rgba(0,255,65,.55)' }} />
          <span className="text-lg font-bold">Carregando...</span>
        </div>
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
