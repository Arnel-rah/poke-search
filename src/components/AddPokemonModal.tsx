import { useState } from "react"
import type { PokemonForm } from "../types/pokemon"

interface Props {
  onAdd: (pokemon: PokemonForm) => void
}

const AddPokemonModal = ({ onAdd }: Props) => {

  const [form, setForm] = useState<PokemonForm>({
    name: "",
    image: "",
    types: "",
    height: "",
    weight: ""
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onAdd(form)
  }

  return (
    <dialog id="pokemon_modal" className="modal">

      <div className="modal-box">

        <h3 className="font-bold text-lg">
          Ajouter un Pokémon
        </h3>

        <form onSubmit={handleSubmit} className="space-y-3">

          <input
            type="text"
            placeholder="Nom"
            className="input input-bordered w-full"
          />

          <input
            type="text"
            placeholder="Image URL"
            className="input input-bordered w-full"
          />

          <input
            type="number"
            placeholder="Hauteur"
            className="input input-bordered w-full"
          />

          <input
            type="number"
            placeholder="Poids"
            className="input input-bordered w-full"
          />

          <div className="modal-action">

            <button className="btn">
              Annuler
            </button>

            <button className="btn btn-primary">
              Ajouter
            </button>

          </div>

        </form>

      </div>

    </dialog>
  )
}

export default AddPokemonModal
