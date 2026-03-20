interface Props {
  value: string
  onChange: (value: string) => void
}

const SearchPokemon = ({ value, onChange }: Props) => (
  <div className="relative">
    <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
    </svg>
    <input
      type="text"
      placeholder="Rechercher un Pokémon…"
      className="w-full bg-white/[0.04] border border-white/10 rounded-2xl pl-11 pr-10 py-3.5 text-white placeholder-white/25 outline-none focus:border-white/25 transition-colors text-sm"
      value={value}
      onChange={e => onChange(e.target.value)}
    />
    {value && (
      <button
        onClick={() => onChange("")}
        className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors text-lg leading-none"
      >
        ×
      </button>
    )}
  </div>
)

export default SearchPokemon
