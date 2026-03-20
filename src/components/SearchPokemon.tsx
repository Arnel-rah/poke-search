import { useState } from "react"
// SearchPokemon.tsx — ajoute value et onChange
type Props = {
  value: string
  onChange: (value: string) => void
}


const SearchPokemon = ({ onChange }: Props) => {

  const [query, setQuery] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {

    const value = e.target.value
    setQuery(value)
    onChange(value)

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
