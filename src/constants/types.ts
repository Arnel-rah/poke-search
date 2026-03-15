export const POKEMON_TYPES = [
  "Feu",
  "Eau",
  "Plante",
  "Electrik",
  "Glace",
  "Combat",
  "Poison",
  "Sol",
  "Vol",
  "Psy",
  "Insecte",
  "Roche",
  "Spectre",
  "Dragon",
  "Ténèbres",
  "Acier",
  "Fée"
] as const;

export type PokemonType = typeof POKEMON_TYPES[number];
