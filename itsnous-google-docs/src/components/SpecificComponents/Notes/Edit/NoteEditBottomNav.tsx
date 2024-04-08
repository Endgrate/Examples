import "../Edit/NoteEditBottomNav.css";

import { 
  IonIcon, 
  IonLabel,
  IonButton
} from "@ionic/react";

import { 
  libraryOutline,
  logoGoogle,
  logoCodepen 
} from "ionicons/icons";

import { 
  useRef
} from "react";

import NoteGoogleDocsModal from "./NoteGoogleDocsModal";

import NoteNotionModal from "./NoteNotionModal";

const NoteEditBottomNav: React.FC = () => {

  const modal = useRef<HTMLIonModalElement>(null);
  const modal1 = useRef<HTMLIonModalElement>(null);

  return (
    <>
      <NoteNotionModal reference={modal1} trigger_id="open_notion_integration" />
      <NoteGoogleDocsModal reference={modal} trigger_id="open_google_docs_integration" />
      <div className="noteEditBottomNavShortcutsContainer" slot="bottom">
        <IonButton className="noteEditBottomNavShortcuts" href="/notes">
          <IonIcon aria-hidden="true" icon={libraryOutline} slot="start" />
          <IonLabel>Notes</IonLabel>
        </IonButton>
        <IonButton className="noteEditBottomNavShortcuts" id="open_notion_integration">
          <IonIcon aria-hidden="true" icon={logoCodepen} slot="start" />
          <IonLabel>Notion</IonLabel>
        </IonButton>
        <IonButton className="noteEditBottomNavShortcuts" id="open_google_docs_integration">
          <IonIcon aria-hidden="true" icon={logoGoogle} slot="start" />
          <IonLabel>Export</IonLabel>
        </IonButton>
      </div>
    </>
  );

};

export default NoteEditBottomNav;