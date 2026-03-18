import { useEffect, useState, useMemo } from "react"
import type { Pokemon } from "./types/pokemon"

const TYPE_COLORS: Record<string, { bg: string; badge: string; glow: string; text: string }> = {
  fire:     { bg: "from-orange-950 to-red-900",    badge: "bg-orange-500/20 text-orange-300 border-orange-500/40",   glow: "rgba(251,146,60,0.35)",   text: "text-orange-400" },
  water:    { bg: "from-blue-950 to-cyan-900",     badge: "bg-blue-500/20 text-blue-300 border-blue-500/40",        glow: "rgba(96,165,250,0.35)",   text: "text-blue-400" },
  grass:    { bg: "from-green-950 to-emerald-900", badge: "bg-green-500/20 text-green-300 border-green-500/40",     glow: "rgba(74,222,128,0.35)",   text: "text-green-400" },
  electric: { bg: "from-yellow-950 to-amber-900",  badge: "bg-yellow-500/20 text-yellow-300 border-yellow-500/40", glow: "rgba(250,204,21,0.35)",   text: "text-yellow-400" },
  psychic:  { bg: "from-pink-950 to-fuchsia-900",  badge: "bg-pink-500/20 text-pink-300 border-pink-500/40",       glow: "rgba(244,114,182,0.35)",  text: "text-pink-400" },
  ice:      { bg: "from-cyan-950 to-sky-900",      badge: "bg-cyan-500/20 text-cyan-300 border-cyan-500/40",       glow: "rgba(103,232,249,0.35)",  text: "text-cyan-400" },
  dragon:   { bg: "from-indigo-950 to-violet-900", badge: "bg-indigo-500/20 text-indigo-300 border-indigo-500/40", glow: "rgba(129,140,248,0.35)",  text: "text-indigo-400" },
  dark:     { bg: "from-zinc-950 to-neutral-900",  badge: "bg-zinc-500/20 text-zinc-300 border-zinc-500/40",       glow: "rgba(161,161,170,0.25)",  text: "text-zinc-400" },
  fighting: { bg: "from-red-950 to-rose-900",      badge: "bg-red-500/20 text-red-300 border-red-500/40",          glow: "rgba(248,113,113,0.35)",  text: "text-red-400" },
  poison:   { bg: "from-purple-950 to-violet-900", badge: "bg-purple-500/20 text-purple-300 border-purple-500/40", glow: "rgba(192,132,252,0.35)",  text: "text-purple-400" },
  normal:   { bg: "from-neutral-900 to-zinc-800",  badge: "bg-neutral-500/20 text-neutral-300 border-neutral-500/40", glow: "rgba(163,163,163,0.25)", text: "text-neutral-400" },
}

const getTheme = (types: string[]) => TYPE_COLORS[types[0]?.toLowerCase()] ?? TYPE_COLORS.normal

const PokemonCard = ({ pokemon, index }: { pokemon: Pokemon; index: number }) => {
  const [hovered, setHovered] = useState(false)
  const [visible, setVisible] = useState(false)
  const theme = getTheme(pokemon.types)

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), index * 40)
    return () => clearTimeout(t)
  }, [index])

  return (
    <div
      style={{
        transition: "opacity 0.5s ease, transform 0.5s ease",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
      }}
    >
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          transition: "transform 0.3s ease, box-shadow 0.3s ease",
          transform: hovered ? "translateY(-6px) scale(1.02)" : "translateY(0) scale(1)",
          boxShadow: hovered
            ? `0 20px 40px -12px ${theme.glow}, 0 0 0 1px rgba(255,255,255,0.07)`
            : "0 4px 16px -4px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.04)",
        }}
        className={`relative overflow-hidden rounded-2xl cursor-pointer bg-gradient-to-br ${theme.bg} border border-white/5`}
      >
        <div
          style={{ transition: "opacity 0.3s ease", opacity: hovered ? 1 : 0 }}
          className="absolute inset-0 pointer-events-none z-10"
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/0" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(255,255,255,0.08),transparent_60%)]" />
        </div>

        <div className="h-0.5 w-full bg-gradient-to-r from-transparent via-white/20 to-transparent" />

        <div className="px-4 pt-3 pb-1 flex justify-between items-center">
          <span className={`font-mono text-xs font-semibold tracking-widest ${theme.text} opacity-60`}>
            #{String(pokemon.id).padStart(3, "0")}
          </span>
          <div className="flex gap-1">
            {[...Array(3)].map((_, i) => <div key={i} className="w-1 h-1 rounded-full bg-white/15" />)}
          </div>
        </div>

        <figure className="flex justify-center py-4 relative">
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div style={{ width: 80, height: 80, borderRadius: "50%", background: `radial-gradient(circle, ${theme.glow} 0%, transparent 70%)`, filter: "blur(12px)", opacity: hovered ? 1 : 0.5, transition: "opacity 0.3s ease" }} />
          </div>
          <img
            src={pokemon.image}
            alt={pokemon.name}
            className="w-28 h-28 object-contain relative z-10"
            style={{
              transition: "transform 0.3s ease, filter 0.3s ease",
              transform: hovered ? "scale(1.1)" : "scale(1)",
              filter: hovered ? "drop-shadow(0 8px 16px rgba(0,0,0,0.5))" : "drop-shadow(0 4px 8px rgba(0,0,0,0.4))",
            }}
          />
        </figure>

        <div className="px-4 pb-4 flex flex-col items-center gap-2">
          <h2 className="text-white font-bold capitalize tracking-wide text-sm">
            {pokemon.name}
          </h2>
          <div className="flex gap-1.5 flex-wrap justify-center">
            {pokemon.types.map(type => (
              <span key={type} className={`capitalize text-[11px] font-semibold px-2.5 py-0.5 rounded-full border tracking-wider ${theme.badge}`}>
                {type}
              </span>
            ))}
          </div>
        </div>

        <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>
    </div>
  )
}

const App = () => {
  const [pokemonsAPI, setPokemonsAPI] = useState<Pokemon[]>([])
  const [customPokemons, setCustomPokemons] = useState<Pokemon[]>([])
  const [loading, setLoading] = useState(false)
  const [search, setSearch] = useState("")
  const [formOpen, setFormOpen] = useState(false)
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
              weight: p.weight,
            }
          })
        )
        setPokemonsAPI(details)
      } catch (err) {
        console.error("Erreur Fetch:", err)
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
      weight: 10,
    }
    setCustomPokemons(prev => [newPokemon, ...prev])
    setForm({ name: "", image: "" })
    setFormOpen(false)
  }

  const filteredPokemons = useMemo(() => {
    const all = [...customPokemons, ...pokemonsAPI]
    return all.filter(p => p.name.toLowerCase().includes(search.toLowerCase()))
  }, [search, pokemonsAPI, customPokemons])

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">

      {/* Ambient background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-violet-900/20 rounded-full blur-3xl" />
        <div className="absolute top-1/3 -right-40 w-96 h-96 bg-blue-900/15 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-emerald-900/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-12 space-y-10">

        {/* Header */}
        <header className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
          <div>
            <p className="font-mono text-xs tracking-[0.3em] text-white/30 uppercase mb-2">
              National Pokédex
            </p>
            <h1 className="text-4xl sm:text-5xl font-black tracking-tight leading-none">
              Pokédex{" "}
              <span className="text-white/20 font-light">2026</span>
            </h1>
            <p className="mt-2 text-sm text-white/40">
              {filteredPokemons.length} spécimen{filteredPokemons.length > 1 ? "s" : ""} dans votre collection
            </p>
          </div>

          <button
            onClick={() => setFormOpen(o => !o)}
            style={{ transition: "background 0.2s ease, box-shadow 0.2s ease" }}
            className="self-start sm:self-auto flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-sm font-semibold tracking-wide"
          >
            <span
              style={{
                display: "inline-block",
                transition: "transform 0.2s ease",
                transform: formOpen ? "rotate(45deg)" : "rotate(0deg)",
              }}
            >
              +
            </span>
            Ajouter un Pokémon
          </button>
        </header>

        {/* Add Form */}
        <div
          style={{
            display: "grid",
            gridTemplateRows: formOpen ? "1fr" : "0fr",
            transition: "grid-template-rows 0.35s ease",
          }}
        >
          <div className="overflow-hidden">
            <div className="bg-white/[0.03] border border-white/8 rounded-2xl p-6 flex flex-wrap gap-4 items-end">
              <div className="flex flex-col gap-1.5 flex-1 min-w-40">
                <label className="text-xs font-mono tracking-widest text-white/40 uppercase">
                  Nom
                </label>
                <input
                  type="text"
                  placeholder="ex: mewtwo"
                  className="bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/20 outline-none focus:border-white/30 transition-colors"
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                  onKeyDown={e => e.key === "Enter" && handleAddPokemon()}
                />
              </div>
              <div className="flex flex-col gap-1.5 flex-[2] min-w-52">
                <label className="text-xs font-mono tracking-widest text-white/40 uppercase">
                  Image URL
                </label>
                <input
                  type="text"
                  placeholder="https://..."
                  className="bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/20 outline-none focus:border-white/30 transition-colors"
                  value={form.image}
                  onChange={e => setForm({ ...form, image: e.target.value })}
                />
              </div>
              <button
                onClick={handleAddPokemon}
                className="px-6 py-2.5 rounded-xl bg-white text-black text-sm font-bold tracking-wide hover:bg-white/90 active:scale-95 transition-all"
              >
                Ajouter
              </button>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="relative">
          <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
          </svg>
          <input
            type="text"
            placeholder="Rechercher un Pokémon…"
            className="w-full bg-white/[0.04] border border-white/10 rounded-2xl pl-11 pr-5 py-3.5 text-white placeholder-white/25 outline-none focus:border-white/25 transition-colors text-sm"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors text-lg leading-none"
            >
              ×
            </button>
          )}
        </div>

        {/* Grid */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-32 gap-4">
            <div className="flex gap-2">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="w-2 h-2 rounded-full bg-white/40"
                  style={{ animation: `bounce 1.2s ease-in-out ${i * 0.15}s infinite` }}
                />
              ))}
            </div>
            <p className="text-white/30 text-xs font-mono tracking-widest uppercase">
              Chargement…
            </p>
            <style>{`@keyframes bounce { 0%,80%,100%{transform:scale(0.6);opacity:0.3} 40%{transform:scale(1);opacity:1} }`}</style>
          </div>
        ) : filteredPokemons.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 gap-3">
            <div className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center text-2xl opacity-30">?</div>
            <p className="text-white/30 text-sm tracking-wide">Aucun Pokémon trouvé pour « {search} »</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
            {filteredPokemons.map((pokemon, index) => (
              <PokemonCard key={pokemon.id} pokemon={pokemon} index={index} />
            ))}
          </div>
        )}

      </div>
    </div>
  )
}

export default App
