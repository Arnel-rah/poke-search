import { useEffect, useRef, useState } from "react"
import type { Pokemon } from "../types/pokemon"
import PokemonCard from "./PokemonCard"

interface Props {
  pokemons: Pokemon[]
  search: string
}

const PokemonGrid = ({ pokemons, search }: Props) => {
  if (pokemons.length === 0) return (
    <div className="flex flex-col items-center justify-center py-32 gap-3">
      <div className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center text-2xl opacity-30">?</div>
      <p className="text-white/30 text-sm tracking-wide">
        {search ? `Aucun Pokémon trouvé pour « ${search} »` : "Aucun Pokémon dans la collection"}
      </p>
    </div>
  )

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
      {pokemons.map((pokemon, index) => (
        <PokemonCard key={pokemon.id} pokemon={pokemon} index={index} />
      ))}
    </div>
  )
}

export default PokemonGrid
