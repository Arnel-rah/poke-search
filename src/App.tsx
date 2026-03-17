import { useEffect, useState, useMemo } from "react"
import type { Pokemon } from "./types/pokemon";



const PokemonCard = ({ pokemon }: { pokemon: Pokemon }) => (
  <div className="card bg-base-100 shadow-md hover:shadow-xl transition-shadow">
    <figure className="pt-4">
      <img src={pokemon.image} alt={pokemon.name} className="w-24 h-24 object-contain" />
    </figure>
    <div className="card-body items-center p-3">
      <h2 className="capitalize text-sm font-bold">{pokemon.name}</h2>
      <div className="flex gap-1">
        {pokemon.types.map(type => (
          <span key={type} className="badge badge-primary badge-sm capitalize">{type}</span>
        ))}
      </div>
    </div>
  </div>
);

const App = () => {
  const [pokemonsAPI, setPokemonsAPI] = useState<Pokemon[]>([])
  const [customPokemons, setCustomPokemons] = useState<Pokemon[]>([])
  const [loading, setLoading] = useState(false)
  const [search, setSearch] = useState("")

  const [form, setForm] = useState({ name: "", image: "" })

  useEffect(() => {
    const fetchPokemons = async () => {
      setLoading(true)
      try {
        const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=12")
        const list = await response.json()
        const details = await Promise.all(
          list.results.map(async (item: any) => {
            const res = await fetch(item.url)
            const p = await res.json()
            return {
              id: p.id,
              name: p.name,
              image: p.sprites.other["official-artwork"].front_default,
              types: p.types.map((t: any) => t.type.name),
              height: p.height,
              weight: p.weight
            }
          })
        )
        setPokemonsAPI(details)
      } catch (error) {
        console.error("Erreur Fetch:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchPokemons()
  }, [])

  const handleAddPokemon = () => {
    if (!form.name.trim()) return
    const newPokemon: Pokemon = {
      id: Date.now(),
      name: form.name.toLowerCase(),
      image: form.image || "https://placehold.co/96x96",
      types: ["normal"],
      height: 10,
      weight: 10
    }
    setCustomPokemons(prev => [newPokemon, ...prev])
    setForm({ name: "", image: "" })
  }

  const filteredPokemons = useMemo(() => {
    const all = [...customPokemons, ...pokemonsAPI]
    return all.filter(p => p.name.toLowerCase().includes(search.toLowerCase()))
  }, [search, pokemonsAPI, customPokemons])

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8">
      <header>
        <h1 className="text-4xl font-black mb-2">Pokédex 2026</h1>
        <p className="text-gray-500">Gérez vos spécimens locaux et distants.</p>
      </header>
      <section className="bg-base-200 p-6 rounded-2xl flex flex-wrap gap-4 items-end">
        <div className="form-control">
          <label className="label text-xs font-bold">NOM</label>
          <input
            type="text"
            className="input input-bordered"
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
          />
        </div>
        <div className="form-control">
          <label className="label text-xs font-bold">IMAGE URL</label>
          <input
            type="text"
            className="input input-bordered"
            value={form.image}
            onChange={e => setForm({ ...form, image: e.target.value })}
          />
        </div>
        <button className="btn btn-primary" onClick={handleAddPokemon}>Ajouter</button>
      </section>

      <section>
        <input
          type="text"
          placeholder="Rechercher un Pokémon par son nom..."
          className="input input-bordered w-full input-lg shadow-sm"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </section>

      {loading ? (
        <div className="flex justify-center"><span className="loading loading-dots loading-lg"></span></div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {filteredPokemons.map(pokemon => (
            <PokemonCard key={pokemon.id} pokemon={pokemon} />
          ))}
        </div>
      )}
    </div>
  )
}

export default App
