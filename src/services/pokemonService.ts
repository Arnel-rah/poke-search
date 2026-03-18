import type { Pokemon } from "../types/pokemon"

export const fetchPokemons = async (limit = 12): Promise<Pokemon[]> => {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}`)
  const list = await response.json()

  return Promise.all(
    list.results.map(async (item: { url: string }) => {
      const res = await fetch(item.url)
      const p = await res.json()
      return {
        id: p.id,
        name: p.name,
        image: p.sprites.other["official-artwork"].front_default,
        types: p.types.map((t: { type: { name: string } }) => t.type.name),
        height: p.height,
        weight: p.weight,
      }
    })
  )
}
