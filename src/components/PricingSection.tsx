import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';

const features = [
  'Acesso vitalício ao catálogo completo',
  '+741 jogos disponíveis',
  'Atualizações automáticas',
  'Método 100% seguro (Anti-Ban)',
  'Suporte dedicado',
  'Instalador automático',
  'Compatível com Windows 10/11',
  'Foco em modo campanha/offline',
];

export function PricingSection() {
  return (
    <section id="pricing" className="py-24 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-3xl" />
      </div>

      <div className="container px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-xs font-bold tracking-widest uppercase text-primary mb-4 block">
            Plano Único
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Passe Vitalício
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Um único pagamento. Acesso para sempre. Sem mensalidades ou taxas ocultas.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-lg mx-auto"
        >
          <div className="relative rounded-2xl bg-card border border-border p-8 shadow-card">
            {/* Badge */}
            <div className="absolute -top-4 left-1/2 -translate-x-1/2">
              <div className="px-4 py-1.5 rounded-full bg-primary text-primary-foreground text-xs font-bold uppercase tracking-wider shadow-neon">
                Oferta Especial
              </div>
            </div>

            <div className="text-center mb-8 pt-4">
              <div className="flex items-center justify-center gap-3 mb-2">
                <span className="text-2xl text-muted-foreground line-through">R$ 49,90</span>
                <span className="px-2 py-1 rounded-md bg-primary/20 text-primary text-xs font-bold">
                  -80%
                </span>
              </div>
              <div className="flex items-baseline justify-center gap-1">
                <span className="text-lg text-muted-foreground">R$</span>
                <span className="text-6xl font-black neon-text">9</span>
                <span className="text-2xl font-bold neon-text">,97</span>
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                Pagamento único • Acesso vitalício
              </p>
            </div>

            <div className="space-y-3 mb-8">
              {features.map((feature, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-primary" />
                  </div>
                  <span className="text-sm">{feature}</span>
                </div>
              ))}
            </div>

            <Button variant="hero" size="xl" className="w-full">
              Adquirir Agora
            </Button>

            <p className="text-xs text-center text-muted-foreground mt-4">
              Pagamento seguro via PIX ou Cartão
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
