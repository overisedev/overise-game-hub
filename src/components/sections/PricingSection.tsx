import { motion } from "framer-motion";

function getUTMParams(): string {
  const params = new URLSearchParams(window.location.search);
  const utmParams = new URLSearchParams();
  const utmKeys = [
    "utm_source",
    "utm_medium",
    "utm_campaign",
    "utm_term",
    "utm_content",
    "utm_id",
    "fbclid",
    "gclid",
    "ttclid",
    "sck",
    "src",
  ];
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
  color: string; // HSL accent color
  features: PlanFeature[];
  btnText: string;
  checkoutUrl: string;
}

const plans: Plan[] = [
  {
    name: "Acesso Completo",
    subtitle: "Tudo Liberado",
    originalPrice: "R$ 29,90",
    price: "9",
    priceCents: ",97",
    priceLabel: "Taxa Única • Pagou, é Seu",
    badge: "Oferta Especial 🔥",
    featured: true,
    color: "138, 100%, 50%",
    features: [
      { text: "+1000 Jogos Famosos Inclusos", included: true, bold: true },
      { text: "Seus pra Sempre (Vitalício)", included: true, bold: true },
      { text: "Acesso ao Launcher Exclusivo", included: true },
      { text: "Download pela Steam Oficial", included: true },
      { text: "Atualizações Automáticas", included: true },
      { text: "Suporte via WhatsApp", included: true },
      { text: "Pedidos de Novos Jogos", included: true },
    ],
    btnText: "Garantir Meu Acesso",
    checkoutUrl: "https://www.ggcheckout.com/checkout/v4/6Ed9FJE8HXebnxREUKCQ",
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
        <h2 className="text-[28px] font-[950] text-white tracking-tight mb-2">Acesso Completo — Para PC</h2>
        <p className="text-[hsla(0,0%,100%,0.5)] text-[15px]">
          Pagou uma vez, é seu pra sempre. Acesso imediato após o pagamento.
        </p>
      </motion.div>

      <motion.div
        className="flex justify-center max-w-[480px] mx-auto"
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
  const c = plan.color;
  const isFeatured = !!plan.featured;

  return (
    <motion.div
      variants={{ hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}
      whileHover={{ y: -6, transition: { duration: 0.2 } }}
      className={`relative flex flex-col rounded-2xl border px-7 py-8 ${isFeatured ? "scale-[1.03] z-10" : ""}`}
      style={{
        borderColor: `hsla(${c}, ${isFeatured ? 0.4 : 0.25})`,
        background: `radial-gradient(ellipse at 50% 0%, hsla(${c}, ${isFeatured ? 0.08 : 0.05}), hsla(0,0%,3%,1) 70%)`,
        boxShadow: `0 0 ${isFeatured ? 60 : 35}px hsla(${c}, ${isFeatured ? 0.12 : 0.06})`,
      }}
    >
      {/* Badge */}
      {plan.badge && (
        <span
          className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full text-[11px] font-black uppercase tracking-wide whitespace-nowrap"
          style={{
            background: isFeatured ? `hsl(${c})` : `linear-gradient(135deg, hsla(${c}, 0.9), hsla(${c}, 0.7))`,
            color: isFeatured ? "#000" : "#fff",
            boxShadow: `0 4px 20px hsla(${c}, 0.4)`,
          }}
        >
          {plan.badge}
        </span>
      )}

      {/* Header */}
      <div className="text-center mt-2 mb-6">
        <h3 className={`font-black uppercase tracking-wide text-white ${isFeatured ? "text-2xl italic" : "text-xl"}`}>
          {plan.name}
        </h3>
        <p className="text-xs font-bold uppercase tracking-[2px] mt-1" style={{ color: `hsl(${c})` }}>
          {plan.subtitle}
        </p>
      </div>

      {/* Price */}
      <div className="text-center mb-6">
        <p className="text-[13px] text-[hsla(0,0%,100%,0.4)] line-through font-semibold">De {plan.originalPrice}</p>
        <div className="flex items-start justify-center leading-none mt-1">
          <span className="text-lg font-bold mt-3 mr-1" style={{ color: `hsl(${c})` }}>
            R$
          </span>
          <span
            className="text-[80px] font-[800] tracking-[-4px] text-white"
            style={{ filter: `drop-shadow(0 0 20px hsla(${c}, 0.3))` }}
          >
            {plan.price}
          </span>
          <span className="text-[28px] font-bold text-white mt-4">{plan.priceCents}</span>
        </div>
        <p className="text-[11px] font-extrabold uppercase tracking-[1px] mt-1" style={{ color: `hsl(${c})` }}>
          {plan.priceLabel}
        </p>
      </div>

      {/* Divider */}
      <div className="w-full h-px mb-6" style={{ background: `hsla(${c}, 0.12)` }} />

      {/* Features */}
      <ul className="flex flex-col gap-3.5 mb-8 flex-1">
        {plan.features.map((f, i) => (
          <li key={i} className="flex items-start gap-3 text-[13.5px]">
            {f.included ? (
              <span className="font-bold text-sm mt-px flex-shrink-0" style={{ color: `hsl(${c})` }}>
                ✓
              </span>
            ) : (
              <span className="text-[hsla(0,0%,100%,0.2)] font-bold text-sm mt-px flex-shrink-0">✕</span>
            )}
            <span
              className={
                f.included
                  ? f.bold
                    ? "text-white font-bold"
                    : "text-[hsla(0,0%,100%,0.75)]"
                  : "text-[hsla(0,0%,100%,0.25)] line-through"
              }
            >
              {f.text}
            </span>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={(e) => {
          e.preventDefault();
          handleCheckout(plan);
        }}
        className="w-full py-4 rounded-xl text-[13px] font-black uppercase tracking-wide flex items-center justify-center gap-2.5 cursor-pointer transition-all duration-300"
        style={
          isFeatured
            ? {
                background: `hsl(${c})`,
                color: "#000",
                boxShadow: `0 4px 25px hsla(${c}, 0.35)`,
              }
            : {
                background: "transparent",
                color: `hsl(${c})`,
                border: `1.5px solid hsla(${c}, 0.35)`,
                boxShadow: `0 0 15px hsla(${c}, 0.08)`,
              }
        }
      >
        {plan.btnText}
        {isFeatured && (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        )}
      </motion.button>
    </motion.div>
  );
}
