import { 
  IonTabBar, 
  IonTabButton, 
  IonIcon, 
  IonLabel 
} from "@ionic/react";

import { 
  createOutline, 
  personOutline,
  cashOutline
} from "ionicons/icons";

const BottomNav: React.FC = () => {
  return (
    <IonTabBar slot="bottom">
      <IonTabButton tab="tab4" href="/finance/news">
        <IonIcon aria-hidden="true" icon={cashOutline} />
        <IonLabel>Finance</IonLabel>
      </IonTabButton>
      <IonTabButton tab="tab1" href="/notes">
        <IonIcon aria-hidden="true" icon={createOutline} />
        <IonLabel>Notes</IonLabel>
      </IonTabButton>
      <IonTabButton tab="tab3" href="/account">
        <IonIcon aria-hidden="true" icon={personOutline} />
        <IonLabel>Account</IonLabel>
      </IonTabButton>
    </IonTabBar>
  );
};

export default BottomNav;