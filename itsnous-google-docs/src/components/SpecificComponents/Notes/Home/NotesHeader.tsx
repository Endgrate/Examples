import { 
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonIcon
} from "@ionic/react";

import NotesCounter from "./NotesCounter";

import { 
  useNoteViewCache 
} from "./NoteViewCache";

import { 
  informationCircleOutline 
} from "ionicons/icons";

const NotesHeader: React.FC = () => {

  const {
    amountNotes
  } = useNoteViewCache();

  return (
    <IonHeader class="ion-no-border">
      <IonToolbar>
        <IonTitle>Notes</IonTitle>
        <IonButtons slot="end">
          <IonButton href="/help">
            Help 
            <IonIcon icon={informationCircleOutline} slot="start" />
          </IonButton>
        </IonButtons>
        <NotesCounter number={amountNotes} />
      </IonToolbar>
    </IonHeader>
  );
};

export default NotesHeader;