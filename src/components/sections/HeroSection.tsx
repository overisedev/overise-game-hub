import { useRef, useEffect, useState } from 'react';

export function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    // Auto-play muted when visible
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && videoRef.current) {
          videoRef.current.play().catch(() => {});
        }
      },
      { threshold: 0.3 }
    );
    if (videoRef.current) observer.observe(videoRef.current);
    return () => observer.disconnect();
  }, []);

  const handlePlayClick = () => {
    if (!videoRef.current) return;
    if (videoRef.current.muted) {
      videoRef.current.muted = false;
      videoRef.current.currentTime = 0;
      videoRef.current.play();
      setIsPlaying(true);
    } else if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  return (
    <section id="hero" className="hero-section">
      <div className="container hero-layout">
        <div className="hero-left">
          <h1 className="hero-h1 reveal rd1">
            Desbloqueie sua Steam.<br />
            <em>Milhares de jogos. Taxa única.</em>
          </h1>
          <p className="hero-sub reveal rd1">
            Ative o desbloqueador, escolha o jogo e baixe direto pela Steam.{' '}
            <strong>100% seguro, anti-ban e invisível.</strong> Pague uma vez, use pra sempre.
          </p>
          <div className="hero-btns reveal rd1">
            <a href="#pricing" className="btn btn-accent btn-xl">Desbloquear minha Steam</a>
            <a href="#how" className="btn btn-ghost btn-xl">Ver como funciona</a>
          </div>
          <div className="hero-trust reveal rd1">
            <div className="trust-pill"><span className="chk">✔</span> 7 dias de garantia</div>
            <div className="trust-pill"><span className="chk">✔</span> Jogando em 5 min</div>
            <div className="trust-pill"><span className="chk">✔</span> +5.000 clientes</div>
          </div>
        </div>

        <div className="hero-right reveal rd1">
          <div className="vsl-container" onClick={handlePlayClick}>
            <div className="vsl-glow" />
            <video
              ref={videoRef}
              className="vsl-video"
              src="https://jz-vibecoder.wistia.com/medias/9xgnrtlc7b"
              muted
              loop
              playsInline
              preload="metadata"
              poster=""
            />
            {!isPlaying && (
              <div className="vsl-play-overlay">
                <div className="vsl-play-btn">
                  <svg viewBox="0 0 24 24" fill="none">
                    <path d="M8 5v14l11-7L8 5z" fill="#0b0e11" />
                  </svg>
                </div>
                <span className="vsl-play-text">Assistir demonstração</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        .hero-section { background:var(--bg); padding:48px 0 64px; position:relative; overflow:hidden; }
        .hero-section::before { content:''; position:absolute; top:-120px; left:50%; transform:translateX(-50%); width:900px; height:500px; background:radial-gradient(ellipse,rgba(57,255,20,.035) 0%,transparent 65%); pointer-events:none; }

        .hero-layout { display:flex; align-items:center; gap:48px; }
        .hero-left { flex:1; text-align:left; }
        .hero-right { flex:1; display:flex; justify-content:flex-end; }

        .hero-h1 { font-family:var(--fh); font-size:clamp(36px,5vw,72px); font-weight:900; line-height:.9; text-transform:uppercase; color:#fff; margin-bottom:16px; }
        .hero-h1 em { color:var(--accent); font-style:normal; }
        .hero-sub { font-size:16px; font-weight:400; color:var(--muted); max-width:480px; line-height:1.65; font-family:var(--fb); }
        .hero-sub strong { color:var(--white); font-weight:600; }
        .hero-btns { display:flex; gap:10px; flex-wrap:wrap; margin-top:24px; margin-bottom:18px; }
        .hero-trust { display:flex; gap:16px; flex-wrap:wrap; }
        .trust-pill { display:flex; align-items:center; gap:6px; font-family:var(--fh); font-size:11px; font-weight:700; letter-spacing:.04em; color:var(--dim); transition:all .2s; }
        .trust-pill:hover { color:var(--accent); transform:scale(1.05); }
        .trust-pill .chk { color:var(--accent); font-weight:900; }

        /* ── VSL Video ── */
        .vsl-container {
          position:relative;
          max-width:560px;
          width:100%;
          border-radius:14px;
          overflow:hidden;
          border:1px solid rgba(57,255,20,.12);
          background:#0c0e12;
          box-shadow:0 0 60px rgba(57,255,20,.06), 0 24px 56px rgba(0,0,0,.5);
          cursor:pointer;
          transition:border-color .4s, box-shadow .4s, transform .3s;
        }
        .vsl-container:hover {
          border-color:rgba(57,255,20,.25);
          box-shadow:0 0 80px rgba(57,255,20,.12), 0 24px 56px rgba(0,0,0,.5);
          transform:translateY(-2px);
        }
        .vsl-glow {
          position:absolute;
          inset:-2px;
          border-radius:16px;
          background:conic-gradient(from 180deg, rgba(57,255,20,.08), transparent 25%, transparent 75%, rgba(57,255,20,.08));
          z-index:-1;
          animation:vslGlowSpin 8s linear infinite;
        }
        @keyframes vslGlowSpin {
          from { transform:rotate(0deg); }
          to   { transform:rotate(360deg); }
        }

        .vsl-video {
          display:block;
          width:100%;
          height:auto;
          border-radius:14px;
        }

        /* Play overlay */
        .vsl-play-overlay {
          position:absolute;
          inset:0;
          display:flex;
          flex-direction:column;
          align-items:center;
          justify-content:center;
          gap:12px;
          background:rgba(0,0,0,.45);
          backdrop-filter:blur(2px);
          border-radius:14px;
          transition:opacity .3s;
        }
        .vsl-container:hover .vsl-play-overlay {
          background:rgba(0,0,0,.35);
        }
        .vsl-play-btn {
          width:64px;
          height:64px;
          border-radius:50%;
          background:var(--accent);
          display:flex;
          align-items:center;
          justify-content:center;
          box-shadow:0 0 30px rgba(57,255,20,.35);
          transition:transform .2s, box-shadow .2s;
        }
        .vsl-container:hover .vsl-play-btn {
          transform:scale(1.1);
          box-shadow:0 0 50px rgba(57,255,20,.5);
        }
        .vsl-play-btn svg {
          width:28px;
          height:28px;
          margin-left:3px;
        }
        .vsl-play-text {
          font-family:var(--fh);
          font-size:12px;
          font-weight:700;
          letter-spacing:.1em;
          text-transform:uppercase;
          color:rgba(255,255,255,.85);
          text-shadow:0 1px 4px rgba(0,0,0,.5);
        }

        @media (max-width:900px) {
          .hero-layout { flex-direction:column; gap:16px; }
          .hero-left { text-align:center; order:2; }
          .hero-right { justify-content:center; width:100%; order:1; }
          .hero-sub { margin:0 auto; }
          .hero-btns { justify-content:center; flex-direction:column; align-items:stretch; }
          .hero-trust { justify-content:center; }
          .hero-section { padding:24px 0 32px; }
          .hero-h1 { font-size:clamp(26px,8vw,42px); margin-bottom:10px; line-height:.88; }
          .hero-sub { font-size:13px; line-height:1.55; }
          .hero-btns .btn-xl { font-size:14px; padding:14px 20px; }
          .hero-trust { gap:12px; }
          .trust-pill { font-size:10px; }
          .vsl-container { max-width:100%; }
          .vsl-play-btn { width:52px; height:52px; }
          .vsl-play-btn svg { width:22px; height:22px; }
          .vsl-play-text { font-size:10px; }
        }
      `}</style>
    </section>
  );
}
