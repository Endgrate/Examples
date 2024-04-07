import { 
  IonButton,
  IonContent, 
  IonHeader, 
  IonIcon, 
  IonPage, 
  IonTitle, 
  IonToolbar 
} from '@ionic/react';

import BottomNav from '../../components/GeneralComponents/BottomNav';

import GeneralInfoContainer from '../../components/SpecificComponents/Help/GeneralInfoContainer';

import { 
  logoGithub 
} from 'ionicons/icons';

const Help: React.FC = () => {
  return (
    <IonPage>
      <IonHeader class="ion-no-border">
        <IonToolbar>
          <IonTitle>Help</IonTitle>
          <IonButton href="https://github.com/saakethk/its-nous-v2" className="ion-margin" slot="end">
            <IonIcon icon={logoGithub} slot="start" />
            Github
          </IonButton>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <GeneralInfoContainer 
          title="What is Nous?" 
          content="For now, Nous is a note-taking app that I (Saaketh Kesireddy) am developing. Eventually, I want to expand the app to have additional functionality such as a stock page, and A.I. inspiration generator." 
          image_url="https://storage.googleapis.com/its-nous-v2/LogoSquare.png" 
          alternate={true} 
        />
        <GeneralInfoContainer 
          title="Create a note." 
          content="Create a note by clicking the '+' symbol in the bottom right corner. This will create a default note with a titel called untitled and empty content. The notes are stored accoridng to your account in a Firebase Firestore database." 
          image_url="https://storage.googleapis.com/its-nous-v2/addNoteGraphic.png" 
          alternate={false} 
        />
        <GeneralInfoContainer 
          title="Search notes." 
          content="Search your notes via the searchbar on top of the notes. Currently, our search searches the content and title of all the notes. Hence, you cannot search by date. More functionality will be added." 
          image_url="https://storage.googleapis.com/its-nous-v2/searchNotesGraphic.png" 
          alternate={true} 
        />
        <GeneralInfoContainer 
          title="Start your Note." 
          content="The note UI is made explicity to be as simple as possible. You can edit the titel by clicking the top left corner input box. All changes are also saved instantly so there is no need to click save." 
          image_url="https://storage.googleapis.com/its-nous-v2/noteUIGraphic.png" 
          alternate={false} 
        />
        <GeneralInfoContainer 
          title="Integrations." 
          content="In order to make Nous more useful, I (Saakeht Kesireddy) have integrated Endgrate's API into the app to create a Google Docs ntegration that allows seamless export of a note to a google doc. Just authenticate with google and copy a Google Doc ID to export the note successfully." 
          image_url="https://storage.googleapis.com/its-nous-v2/integrationsGraphic.png" 
          alternate={true} 
        />
      </IonContent>
      <BottomNav />
    </IonPage>
  );
};

export default Help;
