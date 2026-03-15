import type { Pokemon } from "../types/pokemon"

interface Props {
  pokemon: Pokemon
}

const PokemonCard = ({ pokemon }: Props) => {

  return (
    <div className="card bg-base-100 shadow-md hover:shadow-xl">

      <figure className="px-4 pt-4">
        <img
          src={pokemon.image}
          alt={pokemon.name}
          className="w-24 h-24 object-contain"
        />
      </figure>

      <div className="card-body items-center text-center p-3">

        <span className="text-xs text-gray-400">
          #{String(pokemon.id).padStart(3, "0")}
        </span>

        <h2 className="card-title text-sm capitalize">
          {pokemon.name}
        </h2>

        <div className="flex gap-1 flex-wrap justify-center">
          {pokemon.types.map(type => (
            <span key={type} className="badge badge-primary badge-sm capitalize">
              {type}
            </span>
          ))}
        </div>

      </div>

    </div>
  )
}

export default PokemonCard
