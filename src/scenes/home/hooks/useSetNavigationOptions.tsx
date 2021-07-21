import {
  StackNavigationOptions,
  StackNavigationProp,
} from '@react-navigation/stack'
import React, { useLayoutEffect } from 'react'
import { StyledContainer } from 'src/components/StyledContainer'
import { StyledText } from 'src/components/StyledText'
import { Routes } from 'src/navigation/routes'
import { MainStackParamList } from 'src/navigation/stacks/MainStack'
import { HEADER_HEIGHT } from 'src/scenes/pokedex/constants'
import { colorTranslucent } from 'src/styles/Palette'
import { PaletteScale, TypographyScale } from 'src/styles/types'
import { POKEBALL_SIZE } from '../constants'
import { styles } from '../styles'
import PokeballIcon from 'src/assets/icons/pokeball.svg'

export const useSetNavigationOptions = (
  navigation: StackNavigationProp<MainStackParamList, Routes.Home>,
) => {
  useLayoutEffect(() => {
    const options: StackNavigationOptions = {
      headerTitle: () => (
        <StyledContainer color={PaletteScale.ON_SURFACE}>
          <StyledText typography={TypographyScale.H2_HEADLINE}>
            What pokemon are you looking for?
          </StyledText>
        </StyledContainer>
      ),
      headerRight: () => (
        <PokeballIcon
          style={styles.pokeball}
          height={POKEBALL_SIZE}
          width={POKEBALL_SIZE}
          fill={colorTranslucent(PaletteScale.ON_SURFACE_LOW_EMPHASIS, 0.1)}
        />
      ),
      headerTitleAlign: 'left',
      headerTitleStyle: {
        fontSize: 30,
      },
      headerStyle: {
        elevation: 0,
        shadowOffset: { height: 0, width: 0 },
        height: HEADER_HEIGHT,
        backgroundColor: 'white',
      },
    }

    navigation.setOptions(options)
  }, [])
}
