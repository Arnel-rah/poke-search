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

interface PokemonForm {
  name: string;
  image: string;
  types: string;
  height: string;
  weight: string;
}

const POKEMON_TYPES = [
  "fire", "water", "grass", "electric", "psychic",
  "ice", "dragon", "dark", "fairy", "normal",
  "fighting", "flying", "poison", "ground", "rock",
  "bug", "ghost", "steel"
];

const App = () => {

  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState<PokemonForm>({
    name: "",
    image: "",
    types: "",
    height: "",
    weight: "",
  });
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [formError, setFormError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPokemons = async () => {
      setLoading(true);
      try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=15');
        if (!response.ok) throw new Error('HTTP Error');
        const list = await response.json();

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


  // Toggle type selection
  const toggleType = (type: string) => {
    setSelectedTypes((prev) =>
      prev.includes(type)
        ? prev.filter((t) => t !== type)
        : prev.length < 2
        ? [...prev, type]
        : prev
    );
  };

  // Valider et soumettre le formulaire
  const handleSubmit = () => {
    setFormError(null);

    if (!form.name.trim()) return setFormError("Le nom est requis.");
    if (selectedTypes.length === 0) return setFormError("Choisis au moins un type.");
    if (!form.height || isNaN(Number(form.height))) return setFormError("Hauteur invalide.");
    if (!form.weight || isNaN(Number(form.weight))) return setFormError("Poids invalide.");

    const newPokemon: Pokemon = {
      id: Date.now(),
      name: form.name.trim().toLowerCase(),
      image: form.image || "https://placehold.co/96x96",
      types: selectedTypes,
      height: Math.round(Number(form.height) * 10),
      weight: Math.round(Number(form.weight) * 10),
    };

    setPokemons((prev) => [...prev, newPokemon]);

    // Reset
    setForm({ name: "", image: "", types: "", height: "", weight: "" });
    setSelectedTypes([]);

    // Fermer le modal
    (document.getElementById("pokemon_modal") as HTMLDialogElement)?.close();
  };

  return (
    <div className="min-h-screen bg-base-200 p-8">

      {/* Header */}
      <div className="flex justify-between items-center mb-8 max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold">Pokédex</h1>
        <button
          className="btn btn-primary"
          onClick={() => (document.getElementById("pokemon_modal") as HTMLDialogElement)?.showModal()}
        >
          + Ajouter un Pokémon
        </button>
      </div>

      {/* Modal Formulaire */}
      <dialog id="pokemon_modal" className="modal">
        <div className="modal-box w-11/12 max-w-lg">
          <h3 className="font-bold text-xl mb-4">Créer un Pokémon</h3>

          {/* Nom */}
          <div className="form-control mb-3">
            <label className="label"><span className="label-text">Nom *</span></label>
            <input
              type="text"
              placeholder="Ex: Claudemon"
              className="input input-bordered"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </div>

          {/* Image URL */}
          <div className="form-control mb-3">
            <label className="label"><span className="label-text">Image URL</span></label>
            <input
              type="text"
              placeholder="https://..."
              className="input input-bordered"
              value={form.image}
              onChange={(e) => setForm({ ...form, image: e.target.value })}
            />
          </div>

          {/* Types */}
          <div className="form-control mb-3">
            <label className="label">
              <span className="label-text">Types * <span className="text-gray-400">(max 2)</span></span>
            </label>
            <div className="flex flex-wrap gap-2">
              {POKEMON_TYPES.map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => toggleType(type)}
                  className={`badge badge-md capitalize cursor-pointer border-2 transition-all ${
                    selectedTypes.includes(type)
                      ? "badge-primary border-primary"
                      : "badge-ghost border-gray-300"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Hauteur & Poids */}
          <div className="grid grid-cols-2 gap-3 mb-3">
            <div className="form-control">
              <label className="label"><span className="label-text">Hauteur (m) *</span></label>
              <input
                type="number"
                placeholder="Ex: 1.2"
                className="input input-bordered"
                value={form.height}
                onChange={(e) => setForm({ ...form, height: e.target.value })}
              />
            </div>
            <div className="form-control">
              <label className="label"><span className="label-text">Poids (kg) *</span></label>
              <input
                type="number"
                placeholder="Ex: 85"
                className="input input-bordered"
                value={form.weight}
                onChange={(e) => setForm({ ...form, weight: e.target.value })}
              />
            </div>
          </div>

          {/* Erreur formulaire */}
          {formError && (
            <div role="alert" className="alert alert-error mb-3 py-2">
              <span className="text-sm">⚠️ {formError}</span>
            </div>
          )}

          {/* Actions */}
          <div className="modal-action">
            <button
              className="btn btn-ghost"
              onClick={() => (document.getElementById("pokemon_modal") as HTMLDialogElement)?.close()}
            >
              Annuler
            </button>
            <button className="btn btn-primary" onClick={handleSubmit}>
              Créer
            </button>
          </div>
        </div>

        {/* Click outside to close */}
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>

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
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 max-w-7xl mx-auto">
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
                    <span key={type} className="badge badge-primary badge-sm capitalize">{type}</span>
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
