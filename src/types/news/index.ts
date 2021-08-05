export interface News {
  source: {
    id: string
    name: string
  }
  author: string
  title: string
  description: string
  url: string
  urlToImage?: string
  publishedAt: string
  content: string
}

export const deserializeNews = (data: any[]): News[] =>
  data.map((dataItem: any) => ({
    source: dataItem.source,
    author: dataItem.author,
    title: dataItem.title,
    description: dataItem.description,
    url: dataItem.url,
    urlToImage: dataItem.urlToImage,
    publishedAt: dataItem.publishedAt,
    content: dataItem.content,
  }))
