import { Header } from '@/components/Header';
import { HeroSection } from '@/components/HeroSection';
import { InfiniteCarousel } from '@/components/InfiniteCarousel';
import { HowItWorks } from '@/components/HowItWorks';
import { CatalogSection } from '@/components/CatalogSection';
import { PricingSection } from '@/components/PricingSection';
import { Footer } from '@/components/Footer';
import { useGames } from '@/hooks/useGames';

const Index = () => {
  const {
    filteredGames,
    aaaGames,
    featuredGames,
    categories,
    selectedCategory,
    setSelectedCategory,
    loading,
  } = useGames();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 rounded-full bg-primary animate-pulse-neon" />
          <span className="text-lg font-semibold">Carregando...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroSection featuredGames={featuredGames} />
      <InfiniteCarousel games={aaaGames.slice(0, 15)} />
      <HowItWorks />
      <CatalogSection
        games={filteredGames}
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />
      <PricingSection />
      <Footer />
    </div>
  );
};

export default Index;
