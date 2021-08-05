import {
  StackHeaderProps,
  StackNavigationOptions,
  StackNavigationProp,
} from '@react-navigation/stack'
import React, { useLayoutEffect } from 'react'
import BackIcon from 'src/assets/icons/back.svg'
import PokeballIcon from 'src/assets/icons/pokeball.svg'
import { HeaderButton } from 'src/components/HeaderButton'
import { LargeTitleCollapsibleHeader } from 'src/components/LargeTitleCollapsibleHeader'
import { Routes } from 'src/navigation/routes'
import { MainStackParamList } from 'src/navigation/stacks/MainStack'
import { colorTranslucent } from 'src/styles/Palette'
import { ITheme, PaletteScale } from 'src/styles/types'
import { Pokemon } from 'src/types/pokemon'

import { HEADER_HEIGHT, HEADER_HEIGHT_COLLAPSED } from '../constants'
import { POKEBALL_SIZE } from '../constants'
import { Header } from '../Header'
import { styles } from '../styles'

export const useSetNavigationOptions = (
  navigation: StackNavigationProp<MainStackParamList, Routes.PokemonDetail>,
  Theme: ITheme,
  title: string,
  backgroundColor: string,
  data: Pokemon | undefined,
) => {
  useLayoutEffect(() => {
    const goBack = () => navigation.goBack()

    const options: StackNavigationOptions = {
      header: ({ scene }: StackHeaderProps) => (
        <LargeTitleCollapsibleHeader
          scene={scene}
          maxHeight={HEADER_HEIGHT}
          collapsedHeight={HEADER_HEIGHT_COLLAPSED}
          largeTitle={title}
          backgroundColor={backgroundColor}
          leftComponent={
            <HeaderButton onPress={goBack} buttonStyle={styles.headerButton}>
              <BackIcon height={32} width={32} fill={Theme.colors.ON_SURFACE} />
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
          largeTitleComponent={<Header data={data} />}
        />
      ),
    }

    navigation.setOptions(options)
  }, [Theme.colors.ON_SURFACE, backgroundColor, data, navigation, title])
}
