import { Timestamp } from "firebase/firestore";

export interface Note {
  id: string;
  title: string;
  content: string;
  creator: string,
  creator_id: string,
  shared_ids: Array<String>,
  shared_names: Array<String>,
  timestamp: Timestamp,
  last_modified: Timestamp,
  linked_google: boolean,
  linked_notion: boolean,
  google_docs_linked_id: string,
  notion_docs_linked_id: string
}