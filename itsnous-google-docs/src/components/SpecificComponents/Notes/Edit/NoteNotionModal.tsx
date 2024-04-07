import "../Edit/NoteGoogleDocsModal.css";

import { 
  IonModal,
  IonText
} from "@ionic/react";

import { 
  RefObject,
} from "react";

interface ContainerProps {
  reference: RefObject<HTMLIonModalElement>
  trigger_id: string;
}

const NoteNotionModal: React.FC<ContainerProps> = ({ reference, trigger_id }) => {
  return (
    <IonModal id="openGoogleDocsModal" className="noteGoogleDocsModal" ref={reference} trigger={trigger_id} initialBreakpoint={1} breakpoints={[0, 1]}>
      <IonText className="ion-margin">
        <h2>
          The Notion Integration is under construction.
        </h2>
        <p>
          This integration by Endgrate is still being implemented currently but the Google Docs integration has been implemented successfully. Try it now by exiting this modal and clicking the Google Icon.
        </p>
      </IonText>
    </IonModal>
  );
};

export default NoteNotionModal;