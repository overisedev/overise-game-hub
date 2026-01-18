import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const testimonials = [
  {
    name: 'Rafael M.',
    text: 'Sinceramente achei que fosse mentira pelo preço baixo. Paguei para ver e me surpreendi. Em 10 minutos eu já estava baixando o jogo pela minha Steam com velocidade total. É surreal.',
  },
  {
    name: 'Ana Clara',
    text: 'Eu não entendo nada de computador e tinha medo de ser difícil de instalar. Mas o sistema faz tudo sozinho. É só clicar em Ativar e o jogo aparece na biblioteca pronto para jogar.',
  },
  {
    name: 'Lucas S.',
    text: 'O melhor para mim é baixar na velocidade máxima. Nada daqueles sites lentos cheios de vírus. Aqui vem direto do servidor oficial e jogo online com meus amigos sem travar.',
  },
  {
    name: 'Bruno G.',
    text: 'Só neste mês eu economizei uns 500 reais. Eu ia comprar dois lançamentos caros mas peguei o plano vitalício aqui e já estou jogando os dois. Recomendo demais.',
  },
];

export function TestimonialsSection() {
  return (
    <section className="section container-main">
      <motion.div 
        className="testimonials-header"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="testimonials-title">QUEM BAIXOU, APROVOU</h2>
        <p className="testimonials-subtitle">
          Veja o que a nossa comunidade diz sobre a economia e a segurança que a Overise proporciona para milhares de jogadores.
        </p>
      </motion.div>

      <div className="testimonials-grid">
        {testimonials.map((t, i) => (
          <motion.div 
            key={i} 
            className="testimonial-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
          >
            <div className="testimonial-stars">
              {[...Array(5)].map((_, idx) => (
                <Star key={idx} size={16} fill="var(--neon)" stroke="var(--neon)" />
              ))}
            </div>
            <p className="testimonial-text">"{t.text}"</p>
            <div className="testimonial-author">
              <div className="testimonial-avatar">{t.name.charAt(0)}</div>
              <span className="testimonial-name">{t.name}</span>
            </div>
          </motion.div>
        ))}
      </div>

      <style>{`
        .testimonials-header {
          text-align: center;
          margin-bottom: 40px;
        }
        
        .testimonials-title {
          font-size: clamp(24px, 4vw, 32px);
          font-weight: 950;
          color: #fff;
          margin: 0 0 12px;
          letter-spacing: -1px;
        }
        
        .testimonials-subtitle {
          color: rgba(255,255,255,.65);
          font-size: 15px;
          line-height: 1.7;
          max-width: 600px;
          margin: 0 auto;
        }
        
        .testimonials-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
        }
        
        @media (max-width: 1100px) {
          .testimonials-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        
        @media (max-width: 640px) {
          .testimonials-grid {
            grid-template-columns: 1fr;
          }
        }
        
        .testimonial-card {
          padding: 24px;
          border-radius: var(--r2);
          border: 1px solid rgba(255,255,255,.08);
          background: rgba(255,255,255,.03);
          display: flex;
          flex-direction: column;
          gap: 16px;
          transition: .25s ease;
        }
        
        .testimonial-card:hover {
          border-color: rgba(0,255,65,.20);
          transform: translateY(-4px);
        }
        
        .testimonial-stars {
          display: flex;
          gap: 4px;
        }
        
        .testimonial-text {
          color: rgba(255,255,255,.85);
          font-size: 14px;
          line-height: 1.75;
          margin: 0;
          flex: 1;
        }
        
        .testimonial-author {
          display: flex;
          align-items: center;
          gap: 12px;
          padding-top: 16px;
          border-top: 1px solid rgba(255,255,255,.06);
        }
        
        .testimonial-avatar {
          width: 36px;
          height: 36px;
          border-radius: 10px;
          background: linear-gradient(135deg, rgba(0,255,65,.2), rgba(0,255,65,.05));
          border: 1px solid rgba(0,255,65,.25);
          display: grid;
          place-items: center;
          color: var(--neon);
          font-weight: 900;
          font-size: 14px;
        }
        
        .testimonial-name {
          font-weight: 800;
          font-size: 13px;
          color: #fff;
          letter-spacing: .3px;
        }
      `}</style>
    </section>
  );
}
