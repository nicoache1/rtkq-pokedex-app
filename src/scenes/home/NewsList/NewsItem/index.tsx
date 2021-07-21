import React from 'react'
import { View } from 'react-native'
import FastImage from 'react-native-fast-image'
import { StyledText } from 'src/components/StyledText'
import { TypographyScale } from 'src/styles/types'
import { News } from 'src/types/news'
import { DateTime } from 'luxon'
import { styles } from './styles'

interface NewsItemProps {
  title: News['title']
  publishedAt: News['publishedAt']
  urlToImage?: News['urlToImage']
}

export const NewsItem: React.FC<NewsItemProps> = ({
  title,
  urlToImage,
  publishedAt,
}) => (
  <View style={styles.container}>
    <View style={styles.infoContainer}>
      <View style={styles.flexible}>
        <StyledText typography={TypographyScale.BODY2} numberOfLines={2}>
          {title}
        </StyledText>
      </View>
      <View style={styles.flexible}>
        <StyledText typography={TypographyScale.CAPTION}>
          {DateTime.fromISO(publishedAt).toFormat('DD')}
        </StyledText>
      </View>
    </View>
    <View style={styles.imageContainer}>
      <FastImage style={styles.image} source={{ uri: urlToImage }} />
    </View>
  </View>
)
