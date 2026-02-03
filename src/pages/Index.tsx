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
import { Notifications } from '@/components/ui/Notifications';
import { UrgencyBar } from '@/components/ui/UrgencyBar';
import { ScarcityBadge } from '@/components/ui/ScarcityBadge';
import type { Game } from '@/types/game';

const Index = () => {
  const { games, aaaGames, loading, totalGames, searchGames, getGamesByCategory } = useGames();
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [featuredIndex, setFeaturedIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [urgencyBarVisible, setUrgencyBarVisible] = useState(false);

  // Track urgency bar visibility
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const threshold = window.innerHeight * 0.8;
      setUrgencyBarVisible(scrollY > threshold);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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


  return (
    <div className="min-h-screen">
      <UrgencyBar isVisible={urgencyBarVisible} />
      <Header urgencyBarVisible={urgencyBarVisible} />
      
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

      <Notifications />
    </div>
  );
};

export default Index;
