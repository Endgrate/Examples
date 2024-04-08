import "../Home/NewNoteButton.css";

import { 
  IonFabButton,
  IonFab,
  IonIcon
} from "@ionic/react";

import { 
  addOutline 
} from "ionicons/icons";

import { 
  createNote,
  retrieveNotes
} from "../../../Backend/FirebaseDatabase";

import { 
  useNoteViewCache 
} from "./NoteViewCache";

import { 
  Note 
} from "../../../../@types/note";

import { 
  RefObject 
} from "react";

import { 
  useUser 
} from "@clerk/clerk-react";

interface ContainerProps {
  reference: RefObject<HTMLIonSearchbarElement>;
}

const NewNoteButton: React.FC<ContainerProps> = ({ reference }) => {

  const {
    setNotesViewCache,
    setAmountNotes,
    setLocalSearchVal,
    setAllNotesLength
  } = useNoteViewCache();

  const { user } = useUser();

  async function createNoteLocal() {

    setLocalSearchVal("");
    reference.current?.blur();

    createNote("Untitled", "", user?.fullName as string, user?.id as string);

    try {
      let note_data = await retrieveNotes(user?.id as string, 1);
      if (note_data != undefined) {
        setNotesViewCache(note_data as Note[]);
        setAmountNotes(note_data.length);
        setAllNotesLength(note_data.length);
      }
    }
    catch (e) {
      console.error("Error retrieving documents: ", e);
    }

  }

  return (
    <IonFab slot="fixed" vertical="bottom" horizontal="end">
      <IonFabButton onClick={() => createNoteLocal()}>
        <IonIcon icon={addOutline} />
      </IonFabButton>
    </IonFab>
  );
};

export default NewNoteButton;