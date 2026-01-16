import { useState, useEffect } from 'react';
import { useGames } from '@/hooks/useGames';
import { Header } from '@/components/layout/Header';
import { HeroSection } from '@/components/sections/HeroSection';
import { MarqueeSection } from '@/components/sections/MarqueeSection';
import { HowItWorksSection } from '@/components/sections/HowItWorksSection';
import { CatalogSection } from '@/components/sections/CatalogSection';
import { PricingSection } from '@/components/sections/PricingSection';
import { FAQSection } from '@/components/sections/FAQSection';
import { Footer } from '@/components/layout/Footer';
import { GameModal } from '@/components/ui/GameModal';
import type { Game } from '@/types/game';

const Index = () => {
  const { games, aaaGames, loading, totalGames, searchGames, getGamesByCategory } = useGames();
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [featuredIndex, setFeaturedIndex] = useState(0);

  // Rotate featured game
  useEffect(() => {
    if (aaaGames.length === 0) return;
    const interval = setInterval(() => {
      setFeaturedIndex((prev) => (prev + 1) % aaaGames.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [aaaGames.length]);

  const featuredGame = aaaGames[featuredIndex];

  const handlePrevFeatured = () => {
    setFeaturedIndex((prev) => (prev - 1 + aaaGames.length) % aaaGames.length);
  };

  const handleNextFeatured = () => {
    setFeaturedIndex((prev) => (prev + 1) % aaaGames.length);
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
        onPrev={handlePrevFeatured}
        onNext={handleNextFeatured}
        onOpenDetails={setSelectedGame}
      />
      
      <MarqueeSection games={aaaGames.slice(0, 20)} />
      
      <HowItWorksSection />
      
      <CatalogSection 
        games={games}
        totalGames={totalGames}
        getGamesByCategory={getGamesByCategory}
        searchGames={searchGames}
        onOpenDetails={setSelectedGame}
      />
      
      <PricingSection />
      
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
