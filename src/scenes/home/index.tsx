import {
  StackNavigationOptions,
  StackScreenProps,
} from '@react-navigation/stack'
import React from 'react'
import { useLayoutEffect } from 'react'
import { FlatListProps } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import { SceneContainer } from 'src/components/SceneContainer'
import { Routes } from 'src/navigation/routes'
import { MainStackParamList } from 'src/navigation/stacks/MainStack'
import { ItemCard } from './ItemCard'
import { styles } from './styles'
import PokeballIcon from 'src/assets/icons/pokeball.svg'
import { colorTranslucent } from 'src/styles/Palette'
import { PaletteScale, TypographyScale } from 'src/styles/types'
import {
  CARD_HEIGHT,
  HEADER_HEIGHT,
  POKEBALL_SIZE,
  Sections,
} from './constants'
import { Items } from './types'
import { StyledText } from 'src/components/StyledText'
import { StyledContainer } from 'src/components/StyledContainer'

interface HomeProps extends StackScreenProps<MainStackParamList, Routes.Home> {}

export const Home: React.FC<HomeProps> = ({ navigation }) => {
  useLayoutEffect(() => {
    const options: StackNavigationOptions = {
      headerTitle: () => (
        <StyledContainer color={PaletteScale.TRANSPARENT}>
          <StyledText typography={TypographyScale.H3_HEADLINE}>
            What pokemon are you looking for?
          </StyledText>
        </StyledContainer>
      ),
      headerTitleAlign: 'left',
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
      <StyledContainer
        color={PaletteScale.TRANSPARENT}
        style={{
          borderBottomEndRadius: 16,
          borderBottomLeftRadius: 16,
        }}>
        <FlatList
          bounces={false}
          numColumns={2}
          keyExtractor={keyExtractor}
          data={Sections}
          renderItem={renderItem}
          getItemLayout={getItemLayout}
        />
      </StyledContainer>
    </SceneContainer>
  )
}
