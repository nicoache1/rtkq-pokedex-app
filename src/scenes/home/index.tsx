import {
  StackNavigationOptions,
  StackScreenProps,
} from '@react-navigation/stack'
import React from 'react'
import { useLayoutEffect } from 'react'
import { Dimensions, FlatListProps } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import { SceneContainer } from 'src/components/SceneContainer'
import { Routes } from 'src/navigation/routes'
import { MainStackParamList } from 'src/navigation/stacks/MainStack'
import { useGetAllPokemonQuery } from 'src/store/APIs/pokemonSlice'
import { Pokemon } from 'src/types/pokemon'
import { PokemonCard } from './pokemonCard'
import { styles } from './styles'
import PokeballIcon from 'src/assets/icons/pokeball.svg'
import { colorTranslucent } from 'src/styles/Palette'
import { PaletteScale } from 'src/styles/types'
import { useState } from 'react'
import { Pokedex } from 'src/types/pokedex'
import { useEffect } from 'react'
import { concat } from 'lodash'

interface HomeProps extends StackScreenProps<MainStackParamList, Routes.Home> {}

const HEADER_HEIGHT = 150
const POKEBALL_SIZE = HEADER_HEIGHT + 100

const { height } = Dimensions.get('window')

export const Home: React.FC<HomeProps> = ({ navigation }) => {
  useLayoutEffect(() => {
    const options: StackNavigationOptions = {
      headerTitle: 'Pokedex',
      headerTitleAlign: 'left',
      headerTitleStyle: {
        fontSize: 30,
      },
      headerStyle: {
        elevation: 0,
        shadowOffset: { height: 0, width: 0 },
        height: 150,
      },
      headerTransparent: true,
    }

    navigation.setOptions(options)
  }, [])

  const [offset, setOffset] = useState<number>(0)

  const loadMoreData = () => {
    setOffset(prevState => prevState + 20)
  }

  const { data, isLoading } = useGetAllPokemonQuery(offset)

  const [currentData, setCurrentData] = useState<Pokedex[]>([])

  useEffect(() => {
    if (data) {
      setCurrentData(prevData => concat(prevData, data))
    }
  }, [data])

  const renderItem: FlatListProps<Pokemon>['renderItem'] = ({ item }) => (
    <PokemonCard name={item.name} />
  )

  const keyExtractor: FlatListProps<Pokemon>['keyExtractor'] = (item, index) =>
    `${item.id} ${index}`

  const getItemLayout: FlatListProps<Pokemon>['getItemLayout'] = (
    _,
    index,
  ) => ({ length: 130, offset: 130 * index, index })

  return (
    <SceneContainer style={styles.container} edges={['bottom']}>
      <PokeballIcon
        style={{
          position: 'absolute',
          top: -HEADER_HEIGHT / 6,
          right: -HEADER_HEIGHT / 3,
        }}
        height={POKEBALL_SIZE}
        width={POKEBALL_SIZE}
        fill={colorTranslucent(PaletteScale.ON_SURFACE_LOW_EMPHASIS, 0.1)}
      />
      <FlatList
        numColumns={2}
        keyExtractor={keyExtractor}
        data={currentData}
        renderItem={renderItem}
        onEndReached={loadMoreData}
        getItemLayout={getItemLayout}
        initialNumToRender={40}
        onEndReachedThreshold={0.7}
        maxToRenderPerBatch={16}
        windowSize={height - 150}
        refreshing={isLoading}
      />
    </SceneContainer>
  )
}
