import { Download, List, Monitor, MessageCircle, ExternalLink } from 'lucide-react';

// Paleta OVERISE (sem neon)
const palette = {
  accent: 'rgb(240, 48, 31)',
  bg: '#060606',
  bgAlt: '#0b0b0b',
  text: 'rgba(255,255,255,0.92)',
  muted: 'rgba(255,255,255,0.60)',
  border: 'rgba(255,255,255,0.08)',
};

// Componente base do slide (1080x1350 - 4:5)
const SlideBase = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <div 
    className={`slide-base ${className}`}
    style={{
      width: '1080px',
      height: '1350px',
      background: palette.bg,
      position: 'relative',
      overflow: 'hidden',
      padding: '80px', // Safe area
      display: 'flex',
      flexDirection: 'column',
    }}
  >
    {/* Ondas sutis de fundo */}
    <div className="waves-bg" />
    {children}
  </div>
);

// Card translúcido (site-like)
const GlassCard = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <div 
    className={className}
    style={{
      background: 'rgba(255,255,255,0.03)',
      border: `1px solid ${palette.border}`,
      borderRadius: '20px',
      padding: '32px',
      backdropFilter: 'blur(12px)',
    }}
  >
    {children}
  </div>
);

// Botão CTA
const CTAButton = ({ children }: { children: React.ReactNode }) => (
  <button
    style={{
      background: palette.accent,
      color: '#fff',
      fontFamily: 'Inter, sans-serif',
      fontWeight: 700,
      fontSize: '18px',
      letterSpacing: '1px',
      padding: '18px 40px',
      borderRadius: '12px',
      border: 'none',
      boxShadow: '0 8px 32px rgba(240, 48, 31, 0.3)',
      cursor: 'pointer',
      textTransform: 'uppercase',
    }}
  >
    {children}
  </button>
);

// Texto com destaque vermelho
const HighlightText = ({ text, highlight }: { text: string; highlight: string }) => {
  const parts = text.split(highlight);
  return (
    <>
      {parts[0]}
      <span style={{ color: palette.accent }}>{highlight}</span>
      {parts[1] || ''}
    </>
  );
};

// ═══════════════════════════════════════════════════════════════
// SLIDE 1 — Capa / Apresentação
// ═══════════════════════════════════════════════════════════════
export const Slide1_Capa = () => (
  <SlideBase>
    {/* Mosaico de capas com overlay */}
    <div className="mosaic-bg" />
    
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', zIndex: 2 }}>
      {/* Topo pequeno */}
      <span style={{ 
        color: palette.muted, 
        fontFamily: 'Inter, sans-serif',
        fontWeight: 600,
        fontSize: '16px',
        letterSpacing: '3px',
        marginBottom: '24px',
      }}>
        OVERISE STORE
      </span>
      
      {/* Título grande */}
      <h1 style={{ 
        fontFamily: 'Inter, sans-serif',
        fontWeight: 900,
        fontSize: '96px',
        lineHeight: 1,
        color: palette.text,
        margin: 0,
        textTransform: 'uppercase',
      }}>
        SUA STEAM.
      </h1>
      
      {/* Destaque */}
      <h1 style={{ 
        fontFamily: 'Inter, sans-serif',
        fontWeight: 900,
        fontSize: '96px',
        lineHeight: 1,
        color: palette.accent,
        margin: 0,
        marginBottom: '32px',
        textTransform: 'uppercase',
      }}>
        DESBLOQUEADA.
      </h1>
      
      {/* Sub */}
      <p style={{ 
        fontFamily: 'Inter, sans-serif',
        fontWeight: 500,
        fontSize: '28px',
        color: palette.muted,
        margin: 0,
        marginBottom: '48px',
        maxWidth: '600px',
      }}>
        Catálogo AAA pronto pra você baixar e jogar.
      </p>
      
      {/* CTA */}
      <CTAButton>VER O CATÁLOGO</CTAButton>
    </div>
    
    {/* Rodapé */}
    <div style={{ 
      position: 'absolute', 
      bottom: '80px', 
      left: '80px',
      color: palette.muted,
      fontFamily: 'Inter, sans-serif',
      fontWeight: 500,
      fontSize: '16px',
      letterSpacing: '1px',
    }}>
      overisestore.com.br
    </div>
  </SlideBase>
);

// ═══════════════════════════════════════════════════════════════
// SLIDE 2 — O que é
// ═══════════════════════════════════════════════════════════════
export const Slide2_OQueE = () => (
  <SlideBase>
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', zIndex: 2 }}>
      {/* Título */}
      <h1 style={{ 
        fontFamily: 'Inter, sans-serif',
        fontWeight: 900,
        fontSize: '72px',
        lineHeight: 1.1,
        color: palette.text,
        margin: 0,
        marginBottom: '48px',
        textTransform: 'uppercase',
      }}>
        O QUE É A <span style={{ color: palette.accent }}>OVERISE</span>?
      </h1>
      
      {/* Bullets */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', marginBottom: '48px' }}>
        {['Curadoria de jogos AAA', 'Acesso ao catálogo e coleções', 'Atualizações frequentes'].map((item, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <div style={{ 
              width: '12px', 
              height: '12px', 
              background: palette.accent, 
              borderRadius: '3px' 
            }} />
            <span style={{ 
              fontFamily: 'Inter, sans-serif',
              fontWeight: 600,
              fontSize: '32px',
              color: palette.text,
            }}>
              {item}
            </span>
          </div>
        ))}
      </div>
      
      {/* Microtexto */}
      <p style={{ 
        fontFamily: 'Inter, sans-serif',
        fontWeight: 500,
        fontSize: '20px',
        color: palette.muted,
      }}>
        Tudo organizado, simples e direto.
      </p>
    </div>
    
    {/* Visual: hero + mini capas */}
    <div style={{ 
      position: 'absolute',
      right: '80px',
      bottom: '200px',
      display: 'flex',
      gap: '16px',
      opacity: 0.6,
    }}>
      <div style={{ width: '180px', height: '240px', background: '#1a1a1a', borderRadius: '12px' }} />
      <div style={{ width: '180px', height: '240px', background: '#1a1a1a', borderRadius: '12px' }} />
      <div style={{ width: '180px', height: '240px', background: '#1a1a1a', borderRadius: '12px' }} />
    </div>
  </SlideBase>
);

// ═══════════════════════════════════════════════════════════════
// SLIDE 3 — Como funciona
// ═══════════════════════════════════════════════════════════════
export const Slide3_ComoFunciona = () => (
  <SlideBase>
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', zIndex: 2 }}>
      {/* Título */}
      <h1 style={{ 
        fontFamily: 'Inter, sans-serif',
        fontWeight: 900,
        fontSize: '72px',
        lineHeight: 1.1,
        color: palette.text,
        margin: 0,
        marginBottom: '64px',
        textTransform: 'uppercase',
      }}>
        COMO <span style={{ color: palette.accent }}>FUNCIONA</span>
      </h1>
      
      {/* Passos */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '40px', marginBottom: '64px' }}>
        {[
          { icon: List, text: 'Você acessa o catálogo' },
          { icon: Download, text: 'Escolhe os jogos' },
          { icon: Monitor, text: 'Baixa e joga no PC' },
        ].map((step, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '28px' }}>
            <div style={{ 
              width: '72px', 
              height: '72px', 
              background: 'rgba(255,255,255,0.05)',
              border: `1px solid ${palette.border}`,
              borderRadius: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <step.icon size={32} color={palette.accent} strokeWidth={2} />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <span style={{ 
                fontFamily: 'Inter, sans-serif',
                fontWeight: 900,
                fontSize: '28px',
                color: palette.accent,
              }}>
                {i + 1}.
              </span>
              <span style={{ 
                fontFamily: 'Inter, sans-serif',
                fontWeight: 600,
                fontSize: '32px',
                color: palette.text,
              }}>
                {step.text}
              </span>
            </div>
          </div>
        ))}
      </div>
      
      {/* CTA pequeno */}
      <span style={{ 
        fontFamily: 'Inter, sans-serif',
        fontWeight: 600,
        fontSize: '18px',
        color: palette.muted,
        textDecoration: 'underline',
        textUnderlineOffset: '4px',
      }}>
        Ver detalhes no site →
      </span>
    </div>
  </SlideBase>
);

// ═══════════════════════════════════════════════════════════════
// SLIDE 4 — Por que é bom
// ═══════════════════════════════════════════════════════════════
export const Slide4_Economia = () => (
  <SlideBase>
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', zIndex: 2 }}>
      {/* Título */}
      <h1 style={{ 
        fontFamily: 'Inter, sans-serif',
        fontWeight: 900,
        fontSize: '64px',
        lineHeight: 1.1,
        color: palette.text,
        margin: 0,
        marginBottom: '24px',
        textTransform: 'uppercase',
      }}>
        ECONOMIA DE VERDADE
      </h1>
      
      {/* Faixa vermelha decorativa */}
      <div style={{ 
        width: '120px', 
        height: '6px', 
        background: palette.accent, 
        borderRadius: '3px',
        marginBottom: '48px',
      }} />
      
      {/* Destaque grande */}
      <h2 style={{ 
        fontFamily: 'Inter, sans-serif',
        fontWeight: 900,
        fontSize: '80px',
        lineHeight: 1,
        color: palette.accent,
        margin: 0,
        marginBottom: '32px',
        textTransform: 'uppercase',
      }}>
        PARE DE PAGAR CARO
      </h2>
      
      {/* Sub */}
      <p style={{ 
        fontFamily: 'Inter, sans-serif',
        fontWeight: 500,
        fontSize: '28px',
        color: palette.muted,
        maxWidth: '700px',
      }}>
        Pague uma vez e tenha acesso ao acervo e atualizações.
      </p>
    </div>
  </SlideBase>
);

// ═══════════════════════════════════════════════════════════════
// SLIDE 5 — Prova visual (catálogo)
// ═══════════════════════════════════════════════════════════════
export const Slide5_Catalogo = () => (
  <SlideBase>
    <div style={{ zIndex: 2, marginBottom: '48px' }}>
      {/* Título */}
      <h1 style={{ 
        fontFamily: 'Inter, sans-serif',
        fontWeight: 900,
        fontSize: '56px',
        lineHeight: 1.1,
        color: palette.text,
        margin: 0,
        marginBottom: '16px',
        textTransform: 'uppercase',
      }}>
        UMA AMOSTRA DO <span style={{ color: palette.accent }}>CATÁLOGO</span>
      </h1>
      
      {/* Sub */}
      <p style={{ 
        fontFamily: 'Inter, sans-serif',
        fontWeight: 500,
        fontSize: '24px',
        color: palette.muted,
      }}>
        Só AAA — tudo organizado por coleções.
      </p>
    </div>
    
    {/* Grid de jogos (vitrine) */}
    <div style={{ 
      flex: 1,
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: '20px',
      marginBottom: '48px',
    }}>
      {Array.from({ length: 9 }).map((_, i) => (
        <div 
          key={i}
          style={{ 
            background: '#1a1a1a',
            borderRadius: '16px',
            border: `1px solid ${palette.border}`,
            aspectRatio: '3/4',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Overlay premium com blur */}
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)',
          }} />
        </div>
      ))}
    </div>
    
    {/* CTA */}
    <CTAButton>VER LISTA COMPLETA</CTAButton>
  </SlideBase>
);

// ═══════════════════════════════════════════════════════════════
// SLIDE 6 — Confiança / Suporte
// ═══════════════════════════════════════════════════════════════
export const Slide6_Suporte = () => (
  <SlideBase>
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', zIndex: 2 }}>
      {/* Título */}
      <h1 style={{ 
        fontFamily: 'Inter, sans-serif',
        fontWeight: 900,
        fontSize: '72px',
        lineHeight: 1.1,
        color: palette.text,
        margin: 0,
        marginBottom: '32px',
        textTransform: 'uppercase',
      }}>
        SUPORTE E <span style={{ color: palette.accent }}>GUIA</span>
      </h1>
      
      {/* Sub */}
      <p style={{ 
        fontFamily: 'Inter, sans-serif',
        fontWeight: 500,
        fontSize: '28px',
        color: palette.muted,
        maxWidth: '700px',
        marginBottom: '64px',
        lineHeight: 1.5,
      }}>
        Você não fica perdido: a gente te orienta no acesso e uso do catálogo.
      </p>
      
      {/* Card de status */}
      <GlassCard className="support-card">
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div style={{ 
            width: '56px', 
            height: '56px', 
            background: 'rgba(240, 48, 31, 0.15)',
            borderRadius: '14px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <MessageCircle size={28} color={palette.accent} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
              <div style={{ 
                width: '10px', 
                height: '10px', 
                background: '#22c55e', 
                borderRadius: '50%',
                boxShadow: '0 0 12px rgba(34, 197, 94, 0.5)',
              }} />
              <span style={{ 
                fontFamily: 'Inter, sans-serif',
                fontWeight: 600,
                fontSize: '18px',
                color: '#22c55e',
              }}>
                Online
              </span>
            </div>
            <span style={{ 
              fontFamily: 'Inter, sans-serif',
              fontWeight: 500,
              fontSize: '16px',
              color: palette.muted,
            }}>
              Atendimento disponível
            </span>
          </div>
        </div>
      </GlassCard>
    </div>
  </SlideBase>
);

// ═══════════════════════════════════════════════════════════════
// SLIDE 7 — Oferta / Convite
// ═══════════════════════════════════════════════════════════════
export const Slide7_Convite = () => (
  <SlideBase className="slide-clean">
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', zIndex: 2 }}>
      {/* Título */}
      <h1 style={{ 
        fontFamily: 'Inter, sans-serif',
        fontWeight: 900,
        fontSize: '80px',
        lineHeight: 1.1,
        color: palette.text,
        margin: 0,
        marginBottom: '24px',
        textTransform: 'uppercase',
      }}>
        QUER <span style={{ color: palette.accent }}>CONHECER</span>?
      </h1>
      
      {/* Sub */}
      <p style={{ 
        fontFamily: 'Inter, sans-serif',
        fontWeight: 500,
        fontSize: '28px',
        color: palette.muted,
        marginBottom: '64px',
      }}>
        Acesse o site e veja o catálogo completo.
      </p>
      
      {/* CTA destacado */}
      <CTAButton>ACESSAR AGORA</CTAButton>
    </div>
    
    {/* Rodapé */}
    <div style={{ 
      position: 'absolute', 
      bottom: '80px', 
      left: '50%',
      transform: 'translateX(-50%)',
      color: palette.muted,
      fontFamily: 'Inter, sans-serif',
      fontWeight: 500,
      fontSize: '16px',
      letterSpacing: '1px',
    }}>
      overisestore.com.br
    </div>
  </SlideBase>
);

// ═══════════════════════════════════════════════════════════════
// SLIDE 8 — Fechamento
// ═══════════════════════════════════════════════════════════════
export const Slide8_Fechamento = () => (
  <SlideBase>
    {/* Imagem hero em baixa opacidade */}
    <div className="hero-bg-fade" />
    
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', zIndex: 2 }}>
      {/* Logo */}
      <div style={{ marginBottom: '32px' }}>
        <span style={{ 
          fontFamily: 'Inter, sans-serif',
          fontWeight: 900,
          fontSize: '64px',
          letterSpacing: '4px',
        }}>
          <span style={{ color: '#fff' }}>OVER</span>
          <span style={{ color: palette.accent }}>ISE</span>
        </span>
        <span style={{ 
          fontFamily: 'Inter, sans-serif',
          fontWeight: 600,
          fontSize: '24px',
          color: palette.muted,
          display: 'block',
          letterSpacing: '8px',
          marginTop: '8px',
        }}>
          STORE
        </span>
      </div>
      
      {/* Sub */}
      <p style={{ 
        fontFamily: 'Inter, sans-serif',
        fontWeight: 500,
        fontSize: '24px',
        color: palette.muted,
        marginBottom: '64px',
      }}>
        Catálogo AAA • Coleções • Atualizações
      </p>
      
      {/* CTA */}
      <CTAButton>LINK NA BIO</CTAButton>
      
      {/* Extra */}
      <span style={{ 
        fontFamily: 'Inter, sans-serif',
        fontWeight: 500,
        fontSize: '16px',
        color: palette.muted,
        marginTop: '32px',
      }}>
        Novidades toda semana
      </span>
    </div>
  </SlideBase>
);

// ═══════════════════════════════════════════════════════════════
// ESTILOS GLOBAIS DO CARROSSEL
// ═══════════════════════════════════════════════════════════════
export const CarouselStyles = () => (
  <style>{`
    /* Ondas sutis de fundo */
    .waves-bg {
      position: absolute;
      inset: 0;
      background: 
        radial-gradient(ellipse 80% 50% at 20% 80%, rgba(240, 48, 31, 0.03), transparent),
        radial-gradient(ellipse 60% 40% at 80% 20%, rgba(255,255,255,0.02), transparent);
      pointer-events: none;
    }
    
    /* Mosaico de capas com overlay */
    .mosaic-bg {
      position: absolute;
      inset: 0;
      background: 
        linear-gradient(to bottom, rgba(6,6,6,0.7), rgba(6,6,6,0.95)),
        url('/placeholder.svg');
      background-size: cover;
      pointer-events: none;
    }
    
    /* Hero fade */
    .hero-bg-fade {
      position: absolute;
      inset: 0;
      background: 
        linear-gradient(to bottom, rgba(6,6,6,0.85), rgba(6,6,6,0.98)),
        url('/placeholder.svg');
      background-size: cover;
      opacity: 0.4;
      pointer-events: none;
    }
    
    /* Slide limpo */
    .slide-clean .waves-bg {
      opacity: 0.5;
    }
  `}</style>
);

// Componente de preview com todos os slides
export const CarouselPreview = () => (
  <div style={{ 
    display: 'flex', 
    flexDirection: 'column', 
    gap: '40px', 
    padding: '40px',
    background: '#000',
    transform: 'scale(0.3)',
    transformOrigin: 'top left',
  }}>
    <CarouselStyles />
    <Slide1_Capa />
    <Slide2_OQueE />
    <Slide3_ComoFunciona />
    <Slide4_Economia />
    <Slide5_Catalogo />
    <Slide6_Suporte />
    <Slide7_Convite />
    <Slide8_Fechamento />
  </div>
);
