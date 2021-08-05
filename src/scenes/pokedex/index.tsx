import { StackScreenProps } from '@react-navigation/stack'
import React from 'react'
import { Dimensions, FlatListProps } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated'
import { SceneContainer } from 'src/components/SceneContainer'
import { Routes } from 'src/navigation/routes'
import { MainStackParamList } from 'src/navigation/stacks/MainStack'
import { useTheme } from 'src/styles/Theme'
import { Pokemon } from 'src/types/pokemon'

import { CARD_SIZE, HEADER_HEIGHT } from './constants'
import { usePokedexData } from './hooks/usePokedexData'
import { useSetNavigationOptions } from './hooks/useSetNavigationOptions'
import { PokemonCard } from './pokemonCard'
import { styles } from './styles'

interface PokedexProps
  extends StackScreenProps<MainStackParamList, Routes.Pokedex> {}

const { height } = Dimensions.get('window')

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList)

const keyExtractor: FlatListProps<Pokemon>['keyExtractor'] = (item, index) =>
  `${item.id} ${index}`

const getItemLayout: FlatListProps<Pokemon>['getItemLayout'] = (_, index) => ({
  index,
  length: CARD_SIZE,
  offset: CARD_SIZE * index,
})

export const Pokedex: React.FC<PokedexProps> = ({ navigation }) => {
  const { Theme } = useTheme()

  const offsetY = useSharedValue(0)
  const onScroll = useAnimatedScrollHandler({
    onScroll: event => {
      offsetY.value = event.contentOffset.y
    },
  })

  useSetNavigationOptions(navigation, offsetY, Theme)

  const { loadMoreData, currentData, isLoading } = usePokedexData()

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

  return (
    <SceneContainer
      style={[styles.container, { backgroundColor: Theme.colors.ON_SURFACE }]}
      edges={['bottom']}>
      <AnimatedFlatList
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
        onScroll={onScroll}
      />
    </SceneContainer>
  )
}
