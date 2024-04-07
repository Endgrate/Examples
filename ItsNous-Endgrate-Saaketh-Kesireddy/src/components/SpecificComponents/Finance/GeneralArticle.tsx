import "../Finance/GeneralArticle.css";

import { 
  ArticleImage 
} from "../../../@types/article";

import { 
  IonItem,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonThumbnail,
  IonRouterLink
} from "@ionic/react";

import { 
  useFinanceNewsCache 
} from "./FinanceNewsCache";

import { 
  Article 
} from "../../../@types/article";

interface ContainerProps {
  article: Article;
}

const GeneralArticle: React.FC<ContainerProps> = ({ article }) => {

  let cutoff_length: number = 50;
  let proccessed_title: string = article.headline;

  const {
    setTempArticleContent,
    setOpenNewsViewer
  } = useFinanceNewsCache();

  if (proccessed_title.length > cutoff_length) {
    proccessed_title = proccessed_title.substring(0, cutoff_length) + "...";
  }

  function openNewsViewer(article: Article) {
    setTempArticleContent(article);
    setOpenNewsViewer(true);
  }

  if (article.images[0] == undefined) {
    return (
      <IonItem className="generalArticle" onClick={() => openNewsViewer(article)}>
        <IonCardHeader>
          <IonCardTitle>
            { proccessed_title }
          </IonCardTitle>
          <IonCardSubtitle>
            By { article.author }
          </IonCardSubtitle>
        </IonCardHeader>
      </IonItem>
    );
  }
  else {
    return (
      <IonItem className="generalArticle" onClick={() => openNewsViewer(article)}>
        <IonThumbnail slot="start">
          <img alt="News Thumbnails" src={article.images[0].url} />
        </IonThumbnail>
        <IonCardHeader>
          <IonCardTitle>
            { proccessed_title }
          </IonCardTitle>
          <IonCardSubtitle>
            By { article.author }
          </IonCardSubtitle>
        </IonCardHeader>
      </IonItem>
    );
  }
  
};

export default GeneralArticle;