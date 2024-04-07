import { 
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonIcon
} from "@ionic/react";

import { 
  informationCircleOutline 
} from "ionicons/icons";

const AccountHeader: React.FC = () => {
  return (
    <IonHeader class="ion-no-border">
      <IonToolbar>
        <IonTitle>
          Account
        </IonTitle>
        <IonButtons className="ion-margin" slot="end">
          <IonButton href="/help">
            Help 
            <IonIcon icon={informationCircleOutline} slot="start" />
          </IonButton>
        </IonButtons>
      </IonToolbar>
    </IonHeader>
  );
};

export default AccountHeader;