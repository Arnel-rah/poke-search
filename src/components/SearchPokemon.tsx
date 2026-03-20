import type { ChangeEvent } from "react"

type Props = {
  value: string
  onChange: (value: string) => void
}

const SearchPokemon = ({ value, onChange }: Props) => (
  <div className="fade-up fade-up-3" style={{ maxWidth: 480 }}>
    <div style={{ position: "relative" }}>
      <span style={{
        position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)",
        fontFamily: "'DM Mono', monospace",
        fontSize: 12,
        color: "rgba(255,160,20,0.3)",
        pointerEvents: "none",
        userSelect: "none"
      }}>
        ⌕
      </span>
      <input
        type="text"
        value={value}
        onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
        placeholder="Rechercher un spécimen..."
        style={{
          width: "100%",
          background: "rgba(255,160,20,0.03)",
          border: "1px solid rgba(255,160,20,0.12)",
          borderRadius: 10,
          padding: "11px 16px 11px 36px",
          fontFamily: "'DM Mono', monospace",
          fontSize: 12,
          letterSpacing: "0.05em",
          color: "#c9b99a",
          outline: "none",
          transition: "border-color 0.2s ease, background 0.2s ease",
        }}
        onFocus={e => {
          e.target.style.borderColor = "rgba(255,160,20,0.35)"
          e.target.style.background = "rgba(255,160,20,0.05)"
        }}
        onBlur={e => {
          e.target.style.borderColor = "rgba(255,160,20,0.12)"
          e.target.style.background = "rgba(255,160,20,0.03)"
        }}
      />
      {value && (
        <button
          onClick={() => onChange("")}
          style={{
            position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)",
            background: "none", border: "none", cursor: "pointer",
            color: "rgba(255,160,20,0.3)",
            fontSize: 14, lineHeight: 1, padding: 2,
            transition: "color 0.2s"
          }}
          onMouseEnter={e => (e.currentTarget.style.color = "rgba(255,160,20,0.7)")}
          onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,160,20,0.3)")}
        >
          ✕
        </button>
      )}
    </div>
  </div>
)

export default SearchPokemon
