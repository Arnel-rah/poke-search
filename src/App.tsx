import { useEffect, useState } from "react"

// Types
interface Pokemon {
  id: number;
  name: string;
  image: string;
  types: string[];
  height: number;
  weight: number;
}

const App = () => {

  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPokemons = async () => {
      setLoading(true);
      try {
        // 1. Récupérer la liste (limit=151 pour gen 1, ou ?limit=100000 pour tous)
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151');

        if (!response.ok) throw new Error('HTTP Error');

        const list = await response.json();

        // 2. Fetch les détails de chaque Pokémon en parallèle
        const details = await Promise.all(
          list.results.map(async (item: { name: string; url: string }) => {
            const res = await fetch(item.url);
            const pokemon = await res.json();
            return {
              id: pokemon.id,
              name: pokemon.name,
              image: pokemon.sprites.other["official-artwork"].front_default,
              types: pokemon.types.map((t: { type: { name: string } }) => t.type.name),
              height: pokemon.height,
              weight: pokemon.weight,
            } as Pokemon;
          })
        );

        setPokemons(details);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
        setPokemons([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemons();
  }, []);

  return (
    <div className="min-h-screen bg-base-200 p-8">
      <h1 className="text-3xl font-bold text-center mb-8">Pokédex</h1>

      {/* Loading */}
      {loading && (
        <div className="flex justify-center items-center h-64">
          <span className="loading loading-spinner loading-lg text-primary"></span>
        </div>
      )}

      {/* Error */}
      {error && (
        <div role="alert" className="alert alert-error max-w-md mx-auto">
          <span>⚠️ {error}</span>
        </div>
      )}

      {/* Grid Pokémons */}
      {!loading && !error && (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {pokemons.map((pokemon) => (
            <div key={pokemon.id} className="card bg-base-100 shadow-md hover:shadow-xl transition-shadow">
              <figure className="px-4 pt-4">
                <img
                  src={pokemon.image}
                  alt={pokemon.name}
                  className="w-24 h-24 object-contain"
                />
              </figure>
              <div className="card-body items-center text-center p-3">
                <span className="text-xs text-gray-400">#{String(pokemon.id).padStart(3, '0')}</span>
                <h2 className="card-title text-sm capitalize">{pokemon.name}</h2>
                <div className="flex gap-1 flex-wrap justify-center">
                  {pokemon.types.map((type) => (
                    <span key={type} className="badge badge-primary badge-sm capitalize">
                      {type}
                    </span>
                  ))}
                </div>
                <div className="text-xs text-gray-400 mt-1">
                  <span>{pokemon.height / 10}m</span> · <span>{pokemon.weight / 10}kg</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default App
