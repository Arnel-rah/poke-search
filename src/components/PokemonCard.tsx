import { useState } from "react"
import type { Pokemon } from "../types/pokemon"

interface Props {
  pokemon: Pokemon
}

const TYPE_COLORS: Record<string, { bg: string; badge: string; glow: string; text: string }> = {
  fire:     { bg: "from-orange-950 to-red-900",    badge: "bg-orange-500/20 text-orange-300 border-orange-500/40",  glow: "rgba(251,146,60,0.35)",  text: "text-orange-400" },
  water:    { bg: "from-blue-950 to-cyan-900",     badge: "bg-blue-500/20 text-blue-300 border-blue-500/40",       glow: "rgba(96,165,250,0.35)",  text: "text-blue-400" },
  grass:    { bg: "from-green-950 to-emerald-900", badge: "bg-green-500/20 text-green-300 border-green-500/40",    glow: "rgba(74,222,128,0.35)",  text: "text-green-400" },
  electric: { bg: "from-yellow-950 to-amber-900",  badge: "bg-yellow-500/20 text-yellow-300 border-yellow-500/40",glow: "rgba(250,204,21,0.35)",  text: "text-yellow-400" },
  psychic:  { bg: "from-pink-950 to-fuchsia-900",  badge: "bg-pink-500/20 text-pink-300 border-pink-500/40",      glow: "rgba(244,114,182,0.35)", text: "text-pink-400" },
  ice:      { bg: "from-cyan-950 to-sky-900",      badge: "bg-cyan-500/20 text-cyan-300 border-cyan-500/40",      glow: "rgba(103,232,249,0.35)", text: "text-cyan-400" },
  dragon:   { bg: "from-indigo-950 to-violet-900", badge: "bg-indigo-500/20 text-indigo-300 border-indigo-500/40",glow: "rgba(129,140,248,0.35)", text: "text-indigo-400" },
  dark:     { bg: "from-zinc-950 to-neutral-900",  badge: "bg-zinc-500/20 text-zinc-300 border-zinc-500/40",      glow: "rgba(161,161,170,0.25)", text: "text-zinc-400" },
  fighting: { bg: "from-red-950 to-rose-900",      badge: "bg-red-500/20 text-red-300 border-red-500/40",         glow: "rgba(248,113,113,0.35)", text: "text-red-400" },
  poison:   { bg: "from-purple-950 to-violet-900", badge: "bg-purple-500/20 text-purple-300 border-purple-500/40",glow: "rgba(192,132,252,0.35)", text: "text-purple-400" },
  ground:   { bg: "from-amber-950 to-yellow-900",  badge: "bg-amber-500/20 text-amber-300 border-amber-500/40",   glow: "rgba(251,191,36,0.35)",  text: "text-amber-400" },
  rock:     { bg: "from-stone-950 to-zinc-900",    badge: "bg-stone-500/20 text-stone-300 border-stone-500/40",   glow: "rgba(168,162,158,0.35)", text: "text-stone-400" },
  bug:      { bg: "from-lime-950 to-green-900",    badge: "bg-lime-500/20 text-lime-300 border-lime-500/40",      glow: "rgba(163,230,53,0.35)",  text: "text-lime-400" },
  ghost:    { bg: "from-purple-950 to-indigo-950", badge: "bg-purple-500/20 text-purple-300 border-purple-500/40",glow: "rgba(167,139,250,0.35)", text: "text-purple-400" },
  steel:    { bg: "from-slate-950 to-gray-900",    badge: "bg-slate-500/20 text-slate-300 border-slate-500/40",   glow: "rgba(148,163,184,0.35)", text: "text-slate-400" },
  fairy:    { bg: "from-pink-950 to-rose-900",     badge: "bg-pink-400/20 text-pink-300 border-pink-400/40",      glow: "rgba(251,182,206,0.35)", text: "text-pink-300" },
  flying:   { bg: "from-sky-950 to-blue-900",      badge: "bg-sky-500/20 text-sky-300 border-sky-500/40",         glow: "rgba(125,211,252,0.35)", text: "text-sky-400" },
  normal:   { bg: "from-neutral-900 to-zinc-800",  badge: "bg-neutral-500/20 text-neutral-300 border-neutral-500/40",glow: "rgba(163,163,163,0.25)", text: "text-neutral-400" },
}

const getTheme = (types: string[]) =>
  TYPE_COLORS[types[0]?.toLowerCase()] ?? TYPE_COLORS.normal

const PokemonCard = ({ pokemon }: Props) => {
  const [hovered, setHovered] = useState(false)
  const theme = getTheme(pokemon.types)

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        transform: hovered ? "translateY(-6px) scale(1.02)" : "translateY(0) scale(1)",
        boxShadow: hovered
          ? `0 20px 40px -12px ${theme.glow}, 0 0 0 1px rgba(255,255,255,0.07)`
          : "0 4px 16px -4px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.04)",
      }}
      className={`
        relative overflow-hidden rounded-2xl cursor-pointer
        bg-gradient-to-br ${theme.bg}
        border border-white/5
      `}
    >
      {/* Holographic shimmer overlay */}
      <div
        style={{ transition: "opacity 0.3s ease", opacity: hovered ? 1 : 0 }}
        className="absolute inset-0 pointer-events-none z-10"
        aria-hidden
      >
        <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/0" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(255,255,255,0.08),transparent_60%)]" />
      </div>

      {/* Top bar accent */}
      <div className={`h-0.5 w-full bg-gradient-to-r from-transparent via-white/20 to-transparent`} />

      {/* ID */}
      <div className="px-4 pt-3 pb-1 flex justify-between items-center">
        <span className={`font-mono text-xs font-semibold tracking-widest ${theme.text} opacity-60`}>
          #{String(pokemon.id).padStart(3, "0")}
        </span>
        <div className="flex gap-1">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="w-1 h-1 rounded-full bg-white/15"
            />
          ))}
        </div>
      </div>

      {/* Sprite */}
      <figure className="flex justify-center py-4 relative">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div
            style={{
              width: 80,
              height: 80,
              borderRadius: "50%",
              background: `radial-gradient(circle, ${theme.glow} 0%, transparent 70%)`,
              filter: "blur(12px)",
              transition: "opacity 0.3s ease",
              opacity: hovered ? 1 : 0.5,
            }}
          />
        </div>
        <img
          src={pokemon.image}
          alt={pokemon.name}
          className="w-28 h-28 object-contain relative z-10 drop-shadow-lg"
          style={{
            transition: "transform 0.3s ease, filter 0.3s ease",
            transform: hovered ? "scale(1.1)" : "scale(1)",
            filter: hovered
              ? "drop-shadow(0 8px 16px rgba(0,0,0,0.5))"
              : "drop-shadow(0 4px 8px rgba(0,0,0,0.4))",
          }}
        />
      </figure>

      {/* Info */}
      <div className="px-4 pb-4 flex flex-col items-center gap-2">
        <h2
          className="text-white font-bold capitalize tracking-wide"
          style={{ fontFamily: "'Segoe UI', system-ui, sans-serif", fontSize: "1rem", letterSpacing: "0.06em" }}
        >
          {pokemon.name}
        </h2>

        <div className="flex gap-1.5 flex-wrap justify-center">
          {pokemon.types.map(type => (
            <span
              key={type}
              className={`
                capitalize text-[11px] font-semibold px-2.5 py-0.5
                rounded-full border tracking-wider
                ${theme.badge}
              `}
            >
              {type}
            </span>
          ))}
        </div>
      </div>

      {/* Bottom shimmer line */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </div>
  )
}

export default PokemonCard
