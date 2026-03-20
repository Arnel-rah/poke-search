import PokemonGrid from "./PokemonGrid"
import PokemonLoader from "./PokemonLoader"
import type { Pokemon } from "../types/pokemon"

type Props = {
  pokemons: Pokemon[]
  loading: boolean
  search: string
}

const PokemonContent = ({ pokemons, loading, search }: Props) => (
  <div className="fade-up fade-up-4 mt-10">
    {loading
      ? <PokemonLoader />
      : <PokemonGrid pokemons={pokemons} search={search} />
    }
  </div>
)

export default PokemonContent
