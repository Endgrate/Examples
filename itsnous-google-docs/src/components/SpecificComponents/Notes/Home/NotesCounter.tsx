import { 
  IonChip,
  IonIcon,
  IonLabel
} from "@ionic/react";

import { 
  documentTextOutline 
} from "ionicons/icons";

interface ContainerProps {
  number: number;
}

const NotesCounter: React.FC<ContainerProps> = ({ number }) => {
  return (
    <IonChip class="ion-margin" slot="end">
      <IonIcon icon={documentTextOutline} color="primary"></IonIcon>
      <IonLabel>
        { number }
      </IonLabel>
    </IonChip>
  );
};

export default NotesCounter;