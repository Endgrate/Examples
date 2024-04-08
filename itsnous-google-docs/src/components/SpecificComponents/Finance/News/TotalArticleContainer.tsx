import { IonButton } from "@ionic/react";
import "../Finance/TotalArticleContainer.css";
import FinanceNewsViewerModal from "./FinanceNewsViewerModal";

import GeneralArticleContainer from "./GeneralArticleContainer";

import HighlightedArticleContainer from "./HighlightedArticleContainer";


const TotalArticleContainer: React.FC = () => {
  return (
    <>
      <FinanceNewsViewerModal trigger_id="open_finance_news_viewer" />
      <div className="totalArticleContainer">
        <HighlightedArticleContainer />
        <GeneralArticleContainer />
      </div>
    </>
  );
};

export default TotalArticleContainer;