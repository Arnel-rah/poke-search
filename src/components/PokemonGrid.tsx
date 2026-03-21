import type { Pokemon } from "../types/pokemon"
import PokemonCard from "./PokemonCard"

interface Props {
  pokemons: Pokemon[]
  search: string
}

const EmptyState = ({ search }: { search: string }) => (
  <div style={{
    display: "flex", flexDirection: "column", alignItems: "center",
    justifyContent: "center", padding: "96px 0", gap: 20
  }}>
    <div style={{
      width: 64, height: 64, borderRadius: "50%",
      border: "1px solid rgba(255,160,20,0.12)",
      display: "flex", alignItems: "center", justifyContent: "center",
      background: "rgba(255,160,20,0.03)",
    }}>
      <span style={{ fontSize: 24, color: "rgba(255,160,20,0.2)" }}>◎</span>
    </div>

    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
      <p style={{
        fontFamily: "'Playfair Display', serif",
        fontStyle: "italic",
        fontSize: 16,
        color: "rgba(180,160,120,0.4)",
        margin: 0
      }}>
        {search ? `Aucun spécimen trouvé` : "Collection vide"}
      </p>
      {search && (
        <p style={{
          fontFamily: "'DM Mono', monospace",
          fontSize: 10,
          letterSpacing: "0.15em",
          color: "rgba(255,160,20,0.25)",
          margin: 0
        }}>
          pour « {search} »
        </p>
      )}
    </div>

    <div style={{
      height: 1, width: 80,
      background: "linear-gradient(to right, transparent, rgba(255,160,20,0.2), transparent)"
    }} />
  </div>
)

const PokemonGrid = ({ pokemons, search }: Props) => {
  if (pokemons.length === 0) return <EmptyState search={search} />

  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
      gap: 12,
    }}>
      {pokemons.map((pokemon, index) => (
        <PokemonCard key={pokemon.id} pokemon={pokemon} index={index} />
      ))}
    </div>
  )
}

export default PokemonGrid
