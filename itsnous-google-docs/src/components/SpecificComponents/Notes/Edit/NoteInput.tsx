import "../Edit/NoteInput.css";

import { 
  IonContent,
  IonTextarea,
  TextareaCustomEvent
} from "@ionic/react";

import { 
  useNoteCache 
} from "./NoteCache";

import { 
  Note 
} from "../../../../@types/note";

const NoteInput: React.FC = () => {

  const {  
    noteCached,
    setNoteCached
  } = useNoteCache();

  async function editNoteLocal(e: TextareaCustomEvent) {
  
    const noteLocal: Note = {
      id: noteCached.id, 
      title: noteCached.title,
      content: e.detail.value as string,
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
    <IonContent className="ion-padding">
      <IonTextarea
        value={noteCached.content}
        debounce={250}
        onIonInput={(e) => editNoteLocal(e)}
        rows={30}
        autoGrow={true}
        className="noteInput"
        fill="solid"
        placeholder="Start your note here..."
      ></IonTextarea>
    </IonContent>
  );
};

export default NoteInput;