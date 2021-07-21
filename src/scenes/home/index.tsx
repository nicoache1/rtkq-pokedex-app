import { StackScreenProps } from '@react-navigation/stack'
import React from 'react'
import { SceneContainer } from 'src/components/SceneContainer'
import { Routes } from 'src/navigation/routes'
import { MainStackParamList } from 'src/navigation/stacks/MainStack'
import { styles } from './styles'
import PokeballIcon from 'src/assets/icons/pokeball.svg'
import { colorTranslucent } from 'src/styles/Palette'
import { PaletteScale } from 'src/styles/types'
import { POKEBALL_SIZE } from './constants'
import { MenuList } from './MenuList'
import { useSetNavigationOptions } from './hooks/useSetNavigationOptions'
import { NewsList } from './NewsList'
import { useTheme } from 'src/styles/Theme'

interface HomeProps extends StackScreenProps<MainStackParamList, Routes.Home> {}

export const Home: React.FC<HomeProps> = ({ navigation }) => {
  useSetNavigationOptions(navigation)
  const { Theme } = useTheme()

  const backgroundColor = Theme.colors.BACKGROUND_LOW_EMPHASIS

  return (
    <SceneContainer
      style={[styles.container, { backgroundColor }]}
      edges={['bottom']}>
      <PokeballIcon
        style={styles.pokeball}
        height={POKEBALL_SIZE}
        width={POKEBALL_SIZE}
        fill={colorTranslucent(PaletteScale.ON_SURFACE_LOW_EMPHASIS, 0.1)}
      />
      <MenuList navigation={navigation} />
      <NewsList />
    </SceneContainer>
  )
}
