import { useEffect, useMemo } from "react"
import type { Pokemon, PokemonForm } from "../types/pokemon"
import { fetchPokemons } from "../services/pokemonService"
import { useLocalStorage } from "./useLocalStorage"

const STORAGE_KEY = "pokedex:pokemons"

export const usePokemons = (search: string = "") => {

  const [pokemons, setPokemons] = useLocalStorage<Pokemon[]>(STORAGE_KEY, [])
  const [loading, setLoading] = useLocalStorage<boolean>("pokedex:loading", false)
  const [error, setError] = useLocalStorage<string | null>("pokedex:error", null)

  useEffect(() => {
    if (pokemons.length > 0) return

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

// src/hooks/usePokemons.ts
const addPokemon = (form: PokemonForm) => {
  const nextId = pokemons.length > 0
    ? Math.max(...pokemons.map(p => p.id)) + 1
    : 1

  const newPokemon: Pokemon = {
    ...form,
    id: nextId,
    types: form.types
      ? form.types.split(",").map(t => t.trim()).filter(Boolean)
      : [],
    height: Number(form.height) || 0,
    weight: Number(form.weight) || 0,
  }
  setPokemons(prev => [...prev, newPokemon])
}

  return { pokemons, filteredPokemons, addPokemon, loading, error }
}
