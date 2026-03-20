import RuleLine from "../ui/RuleLine"
import AddPokemonModal from "../AddPokemonModal"
import type { PokemonForm } from "../../types/pokemon"

type Props = {
  count: number
  onAdd: (pokemon: PokemonForm) => void
}

const AppHeader = ({ count, onAdd }: Props) => (
  <header className="fade-up fade-up-2 mb-3">
    <RuleLine />
    <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-5 my-6">

      <div>
        <p
          className="text-xs tracking-[0.35em] uppercase mb-3"
          style={{ color: "rgba(255,160,20,0.45)", fontFamily: "'DM Mono', monospace" }}
        >
          National Pokédex
        </p>
        <h1
          className="display-font text-5xl sm:text-7xl font-black leading-[0.9] tracking-tight"
          style={{ color: "#f5e8c8" }}
        >
          Pokédex
          <br />
          <span
            className="italic font-normal"
            style={{ color: "rgba(255,160,20,0.35)", fontSize: "0.65em" }}
          >
            Field Catalogue
          </span>
        </h1>
      </div>

      <div className="flex flex-col items-start sm:items-end gap-3 sm:pb-1">
        <span
          style={{
            fontFamily: "'Playfair Display', serif",
            fontStyle: "italic",
            color: "rgba(255,160,20,0.5)",
            fontSize: 13
          }}
        >
          {count} spécimen{count !== 1 ? "s" : ""} recensé{count !== 1 ? "s" : ""}
        </span>
        <AddPokemonModal onAdd={onAdd} />
      </div>

    </div>
    <RuleLine />
  </header>
)

export default AppHeader
