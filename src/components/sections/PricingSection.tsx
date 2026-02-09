import { motion } from "framer-motion";

function getUTMParams(): string {
  const params = new URLSearchParams(window.location.search);
  const utmParams = new URLSearchParams();
  const utmKeys = ["utm_source","utm_medium","utm_campaign","utm_term","utm_content","utm_id","fbclid","gclid","ttclid","sck","src"];
  utmKeys.forEach((key) => {
    const value = params.get(key);
    if (value) utmParams.append(key, value);
  });
  try {
    const storedUtms = localStorage.getItem("__utmify_session_data");
    if (storedUtms) {
      const parsed = JSON.parse(storedUtms);
      if (parsed.utm_source && !utmParams.has("utm_source")) utmParams.append("utm_source", parsed.utm_source);
      if (parsed.utm_medium && !utmParams.has("utm_medium")) utmParams.append("utm_medium", parsed.utm_medium);
      if (parsed.utm_campaign && !utmParams.has("utm_campaign")) utmParams.append("utm_campaign", parsed.utm_campaign);
    }
  } catch (e) {}
  return utmParams.toString();
}

interface PlanFeature {
  text: string;
  included: boolean;
  bold?: boolean;
}

interface Plan {
  name: string;
  subtitle: string;
  originalPrice: string;
  price: string;
  priceCents: string;
  priceLabel: string;
  badge?: string;
  featured?: boolean;
  features: PlanFeature[];
  btnText: string;
  checkoutUrl: string;
}

const plans: Plan[] = [
  {
    name: "Iniciante",
    subtitle: "Para Conhecer",
    originalPrice: "R$ 29,90",
    price: "9",
    priceCents: ",97",
    priceLabel: "Taxa Única",
    features: [
      { text: "Acesso ao Launcher", included: true },
      { text: "500 Jogos Inclusos", included: true, bold: true },
      { text: "Modo Campanha", included: true },
      { text: "Suporte Prioritário", included: false },
      { text: "Pedidos de Jogos", included: false },
    ],
    btnText: "Começar Básico",
    checkoutUrl: "https://www.ggcheckout.com/checkout/v4/6Ed9FJE8HXebnxREUKCQ",
  },
  {
    name: "Avançado",
    subtitle: "Mais Recursos",
    originalPrice: "R$ 49,90",
    price: "19",
    priceCents: ",97",
    priceLabel: "Taxa Única",
    badge: "Mais Vendido",
    features: [
      { text: "Acesso ao Launcher", included: true },
      { text: "700 Jogos (+Lançamentos)", included: true, bold: true },
      { text: "Modo Online (Selecionados)", included: true },
      { text: "Suporte WhatsApp", included: true },
      { text: "Pedidos VIP", included: false },
    ],
    btnText: "Quero Este",
    checkoutUrl: "https://www.ggcheckout.com/checkout/v4/BvIb4ex53LM73mU3DJsX",
  },
  {
    name: "Vitalício",
    subtitle: "Acesso Total",
    originalPrice: "R$ 120,90",
    price: "49",
    priceCents: ",97",
    priceLabel: "Pagamento Único",
    badge: "Melhor Opção 🔥",
    featured: true,
    features: [
      { text: "Biblioteca Completa (+1000)", included: true, bold: true },
      { text: "Acesso Vitalício Real", included: true },
      { text: "Multiplayer Liberado", included: true, bold: true },
      { text: "Suporte Prioritário VIP", included: true },
      { text: "Pedidos de Jogos (A gente adiciona)", included: true },
    ],
    btnText: "Desbloquear Tudo",
    checkoutUrl: "https://www.ggcheckout.com/checkout/v4/pdDOCAlm20ZQxjUiglc3",
  },
];

function handleCheckout(plan: Plan) {
  if (typeof window !== "undefined" && (window as any).fbq) {
    (window as any).fbq("track", "InitiateCheckout", {
      content_name: plan.name,
      value: parseFloat(plan.price.replace(",", ".")),
      currency: "BRL",
    });
  }
  const utmString = getUTMParams();
  const separator = plan.checkoutUrl.includes("?") ? "&" : "?";
  const finalUrl = utmString ? `${plan.checkoutUrl}${separator}${utmString}` : plan.checkoutUrl;
  window.open(finalUrl, "_blank", "noopener,noreferrer");
}

export function PricingSection() {
  return (
    <section id="planos" className="section container-main">
      <motion.div
        className="text-center mb-10"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-[28px] font-[950] text-white tracking-tight mb-2">Escolha seu plano</h2>
        <p className="text-[hsla(0,0%,100%,0.5)] text-[15px]">Acesso imediato após o pagamento. Escolha o que melhor se encaixa para você.</p>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-[1100px] mx-auto items-start"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.12 } } }}
      >
        {plans.map((plan) => (
          <PricingCard key={plan.name} plan={plan} />
        ))}
      </motion.div>
    </section>
  );
}

function PricingCard({ plan }: { plan: Plan }) {
  return (
    <motion.div
      variants={{ hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}
      whileHover={{ y: -6, transition: { duration: 0.2 } }}
      className={`relative flex flex-col rounded-2xl border px-7 py-8 ${
        plan.featured
          ? "border-[hsla(138,100%,50%,0.35)] bg-[hsla(138,100%,50%,0.04)] shadow-[0_0_50px_hsla(138,100%,50%,0.08)]"
          : "border-[hsla(0,0%,100%,0.08)] bg-[hsla(0,0%,100%,0.02)]"
      }`}
    >
      {/* Badge */}
      {plan.badge && (
        <span
          className={`absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full text-[11px] font-black uppercase tracking-wide whitespace-nowrap ${
            plan.featured
              ? "bg-[#00FF41] text-black shadow-[0_4px_20px_hsla(138,100%,50%,0.4)]"
              : "bg-[hsla(0,0%,100%,0.1)] text-white border border-[hsla(0,0%,100%,0.15)]"
          }`}
        >
          {plan.badge}
        </span>
      )}

      {/* Header */}
      <div className="text-center mt-2 mb-6">
        <h3 className={`text-xl font-black uppercase tracking-wide ${plan.featured ? "text-white text-2xl italic" : "text-white"}`}>
          {plan.name}
        </h3>
        <p className={`text-xs font-bold uppercase tracking-[2px] mt-1 ${plan.featured ? "text-[#00FF41]" : "text-[hsla(0,0%,100%,0.35)]"}`}>
          {plan.subtitle}
        </p>
      </div>

      {/* Price */}
      <div className="text-center mb-6">
        <p className="text-[13px] text-[hsla(0,0%,100%,0.35)] line-through font-semibold">De {plan.originalPrice}</p>
        <div className="flex items-start justify-center leading-none mt-1">
          <span className={`text-lg font-bold mt-3 mr-1 ${plan.featured ? "text-[#00FF41]" : "text-white"}`}>R$</span>
          <span className={`text-[80px] font-[800] tracking-[-4px] ${plan.featured ? "text-white drop-shadow-[0_0_20px_hsla(138,100%,50%,0.3)]" : "text-white"}`}>
            {plan.price}
          </span>
          <span className="text-[28px] font-bold text-white mt-4">{plan.priceCents}</span>
        </div>
        <p className={`text-[11px] font-extrabold uppercase tracking-[1px] mt-1 ${plan.featured ? "text-[#00FF41]" : "text-[hsla(0,0%,100%,0.4)]"}`}>
          {plan.priceLabel}
        </p>
      </div>

      {/* Divider */}
      <div className="w-full h-px bg-[hsla(0,0%,100%,0.06)] mb-6" />

      {/* Features */}
      <ul className="flex flex-col gap-3.5 mb-8 flex-1">
        {plan.features.map((f, i) => (
          <li key={i} className="flex items-start gap-3 text-[13.5px]">
            {f.included ? (
              <span className="text-[#00FF41] font-bold text-sm mt-px flex-shrink-0">✓</span>
            ) : (
              <span className="text-[hsla(0,0%,100%,0.2)] font-bold text-sm mt-px flex-shrink-0">✕</span>
            )}
            <span className={f.included ? (f.bold ? "text-white font-bold" : "text-[hsla(0,0%,100%,0.75)]") : "text-[hsla(0,0%,100%,0.25)] line-through"}>
              {f.text}
            </span>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={(e) => { e.preventDefault(); handleCheckout(plan); }}
        className={`w-full py-4 rounded-xl text-[13px] font-black uppercase tracking-wide flex items-center justify-center gap-2.5 cursor-pointer transition-shadow duration-300 ${
          plan.featured
            ? "bg-[#00FF41] text-black shadow-[0_4px_25px_hsla(138,100%,50%,0.35)] hover:shadow-[0_8px_40px_hsla(138,100%,50%,0.5)]"
            : "bg-transparent text-white border border-[hsla(0,0%,100%,0.15)] hover:border-[hsla(0,0%,100%,0.3)] hover:bg-[hsla(0,0%,100%,0.04)]"
        }`}
      >
        {plan.btnText}
        {plan.featured && (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        )}
      </motion.button>
    </motion.div>
  );
}
