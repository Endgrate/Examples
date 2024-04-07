import { 
  IonContent,
  IonPage, 
} from '@ionic/react';

import BottomNav from '../../../components/GeneralComponents/BottomNav';

import { 
  FinanceNewsCacheProvider 
} from '../../../components/SpecificComponents/Finance/News/FinanceNewsCache';

import TotalArticleContainer from '../../../components/SpecificComponents/Finance/News/TotalArticleContainer';

import FinanceHeader from '../../../components/SpecificComponents/Finance/News/FinanceHeader';

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
