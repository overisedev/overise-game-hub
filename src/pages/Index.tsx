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
      <div className="loading-screen">
        <div className="loading-content">
          {/* Logo animado */}
          <div className="loading-logo">
            <div className="logo-icon">
              <div className="logo-hexagon">
                <div className="hexagon-inner" />
                <div className="hexagon-glow" />
              </div>
              <div className="logo-pulse" />
            </div>
            <div className="logo-text">
              <span className="logo-main">OVERISE</span>
              <span className="logo-sub">PREMIUM GAMES</span>
            </div>
          </div>
          
          {/* Barra de progresso */}
          <div className="loading-bar-container">
            <div className="loading-bar">
              <div className="loading-bar-fill" />
              <div className="loading-bar-glow" />
            </div>
          </div>
          
          {/* Texto animado */}
          <div className="loading-text">
            <span className="loading-dots">Preparando sua experiência</span>
          </div>
        </div>

        {/* Partículas de fundo */}
        <div className="loading-particles">
          {[...Array(20)].map((_, i) => (
            <div key={i} className="particle" style={{ '--i': i } as React.CSSProperties} />
          ))}
        </div>

        <style>{`
          .loading-screen {
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            background: var(--bg);
            position: relative;
            overflow: hidden;
          }
          .loading-screen::before {
            content: '';
            position: absolute;
            inset: 0;
            background: 
              radial-gradient(ellipse 80% 50% at 50% -20%, rgba(0,255,65,.08), transparent),
              radial-gradient(ellipse 60% 40% at 80% 100%, rgba(0,255,65,.04), transparent);
            pointer-events: none;
          }
          
          .loading-content {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 40px;
            z-index: 2;
          }
          
          .loading-logo {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 20px;
          }
          
          .logo-icon {
            position: relative;
            width: 80px;
            height: 80px;
          }
          
          .logo-hexagon {
            position: absolute;
            inset: 0;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          
          .hexagon-inner {
            width: 60px;
            height: 60px;
            background: linear-gradient(135deg, rgba(0,255,65,.2), rgba(0,255,65,.05));
            border: 2px solid rgba(0,255,65,.4);
            clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
            animation: hexRotate 4s ease-in-out infinite;
          }
          
          .hexagon-glow {
            position: absolute;
            inset: -10px;
            background: radial-gradient(circle, rgba(0,255,65,.3), transparent 70%);
            filter: blur(20px);
            animation: glowPulse 2s ease-in-out infinite;
          }
          
          .logo-pulse {
            position: absolute;
            inset: -20px;
            border: 2px solid rgba(0,255,65,.2);
            border-radius: 50%;
            animation: pulsing 2s ease-out infinite;
          }
          
          .logo-text {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 4px;
          }
          
          .logo-main {
            font-size: 32px;
            font-weight: 950;
            letter-spacing: 6px;
            color: #fff;
            text-transform: uppercase;
            animation: textReveal 1.5s ease-out forwards;
          }
          
          .logo-sub {
            font-size: 11px;
            font-weight: 700;
            letter-spacing: 4px;
            color: var(--neon);
            text-transform: uppercase;
            opacity: 0;
            animation: fadeUp 1s ease-out 0.5s forwards;
          }
          
          .loading-bar-container {
            width: 200px;
          }
          
          .loading-bar {
            position: relative;
            height: 3px;
            background: rgba(255,255,255,.1);
            border-radius: 3px;
            overflow: hidden;
          }
          
          .loading-bar-fill {
            position: absolute;
            left: 0;
            top: 0;
            height: 100%;
            width: 0%;
            background: linear-gradient(90deg, var(--neon), rgba(0,255,65,.6));
            border-radius: 3px;
            animation: barFill 2.5s ease-in-out infinite;
          }
          
          .loading-bar-glow {
            position: absolute;
            top: -5px;
            left: 0;
            width: 40px;
            height: 13px;
            background: linear-gradient(90deg, transparent, rgba(0,255,65,.5), transparent);
            animation: barGlow 2.5s ease-in-out infinite;
          }
          
          .loading-text {
            font-size: 13px;
            font-weight: 600;
            color: var(--muted);
            letter-spacing: 1px;
          }
          
          .loading-dots::after {
            content: '';
            animation: dots 1.5s steps(4, end) infinite;
          }
          
          .loading-particles {
            position: absolute;
            inset: 0;
            pointer-events: none;
          }
          
          .particle {
            position: absolute;
            width: 3px;
            height: 3px;
            background: var(--neon);
            border-radius: 50%;
            opacity: 0;
            animation: float 6s ease-in-out infinite;
            animation-delay: calc(var(--i) * 0.3s);
            left: calc(10% + var(--i) * 4%);
            top: calc(20% + var(--i) * 3%);
          }
          
          @keyframes hexRotate {
            0%, 100% { transform: rotate(0deg) scale(1); }
            50% { transform: rotate(180deg) scale(1.05); }
          }
          
          @keyframes glowPulse {
            0%, 100% { opacity: 0.5; transform: scale(1); }
            50% { opacity: 1; transform: scale(1.1); }
          }
          
          @keyframes pulsing {
            0% { transform: scale(0.8); opacity: 1; }
            100% { transform: scale(1.5); opacity: 0; }
          }
          
          @keyframes textReveal {
            0% { opacity: 0; letter-spacing: 20px; }
            100% { opacity: 1; letter-spacing: 6px; }
          }
          
          @keyframes fadeUp {
            0% { opacity: 0; transform: translateY(10px); }
            100% { opacity: 1; transform: translateY(0); }
          }
          
          @keyframes barFill {
            0% { width: 0%; left: 0; }
            50% { width: 100%; left: 0; }
            100% { width: 0%; left: 100%; }
          }
          
          @keyframes barGlow {
            0% { left: -40px; opacity: 0; }
            20% { opacity: 1; }
            80% { opacity: 1; }
            100% { left: 200px; opacity: 0; }
          }
          
          @keyframes dots {
            0% { content: ''; }
            25% { content: '.'; }
            50% { content: '..'; }
            75% { content: '...'; }
            100% { content: ''; }
          }
          
          @keyframes float {
            0%, 100% { 
              opacity: 0; 
              transform: translateY(0) scale(0);
            }
            10% { 
              opacity: 0.6; 
              transform: translateY(-20px) scale(1);
            }
            90% { 
              opacity: 0.6;
              transform: translateY(-100px) scale(1);
            }
            100% { 
              opacity: 0; 
              transform: translateY(-120px) scale(0);
            }
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
