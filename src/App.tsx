
import { useState } from "react"
import { usePokemons } from "./hooks/usePokemons"
import AppShell from "./components/layout/AppShell"
import TopBar from "./components/layout/TopBar"
import AppHeader from "./components/layout/AppHeader"
import AppFooter from "./components/layout/AppFooter"
import SearchPokemon from "./components/SearchPokemon"
import PokemonContent from "./components/PokemonContent"

const App = () => {
  const [search, setSearch] = useState("")
  const { filteredPokemons, loading, addPokemon } = usePokemons(search)

  return (
    <AppShell>
      <TopBar />
      <AppHeader count={filteredPokemons.length} onAdd={addPokemon} />
      <SearchPokemon value={search} onChange={setSearch} />
      <PokemonContent pokemons={filteredPokemons} loading={loading} search={search} />
      <AppFooter />
    </AppShell>
  )
}

export default App
