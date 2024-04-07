import { 
  IonContent, 
  IonHeader, 
  IonPage, 
  IonTitle, 
  IonToolbar 
} from '@ionic/react';

import BottomNav from '../../components/GeneralComponents/BottomNav';

import { 
  SignedIn, 
  SignedOut 
} from '@clerk/clerk-react';

import Condensed_Profile from '../../components/SpecificComponents/Account/CondensedProfile';

import Condensed_SignIn from '../../components/SpecificComponents/Account/CondensedSignIn';
import AccountHeader from '../../components/SpecificComponents/Account/AccountHeader';

const Account: React.FC = () => {
  return (
    <IonPage>
      <SignedIn>
        <AccountHeader />
        <IonContent fullscreen>
          <Condensed_Profile />
        </IonContent>
        <BottomNav />
      </SignedIn>
      <SignedOut>
        <IonContent fullscreen>
          <Condensed_SignIn />
        </IonContent>
      </SignedOut>
    </IonPage>
  );
};

export default Account;
