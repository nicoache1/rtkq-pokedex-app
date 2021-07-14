import React, { memo } from 'react'
import { Image, Pressable, View } from 'react-native'
import { StyledText } from 'src/components/StyledText'
import { StyledView } from 'src/components/StyledView'
import { useGetPokemonByNameQuery } from 'src/store/APIs/pokemonSlice'
import { Pokedex } from 'src/types/pokedex'
import PokeballIcon from 'src/assets/icons/pokeball.svg'
import { PaletteScale, TypographyScale } from 'src/styles/types'
import { colorTranslucent, lightenDarkenColor } from 'src/styles/Palette'
import { styles } from './styles'
import { capitalize } from 'lodash'
import { CARD_HEIGHT } from '../constants'

interface ItemCardProps {
  name: Pokedex['name']
  onPress: () => void
  color: string
}

export const ItemCard: React.FC<ItemCardProps> = ({ name, onPress, color }) => (
  <Pressable
    onPress={onPress}
    style={[styles.container, { backgroundColor: color }]}>
    <PokeballIcon
      style={styles.pokeballIcon}
      fill={colorTranslucent(PaletteScale.ON_SURFACE, 0.3)}
      height={CARD_HEIGHT}
      width={CARD_HEIGHT}
    />
    <StyledView style={styles.textContainer}>
      <StyledText
        typography={TypographyScale.SUBTITLE2}
        color={PaletteScale.ON_SURFACE}>
        {capitalize(name)}
      </StyledText>
    </StyledView>
  </Pressable>
)
