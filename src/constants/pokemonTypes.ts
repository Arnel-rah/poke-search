export const POKEMON_TYPES = [
  "fire",
  "water",
  "grass",
  "electric",
  "psychic",
  "ice",
  "dragon",
  "dark",
  "fairy",
  "normal",
  "fighting",
  "flying",
  "poison",
  "ground",
  "rock",
  "bug",
  "ghost",
  "steel",
] as const;

export type PokemonType = (typeof POKEMON_TYPES)[number];

type ThemeConfig = { bg: string; badge: string; glow: string; text: string };

const TYPE_COLORS: Record<PokemonType | string, ThemeConfig> = {
  fire: {
    bg: "from-orange-950 to-red-900",
    badge: "bg-orange-500/20 text-orange-300 border-orange-500/40",
    glow: "rgba(251,146,60,0.35)",
    text: "text-orange-400",
  },
  water: {
    bg: "from-blue-950 to-cyan-900",
    badge: "bg-blue-500/20 text-blue-300 border-blue-500/40",
    glow: "rgba(96,165,250,0.35)",
    text: "text-blue-400",
  },
  grass: {
    bg: "from-green-950 to-emerald-900",
    badge: "bg-green-500/20 text-green-300 border-green-500/40",
    glow: "rgba(74,222,128,0.35)",
    text: "text-green-400",
  },
  electric: {
    bg: "from-yellow-950 to-amber-900",
    badge: "bg-yellow-500/20 text-yellow-300 border-yellow-500/40",
    glow: "rgba(250,204,21,0.35)",
    text: "text-yellow-400",
  },
  psychic: {
    bg: "from-pink-950 to-fuchsia-900",
    badge: "bg-pink-500/20 text-pink-300 border-pink-500/40",
    glow: "rgba(244,114,182,0.35)",
    text: "text-pink-400",
  },
  ice: {
    bg: "from-cyan-950 to-sky-900",
    badge: "bg-cyan-500/20 text-cyan-300 border-cyan-500/40",
    glow: "rgba(103,232,249,0.35)",
    text: "text-cyan-400",
  },
  dragon: {
    bg: "from-indigo-950 to-violet-900",
    badge: "bg-indigo-500/20 text-indigo-300 border-indigo-500/40",
    glow: "rgba(129,140,248,0.35)",
    text: "text-indigo-400",
  },
  dark: {
    bg: "from-zinc-950 to-neutral-900",
    badge: "bg-zinc-500/20 text-zinc-300 border-zinc-500/40",
    glow: "rgba(161,161,170,0.25)",
    text: "text-zinc-400",
  },
  fighting: {
    bg: "from-red-950 to-rose-900",
    badge: "bg-red-500/20 text-red-300 border-red-500/40",
    glow: "rgba(248,113,113,0.35)",
    text: "text-red-400",
  },
  poison: {
    bg: "from-purple-950 to-violet-900",
    badge: "bg-purple-500/20 text-purple-300 border-purple-500/40",
    glow: "rgba(192,132,252,0.35)",
    text: "text-purple-400",
  },
  ground: {
    bg: "from-amber-950 to-yellow-900",
    badge: "bg-amber-500/20 text-amber-300 border-amber-500/40",
    glow: "rgba(251,191,36,0.35)",
    text: "text-amber-400",
  },
  rock: {
    bg: "from-stone-950 to-zinc-900",
    badge: "bg-stone-500/20 text-stone-300 border-stone-500/40",
    glow: "rgba(168,162,158,0.35)",
    text: "text-stone-400",
  },
  bug: {
    bg: "from-lime-950 to-green-900",
    badge: "bg-lime-500/20 text-lime-300 border-lime-500/40",
    glow: "rgba(163,230,53,0.35)",
    text: "text-lime-400",
  },
  ghost: {
    bg: "from-purple-950 to-indigo-950",
    badge: "bg-purple-500/20 text-purple-300 border-purple-500/40",
    glow: "rgba(167,139,250,0.35)",
    text: "text-purple-400",
  },
  steel: {
    bg: "from-slate-950 to-gray-900",
    badge: "bg-slate-500/20 text-slate-300 border-slate-500/40",
    glow: "rgba(148,163,184,0.35)",
    text: "text-slate-400",
  },
  fairy: {
    bg: "from-pink-950 to-rose-900",
    badge: "bg-pink-400/20 text-pink-300 border-pink-400/40",
    glow: "rgba(251,182,206,0.35)",
    text: "text-pink-300",
  },
  flying: {
    bg: "from-sky-950 to-blue-900",
    badge: "bg-sky-500/20 text-sky-300 border-sky-500/40",
    glow: "rgba(125,211,252,0.35)",
    text: "text-sky-400",
  },
  normal: {
    bg: "from-neutral-900 to-zinc-800",
    badge: "bg-neutral-500/20 text-neutral-300 border-neutral-500/40",
    glow: "rgba(163,163,163,0.25)",
    text: "text-neutral-400",
  },
};

export const getTheme = (types: string[]): ThemeConfig =>
  TYPE_COLORS[types[0]?.toLowerCase()] ?? TYPE_COLORS.normal;
