import { 
  IonContent, 
  IonPage, 
} from '@ionic/react';

import BottomNav from '../../../components/GeneralComponents/BottomNav';

import NotesAuthSuccess from '../../../components/SpecificComponents/Notes/Edit/NotesAuthSuccess';

const NotesSuccess: React.FC = () => {
  return (
    <IonPage>
      <IonContent fullscreen>
        <NotesAuthSuccess />
      </IonContent>
      <BottomNav />
    </IonPage>
  );
};

export default NotesSuccess;
