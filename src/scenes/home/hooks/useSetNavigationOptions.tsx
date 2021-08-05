import {
  StackHeaderProps,
  StackNavigationOptions,
  StackNavigationProp,
} from '@react-navigation/stack'
import React, { useLayoutEffect } from 'react'
import PokeballIcon from 'src/assets/icons/pokeball.svg'
import { LargeTitleCollapsibleHeader } from 'src/components/LargeTitleCollapsibleHeader'
import { Routes } from 'src/navigation/routes'
import { MainStackParamList } from 'src/navigation/stacks/MainStack'
import { colorTranslucent } from 'src/styles/Palette'
import { PaletteScale } from 'src/styles/types'

import { HEADER_HEIGHT } from '../constants'
import { POKEBALL_SIZE } from '../constants'
import { styles } from '../styles'

export const useSetNavigationOptions = (
  navigation: StackNavigationProp<MainStackParamList, Routes.Home>,
) => {
  useLayoutEffect(() => {
    const options: StackNavigationOptions = {
      header: ({ scene }: StackHeaderProps) => (
        <LargeTitleCollapsibleHeader
          scene={scene}
          maxHeight={HEADER_HEIGHT}
          largeTitle={'What pokemon are you looking for?'}
          rightComponent={
            <PokeballIcon
              style={styles.pokeball}
              height={POKEBALL_SIZE}
              width={POKEBALL_SIZE}
              fill={colorTranslucent(PaletteScale.ON_SURFACE_LOW_EMPHASIS, 0.1)}
            />
          }
        />
      ),
    }

    navigation.setOptions(options)
  }, [navigation])
}
