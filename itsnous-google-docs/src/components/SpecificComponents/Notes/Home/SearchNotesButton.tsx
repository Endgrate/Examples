import { Ref, RefObject } from "react";
import "../Home/NewNoteButton.css";

import "../Home/SearchNotesButton.css";

import { 
  IonFabButton,
  IonFab,
  IonIcon
} from "@ionic/react";

import { 
  searchOutline
} from "ionicons/icons";

interface ContainerProps {
  reference: RefObject<HTMLIonSearchbarElement>;
}

const SearchNotesButton: React.FC<ContainerProps> = ({ reference }) => {
  return (
    <IonFab className="searchNotesButton" slot="fixed" vertical="bottom" horizontal="end">
      <IonFabButton onClick={() => reference.current?.setFocus()}>
        <IonIcon icon={searchOutline} />
      </IonFabButton>
    </IonFab>
  );
};

export default SearchNotesButton;