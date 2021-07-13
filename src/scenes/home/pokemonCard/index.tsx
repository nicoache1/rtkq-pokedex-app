import React, { memo } from 'react'
import { Image, View } from 'react-native'
import { StyledContainer } from 'src/components/StyledContainer'
import { StyledText } from 'src/components/StyledText'
import { StyledView } from 'src/components/StyledView'
import { useGetPokemonByNameQuery } from 'src/store/APIs/pokemonSlice'
import { Pokedex } from 'src/types/pokedex'
import PokeballIcon from 'src/assets/icons/pokeball.svg'
import { PaletteScale, TypographyScale } from 'src/styles/types'
import { colorTranslucent, lightenDarkenColor } from 'src/styles/Palette'
import { styles } from './styles'
import { TypeBadge } from 'src/components/TypeBadge'
import { capitalize } from 'lodash'

interface PokemonCardProps {
  name: Pokedex['name']
}

export const PokemonCard: React.FC<PokemonCardProps> = memo(({ name }) => {
  const { data, isLoading } = useGetPokemonByNameQuery(name)

  if (isLoading || !data) {
    return <View style={styles.container} />
  }

  const renderBadges: JSX.Element[] = data.types.map((typeItem, index) => (
    <TypeBadge key={`${name}-${index}`} {...typeItem.type} />
  ))

  return (
    <StyledContainer
      style={[
        styles.container,
        { backgroundColor: lightenDarkenColor(data.types[0].type.color, 30) },
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
      <StyledView style={{ paddingVertical: 6 }}>{renderBadges}</StyledView>
      <StyledView style={styles.imageContainer}>
        <Image
          source={{ uri: data.sprite }}
          style={styles.image}
          resizeMode={'contain'}
        />
      </StyledView>
    </StyledContainer>
  )
})
