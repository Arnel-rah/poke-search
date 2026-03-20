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
          background: hovered
            ? "linear-gradient(160deg, #1a1408, #120f05)"
            : "linear-gradient(160deg, #141008, #0d0a04)",
          border: hovered
            ? "1px solid rgba(255,160,20,0.3)"
            : "1px solid rgba(255,160,20,0.08)",
          borderRadius: 16,
          cursor: "pointer",
          overflow: "hidden",
          position: "relative",
          transition: "transform 0.35s ease, box-shadow 0.35s ease, border-color 0.35s ease, background 0.35s ease",
          transform: hovered ? "translateY(-6px) scale(1.02)" : "translateY(0) scale(1)",
          boxShadow: hovered
            ? "0 24px 48px -12px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,160,20,0.15)"
            : "0 4px 20px -4px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.03)",
        }}
      >
        <div style={{
          height: 1,
          background: hovered
            ? "linear-gradient(to right, transparent, rgba(255,160,20,0.5), transparent)"
            : "linear-gradient(to right, transparent, rgba(255,160,20,0.15), transparent)",
          transition: "background 0.35s ease"
        }} />

        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0,
          background: `radial-gradient(ellipse at 50% 30%, ${theme.glow}18 0%, transparent 65%)`,
          opacity: hovered ? 1 : 0.4,
          transition: "opacity 0.35s ease"
        }} />

        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none", zIndex: 1,
          background: "linear-gradient(135deg, rgba(255,160,20,0.04) 0%, transparent 50%)",
          opacity: hovered ? 1 : 0,
          transition: "opacity 0.35s ease"
        }} />

        <div style={{
          position: "relative", zIndex: 2,
          padding: "12px 16px 0",
          display: "flex", justifyContent: "space-between", alignItems: "center"
        }}>
          <span style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: 10,
            letterSpacing: "0.2em",
            color: hovered ? "rgba(255,160,20,0.45)" : "rgba(255,160,20,0.18)",
            transition: "color 0.3s ease"
          }}>
            #{String(pokemon.id).padStart(3, "0")}
          </span>
          <div style={{ display: "flex", gap: 4 }}>
            {[...Array(3)].map((_, i) => (
              <div key={i} style={{
                width: 3, height: 3, borderRadius: "50%",
                background: hovered ? "rgba(255,160,20,0.3)" : "rgba(255,255,255,0.08)",
                transition: "background 0.3s ease"
              }} />
            ))}
          </div>
        </div>

        <figure style={{
          position: "relative", zIndex: 2,
          display: "flex", justifyContent: "center",
          padding: "12px 16px 8px"
        }}>
          <div style={{
            position: "absolute", inset: 0,
            display: "flex", alignItems: "center", justifyContent: "center",
            pointerEvents: "none"
          }}>
            <div style={{
              width: 80, height: 80, borderRadius: "50%",
              background: `radial-gradient(circle, ${theme.glow} 0%, transparent 70%)`,
              filter: "blur(16px)",
              opacity: hovered ? 0.8 : 0.3,
              transition: "opacity 0.35s ease"
            }} />
          </div>
          <img
            src={pokemon.image}
            alt={pokemon.name}
            style={{
              width: 96, height: 96, objectFit: "contain",
              position: "relative", zIndex: 1,
              transition: "transform 0.35s ease, filter 0.35s ease",
              transform: hovered ? "scale(1.12)" : "scale(1)",
              filter: hovered
                ? "drop-shadow(0 8px 16px rgba(0,0,0,0.6))"
                : "drop-shadow(0 4px 8px rgba(0,0,0,0.4))"
            }}
          />
        </figure>

        <div style={{
          position: "relative", zIndex: 2,
          padding: "4px 16px 16px",
          display: "flex", flexDirection: "column", alignItems: "center", gap: 8
        }}>
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 14,
            fontWeight: 700,
            color: hovered ? "#c9b99a" : "rgba(180,160,120,0.55)",
            textTransform: "capitalize",
            letterSpacing: "0.03em",
            margin: 0,
            transition: "color 0.3s ease"
          }}>
            {pokemon.name}
          </h2>

          <div style={{ display: "flex", gap: 6, flexWrap: "wrap", justifyContent: "center" }}>
            {pokemon.types.map(type => (
              <span key={type} style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: 9,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                padding: "3px 10px",
                borderRadius: 999,
                background: `${theme.glow}12`,
                border: `1px solid ${theme.glow}28`,
                color: `${theme.glow}99`,
                transition: "background 0.3s ease, border-color 0.3s ease"
              }}>
                {type}
              </span>
            ))}
          </div>
        </div>

        <div style={{
          height: 1,
          background: hovered
            ? "linear-gradient(to right, transparent, rgba(255,160,20,0.3), transparent)"
            : "linear-gradient(to right, transparent, rgba(255,160,20,0.06), transparent)",
          transition: "background 0.35s ease"
        }} />
      </div>
    </div>
  )
}

export default PokemonCard
