import { useState } from 'react';

const PROOF_IMAGES = [
  'https://i.ibb.co/zhHvmK4h/print1.png',
  'https://i.ibb.co/k2mqbhTJ/print2.png',
  'https://i.ibb.co/YTdCRQzH/print3.png',
  'https://i.ibb.co/CpRN7yWX/print4.png',
  'https://i.ibb.co/FbcxkBW8/print5.png',
  'https://i.ibb.co/N6HgDMjH/print6.png',
  'https://i.ibb.co/svVz6Dvf/print7.png',
  'https://i.ibb.co/99D1ZWjf/print8.png',
  'https://i.ibb.co/7x1f7YTz/print9.png',
  'https://i.ibb.co/Tq7Mn8Tw/print10.png',
  'https://i.ibb.co/KxPHSb9C/print11.png',
  'https://i.ibb.co/B2FKJKnQ/print12.png',
  'https://i.ibb.co/svz0Rpqs/print13.png',
  'https://i.ibb.co/VWxPxRfs/print14.png',
  'https://i.ibb.co/MkNsGg5Z/print15.png',
  'https://i.ibb.co/WvFqnq8H/print16.png',
];

export function ProofSection() {
  const [lightboxImg, setLightboxImg] = useState<string | null>(null);

  return (
    <section id="proof" className="sec-dark">
      <div className="container text-center">
        <div className="reveal">
          <div className="tag g">Prints reais de clientes</div>
          <h2 className="h2 on-dark">Quem desbloqueou,<br /><em>aprovou.</em></h2>
          <p className="sub on-dark center">Feedbacks reais no WhatsApp, Instagram, YouTube e Facebook. Sem edição, sem filtro.</p>
        </div>
        <div className="proof-masonry reveal rd1">
          {PROOF_IMAGES.map((src, i) => (
            <img key={i} className="proof-shot" src={src} alt={`Feedback ${i + 1}`} loading="lazy" onClick={() => setLightboxImg(src)} />
          ))}
        </div>
      </div>

      {lightboxImg && (
        <div className="proof-lightbox open" onClick={() => setLightboxImg(null)}>
          <img src={lightboxImg} alt="" />
        </div>
      )}

      <style>{`
        .proof-masonry { column-count: 4; column-gap: 8px; margin-top: 44px; }
        .proof-shot { width: 100%; border-radius: 8px; margin-bottom: 8px; cursor: pointer; transition: transform .2s, opacity .2s; break-inside: avoid; }
        .proof-shot:hover { transform: scale(1.02); opacity: .85; }
        .proof-lightbox { position: fixed; inset: 0; z-index: 9999; background: rgba(0,0,0,.9); display: none; align-items: center; justify-content: center; cursor: pointer; padding: 20px; }
        .proof-lightbox.open { display: flex; }
        .proof-lightbox img { max-width: 90%; max-height: 90vh; border-radius: 12px; }
        @media (max-width: 768px) { .proof-masonry { column-count: 2; } }
      `}</style>
    </section>
  );
}
