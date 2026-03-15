import type { Pokemon } from "../types/pokemon"
import PokemonCard from "./PokemonCard"

interface Props {
  pokemons: Pokemon[]
}

const PokemonGrid = ({ pokemons }: Props) => {

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 max-w-7xl mx-auto">

      {pokemons.map(pokemon => (
        <PokemonCard
          key={pokemon.id}
          pokemon={pokemon}
        />
      ))}

    </div>
  )
}

export default PokemonGrid
