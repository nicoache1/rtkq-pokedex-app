export interface Pokedex {
  name: string
  url: URL
}

export const deserializePokedex = (data: any): Pokedex[] =>
  data.map((entry: any) => ({
    name: entry.name,
    url: entry.url,
  }))
