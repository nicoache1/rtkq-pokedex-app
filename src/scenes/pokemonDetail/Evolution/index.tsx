import { capitalize } from 'lodash'
import React from 'react'
import { useEffect } from 'react'
import { StyleSheet, View } from 'react-native'
import FastImage from 'react-native-fast-image'
import { ScrollView } from 'react-native-gesture-handler'
import { ActivityIndicator } from 'react-native-paper'
import PokeballIcon from 'src/assets/icons/pokeball.svg'
import { getPokemonImage } from 'src/common/pokemon'
import { StyledContainer } from 'src/components/StyledContainer'
import { StyledText } from 'src/components/StyledText'
import {
  useGetPokemonSpeciesQuery,
  useLazyGetPokemonEvolutionQuery,
} from 'src/store/APIs/pokemonSlice'
import { colorTranslucent } from 'src/styles/Palette'
import { PaletteScale, TypographyScale } from 'src/styles/types'
import { PokemonURLResource } from 'src/types'
import { Evolution as EvolutionType } from 'src/types/evolution'

interface EvolutionProps {
  pokemonName: string
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

const PokemonImage: React.FC<{ species: PokemonURLResource }> = ({
  species,
}) => {
  const splittedUrl = species.url
    .split('/')
    .filter(item => item.trim().length !== 0)
  const entry = splittedUrl[splittedUrl.length - 1]
  return (
    <FastImage
      source={{ uri: getPokemonImage(parseInt(entry, 10)) }}
      style={{
        height: 200,
      }}
      resizeMode={'contain'}
    />
  )
}

const evolutionChain = (evolution: EvolutionType) => {
  var evoChain = []
  var evoData = evolution.chain

  do {
    var evoDetails = evoData.evolution_details[0]
    let numberOfEvolutions = evoData.evolves_to.length

    evoChain.push({
      item: !evoDetails ? null : evoDetails.item,
      min_level: !evoDetails ? '' : `at ${evoDetails.min_level}`,
      species: evoData.species,
      trigger_name: !evoDetails ? '' : `Get it with ${evoDetails.trigger.name}`,
    })

    if (numberOfEvolutions > 1) {
      for (let i = 1; i < numberOfEvolutions; i++) {
        var data = evoData.evolves_to[i]
        var evoDetails = data.evolution_details[0]
        evoChain.push({
          min_level: !data ? '' : `at ${evoDetails.min_level}`,
          species: data.species,
          trigger_name: !data ? '' : `Get it with ${evoDetails.trigger.name}`,
        })
      }
    }

    evoData = evoData.evolves_to[0]
  } while (!!evoData && evoData.hasOwnProperty('evolves_to'))

  return evoChain
}

export const Evolution: React.FC<EvolutionProps> = ({ pokemonName }) => {
  const { data, isLoading } = useGetPokemonSpeciesQuery(pokemonName)

  const [trigger, result] = useLazyGetPokemonEvolutionQuery()

  useEffect(() => {
    if (data) {
      const splittedUrl = data.evolutionChain.url.split('/')
      const id = splittedUrl[splittedUrl.length - 2]
      trigger(id)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  const evolutionChainData = result.data

  if (!evolutionChainData || isLoading) {
    return <ActivityIndicator />
  }

  const pokemonEvolutionChain = evolutionChain(evolutionChainData)

  return (
    <ScrollView style={styles.container}>
      <StyledContainer style={{ flexDirection: 'row' }}>
        <StyledText typography={TypographyScale.SUBTITLE2}>
          Evolution Chain
        </StyledText>
      </StyledContainer>
      {pokemonEvolutionChain.map(chainItem => (
        <StyledContainer style={{ flexDirection: 'row' }}>
          <View style={{ flex: 2 }}>
            <PokeballIcon
              style={{
                bottom: 30,
                left: 40,
                position: 'absolute',
              }}
              fill={colorTranslucent(
                PaletteScale.ON_SURFACE_HIGH_EMPHASIS,
                0.05,
              )}
              height={150}
              width={150}
            />
            <PokemonImage species={chainItem.species} />
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              <StyledText typography={TypographyScale.SUBTITLE2}>
                {capitalize(chainItem.species.name)}
              </StyledText>
            </View>
          </View>
          <View
            style={{ alignItems: 'center', flex: 1, justifyContent: 'center' }}>
            <StyledText
              numberOfLines={2}
              style={{
                textAlign: 'center',
              }}>{`${chainItem.trigger_name.replace('-', ' ')} ${
              chainItem.min_level
            }`}</StyledText>
          </View>
        </StyledContainer>
      ))}
    </ScrollView>
  )
}
