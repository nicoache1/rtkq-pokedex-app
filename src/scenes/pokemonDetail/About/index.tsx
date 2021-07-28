import { capitalize } from 'lodash'
import React, { memo } from 'react'
import { ActivityIndicator, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import FemaleIcon from 'src/assets/icons/female.svg'
import MaleIcon from 'src/assets/icons/male.svg'
import { toFeet, toLbs } from 'src/common/conversors'
import { StyledContainer } from 'src/components/StyledContainer'
import { StyledText } from 'src/components/StyledText'
import { useGetPokemonSpeciesQuery } from 'src/store/APIs/pokemonSlice'
import { PaletteScale, TypographyScale } from 'src/styles/types'
import { Pokemon } from 'src/types/pokemon'

import { styles } from './styles'

interface AboutProps {
  pokemonName: string
  extraData?: Pokemon
}

const transformHeight = (height: number) => {
  const feetInches = toFeet(height * 10)
  const meters = height / 10
  return {
    feetInches,
    meters,
  }
}

const transformWeight = (weight: number) => {
  const kgs = weight / 10
  const lbs = toLbs(kgs)
  return {
    kgs,
    lbs,
  }
}

const calculateGenderRatio = (genderRate: number) => {
  const femaleRatio = ((genderRate * 100) / 8).toFixed(1)
  const maleRatio = (((8 - genderRate) * 100) / 8).toFixed(1)
  return {
    femaleRatio,
    maleRatio,
  }
}

export const About: React.FC<AboutProps> = memo(
  ({ pokemonName, extraData }) => {
    const { data, isLoading } = useGetPokemonSpeciesQuery(pokemonName)

    if (!data || isLoading || !extraData) {
      return <ActivityIndicator />
    }

    const height = transformHeight(extraData.height)
    const weight = transformWeight(extraData.weight)
    const gender = calculateGenderRatio(data.genderRate)

    return (
      <ScrollView style={styles.container}>
        <StyledContainer style={styles.titleContainer}>
          <StyledText>{data.about}</StyledText>
        </StyledContainer>
        <StyledContainer style={styles.sizeContainer}>
          <StyledContainer style={styles.flexible}>
            <View style={styles.sizeSubContainer}>
              <StyledText color={PaletteScale.ON_SURFACE_LOW_EMPHASIS}>
                Height
              </StyledText>
            </View>
            <View style={styles.sizeSubContainer}>
              <StyledText
                typography={
                  TypographyScale.CAPTION
                }>{`${height.feetInches} (${height.meters}m)`}</StyledText>
            </View>
          </StyledContainer>
          <StyledContainer style={styles.flexible}>
            <View style={styles.sizeSubContainer}>
              <StyledText color={PaletteScale.ON_SURFACE_LOW_EMPHASIS}>
                Weight
              </StyledText>
            </View>
            <View style={styles.sizeSubContainer}>
              <StyledText
                typography={TypographyScale.CAPTION}>{`${weight.lbs.toFixed(
                1,
              )} lbs (${weight.kgs.toFixed(1)} kg)`}</StyledText>
            </View>
          </StyledContainer>
        </StyledContainer>
        <StyledContainer style={styles.titleContainer}>
          <StyledText typography={TypographyScale.BODY2}>Breeding</StyledText>
        </StyledContainer>
        <View style={styles.breedingStatsContainer}>
          <StyledContainer style={styles.row}>
            <View style={styles.flexible}>
              <StyledText color={PaletteScale.ON_SURFACE_LOW_EMPHASIS}>
                Gender
              </StyledText>
            </View>
            <View style={styles.ratioContainer}>
              <MaleIcon />
              <StyledText>{gender.maleRatio}</StyledText>
            </View>
            <View style={styles.ratioContainer}>
              <FemaleIcon />
              <StyledText>{gender.femaleRatio}</StyledText>
            </View>
          </StyledContainer>
          <StyledContainer style={styles.row}>
            <View style={styles.flexible}>
              <StyledText color={PaletteScale.ON_SURFACE_LOW_EMPHASIS}>
                Egg Groups
              </StyledText>
            </View>
            <View style={styles.eggGroupsContainer}>
              <StyledText>{capitalize(data.eggGroups[0].name)}</StyledText>
            </View>
          </StyledContainer>
        </View>
      </ScrollView>
    )
  },
)
