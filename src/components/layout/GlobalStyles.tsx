
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,900;1,400&family=DM+Mono:wght@400;500&display=swap');

    .app-root { font-family: 'DM Mono', monospace; }
    .display-font { font-family: 'Playfair Display', serif; }

    .noise-bg::before {
      content: '';
      position: fixed; inset: 0; z-index: 0; pointer-events: none;
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
      background-size: 200px;
      opacity: 0.6;
    }

    .vol-badge {
      border: 1px solid rgba(255,160,20,0.25);
      color: rgba(255,160,20,0.6);
      font-size: 9px;
      letter-spacing: 0.2em;
      padding: 3px 10px;
      text-transform: uppercase;
    }

    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(16px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    .fade-up   { animation: fadeUp 0.7s ease forwards; }
    .fade-up-1 { animation-delay: 0.05s; opacity: 0; }
    .fade-up-2 { animation-delay: 0.15s; opacity: 0; }
    .fade-up-3 { animation-delay: 0.25s; opacity: 0; }
    .fade-up-4 { animation-delay: 0.35s; opacity: 0; }

    @keyframes pulse-dot {
      0%,100% { opacity: 0.2; transform: scale(0.7); }
      50%      { opacity: 1;   transform: scale(1); }
    }
  `}</style>
)

export default GlobalStyles
