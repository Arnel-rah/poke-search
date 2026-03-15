import { usePokemons } from "./hooks/usePokemons"
import PokemonGrid from "./components/PokemonGrid"

const App = () => {

  const { pokemons, loading, error } = usePokemons()

  return (

    <div className="min-h-screen bg-base-200 p-8">

      <h1 className="text-3xl font-bold mb-8">
        Pokédex
      </h1>

      {loading && <p>Loading...</p>}

      {error && <p>{error}</p>}

      {!loading && !error && (
        <PokemonGrid pokemons={pokemons}/>
      )}

    </div>

  )
}

export default App
