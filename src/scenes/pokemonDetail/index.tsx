import { StackScreenProps } from '@react-navigation/stack'
import React, { useState } from 'react'
import { Dimensions } from 'react-native'
import { ActivityIndicator, View } from 'react-native'
import FastImage from 'react-native-fast-image'
import {
  SceneMap,
  SceneRendererProps,
  TabBar,
  TabBarProps,
  TabView,
  TabViewProps,
} from 'react-native-tab-view'
import PokeballIcon from 'src/assets/icons/pokeball.svg'
import { SceneContainer } from 'src/components/SceneContainer'
import { StyledContainer } from 'src/components/StyledContainer'
import { Routes } from 'src/navigation/routes'
import { MainStackParamList } from 'src/navigation/stacks/MainStack'
import {
  useGetPokemonByNameQuery,
  useGetPokemonSpeciesQuery,
} from 'src/store/APIs/pokemonSlice'
import { colorTranslucent, lightenDarkenColor } from 'src/styles/Palette'
import { useTheme } from 'src/styles/Theme'
import { PaletteScale } from 'src/styles/types'

import { HEADER_HEIGHT, POKEBALL_SIZE } from './constants'
import { useSetNavigationOptions } from './hooks/useSetNavigationOptions'
import { styles } from './styles'

const { width, height } = Dimensions.get('window')

interface PokemonDetailProps
  extends StackScreenProps<MainStackParamList, Routes.PokemonDetail> {}

const FirstRoute = () => (
  <View style={{ backgroundColor: '#ff4081', flex: 1 }} />
)

const SecondRoute = () => (
  <View style={{ backgroundColor: '#673ab7', flex: 1 }} />
)

const ThirdRoute = () => (
  <View style={{ backgroundColor: '#673a23', flex: 1 }} />
)
const FourthRoute = () => (
  <View style={{ backgroundColor: '#43a432', flex: 1 }} />
)

const renderTabBar: TabViewProps<any>['renderTabBar'] = props => (
  <TabBar
    {...props}
    indicatorStyle={{
      backgroundColor: 'blue',
    }}
    style={{ backgroundColor: 'white' }}
    labelStyle={{ color: 'blue', fontSize: 12 }}
    activeColor={'black'}
    inactiveColor={'black'}
  />
)

const renderScene = SceneMap({
  first: FirstRoute,
  fourth: FourthRoute,
  second: SecondRoute,
  third: ThirdRoute,
})

const IMAGE_SIZE = 300
const TAB_VIEW_HEIGHT = height - (HEADER_HEIGHT + IMAGE_SIZE)

export const PokemonDetail: React.FC<PokemonDetailProps> = ({
  navigation,
  route,
}) => {
  const { Theme } = useTheme()

  const pokemonName = route.params.name

  const { data: speciesData, isLoading: isSpeciesLoading } =
    useGetPokemonSpeciesQuery(pokemonName)
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

  if (!data || isLoading || isSpeciesLoading || !speciesData) {
    return <ActivityIndicator />
  }

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
          <View
            style={{
              bottom: 0,
              height: TAB_VIEW_HEIGHT,
              left: 0,
              position: 'absolute',
              right: 0,
              top: IMAGE_SIZE - 50,
            }}>
            <TabView
              style={{
                backgroundColor: 'white',
                borderTopLeftRadius: 32,
                borderTopRightRadius: 32,
                paddingTop: 30,
              }}
              navigationState={{ index, routes }}
              renderScene={renderScene}
              onIndexChange={setIndex}
              initialLayout={{ width }}
              renderTabBar={renderTabBar}
            />
          </View>
        </StyledContainer>
      </SceneContainer>
    </View>
  )
}
