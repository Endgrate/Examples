
import React from "react";

import { 
  useState 
} from "react";

import { 
  Note 
} from "../../../../@types/note";

interface TempNoteViewCache {
  amountNotes: number;
  notesViewCache: Note[];
  localSearchVal: string;
  allNotesLength: number;
  setAmountNotes: Function;
  setNotesViewCache: Function;
  setLocalSearchVal: Function;
  setAllNotesLength: Function;
}

interface ContainerProps {
  children?: React.ReactNode;
}

export const NoteViewCache = React.createContext<TempNoteViewCache | undefined>(undefined);

export const NoteViewCacheProvider: React.FC<ContainerProps> = ({ children }) => {
  
  const [amountNotes, setAmountNotes] = useState(0);
  const [notesViewCache, setNotesViewCache] = useState([] as Note[]);
  const [localSearchVal, setLocalSearchVal] = useState("");
  const [allNotesLength, setAllNotesLength] = useState(0);

  let state: TempNoteViewCache = { 
    amountNotes: amountNotes,
    notesViewCache: notesViewCache,
    localSearchVal: localSearchVal,
    allNotesLength: allNotesLength,
    setAmountNotes,
    setNotesViewCache,
    setLocalSearchVal,
    setAllNotesLength
  }

  return (
    <NoteViewCache.Provider value={state}>
      {children}
    </NoteViewCache.Provider>
  );
};

export default NoteViewCache;

export const useNoteViewCache = () => React.useContext<TempNoteViewCache | undefined>(NoteViewCache)!;