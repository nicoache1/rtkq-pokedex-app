import { StackNavigationProp } from '@react-navigation/stack'
import React from 'react'
import { StyleSheet, FlatList, FlatListProps } from 'react-native'
import { StyledContainer } from 'src/components/StyledContainer'
import { Routes } from 'src/navigation/routes'
import { MainStackParamList } from 'src/navigation/stacks/MainStack'
import { PaletteScale } from 'src/styles/types'
import { CARD_HEIGHT, Sections } from '../constants'
import { Items } from '../types'
import { ItemCard } from './ItemCard'

interface MenuListProps {
  navigation: StackNavigationProp<MainStackParamList, Routes.Home>
}

const styles = StyleSheet.create({
  container: {
    borderBottomEndRadius: 32,
    borderBottomLeftRadius: 32,
  },
})

export const MenuList: React.FC<MenuListProps> = ({ navigation }) => {
  const onPressCard = (route: Routes) => () => navigation.navigate(route)

  const renderItem: FlatListProps<Items>['renderItem'] = ({ item, index }) => (
    <ItemCard
      name={item.name}
      onPress={onPressCard(item.routes)}
      color={item.color}
    />
  )

  const keyExtractor: FlatListProps<Items>['keyExtractor'] = (item, index) =>
    `${item.id} ${index}`

  const getItemLayout: FlatListProps<Items>['getItemLayout'] = (_, index) => ({
    length: CARD_HEIGHT,
    offset: CARD_HEIGHT * index,
    index,
  })

  return (
    <StyledContainer color={PaletteScale.ON_SURFACE} style={styles.container}>
      <FlatList
        bounces={false}
        numColumns={2}
        keyExtractor={keyExtractor}
        data={Sections}
        renderItem={renderItem}
        getItemLayout={getItemLayout}
      />
    </StyledContainer>
  )
}
