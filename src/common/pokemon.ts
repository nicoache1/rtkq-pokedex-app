export const getPokemonImage = (pokedexNumber: number) => {
  if (pokedexNumber < 10) {
    return `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/00${pokedexNumber}.png`
  }
  if (pokedexNumber < 100) {
    return `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/0${pokedexNumber}.png`
  }
  return `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${pokedexNumber}.png`
}
