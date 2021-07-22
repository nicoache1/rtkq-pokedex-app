import { StackScreenProps } from '@react-navigation/stack'
import React from 'react'
import { ActivityIndicator, View } from 'react-native'
import FastImage from 'react-native-fast-image'
import PokeballIcon from 'src/assets/icons/pokeball.svg'
import { SceneContainer } from 'src/components/SceneContainer'
import { StyledContainer } from 'src/components/StyledContainer'
import { Routes } from 'src/navigation/routes'
import { MainStackParamList } from 'src/navigation/stacks/MainStack'
import { useGetPokemonByNameQuery } from 'src/store/APIs/pokemonSlice'
import { colorTranslucent, lightenDarkenColor } from 'src/styles/Palette'
import { useTheme } from 'src/styles/Theme'
import { PaletteScale } from 'src/styles/types'

import { POKEBALL_SIZE } from './constants'
import { useSetNavigationOptions } from './hooks/useSetNavigationOptions'
import { styles } from './styles'

interface PokemonDetailProps
  extends StackScreenProps<MainStackParamList, Routes.PokemonDetail> {}

export const PokemonDetail: React.FC<PokemonDetailProps> = ({
  navigation,
  route,
}) => {
  const { Theme } = useTheme()

  const pokemonName = route.params.name
  const { data, isLoading } = useGetPokemonByNameQuery(pokemonName)
  const backgroundColor = lightenDarkenColor(
    data?.types[0].type.color ?? Theme.colors.ON_SURFACE,
    20,
  )

  useSetNavigationOptions(navigation, Theme, pokemonName, backgroundColor, data)

  if (!data || isLoading) {
    return <ActivityIndicator />
  }

  console.log('data', JSON.stringify(data))

  return (
    <View
      style={[
        {
          backgroundColor: lightenDarkenColor(data.types[0].type.color, 20),
        },
        styles.container,
      ]}>
      <SceneContainer style={styles.flexible} edges={['bottom']}>
        <StyledContainer color={PaletteScale.TRANSPARENT}>
          <PokeballIcon
            style={styles.pokeballStyle}
            height={POKEBALL_SIZE}
            width={POKEBALL_SIZE}
            fill={colorTranslucent(PaletteScale.ON_SURFACE, 0.4)}
          />
          <FastImage
            source={{ uri: data.sprite }}
            style={styles.image}
            resizeMode={'contain'}
          />
        </StyledContainer>
      </SceneContainer>
    </View>
  )
}
