import "../Edit/NoteGoogleDocsModal.css";

import { 
  IonButtons,
  IonChip,
  IonIcon,
  IonModal,
  IonText,
  IonButton
} from "@ionic/react";

import { 
  RefObject,
  useEffect,
  useState
} from "react";

import { 
  useNoteCache 
} from "./NoteCache";

import { 
  onSnapshot,
  doc
} from "@firebase/firestore";

import { 
  editNote,
  getDatabase, 
  retrieveNote
} from "../../../Backend/FirebaseDatabase";

import { 
  Note 
} from "../../../../@types/note";

import { 
  Browser 
} from '@capacitor/browser';

import { 
  useUser 
} from "@clerk/clerk-react";

interface ContainerProps {
  reference: RefObject<HTMLIonModalElement>
  trigger_id: string;
}

interface AuthURL {
  auth_url: string;
  session_id: string;
}

const NoteGoogleDocsModal: React.FC<ContainerProps> = ({ reference, trigger_id }) => {

  const {
    noteCached,
    setNoteCached
  } = useNoteCache();

  async function startAuthentication() {
    let raw_result = await fetch(`https://backendflaskapinotes-psoxvcofla-uk.a.run.app/getSessionID/${noteCached.creator_id}/${noteCached.id}?redirect=${window.location.href}`);
    let result: unknown =  await raw_result.json();
    let casted_result =  result as AuthURL;
    window.location.href = casted_result.auth_url;
  }

  async function updateDocument() {
    await fetch(`https://backendflaskapinotes-psoxvcofla-uk.a.run.app/setDocText/${noteCached.google_docs_linked_id}?text=${noteCached.content}`);
  }

  function closeModal() {
    reference.current?.dismiss();
  }

  if (!noteCached.linked_google) {
    return (
      <IonModal id="openGoogleDocsModal" className="noteGoogleDocsModal" ref={reference} trigger={trigger_id} initialBreakpoint={1} breakpoints={[0, 1]}>
        <IonText className="ion-margin">
          <h2>
            Do you want to link this note to a Google Doc?
          </h2>
          <p>
            After clicking "yes", you will be redirected to an authentication page. Once you authenticate you will be returned to this page. When you click the "Google Docs" export button, you will be able to successfully update your Google Doc.          </p>
        </IonText>
        <IonButton className="ion-margin" onClick={() => startAuthentication()}>
          Yes
        </IonButton>
        <IonButton className="ion-margin" onClick={() => closeModal()}>
          No
        </IonButton>
      </IonModal>
    );
  }

  if (noteCached.linked_google) {
    return (
      <IonModal id="openGoogleDocsModal" className="noteGoogleDocsModal" ref={reference} trigger={trigger_id} initialBreakpoint={1} breakpoints={[0, 1]}>
        <IonText className="ion-margin">
          <h2>
            This note has already been linked to a document. Would you like to update that document?
          </h2>
          <p>
            The document will be updated as soon as you click the "yes" button below. Check your the Google Doc you linked this note to in order to view your changes.
          </p>
        </IonText>
        <IonButton className="ion-margin" onClick={() => updateDocument()}>
          Yes
        </IonButton>
        <IonButton className="ion-margin" onClick={() => closeModal()}>
          No
        </IonButton>
      </IonModal>
    );
  }

};

export default NoteGoogleDocsModal;