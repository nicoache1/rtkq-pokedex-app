import {
  StackHeaderProps,
  StackNavigationOptions,
  StackNavigationProp,
} from '@react-navigation/stack'
import React, { useLayoutEffect } from 'react'
import Animated from 'react-native-reanimated'
import BackIcon from 'src/assets/icons/back.svg'
import PokeballIcon from 'src/assets/icons/pokeball.svg'
import { HeaderButton } from 'src/components/HeaderButton'
import { LargeTitleCollapsibleHeader } from 'src/components/LargeTitleCollapsibleHeader'
import { Routes } from 'src/navigation/routes'
import { MainStackParamList } from 'src/navigation/stacks/MainStack'
import { colorTranslucent } from 'src/styles/Palette'
import { ITheme, PaletteScale } from 'src/styles/types'

import { HEADER_HEIGHT, HEADER_HEIGHT_COLLAPSED } from '../constants'
import { POKEBALL_SIZE } from '../constants'
import { styles } from '../styles'

export const useSetNavigationOptions = (
  navigation: StackNavigationProp<MainStackParamList, Routes.Pokedex>,
  offsetY: Animated.SharedValue<number>,
  Theme: ITheme,
) => {
  useLayoutEffect(() => {
    const goBack = () => navigation.goBack()
    const options: StackNavigationOptions = {
      header: ({ scene }: StackHeaderProps) => (
        <LargeTitleCollapsibleHeader
          scene={scene}
          collapsedHeight={HEADER_HEIGHT_COLLAPSED}
          animationProgress={offsetY}
          maxHeight={HEADER_HEIGHT}
          largeTitle={'Pokedex'}
          leftComponent={
            <HeaderButton onPress={goBack} buttonStyle={styles.headerButton}>
              <BackIcon
                height={32}
                width={32}
                fill={Theme.colors.ON_SURFACE_HIGH_EMPHASIS}
              />
            </HeaderButton>
          }
          rightComponent={
            <PokeballIcon
              style={styles.pokeballStyle}
              height={POKEBALL_SIZE}
              width={POKEBALL_SIZE}
              fill={colorTranslucent(PaletteScale.ON_SURFACE_LOW_EMPHASIS, 0.1)}
            />
          }
        />
      ),
    }

    navigation.setOptions(options)
  }, [Theme.colors.ON_SURFACE_HIGH_EMPHASIS, navigation, offsetY])
}
