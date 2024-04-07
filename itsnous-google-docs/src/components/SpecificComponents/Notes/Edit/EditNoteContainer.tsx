import "../Home/NotesContainer.css";

import { 
  IonContent
} from "@ionic/react";

import { 
  useNoteCache 
} from "./NoteCache";

import { 
  useUser
} from "@clerk/clerk-react";

import { 
  useEffect 
} from "react";

import { 
  retrieveNote,
  editNote
} from "../../../Backend/FirebaseDatabase";

import { 
  Note 
} from "../../../../@types/note";

import NoteEditHeader from "./NoteEditHeader";

import NoteInput from "./NoteInput";

import NoteEditBottomNav from "./NoteEditBottomNav";

interface ContainerProps {
  match: any
}

const EditNoteContainer: React.FC<ContainerProps> = ({ match }) => { 

  const { 
    user,
    isLoaded
  } = useUser();

  const {  
    noteCached,
    setNoteCached,
    setStatus,
    status
  } = useNoteCache();

  useEffect(() => 
  {
    async function initializeNote() {
      if (isLoaded) {
        let currentNote: Note = await retrieveNote(user?.id as string, match.params.note_id) as Note;
        setNoteCached(currentNote);
        setStatus(true);
      }
    }
    initializeNote();
  }, [isLoaded])

  useEffect(() => 
  {
    async function updateNote() {
      if ((isLoaded == true) && (status == true)) {
        console.log(status);
        setStatus(false);
        if (await editNote(noteCached.creator_id, noteCached) == true) {
          setStatus(true);
        }
      }
    }
    updateNote();
  }, [noteCached])


  if ((isLoaded == true) && (noteCached as Note != {} as Note)) {
    return (
      <>
        <NoteEditHeader />
        <IonContent fullscreen>
          <NoteInput />
        </IonContent>
        <NoteEditBottomNav />
      </>
    );
  }

};

export default EditNoteContainer;