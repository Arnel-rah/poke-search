const TopBar = () => (
  <div className="fade-up fade-up-1 flex items-center justify-between mb-10">
    <div className="flex items-center gap-3">
      <span className="vol-badge">Vol. XXVI</span>
      <span className="vol-badge">2026 Edition</span>
    </div>
    <span
      className="text-xs tracking-[0.25em] uppercase"
      style={{ color: "rgba(255,160,20,0.3)", fontFamily: "'DM Mono', monospace" }}
    >
      Pokédex Research Institute
    </span>
  </div>
)

export default TopBar
