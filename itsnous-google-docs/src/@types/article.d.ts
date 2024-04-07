
export interface ArticleImage {
  size: string,
  url: string
}

export interface Article {
  author: string;
  content: string;
  created_at: string;
  headline: string,
  id: number,
  images: Array<ArticleImage>,
  source: string,
  summary: string,
  symbols: Array<string>,
  updated_at: string,
  url: string
}

export interface ArticleRequestObject {
  news: Array<Article>,
  relevant_stocks: Array<string>
}