import { useEffect, useMemo, useState } from "react"
import type { Pokemon } from "../types/pokemon"
import { fetchPokemons } from "../services/pokemonService"

// src/hooks/usePokemons.ts
export const usePokemons = (search: string) => {
  const [pokemonsAPI, setPokemonsAPI] = useState<Pokemon[]>([])
  const [customPokemons, setCustomPokemons] = useState<Pokemon[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setLoading(true)
    fetchPokemons()
      .then(setPokemonsAPI)
      .catch(() => setError("Impossible de charger les Pokémon"))
      .finally(() => setLoading(false))
  }, [])

  const addPokemon = (name: string, image: string) => {
    const newPokemon: Pokemon = {
      id: Date.now(),
      name: name.toLowerCase(),
      image: image || "https://placehold.co/96x96",
      types: ["normal"],
      height: 10,
      weight: 10,
    }
    setCustomPokemons(prev => [newPokemon, ...prev])
  }

  const filteredPokemons = useMemo(() =>
    [...customPokemons, ...pokemonsAPI].filter(p =>
      p.name.toLowerCase().includes(search.toLowerCase())
    ),
    [search, pokemonsAPI, customPokemons]
  )

  return { filteredPokemons, loading, error, addPokemon }
}
