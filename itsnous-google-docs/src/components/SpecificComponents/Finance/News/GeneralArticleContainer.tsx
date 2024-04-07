import "../Finance/GeneralArticleContainer.css";

import "swiper/css";

import 'swiper/css/navigation';

import 'swiper/css/pagination';

import { 
  IonContent,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonTitle
} from "@ionic/react";

import {
  ArticleRequestObject
} from "../../../../@types/article";

import { 
  useEffect,
  useState
} from "react";

import { 
  useFinanceNewsCache 
} from "./FinanceNewsCache";

import { 
  Article 
} from "../../../../@types/article";

import GeneralArticle from "./GeneralArticle";

const GeneralArticleContainer: React.FC = () => {

  const [counter, setCounter] = useState(1);

  const {
    articleGeneralCache,
    articlesGeneralRetrieved,
    setArticleGeneralCache,
    setArticlesGeneralRetrieved
  } = useFinanceNewsCache();

  async function getArticles() {
    let request = await fetch(`https://backendflaskapifinance-psoxvcofla-uk.a.run.app/getNews/${counter}`);
    let requestResult: ArticleRequestObject = await request.json() as ArticleRequestObject;
    let temp: Article[] = articleGeneralCache;
    for (var newsObjectID in requestResult.news) {
      temp.push(requestResult.news[newsObjectID]);
    }
    setArticleGeneralCache(temp);
    setCounter(counter+1);
    setArticlesGeneralRetrieved(true);
  }

  useEffect(
  () => {
    getArticles();
  },
  [])

  if (articlesGeneralRetrieved) {
    return (
      <div className="generalArticleContainer ion-padding">
        <IonTitle>
          <h4>
            More Stories
          </h4>
        </IonTitle>
        {articleGeneralCache.map(item => {
          return (
            <GeneralArticle article={item as Article} />
          )
        })}
        <IonInfiniteScroll
          onIonInfinite={(ev) => {
            getArticles();
            setTimeout(() => ev.target.complete(), 500);
          }}
        >
          <IonInfiniteScrollContent></IonInfiniteScrollContent>
        </IonInfiniteScroll>
      </div>
    );
  }

};

export default GeneralArticleContainer;