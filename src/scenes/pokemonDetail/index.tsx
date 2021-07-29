import { StackScreenProps } from '@react-navigation/stack'
import React, { useState } from 'react'
import { Dimensions } from 'react-native'
import { ActivityIndicator, View } from 'react-native'
import FastImage from 'react-native-fast-image'
import { SceneMap, TabBar, TabView, TabViewProps } from 'react-native-tab-view'
import PokeballIcon from 'src/assets/icons/pokeball.svg'
import { SceneContainer } from 'src/components/SceneContainer'
import { StyledContainer } from 'src/components/StyledContainer'
import { Routes } from 'src/navigation/routes'
import { MainStackParamList } from 'src/navigation/stacks/MainStack'
import { useGetPokemonByNameQuery } from 'src/store/APIs/pokemonSlice'
import { colorTranslucent, lightenDarkenColor } from 'src/styles/Palette'
import { useTheme } from 'src/styles/Theme'
import { PaletteScale } from 'src/styles/types'

import { About } from './About'
import { BaseStats } from './BaseStats'
import { POKEBALL_SIZE } from './constants'
import { useSetNavigationOptions } from './hooks/useSetNavigationOptions'
import { Moves } from './Moves'
import { styles } from './styles'

const { width } = Dimensions.get('window')

interface PokemonDetailProps
  extends StackScreenProps<MainStackParamList, Routes.PokemonDetail> {}

const ThirdRoute = () => (
  <View style={{ backgroundColor: '#673a23', flex: 1 }} />
)
const FourthRoute = () => (
  <View style={{ backgroundColor: '#43a432', flex: 1 }} />
)

const RenderTabBar: TabViewProps<any>['renderTabBar'] = props => {
  const { Theme } = useTheme()

  return (
    <TabBar
      {...props}
      indicatorStyle={{
        backgroundColor: Theme.colors.PRIMARY,
      }}
      style={{ backgroundColor: Theme.colors.ON_SURFACE }}
      labelStyle={{ ...Theme.typography.OVERLINE }}
      activeColor={Theme.colors.ON_SURFACE_HIGH_EMPHASIS}
      inactiveColor={Theme.colors.ON_SURFACE_HIGH_EMPHASIS}
    />
  )
}

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

  const [index, setIndex] = useState(0)
  const [routes] = useState([
    { key: 'first', title: 'About' },
    { key: 'second', title: 'Base Stats' },
    { key: 'third', title: 'Evolution' },
    { key: 'fourth', title: 'Moves' },
  ])

  if (!data || isLoading) {
    return <ActivityIndicator />
  }

  const renderScene = SceneMap({
    first: () => <About pokemonName={pokemonName} extraData={data} />,
    fourth: () => <Moves data={data} />,
    second: () => <BaseStats data={data} />,
    third: ThirdRoute,
  })

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
          <View style={styles.tabContainer}>
            <TabView
              style={styles.tabView}
              navigationState={{ index, routes }}
              renderScene={renderScene}
              onIndexChange={setIndex}
              initialLayout={{ width }}
              renderTabBar={RenderTabBar}
            />
          </View>
        </StyledContainer>
      </SceneContainer>
    </View>
  )
}
