import "../Edit/NoteInput.css";

import { 
  IonChip,
  IonIcon,
  IonLabel
} from "@ionic/react";

import { 
  checkmarkOutline,
  hourglassOutline 
} from "ionicons/icons";

interface ContainerProps {
  status: boolean;
}

const NoteStatus: React.FC<ContainerProps> = ({ status }) => {

  if (status == true) {
    return (
      <IonChip className="ion-padding ion-margin" slot="end">
        <IonIcon 
          color="primary" 
          icon={checkmarkOutline}
        />
        <IonLabel>Saved</IonLabel>
      </IonChip>
    );
  }

  if (status == false) {
    return (
      <IonChip className="ion-padding ion-margin" slot="end">
        <IonIcon 
          color="primary" 
          icon={hourglassOutline}
        />
        <IonLabel>Saving...</IonLabel>
      </IonChip>
    );
  }

};

export default NoteStatus;