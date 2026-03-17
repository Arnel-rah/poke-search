export const POKEMON_TYPES = [
  "fire","water","grass","electric","psychic",
  "ice","dragon","dark","fairy","normal",
  "fighting","flying","poison","ground","rock",
  "bug","ghost","steel"
] as const

export type PokemonType = typeof POKEMON_TYPES[number]


