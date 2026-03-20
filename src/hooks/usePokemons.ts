import { useEffect, useState, useMemo } from "react"
import type { Pokemon } from "../types/pokemon"
import { fetchPokemons } from "../services/pokemonService"

export const usePokemons = (search: string = "") => {

  const [pokemons, setPokemons] = useState<Pokemon[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const load = async () => {
      setLoading(true)
      try {
        const data = await fetchPokemons()
        setPokemons(data)
        setError(null)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error")
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  const filteredPokemons = useMemo(() =>
    pokemons.filter(p =>
      p.name.toLowerCase().includes(search.toLowerCase())
    ), [pokemons, search]
  )

  const addPokemon = (pokemon: Pokemon) => {
    setPokemons(prev => [...prev, pokemon])
  }

  return { pokemons, filteredPokemons, addPokemon, loading, error }
}
