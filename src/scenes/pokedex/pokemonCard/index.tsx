import { capitalize } from 'lodash'
import React, { memo } from 'react'
import { Pressable, View } from 'react-native'
import FastImage from 'react-native-fast-image'
import PokeballIcon from 'src/assets/icons/pokeball.svg'
import { StyledText } from 'src/components/StyledText'
import { StyledView } from 'src/components/StyledView'
import { TypeBadge } from 'src/components/TypeBadge'
import { useGetPokemonByNameQuery } from 'src/store/APIs/pokemonSlice'
import { colorTranslucent, lightenDarkenColor } from 'src/styles/Palette'
import { PaletteScale, TypographyScale } from 'src/styles/types'
import { Pokedex } from 'src/types/pokedex'

import { styles } from './styles'

interface PokemonCardProps {
  name: Pokedex['name']
  onPress: () => void
  index: number
}

const getUri = (pokedexNumber: number) => {
  if (pokedexNumber < 10) {
    return `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/00${pokedexNumber}.png`
  }
  if (pokedexNumber < 100) {
    return `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/0${pokedexNumber}.png`
  }
  return `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${pokedexNumber}.png`
}

export const PokemonCard: React.FC<PokemonCardProps> = memo(
  ({ name, onPress, index: pokemonEntry }) => {
    const { data, isLoading } = useGetPokemonByNameQuery(name)

    if (isLoading || !data) {
      return <View style={styles.container} />
    }

    const renderBadges: JSX.Element[] = data.types.map((typeItem, index) => (
      <TypeBadge key={`${name}-${index}`} {...typeItem.type} />
    ))

    return (
      <Pressable
        onPress={onPress}
        style={[
          styles.container,
          { backgroundColor: lightenDarkenColor(data.types[0].type.color, 20) },
        ]}>
        <PokeballIcon
          style={styles.pokeballIcon}
          fill={colorTranslucent(PaletteScale.ON_SURFACE, 0.3)}
          height={150}
          width={150}
        />
        <StyledView style={styles.textContainer}>
          <StyledText
            typography={TypographyScale.SUBTITLE2}
            color={PaletteScale.ON_SURFACE}>
            {capitalize(name)}
          </StyledText>
        </StyledView>
        <StyledView style={styles.badgesContainer}>{renderBadges}</StyledView>
        <StyledView style={styles.imageContainer}>
          <FastImage
            source={{ uri: getUri(pokemonEntry) }}
            style={styles.image}
            resizeMode={'contain'}
          />
        </StyledView>
      </Pressable>
    )
  },
)
