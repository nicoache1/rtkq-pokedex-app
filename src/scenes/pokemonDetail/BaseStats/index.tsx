import React, { memo } from 'react'
import { StyleSheet } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { Pokemon } from 'src/types/pokemon'

import { Stat } from './Stat'

interface BaseStatsProps {
  data: Pokemon
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 20,
  },
})

export const BaseStats: React.FC<BaseStatsProps> = memo(({ data }) => {
  const baseStats = data.stats
  const totalBaseStats = baseStats.reduce(
    (accum, curr) => (accum += curr.baseStat),
    0,
  )

  return (
    <ScrollView style={styles.container}>
      {baseStats.map((item, index) => (
        <Stat key={`stat-${index}`} stat={item} />
      ))}
      <Stat
        key={`stat-${baseStats.length}`}
        maxStat={1000}
        stat={{
          baseStat: totalBaseStats,
          effort: 0,
          stat: {
            name: 'Total',
            url: 'url',
          },
        }}
      />
    </ScrollView>
  )
})
