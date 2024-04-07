import "../Home/NoteViewLoading.css"

import { 
  IonContent, IonImg 
} from "@ionic/react";

const NoteViewLoading: React.FC = () => {
  return (
    <IonContent className="noteViewLoading">
      <IonImg
        className="noteViewLoadingImg"
        src="https://storage.googleapis.com/its-nous-v2/loadingIconNotes.png"
        alt="Loading graphic for ItsNous notes."
      />
    </IonContent>
  );
};

export default NoteViewLoading;