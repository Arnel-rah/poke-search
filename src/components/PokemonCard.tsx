import { useEffect, useState } from "react"
import type { Pokemon } from "../types/pokemon"
import { getTheme } from "../constants/pokemonTypes"
interface Props {
  pokemon: Pokemon
  index: number
}

const PokemonCard = ({ pokemon, index }: Props) => {
  const [hovered, setHovered] = useState(false)
  const [visible, setVisible] = useState(false)
  const theme = getTheme(pokemon.types)

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), index * 40)
    return () => clearTimeout(t)
  }, [index])

  return (
    <div
      style={{
        transition: "opacity 0.5s ease, transform 0.5s ease",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
      }}
    >
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
        className={`relative overflow-hidden rounded-2xl cursor-pointer bg-gradient-to-br ${theme.bg} border border-white/5`}
      >
        <div
          style={{ transition: "opacity 0.3s ease", opacity: hovered ? 1 : 0 }}
          className="absolute inset-0 pointer-events-none z-10"
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/0" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(255,255,255,0.08),transparent_60%)]" />
        </div>

        <div className="h-0.5 w-full bg-gradient-to-r from-transparent via-white/20 to-transparent" />

        <div className="px-4 pt-3 pb-1 flex justify-between items-center">
          <span className={`font-mono text-xs font-semibold tracking-widest ${theme.text} opacity-60`}>
            #{String(pokemon.id).padStart(3, "0")}
          </span>
          <div className="flex gap-1">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="w-1 h-1 rounded-full bg-white/15" />
            ))}
          </div>
        </div>

        <figure className="flex justify-center py-4 relative">
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div
              style={{
                width: 80, height: 80,
                borderRadius: "50%",
                background: `radial-gradient(circle, ${theme.glow} 0%, transparent 70%)`,
                filter: "blur(12px)",
                opacity: hovered ? 1 : 0.5,
                transition: "opacity 0.3s ease",
              }}
            />
          </div>
          <img
            src={pokemon.image}
            alt={pokemon.name}
            className="w-28 h-28 object-contain relative z-10"
            style={{
              transition: "transform 0.3s ease, filter 0.3s ease",
              transform: hovered ? "scale(1.1)" : "scale(1)",
              filter: hovered
                ? "drop-shadow(0 8px 16px rgba(0,0,0,0.5))"
                : "drop-shadow(0 4px 8px rgba(0,0,0,0.4))",
            }}
          />
        </figure>

        <div className="px-4 pb-4 flex flex-col items-center gap-2">
          <h2 className="text-white font-bold capitalize tracking-wide text-sm">
            {pokemon.name}
          </h2>
          <div className="flex gap-1.5 flex-wrap justify-center">
            {pokemon.types.map(type => (
              <span key={type} className={`capitalize text-[11px] font-semibold px-2.5 py-0.5 rounded-full border tracking-wider ${theme.badge}`}>
                {type}
              </span>
            ))}
          </div>
        </div>

        <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>
    </div>
  )
}

export default PokemonCard
