import { useState } from "react"

interface Props {
  onAdd: (name: string, image: string) => void
}

const AddPokemonModal = ({ onAdd }: Props) => {
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState({ name: "", image: "" })

  const handleSubmit = () => {
    if (!form.name.trim()) return
    onAdd(form.name, form.image)
    setForm({ name: "", image: "" })
    setOpen(false)
  }

  return (
    <>
      <button
        onClick={() => setOpen(o => !o)}
        className="self-start sm:self-auto flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-sm font-semibold tracking-wide transition-colors"
      >
        <span style={{ display: "inline-block", transition: "transform 0.2s ease", transform: open ? "rotate(45deg)" : "rotate(0deg)" }}>
          +
        </span>
        Ajouter un Pokémon
      </button>

      <div style={{ display: "grid", gridTemplateRows: open ? "1fr" : "0fr", transition: "grid-template-rows 0.35s ease" }}>
        <div className="overflow-hidden">
          <div className="bg-white/[0.03] border border-white/8 rounded-2xl p-6 flex flex-wrap gap-4 items-end mt-4">
            <div className="flex flex-col gap-1.5 flex-1 min-w-40">
              <label className="text-xs font-mono tracking-widest text-white/40 uppercase">Nom</label>
              <input
                type="text"
                placeholder="ex: mewtwo"
                className="bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/20 outline-none focus:border-white/30 transition-colors"
                value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
                onKeyDown={e => e.key === "Enter" && handleSubmit()}
              />
            </div>
            <div className="flex flex-col gap-1.5 flex-[2] min-w-52">
              <label className="text-xs font-mono tracking-widest text-white/40 uppercase">Image URL</label>
              <input
                type="text"
                placeholder="https://..."
                className="bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/20 outline-none focus:border-white/30 transition-colors"
                value={form.image}
                onChange={e => setForm({ ...form, image: e.target.value })}
              />
            </div>
            <button
              onClick={handleSubmit}
              className="px-6 py-2.5 rounded-xl bg-white text-black text-sm font-bold tracking-wide hover:bg-white/90 active:scale-95 transition-all"
            >
              Ajouter
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default AddPokemonModal
