import { useEffect, useMemo } from "react"
import type { Pokemon, PokemonForm } from "../types/pokemon"
import { fetchPokemons } from "../services/pokemonService"
import { useLocalStorage } from "./useLocalStorage"

const STORAGE_KEY = "pokedex:pokemons:v2";

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

  const addPokemon = (form: PokemonForm) => {
    setPokemons(prev => {
      const nextId = prev.length > 0
        ? Math.max(...prev.map(p => p.id)) + 1
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
      return [...prev, newPokemon]
    })
  }

  return { pokemons, filteredPokemons, addPokemon, loading, error }
}
