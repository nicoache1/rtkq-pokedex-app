import { capitalize } from 'lodash'
import React from 'react'
import { useMemo } from 'react'
import { StyleSheet, View } from 'react-native'
import { ProgressBar } from 'react-native-paper'
import { StyledContainer } from 'src/components/StyledContainer'
import { StyledText } from 'src/components/StyledText'
import { useTheme } from 'src/styles/Theme'
import { PaletteScale } from 'src/styles/types'
import { Stats } from 'src/types/pokemon'

interface StatProps {
  stat: Stats
  maxStat?: number
}

const styles = StyleSheet.create({
  baseStatContainer: {
    flex: 1,
  },
  container: {
    flexDirection: 'row',
  },
  flexible: {
    flex: 1.5,
  },
  progressContainer: {
    flex: 3,
    justifyContent: 'center',
  },
})

export const Stat: React.FC<StatProps> = ({ stat, maxStat = 180 }) => {
  const { Theme } = useTheme()
  const statValue = (stat.baseStat * 100) / maxStat

  const statName = useMemo(() => {
    const baseName = stat.stat.name
    const processedName = capitalize(
      baseName
        .replace('special-attack', 'Sp. Atk')
        .replace('special-defense', 'Sp. Def'),
    )
    return processedName
  }, [stat.stat.name])

  return (
    <StyledContainer style={styles.container}>
      <View style={styles.flexible}>
        <StyledText color={PaletteScale.ON_SURFACE_LOW_EMPHASIS}>
          {statName}
        </StyledText>
      </View>
      <View style={styles.baseStatContainer}>
        <StyledText>{stat.baseStat}</StyledText>
      </View>
      <View style={styles.progressContainer}>
        <ProgressBar color={Theme.colors.PRIMARY} progress={statValue / 100} />
      </View>
    </StyledContainer>
  )
}
