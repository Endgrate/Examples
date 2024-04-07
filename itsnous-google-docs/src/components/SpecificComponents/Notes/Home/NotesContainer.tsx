import "../Home/NotesContainer.css";

import { 
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonRouterLink,
  IonTitle
} from "@ionic/react";

import NewNoteButton from "./NewNoteButton";

import NoteCard from "./NoteCard";

import { 
  retrieveNotes 
} from "../../../Backend/FirebaseDatabase";

import { 
  useState,
  useEffect 
} from "react";

import { 
  Note 
} from "../../../../@types/note";

import { 
  onSnapshot,
  collection,
} from "@firebase/firestore";

import { 
  getDatabase 
} from "../../../Backend/FirebaseDatabase";

import { 
  useNoteViewCache 
} from "./NoteViewCache";

import NotesSearch from "./NotesSearch";

import { 
  useRef 
} from "react";

import SearchNotesButton from "./SearchNotesButton";

import NoteViewLoading from "./NoteViewLoading";

import { 
  useUser 
} from "@clerk/clerk-react";

import ZeroNotePlaceholder from "./ZeroNotePlaceholder";

const NotesContainer: React.FC = () => {

  const input = useRef<HTMLIonSearchbarElement>(null);

  const [allNotes, setAllNotes] = useState([] as Note[]);

  const {
    setNotesViewCache,
    setAmountNotes,
    setAllNotesLength,
    allNotesLength,
    notesViewCache
  } = useNoteViewCache();

  const { user } = useUser();

  const [progress, setProgress] = useState(false);

  useEffect(() => {
    async function getNotes() {
      try {
        let note_data: Note[] = await retrieveNotes(user?.id as string, 1) as Note[];
        if (note_data != undefined) {
          setNotesViewCache(note_data);
          setAllNotes(note_data);
          setAllNotesLength(note_data.length);
          setAmountNotes(note_data.length)
          setProgress(true);
        }
      }
      catch (e) {
        console.error("Error retrieving documents: ", e);
      }
    }
    getNotes();
  }, []);
  
  if ((allNotesLength == 0) && (progress == true)) {
    return (
      <>
        <IonContent className="notesContainer">
          <NotesSearch reference={input} />
          <ZeroNotePlaceholder />
        </IonContent>
        <NewNoteButton reference={input} />
        <SearchNotesButton reference={input} />
      </>
    );
  }
  else if (progress == true) {
    return (
      <>
        <IonContent className="notesContainer">
          <NotesSearch reference={input} />
          <IonGrid className="notesContainerGrid">
            <IonRow>
              {notesViewCache.map(item => {
                return (
                  <IonCol size-xs="12" size-lg="3">
                    <IonRouterLink href={`/notes/edit/${item.id}`}>
                      <NoteCard
                        title={item.title}
                        content={item.content}
                        date={item.last_modified.toDate()}
                      />
                    </IonRouterLink>
                  </IonCol>
                )
              })}
            </IonRow>
          </IonGrid>
        </IonContent>
        <NewNoteButton reference={input} />
        <SearchNotesButton reference={input} />
      </>
    );
  } 
  else if (progress == false) {
    return (
      <NoteViewLoading />
    );
  }
};

export default NotesContainer;