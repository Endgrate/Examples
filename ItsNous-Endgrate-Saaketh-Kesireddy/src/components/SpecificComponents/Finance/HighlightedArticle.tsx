import { Article } from "../../../@types/article";
import "../Finance/HighlightedArticle.css";

import { 
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonImg
} from "@ionic/react";

import { 
  useFinanceNewsCache 
} from "./FinanceNewsCache";

interface ContainerProps {
  article: Article;
}

const HighlightedArticle: React.FC<ContainerProps> = ({ article }) => {

  const {
    setTempArticleContent,
    setOpenNewsViewer
  } = useFinanceNewsCache();

  function openNewsViewer(article: Article) {
    setTempArticleContent(article);
    setOpenNewsViewer(true);
  }

  return (
    <IonCard className="highlightedArticle" onClick={() => openNewsViewer(article)}>
      <IonCardHeader>
        <IonCardTitle>
          { article.headline }
        </IonCardTitle>
        <IonCardSubtitle>
          By { article.author }
        </IonCardSubtitle>
      </IonCardHeader>
      <IonImg
        src={article.images[0].url}
        alt="Image for News Article"
      />
      <IonCardContent>
        { article.summary }
      </IonCardContent>
    </IonCard>
  );
};

export default HighlightedArticle;