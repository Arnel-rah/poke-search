import { useState } from "react"

interface Props {
  onSearch: (value: string) => void
}

const SearchPokemon = ({ onSearch }: Props) => {

  const [query, setQuery] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {

    const value = e.target.value
    setQuery(value)
    onSearch(value)

  }

  return (

    <div className="max-w-md mx-auto mb-6">

      <input
        type="text"
        placeholder="Rechercher un Pokémon..."
        className="input input-bordered w-full"
        value={query}
        onChange={handleChange}
      />

    </div>

  )

}

export default SearchPokemon
