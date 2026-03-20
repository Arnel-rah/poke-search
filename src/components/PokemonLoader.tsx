const PokemonLoader = () => (
  <div className="flex flex-col items-center justify-center py-40 gap-6">
    <div className="flex gap-3">
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          style={{
            width: 6, height: 6, borderRadius: "50%",
            background: "rgba(255,160,20,0.7)",
            animation: `pulse-dot 1.4s ease-in-out ${i * 0.18}s infinite`
          }}
        />
      ))}
    </div>
    <p
      className="text-xs tracking-[0.4em] uppercase"
      style={{ color: "rgba(255,160,20,0.3)", fontFamily: "'DM Mono', monospace" }}
    >
      Chargement du catalogue…
    </p>
  </div>
)

export default PokemonLoader
