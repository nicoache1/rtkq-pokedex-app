import {
  StackNavigationOptions,
  StackScreenProps,
} from '@react-navigation/stack'
import React from 'react'
import { useLayoutEffect } from 'react'
import { SceneContainer } from 'src/components/SceneContainer'
import { Routes } from 'src/navigation/routes'
import { MainStackParamList } from 'src/navigation/stacks/MainStack'
import PokeballIcon from 'src/assets/icons/pokeball.svg'
import { colorTranslucent, lightenDarkenColor } from 'src/styles/Palette'
import { useGetPokemonByNameQuery } from 'src/store/APIs/pokemonSlice'
import { ActivityIndicator, Image, View } from 'react-native'
import FastImage from 'react-native-fast-image'
import { HeaderButton } from 'src/components/HeaderButton'
import BackIcon from 'src/assets/icons/back.svg'
import { PaletteScale, TypographyScale } from 'src/styles/types'
import { Dimensions } from 'react-native'
import { StyledContainer } from 'src/components/StyledContainer'
import { StyledText } from 'src/components/StyledText'
import { capitalize } from 'lodash'
import { StyledView } from 'src/components/StyledView'
import { TypeBadge } from 'src/components/TypeBadge'

interface PokemonDetailProps
  extends StackScreenProps<MainStackParamList, Routes.PokemonDetail> {}

const HEADER_HEIGHT = 150
const POKEBALL_SIZE = HEADER_HEIGHT + 100

const { width } = Dimensions.get('window')

const getPokedexNumber = (id: number) => {
  if (id < 10) {
    return `#00${id}`
  }
  if (id < 100) {
    return `#0${id}`
  }
  return `#${id}`
}

export const PokemonDetail: React.FC<PokemonDetailProps> = ({
  navigation,
  route,
}) => {
  useLayoutEffect(() => {
    const goBack = () => navigation.goBack()

    const options: StackNavigationOptions = {
      headerTitleStyle: {
        fontSize: 30,
      },
      headerTitle: '',
      headerStyle: {
        elevation: 0,
        shadowOffset: { height: 0, width: 0 },
        height: HEADER_HEIGHT,
      },
      headerTransparent: true,
      headerLeft: () => (
        <HeaderButton onPress={goBack}>
          <BackIcon height={32} width={32} fill={'#fff'} />
        </HeaderButton>
      ),
    }

    navigation.setOptions(options)
  }, [])

  const pokemonName = route.params.name

  const { data, isLoading } = useGetPokemonByNameQuery(pokemonName)

  if (!data || isLoading) {
    return <ActivityIndicator />
  }

  const renderBadges: JSX.Element[] = data.types.map((typeItem, index) => (
    <TypeBadge key={`${index}`} {...typeItem.type} />
  ))

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: lightenDarkenColor(data.types[0].type.color, 20),
      }}>
      <SceneContainer
        style={{ flex: 1, paddingTop: HEADER_HEIGHT }}
        edges={['bottom']}>
        <StyledContainer
          color={PaletteScale.TRANSPARENT}
          style={{ flexDirection: 'row' }}>
          <View style={{ flex: 1, justifyContent: 'center' }}>
            <StyledText
              typography={TypographyScale.H3_HEADLINE}
              color={PaletteScale.ON_SURFACE}>
              {capitalize(pokemonName)}
            </StyledText>
          </View>
          <View
            style={{
              flex: 1,
              alignItems: 'flex-end',
              justifyContent: 'center',
            }}>
            <StyledText
              typography={TypographyScale.SUBTITLE2}
              color={PaletteScale.ON_SURFACE}>
              {getPokedexNumber(data.id)}
            </StyledText>
          </View>
        </StyledContainer>
        <StyledContainer
          color={PaletteScale.TRANSPARENT}
          style={{ flexDirection: 'row' }}>
          {renderBadges}
        </StyledContainer>
        <StyledContainer color={PaletteScale.TRANSPARENT}>
          <PokeballIcon
            style={{
              position: 'absolute',
              top: HEADER_HEIGHT - POKEBALL_SIZE / 2,
              left: width / 2 - POKEBALL_SIZE / 2,
            }}
            height={POKEBALL_SIZE}
            width={POKEBALL_SIZE}
            fill={colorTranslucent(PaletteScale.ON_SURFACE, 0.4)}
          />
          <FastImage
            source={{ uri: data.sprite }}
            style={{ height: 300 }}
            resizeMode={'contain'}
          />
        </StyledContainer>
      </SceneContainer>
    </View>
  )
}
