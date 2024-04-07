import "../Edit/NoteInput.css";

import { 
  IonChip,
  IonIcon,
  IonLabel
} from "@ionic/react";

import { 
  documentTextOutline
} from "ionicons/icons";

interface ContainerProps {
  length: number;
}

const NoteCounter: React.FC<ContainerProps> = ({ length }) => {
  return (
    <IonChip className="ion-padding" slot="end">
      <IonIcon 
        color="primary" 
        icon={documentTextOutline}
      />
      <IonLabel>
        { length }
      </IonLabel>
    </IonChip>
  );
};

export default NoteCounter;