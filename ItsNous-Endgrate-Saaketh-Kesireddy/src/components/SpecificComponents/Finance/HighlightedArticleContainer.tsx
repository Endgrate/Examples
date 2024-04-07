import "../Finance/HighlightedArticleContainer.css";

import "swiper/css";

import 'swiper/css/navigation';

import 'swiper/css/pagination';

import { 
  IonTitle
} from "@ionic/react";

import {
  ArticleRequestObject
} from "../../../@types/article";

import { 
  useEffect
} from "react";

import HighlightedArticle from "./HighlightedArticle";

import { 
  useFinanceNewsCache 
} from "./FinanceNewsCache";

import { 
  Swiper, 
  SwiperSlide 
} from "swiper/react";

import { 
  Navigation, 
  Pagination, 
  Mousewheel, 
  Keyboard 
} from 'swiper/modules';


const HighlightedArticleContainer: React.FC = () => {

  const {
    articleHighlightedCache,
    articlesRetrieved,
    setArticleHighlightedCache,
    setArticlesRetrieved
  } = useFinanceNewsCache();

  async function getArticles() {
    let request = await fetch("https://backendflaskapifinance-psoxvcofla-uk.a.run.app/getNews/0");
    let requestResult: ArticleRequestObject = await request.json() as ArticleRequestObject;
    setArticleHighlightedCache(requestResult.news);
    setArticlesRetrieved(true);
  }

  useEffect(
  () => {
    getArticles();
  },
  [])

  if (articlesRetrieved) {
    return (
      <>
        <Swiper
        cssMode={true}
        navigation={true}
        pagination={true}
        mousewheel={true}
        keyboard={true}
        modules={[Navigation, Pagination, Mousewheel, Keyboard]}
        className="highlightedArticleContainer"
        >
          {articleHighlightedCache.map(item => {
            return (
              <SwiperSlide>
                <HighlightedArticle article={item} />
              </SwiperSlide>
            )
          })}
        </Swiper>
      </>
    );
  }

};

export default HighlightedArticleContainer;