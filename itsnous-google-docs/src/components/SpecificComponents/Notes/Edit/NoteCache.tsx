
import React from "react";

import { 
  useState 
} from "react";

import { 
  Note 
} from "../../../../@types/note";

interface TempNoteCache {
  noteCached: Note;
  status: boolean;
  setStatus: Function;
  setNoteCached: Function;
}

interface ContainerProps {
  children?: React.ReactNode;
}

export const NoteCache = React.createContext<TempNoteCache | undefined>(undefined);

export const NoteCacheProvider: React.FC<ContainerProps> = ({ children }) => {
  
  const [noteCached, setNoteCached] = useState({} as Note);
  const [status, setStatus] = useState(false);

  let state: TempNoteCache = { 
    noteCached: noteCached,
    status: status,
    setStatus,
    setNoteCached
  };

  return (
    <NoteCache.Provider value={state}>
      {children}
    </NoteCache.Provider>
  );
};

export default NoteCache;

export const useNoteCache = () => React.useContext<TempNoteCache | undefined>(NoteCache)!;