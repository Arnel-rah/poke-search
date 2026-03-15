import SearchPokemon from "./components/SearchPokemon"
import AddPokemonModal from "./components/AddPokemonModal"

const App = () => {

  const handleSearch = (value: string) => {
    console.log("search:", value)
  }

  const handleAddPokemon = (pokemon: any) => {
    console.log("new pokemon:", pokemon)
  }

  return (

    <div>

      <SearchPokemon onSearch={handleSearch} />

      <button
        className="btn btn-primary"
        onClick={() =>
          (document.getElementById("pokemon_modal") as HTMLDialogElement)?.showModal()
        }
      >
        Ajouter
      </button>

      <AddPokemonModal onAdd={handleAddPokemon} />

    </div>

  )

}

export default App
