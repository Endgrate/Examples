
import React from "react";

import { 
  useState 
} from "react";

import { 
  Article 
} from "../../../@types/article";

interface TempArticleViewCache {
  articleGeneralCache: Article[];
  articleHighlightedCache: Article[];
  articlesRetrieved: boolean;
  articlesGeneralRetrieved: boolean;
  tempArticleContent: Article;
  openNewsViewer: boolean;
  setArticleGeneralCache: Function;
  setArticleHighlightedCache: Function;
  setArticlesRetrieved: Function;
  setArticlesGeneralRetrieved: Function;
  setTempArticleContent: Function;
  setOpenNewsViewer: Function;
  
}

interface ContainerProps {
  children?: React.ReactNode;
}

export const FinanceNewsCache = React.createContext<TempArticleViewCache | undefined>(undefined);

export const FinanceNewsCacheProvider: React.FC<ContainerProps> = ({ children }) => {
  
  const [articleGeneralCache, setArticleGeneralCache] = useState([] as Article[]);
  const [articleHighlightedCache, setArticleHighlightedCache] = useState([] as Article[]);
  const [articlesRetrieved, setArticlesRetrieved] = useState(false);
  const [articlesGeneralRetrieved, setArticlesGeneralRetrieved] = useState(false);
  const [tempArticleContent, setTempArticleContent] = useState({} as Article);
  const [openNewsViewer, setOpenNewsViewer] = useState(false);

  let state: TempArticleViewCache = { 
    articleGeneralCache: articleGeneralCache,
    articleHighlightedCache: articleHighlightedCache,
    articlesRetrieved: articlesRetrieved,
    tempArticleContent: tempArticleContent,
    articlesGeneralRetrieved: articlesGeneralRetrieved,
    openNewsViewer: openNewsViewer,
    setArticleGeneralCache,
    setArticleHighlightedCache,
    setArticlesRetrieved,
    setArticlesGeneralRetrieved,
    setTempArticleContent,
    setOpenNewsViewer
  }

  return (
    <FinanceNewsCache.Provider value={state}>
      {children}
    </FinanceNewsCache.Provider>
  );
};

export default FinanceNewsCache;

export const useFinanceNewsCache = () => React.useContext<TempArticleViewCache | undefined>(FinanceNewsCache)!;