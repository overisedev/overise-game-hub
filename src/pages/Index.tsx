import { useState, useEffect } from 'react';
import { Header } from '@/components/layout/Header';
import { HeroSection } from '@/components/sections/HeroSection';
import { AboutSection } from '@/components/sections/AboutSection';
import { TestimonialsSection } from '@/components/sections/TestimonialsSection';
import { PricingSection } from '@/components/sections/PricingSection';
import { GuaranteeSection } from '@/components/sections/GuaranteeSection';
import { FAQSection } from '@/components/sections/FAQSection';
import { Footer } from '@/components/layout/Footer';
import { UrgencyBar } from '@/components/ui/UrgencyBar';
import { ChatWidget } from '@/components/ui/ChatWidget';

const Index = () => {
  const [urgencyBarVisible, setUrgencyBarVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const threshold = window.innerHeight * 0.8;
      setUrgencyBarVisible(scrollY > threshold);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen">
      <UrgencyBar isVisible={urgencyBarVisible} />
      <Header urgencyBarVisible={urgencyBarVisible} />
      
      <HeroSection />
      
      <AboutSection />
      
      <TestimonialsSection />
      
      <PricingSection />
      
      <GuaranteeSection />
      
      <FAQSection />
      
      <Footer />
      
      <ChatWidget />
    </div>
  );
};

export default Index;
