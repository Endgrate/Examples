import { 
  IonContent, 
  IonHeader, 
  IonPage, 
  IonTitle, 
  IonToolbar 
} from '@ionic/react';

import BottomNav from '../../components/GeneralComponents/BottomNav';

import HighlightedArticleContainer from '../../components/SpecificComponents/Finance/HighlightedArticleContainer';

import { 
  FinanceNewsCacheProvider 
} from '../../components/SpecificComponents/Finance/FinanceNewsCache';
import TotalArticleContainer from '../../components/SpecificComponents/Finance/TotalArticleContainer';
import FinanceHeader from '../../components/SpecificComponents/Finance/FinanceHeader';

const FinanceNews: React.FC = () => {
  return (
    <IonPage>
      <FinanceNewsCacheProvider>
        <FinanceHeader />
        <IonContent fullscreen>
          <TotalArticleContainer />
        </IonContent>
        <BottomNav />
      </FinanceNewsCacheProvider>
    </IonPage>
  );
};

export default FinanceNews;
