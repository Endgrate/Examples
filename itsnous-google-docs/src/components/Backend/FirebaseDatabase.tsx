import { 
  initializeApp 
} from "firebase/app";

import { 
  getFirestore,
  Timestamp,
  doc, 
  setDoc,
  getDocs,
  collection,
  getDoc
} from "firebase/firestore";

import { 
  Note 
} from "../../@types/note";

import { 
  v4 as uuidv4 
} from 'uuid';

export const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "its-nous-v2.firebaseapp.com",
  projectId: "its-nous-v2",
  storageBucket: "its-nous-v2.appspot.com",
  messagingSenderId: "178474803322",
  appId: "1:178474803322:web:e0f593e40ae3f9fbf41bc3",
  measurementId: "G-DZPGQLB8VE"
};

export const app = initializeApp(firebaseConfig);

export function getDatabase() {
  return (
    getFirestore(app)
  );
}

export async function createNote(title: string, content: string, name: string, name_id: string) {

  const newNote: Note = {
    id: uuidv4(), 
    title: title,
    content: content,
    creator: name,
    creator_id: name_id,
    shared_ids: [],
    shared_names: [],
    timestamp: Timestamp.fromDate(new Date()),
    last_modified: Timestamp.fromDate(new Date()),
    linked_google: false,
    linked_notion: false,
    google_docs_linked_id: "",
    notion_docs_linked_id: ""
  };

  try {

    await setDoc(doc(getDatabase(), "users", name_id, "notes", newNote.id), newNote);
    return true;

  } catch (e) {

    console.error("Error adding document: ", e);
    return false;

  }

}

export async function editNote(name_id: string, note: Note) {

  const newNote: Note = {
    id: note.id, 
    title: note.title,
    content: note.content,
    creator: note.creator,
    creator_id: note.creator_id,
    shared_ids: note.shared_ids,
    shared_names: note.shared_names,
    timestamp: note.timestamp,
    last_modified: Timestamp.fromDate(new Date()),
    linked_google: note.linked_google,
    linked_notion: note.linked_notion,
    google_docs_linked_id: note.google_docs_linked_id,
    notion_docs_linked_id: note.notion_docs_linked_id
  };

  try {

    await setDoc(doc(getDatabase(), "users", name_id, "notes", newNote.id), newNote);
    return true;

  } catch (e) {

    console.error("Error updating document: ", e);
    return false;

  }
}

export async function retrieveNotes(name_id: string, sort_type: number) {
  const data = await getDocs(collection(getDatabase(), "users", name_id, "notes"));
  let processed_data:Note[] = []
  data.forEach((note) => {
    processed_data.push(note.data() as Note);
  });

  // sort_type = 0; Descending order by date
  if (sort_type == 0) {
    return processed_data.sort(function(x, y) {
      let start:any = x.last_modified;
      let end:any = y.last_modified;
      return start - end;
    });
  }
  // sort_type = 1; Ascending order by date
  else if (sort_type == 1) {
    return processed_data.sort(function(x, y) {
      let start:any = x.last_modified;
      let end:any = y.last_modified;
      return end - start;
    });
  }
}

export async function retrieveNote(name_id: string, note_id: string) {
  
  const data = await getDoc(doc(getDatabase(), "users", name_id, "notes", note_id));

  return data.data();
}