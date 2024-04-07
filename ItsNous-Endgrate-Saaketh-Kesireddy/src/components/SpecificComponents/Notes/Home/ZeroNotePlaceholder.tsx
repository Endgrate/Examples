import "../Home/ZeroNotePlaceholder.css"

import { 
  IonButton,
  IonImg,
  IonText 
} from "@ionic/react";

import { 
  createNote 
} from "../../../Backend/FirebaseDatabase";

import { 
  useUser 
} from "@clerk/clerk-react";

import {
  useNoteViewCache
} from "./NoteViewCache";

import { 
  retrieveNotes 
} from "../../../Backend/FirebaseDatabase";

import { 
  Note 
} from "../../../../@types/note";

const ZeroNotePlaceholder: React.FC = () => {

  const { user } = useUser();

  const {
    setLocalSearchVal,
    setNotesViewCache,
    setAmountNotes,
    setAllNotesLength
  } = useNoteViewCache();

  async function createNoteLocal() {

    setLocalSearchVal("");

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
    <div className="zeroNotePlaceholder">
      <div className="zeroNotePlaceholderTextContent">
        <IonImg
          className="zeroNotePlaceholderImg"
          src="https://storage.googleapis.com/its-nous-v2/emptyNotesIcon.png"
          alt="Loading graphic for ItsNous notes."
        />
      </div>
      <div className="zeroNotePlaceholderTextContent ion-padding">
        <IonText>
          <p>
            You currently have created zero notes. Start your Nous journey now...
          </p>
        </IonText>
        <IonButton className="zeroNotePlaceholderButton" onClick={() => createNoteLocal()}>
          Start a note...
        </IonButton>
        <IonButton className="zeroNotePlaceholderButton" href="/help">
          Learn more...
        </IonButton>
      </div>
    </div> 
  );
};

export default ZeroNotePlaceholder;