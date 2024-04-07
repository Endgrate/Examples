import "../Home/NotesSearch.css"

import { 
  IonSearchbar
} from "@ionic/react";

import { 
  LegacyRef,
  useState,
  useRef,
  Ref,
  RefObject
} from "react";

import { 
  useNoteViewCache 
} from "./NoteViewCache";

import { 
  IonSearchbarCustomEvent, 
  SearchbarInputEventDetail 
} from "@ionic/core";

import { 
  Note 
} from "../../../../@types/note";

import { 
  useEffect 
} from "react";

interface ContainerProps {
  reference: RefObject<HTMLIonSearchbarElement>;
}

const NotesSearch: React.FC<ContainerProps> = ({ reference }) => {

  const [allNotes, setAllNotes] = useState([] as Note[])

  const {
    setAmountNotes,
    setNotesViewCache,
    setLocalSearchVal,
    notesViewCache,
    localSearchVal
  } = useNoteViewCache();

  useEffect(() => {
    setAllNotes(notesViewCache);
  }, [])

  function updateSearchResults(e: IonSearchbarCustomEvent<SearchbarInputEventDetail>) {

    setLocalSearchVal(e.detail.value as string)
    let localSearchResults: Note[] = [];

    if (e.detail.value == "") {

      setNotesViewCache(allNotes);
      setAmountNotes(allNotes.length);

    }
    else {

      for (var note of allNotes) {

        if (note.content.toLowerCase().search(e.detail.value?.toLowerCase() as string) > -1) {
  
          localSearchResults.push(note)
  
        }
        else if (note.title.toLowerCase().search(e.detail.value?.toLowerCase() as string) > -1) {
  
          localSearchResults.push(note)
  
        }
        
      }

      setNotesViewCache(localSearchResults);
      setAmountNotes(localSearchResults.length);

    }
  }

  return (
    <IonSearchbar
      value={localSearchVal}
      onIonInput={(e) => updateSearchResults(e)}
      ref={reference}
      className="noteSearchBar"
      autocapitalize=""
    />
  );
};

export default NotesSearch;