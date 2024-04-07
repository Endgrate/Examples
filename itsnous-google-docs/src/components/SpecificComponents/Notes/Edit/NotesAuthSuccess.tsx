import "../Home/NoteViewLoading.css"

import { 
  IonContent, 
  IonImg,
  IonText
} from "@ionic/react";

const NotesAuthSuccess: React.FC = () => {
  return (
    <IonContent className="notesAuthSuccessContainer">
      <div className="noteViewLoading notesAuthSuccess">
        <IonText color="primary">
          <h1>
            You've successfully authenticated.
          </h1>
        </IonText>
        <p>
          Return to your window in order to export your note to the linked Google Doc. You will note be required to authenticate for this note ever again.
        </p>
        <IonImg
          className="noteViewLoadingImg"
          src="https://storage.googleapis.com/its-nous-v2/loadingIconSuccess.png"
          alt="Loading graphic for Success Screen."
        />
      </div>
    </IonContent>
  );
};

export default NotesAuthSuccess;