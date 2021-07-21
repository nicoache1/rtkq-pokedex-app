import React from 'react'
import { FlatListProps, StyleSheet } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import { StyledContainer } from 'src/components/StyledContainer'
import { useGetPokemonHeadlinesQuery } from 'src/store/APIs/newsSlice'
import { PaletteScale } from 'src/styles/types'
import { News } from 'src/types/news'
import { CARD_HEIGHT } from '../constants'
import { Header } from './Header'
import { NewsItem } from './NewsItem'

interface NewsListProps {}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

export const NewsList: React.FC<NewsListProps> = ({}) => {
  const { data } = useGetPokemonHeadlinesQuery(1)

  const renderItem: FlatListProps<News>['renderItem'] = ({ item, index }) => (
    <NewsItem {...item} />
  )

  const keyExtractor: FlatListProps<News>['keyExtractor'] = (item, index) =>
    `${item.source.id} ${index}`

  const getItemLayout: FlatListProps<News>['getItemLayout'] = (_, index) => ({
    length: CARD_HEIGHT,
    offset: CARD_HEIGHT * index,
    index,
  })

  return (
    <StyledContainer color={PaletteScale.TRANSPARENT} style={styles.container}>
      <FlatList
        ListHeaderComponent={Header}
        bounces={false}
        keyExtractor={keyExtractor}
        data={data}
        renderItem={renderItem}
        getItemLayout={getItemLayout}
      />
    </StyledContainer>
  )
}
