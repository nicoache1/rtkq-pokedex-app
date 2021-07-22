import { concat } from 'lodash'
import { useEffect, useState } from 'react'
import { useGetAllPokemonQuery } from 'src/store/APIs/pokemonSlice'
import { Pokedex } from 'src/types/pokedex'

export const usePokedexData = () => {
  const [offset, setOffset] = useState<number>(0)

  const loadMoreData = () => {
    setOffset(prevState => prevState + 20)
  }

  const { data, isLoading } = useGetAllPokemonQuery(offset)

  const [currentData, setCurrentData] = useState<Pokedex[]>([])

  useEffect(() => {
    if (data) {
      setCurrentData(prevData => concat(prevData, data))
    }
  }, [data])

  return {
    currentData,
    isLoading,
    loadMoreData,
  }
}
