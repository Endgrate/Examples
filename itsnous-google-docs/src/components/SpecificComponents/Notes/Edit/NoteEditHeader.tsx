import "../Edit/NoteEditHeader.css"

import { 
  IonHeader,
  IonToolbar,
  IonTextarea,
  TextareaCustomEvent
} from "@ionic/react";

import { 
  useNoteCache 
} from "./NoteCache";

import { 
  Note 
} from "../../../../@types/note";

import { 
  editNote
} from "../../../Backend/FirebaseDatabase";

import { 
  useState,
  useEffect
} from "react";

import NoteStatus from "./NoteStatus";

import NoteCounter from "./NoteCounter";

const NoteEditHeader: React.FC = () => {

  const [localLength, setLocalLength] = useState(0);

  const {  
    noteCached,
    status,
    setNoteCached
  } = useNoteCache();

  useEffect(() => 
  {
    async function updateCounter() {
      setLocalLength(noteCached.content.length)
    }
    updateCounter();
  }, [noteCached])

  async function editNoteLocal(e: TextareaCustomEvent) {
  
    const noteLocal: Note = {
      id: noteCached.id, 
      title: e.detail.value as string,
      content: noteCached.content,
      creator: noteCached.creator,
      creator_id: noteCached.creator_id,
      shared_ids: noteCached.shared_ids,
      shared_names: noteCached.shared_names,
      timestamp: noteCached.timestamp,
      last_modified: noteCached.last_modified,
      linked_google: noteCached.linked_google,
      linked_notion: noteCached.linked_notion,
      google_docs_linked_id: noteCached.google_docs_linked_id,
      notion_docs_linked_id: noteCached.notion_docs_linked_id
    };

    setNoteCached(noteLocal);
    
  }

  return (
    <IonHeader class="ion-no-border">
      <IonToolbar>
        <IonTextarea
          value={noteCached.title}
          debounce={250}
          wrap="off"
          onIonInput={(e) => editNoteLocal(e)}
          className="noteEditHeaderTitle ion-margin"
          fill="outline"
          placeholder="Untitled"
        ></IonTextarea>
        <NoteCounter length={localLength} />
        <NoteStatus status={status} />
      </IonToolbar>
    </IonHeader>
  );
};

export default NoteEditHeader;