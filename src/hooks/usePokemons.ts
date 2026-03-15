import { useEffect, useState } from "react"
import type { Pokemon } from "../types/pokemon"
import { fetchPokemons } from "../services/pokemonService"

export const usePokemons = () => {

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

  return { pokemons, setPokemons, loading, error }

}
