// src/components/AddPokemonModal.tsx
import { useState, useRef, useEffect } from "react"
import { createPortal } from "react-dom"
import type { PokemonForm } from "../types/pokemon"

interface Props {
  onAdd: (name: string, image: string) => void
}

const EMPTY_FORM: PokemonForm = {
  name: "",
  image: "",
  types: "",
  height: "",
  weight: ""
}

const TYPE_OPTIONS = [
  { label: "Feu",      color: "#e8603c" },
  { label: "Eau",      color: "#4d90d5" },
  { label: "Plante",   color: "#63bb5b" },
  { label: "Électrik", color: "#f4d23c" },
  { label: "Psy",      color: "#f97176" },
  { label: "Glace",    color: "#74cec0" },
  { label: "Dragon",   color: "#6f6ec6" },
  { label: "Spectre",  color: "#756898" },
  { label: "Normal",   color: "#9099a1" },
  { label: "Vol",      color: "#8fa8dd" },
  { label: "Poison",   color: "#aa6bc8" },
  { label: "Combat",   color: "#ce4069" },
  { label: "Roche",    color: "#c7b78b" },
  { label: "Sol",      color: "#d97845" },
  { label: "Acier",    color: "#5a8ea2" },
  { label: "Fée",      color: "#ec8fe6" },
]

const STYLES = `
  @keyframes slideIn {
    from { transform: translateX(100%); opacity: 0; }
    to   { transform: translateX(0);    opacity: 1; }
  }
  @keyframes checkPop {
    0%   { transform: scale(0) rotate(-10deg); opacity: 0; }
    60%  { transform: scale(1.2) rotate(3deg); opacity: 1; }
    100% { transform: scale(1) rotate(0deg);   opacity: 1; }
  }
  .panel-in  { animation: slideIn 0.38s cubic-bezier(0.22,1,0.36,1) forwards; }
  .check-pop { animation: checkPop 0.5s cubic-bezier(0.22,1,0.36,1) forwards; }

  .type-chip {
    cursor: pointer;
    padding: 4px 10px;
    border-radius: 999px;
    font-size: 10px;
    letter-spacing: 0.08em;
    font-family: 'DM Mono', monospace;
    border: 1px solid transparent;
    transition: all 0.15s ease;
    background: rgba(255,255,255,0.04);
    color: rgba(255,255,255,0.4);
  }
  .type-chip:hover { background: rgba(255,255,255,0.08); color: rgba(255,255,255,0.7); }
  .type-chip.active { color: #0d0800; font-weight: 600; }

  .field-input {
    width: 100%;
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,160,20,0.15);
    border-radius: 8px;
    padding: 10px 14px;
    font-size: 13px;
    font-family: 'DM Mono', monospace;
    color: #f5e8c8;
    outline: none;
    transition: border-color 0.2s;
  }
  .field-input::placeholder { color: rgba(255,255,255,0.2); }
  .field-input:focus { border-color: rgba(255,160,20,0.5); background: rgba(255,160,20,0.04); }

  .add-btn {
    background: rgba(255,160,20,0.12);
    border: 1px solid rgba(255,160,20,0.3);
    color: rgba(255,160,20,0.8);
    font-family: 'DM Mono', monospace;
    font-size: 11px;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    padding: 10px 20px;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.2s ease;
  }
  .add-btn:hover {
    background: rgba(255,160,20,0.2);
    border-color: rgba(255,160,20,0.6);
    color: rgba(255,160,20,1);
  }

  .submit-btn {
    width: 100%;
    padding: 12px;
    border-radius: 8px;
    border: none;
    background: linear-gradient(135deg, rgba(255,160,20,0.9), rgba(255,100,0,0.9));
    color: #0d0800;
    font-family: 'DM Mono', monospace;
    font-weight: 600;
    font-size: 12px;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    cursor: pointer;
    transition: opacity 0.2s, transform 0.1s;
  }
  .submit-btn:hover:not(:disabled) { opacity: 0.9; transform: translateY(-1px); }
  .submit-btn:active { transform: translateY(0); }
  .submit-btn:disabled { opacity: 0.5; cursor: not-allowed; }
`

const AddPokemonModal = ({ onAdd }: Props) => {
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState<PokemonForm>(EMPTY_FORM)
  const [selectedTypes, setSelectedTypes] = useState<string[]>([])
  const [imageError, setImageError] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const panelRef = useRef<HTMLDivElement>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const toggleType = (label: string) => {
    setSelectedTypes(prev =>
      prev.includes(label)
        ? prev.filter(t => t !== label)
        : prev.length < 2 ? [...prev, label] : prev
    )
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name.trim()) return
    onAdd({ ...form, types: selectedTypes.join(", ") })
    setSubmitted(true)
    setTimeout(() => {
      setForm(EMPTY_FORM)
      setSelectedTypes([])
      setImageError(false)
      setSubmitted(false)
      setOpen(false)
    }, 1200)
  }

  const handleClose = () => {
    setForm(EMPTY_FORM)
    setSelectedTypes([])
    setImageError(false)
    setOpen(false)
  }

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") handleClose() }
    if (open) window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [open])

  return (
    <>
      <style>{STYLES}</style>

      <button className="add-btn" onClick={() => setOpen(true)}>
        + Enregistrer
      </button>

      {open && createPortal(
        <>
          <div
            onClick={handleClose}
            style={{
              position: "fixed", inset: 0, zIndex: 9998,
              background: "rgba(13,8,0,0.7)",
              backdropFilter: "blur(4px)"
            }}
          />

          <div
            ref={panelRef}
            className="panel-in"
            style={{
              position: "fixed", top: 0, right: 0,
              width: "min(420px, 100vw)",
              height: "100vh",
              zIndex: 9999,
              display: "flex",
              flexDirection: "column",
              background: "#110e07",
              borderLeft: "1px solid rgba(255,160,20,0.15)",
              boxShadow: "-20px 0 60px rgba(0,0,0,0.6)",
            }}
          >
            <div style={{ borderBottom: "1px solid rgba(255,160,20,0.1)", padding: "24px 28px 20px", flexShrink: 0 }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div>
                  <p style={{ fontSize: 9, letterSpacing: "0.3em", color: "rgba(255,160,20,0.4)", fontFamily: "'DM Mono',monospace", textTransform: "uppercase", marginBottom: 6 }}>
                    Nouveau spécimen
                  </p>
                  <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 22, color: "#f5e8c8", lineHeight: 1, margin: 0 }}>
                    Enregistrer un Pokémon
                  </h2>
                </div>
                <button
                  onClick={handleClose}
                  style={{ color: "rgba(255,255,255,0.3)", fontSize: 20, background: "none", border: "none", cursor: "pointer", padding: 4, lineHeight: 1 }}
                >
                  ✕
                </button>
              </div>
            </div>

            <div style={{ flex: 1, minHeight: 0, overflowY: "auto", padding: "24px 28px" }}>
              {submitted ? (
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", gap: 16 }}>
                  <div className="check-pop" style={{ fontSize: 48 }}>✦</div>
                  <p style={{ fontFamily: "'Playfair Display',serif", fontStyle: "italic", color: "rgba(255,160,20,0.7)", fontSize: 16, margin: 0 }}>
                    Pokémon ajouté au catalogue
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                  <div style={{
                    height: 140, borderRadius: 12,
                    border: "1px dashed rgba(255,160,20,0.2)",
                    background: "rgba(255,160,20,0.03)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    overflow: "hidden"
                  }}>
                    {form.image && !imageError ? (
                      <img
                        src={form.image}
                        alt="preview"
                        onError={() => setImageError(true)}
                        style={{ maxHeight: "100%", maxWidth: "100%", objectFit: "contain" }}
                      />
                    ) : (
                      <span style={{ fontSize: 32, opacity: 0.15 }}>◎</span>
                    )}
                  </div>

                  <div>
                    <label style={{ fontSize: 9, letterSpacing: "0.2em", color: "rgba(255,160,20,0.4)", fontFamily: "'DM Mono',monospace", textTransform: "uppercase", display: "block", marginBottom: 6 }}>Nom *</label>
                    <input name="name" value={form.name} onChange={handleChange} placeholder="ex: Dracaufeu" className="field-input" required />
                  </div>

                  <div>
                    <label style={{ fontSize: 9, letterSpacing: "0.2em", color: "rgba(255,160,20,0.4)", fontFamily: "'DM Mono',monospace", textTransform: "uppercase", display: "block", marginBottom: 6 }}>URL de l'image</label>
                    <input name="image" value={form.image} onChange={(e) => { setImageError(false); handleChange(e) }} placeholder="https://..." className="field-input" />
                  </div>

                  <div style={{ display: "flex", gap: 12 }}>
                    <div style={{ flex: 1 }}>
                      <label style={{ fontSize: 9, letterSpacing: "0.2em", color: "rgba(255,160,20,0.4)", fontFamily: "'DM Mono',monospace", textTransform: "uppercase", display: "block", marginBottom: 6 }}>Hauteur (m)</label>
                      <input name="height" type="number" value={form.height} onChange={handleChange} placeholder="1.7" className="field-input" />
                    </div>
                    <div style={{ flex: 1 }}>
                      <label style={{ fontSize: 9, letterSpacing: "0.2em", color: "rgba(255,160,20,0.4)", fontFamily: "'DM Mono',monospace", textTransform: "uppercase", display: "block", marginBottom: 6 }}>Poids (kg)</label>
                      <input name="weight" type="number" value={form.weight} onChange={handleChange} placeholder="90.5" className="field-input" />
                    </div>
                  </div>

                  <div>
                    <label style={{ fontSize: 9, letterSpacing: "0.2em", color: "rgba(255,160,20,0.4)", fontFamily: "'DM Mono',monospace", textTransform: "uppercase", display: "block", marginBottom: 10 }}>
                      Types <span style={{ opacity: 0.5 }}>(max 2)</span>
                    </label>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                      {TYPE_OPTIONS.map(({ label, color }) => {
                        const active = selectedTypes.includes(label)
                        return (
                          <button
                            key={label}
                            type="button"
                            onClick={() => toggleType(label)}
                            className={`type-chip ${active ? "active" : ""}`}
                            style={active ? { background: color, borderColor: color } : { borderColor: `${color}40` }}
                          >
                            {label}
                          </button>
                        )
                      })}
                    </div>
                  </div>

                  <button type="submit" className="submit-btn" disabled={!form.name.trim()} style={{ marginTop: 8 }}>
                    Ajouter au Pokédex
                  </button>

                </form>
              )}
            </div>

            {/* Footer */}
            <div style={{ borderTop: "1px solid rgba(255,160,20,0.1)", padding: "14px 28px", display: "flex", justifyContent: "space-between", alignItems: "center", flexShrink: 0 }}>
              <span style={{ fontSize: 9, color: "rgba(255,255,255,0.15)", fontFamily: "'DM Mono',monospace", letterSpacing: "0.15em" }}>STOCKÉ EN LOCAL</span>
              <span style={{ fontSize: 9, color: "rgba(255,160,20,0.25)", fontFamily: "'DM Mono',monospace" }}>ESC pour fermer</span>
            </div>
          </div>
        </>,
        document.body
      )}
    </>
  )
}

export default AddPokemonModal
