import type { Pokemon } from "../types/pokemon"

export const fetchPokemons = async (): Promise<Pokemon[]> => {

  const response = await fetch(
    "https://pokeapi.co/api/v2/pokemon?limit=15"
  )

  if (!response.ok) {
    throw new Error("HTTP Error")
  }

  const list = await response.json()

  const details = await Promise.all(
    list.results.map(async (item: { name: string; url: string }) => {

      const res = await fetch(item.url)
      const pokemon = await res.json()

      return {
        id: pokemon.id,
        name: pokemon.name,
        image: pokemon.sprites.other["official-artwork"].front_default,
        types: pokemon.types.map((t: any) => t.type.name),
        height: pokemon.height,
        weight: pokemon.weight
      } as Pokemon

    })
  )

  return details
}
