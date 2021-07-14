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
import { Pokedex as PokedexType } from 'src/types/pokedex'
import { useEffect } from 'react'
import { concat } from 'lodash'
import { HeaderLargeTitle } from 'src/common/HeaderLargeTitle'
import { HEADER_HEIGHT, POKEBALL_SIZE } from './constants'

interface PokedexProps
  extends StackScreenProps<MainStackParamList, Routes.Pokedex> {}

const { height } = Dimensions.get('window')

export const Pokedex: React.FC<PokedexProps> = ({ navigation }) => {
  useLayoutEffect(() => {
    const options: StackNavigationOptions = {
      headerTitle: '',
      headerLeft: () => <HeaderLargeTitle title={'Pokedex'} />,
      headerTitleStyle: {
        fontSize: 30,
      },
      headerStyle: {
        elevation: 0,
        shadowOffset: { height: 0, width: 0 },
        height: HEADER_HEIGHT,
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

  const [currentData, setCurrentData] = useState<PokedexType[]>([])

  useEffect(() => {
    if (data) {
      setCurrentData(prevData => concat(prevData, data))
    }
  }, [data])

  const onPressCard = (name: string) => () =>
    navigation.navigate(Routes.PokemonDetail, { name })

  const renderItem: FlatListProps<Pokemon>['renderItem'] = ({
    item,
    index,
  }) => (
    <PokemonCard
      name={item.name}
      onPress={onPressCard(item.name)}
      index={index + 1}
    />
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
        initialNumToRender={20}
        onEndReachedThreshold={0.8}
        maxToRenderPerBatch={16}
        windowSize={height - HEADER_HEIGHT}
        refreshing={isLoading}
      />
    </SceneContainer>
  )
}