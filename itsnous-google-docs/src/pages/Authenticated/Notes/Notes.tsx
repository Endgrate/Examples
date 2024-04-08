import { 
  IonContent, 
  IonPage, 
} from '@ionic/react';

import BottomNav from '../../../components/GeneralComponents/BottomNav';

import NotesContainer from '../../../components/SpecificComponents/Notes/Home/NotesContainer';

import NotesHeader from '../../../components/SpecificComponents/Notes/Home/NotesHeader';

import { 
  NoteViewCacheProvider 
} from '../../../components/SpecificComponents/Notes/Home/NoteViewCache';

const Notes: React.FC = () => {
  return (
    <IonPage>
      <NoteViewCacheProvider>
        <NotesHeader />
        <IonContent fullscreen>
          <NotesContainer />
        </IonContent>
        <BottomNav />
      </NoteViewCacheProvider>
    </IonPage>
  );
};

export default Notes;
