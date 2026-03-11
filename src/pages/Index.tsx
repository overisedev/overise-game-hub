import { useEffect } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { HeroSection } from '@/components/sections/HeroSection';
import { MarqueeSection } from '@/components/sections/MarqueeSection';
import { HowItWorksSection } from '@/components/sections/HowItWorksSection';
import { GamesGridSection } from '@/components/sections/GamesGridSection';
import { AppSection } from '@/components/sections/AppSection';
import { EmotionalBenefitsSection } from '@/components/sections/EmotionalBenefitsSection';
import { VerifySection } from '@/components/sections/VerifySection';
import { PiracySection } from '@/components/sections/PiracySection';
import { TestimonialsSection } from '@/components/sections/TestimonialsSection';
import { PricingSection } from '@/components/sections/PricingSection';
import { BenefitsResumeSection } from '@/components/sections/BenefitsResumeSection';
import { GuaranteeSection } from '@/components/sections/GuaranteeSection';
import { FAQSection } from '@/components/sections/FAQSection';
import { FinalCTASection } from '@/components/sections/FinalCTASection';
import { BuyNotification } from '@/components/ui/BuyNotification';
import { FloatingCTA } from '@/components/ui/FloatingCTA';
import { ChatWidget } from '@/components/ui/ChatWidget';

const Index = () => {
  // Reveal on scroll
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((x) => { if (x.isIntersecting) x.target.classList.add('visible'); }),
      { threshold: 0.06 }
    );
    document.querySelectorAll('.reveal').forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div>
      {/* Urgency Bar */}
      <div className="urgency-topbar">
        Acesso imediato — <strong>+1000 jogos por R$9,97 · taxa única</strong>{' '}
        <span style={{ opacity: .55, fontWeight: 600 }}>· licença vitalícia · 7 dias de garantia</span>
      </div>
      <style>{`
        .urgency-topbar { background: var(--accent); padding: 9px 16px; text-align: center; font-family: var(--fh); font-size: 12px; font-weight: 700; letter-spacing: .08em; color: #0b0e11; text-transform: uppercase; }
        @media (max-width: 768px) {
          .urgency-topbar { font-size: 9px; padding: 6px 10px; letter-spacing: .04em; }
          .urgency-topbar span { display: none; }
        }
      `}</style>

      <Header />
      <HeroSection />
      <MarqueeSection />
      <HowItWorksSection />
      <GamesGridSection />
      <AppSection />
      <EmotionalBenefitsSection />
      <VerifySection />
      <PiracySection />
      <TestimonialsSection />
      <BenefitsResumeSection />
      <PricingSection />
      <GuaranteeSection />
      <FAQSection />
      <FinalCTASection />
      <Footer />
      <BuyNotification />
      <FloatingCTA />
      <ChatWidget />
    </div>
  );
};

export default Index;
