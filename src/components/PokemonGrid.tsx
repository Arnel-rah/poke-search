import { useEffect, useRef, useState } from "react"
import type { Pokemon } from "../types/pokemon"
import PokemonCard from "./PokemonCard"

interface Props {
  pokemons: Pokemon[]
}

const PokemonGrid = ({ pokemons }: Props) => {
  const [visibleIds, setVisibleIds] = useState<Set<number>>(new Set())
  const refs = useRef<Map<number, HTMLDivElement>>(new Map())

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = Number((entry.target as HTMLElement).dataset.id)
            setVisibleIds((prev) => new Set(prev).add(id))
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1 }
    )

    refs.current.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [pokemons])

  return (
    <div className="min-h-screen px-4 py-10">
      <div className="max-w-7xl mx-auto mb-10 flex flex-col items-center gap-2">
        <p className="text-xs font-mono tracking-[0.25em] text-white/30 uppercase">
          Pokédex
        </p>
        <h1
          className="text-3xl font-black text-white tracking-tight"
          style={{ fontFamily: "'Segoe UI', system-ui, sans-serif" }}
        >
          {pokemons.length}{" "}
          <span className="text-white/30 font-light">Pokémon</span>
        </h1>
        <div className="mt-2 h-px w-24 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 max-w-7xl mx-auto">
        {pokemons.map((pokemon, index) => {
          const isVisible = visibleIds.has(pokemon.id)
          return (
            <div
              key={pokemon.id}
              data-id={pokemon.id}
              ref={(el) => {
                if (el) refs.current.set(pokemon.id, el)
                else refs.current.delete(pokemon.id)
              }}
              style={{
                transitionDelay: `${(index % 12) * 40}ms`,
                transition: "opacity 0.5s ease, transform 0.5s ease",
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translateY(0)" : "translateY(20px)",
              }}
            >
              <PokemonCard pokemon={pokemon} />
            </div>
          )
        })}
      </div>

      {pokemons.length === 0 && (
        <div className="flex flex-col items-center justify-center py-32 gap-3">
          <div className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center">
            <span className="text-2xl opacity-30">?</span>
          </div>
          <p className="text-white/30 text-sm tracking-wide">Aucun Pokémon trouvé</p>
        </div>
      )}

    </div>
  )
}

export default PokemonGrid
