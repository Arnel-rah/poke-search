import { useState } from "react"
import { usePokemons } from "./hooks/usePokemons"
import PokemonGrid from "./components/PokemonGrid"
import SearchPokemon from "./components/SearchPokemon"
import AddPokemonModal from "./components/AddPokemonModal"

const App = () => {
  const [search, setSearch] = useState("")
  const { filteredPokemons, loading, addPokemon } = usePokemons(search)

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">

      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-violet-900/20 rounded-full blur-3xl" />
        <div className="absolute top-1/3 -right-40 w-96 h-96 bg-blue-900/15 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-emerald-900/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-12 space-y-10">

        <header className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6">
          <div>
            <p className="font-mono text-xs tracking-[0.3em] text-white/30 uppercase mb-2">National Pokédex</p>
            <h1 className="text-4xl sm:text-5xl font-black tracking-tight leading-none">
              Pokédex <span className="text-white/20 font-light">2026</span>
            </h1>
            <p className="mt-2 text-sm text-white/40">
              {filteredPokemons.length} spécimen{filteredPokemons.length > 1 ? "s" : ""} dans votre collection
            </p>
          </div>
          <AddPokemonModal onAdd={addPokemon} />
        </header>

        <SearchPokemon value={search} onChange={setSearch} />

        {loading ? (
          <div className="flex flex-col items-center justify-center py-32 gap-4">
            <div className="flex gap-2">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="w-2 h-2 rounded-full bg-white/40" style={{ animation: `bounce 1.2s ease-in-out ${i * 0.15}s infinite` }} />
              ))}
            </div>
            <p className="text-white/30 text-xs font-mono tracking-widest uppercase">Chargement…</p>
            <style>{`@keyframes bounce{0%,80%,100%{transform:scale(0.6);opacity:0.3}40%{transform:scale(1);opacity:1}}`}</style>
          </div>
        ) : (
          <PokemonGrid pokemons={filteredPokemons} search={search} />
        )}

      </div>
    </div>
  )
}

export default App
