
import { useEffect, useState, useMemo } from "react"
import type { Pokemon } from "../types/pokemon"
import { fetchPokemons } from "../services/pokemonService"

export const usePokemons = (search: string) => {
  const [pokemonsAPI, setPokemonsAPI] = useState<Pokemon[]>([])
  const [customPokemons, setCustomPokemons] = useState<Pokemon[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    const load = async () => {
      setLoading(true)
      setError(null)
      try {
        const data = await fetchPokemons()
        if (!cancelled) setPokemonsAPI(data)
      } catch {
        if (!cancelled) setError("Impossible de charger les Pokémon")
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    load()

    return () => { cancelled = true }
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
