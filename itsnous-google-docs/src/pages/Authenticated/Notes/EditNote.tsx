import { 
  IonPage
} from '@ionic/react';

import { 
  RouteComponentProps
} from 'react-router';

import EditNoteContainer from '../../../components/SpecificComponents/Notes/Edit/EditNoteContainer';
import { NoteCacheProvider } from '../../../components/SpecificComponents/Notes/Edit/NoteCache';

interface ContainerProps 
extends RouteComponentProps<{
  note_id: string;
}> {}

const EditNote: React.FC<ContainerProps> = ({ match }) => {
  return (
    <IonPage>
      <NoteCacheProvider>
        <EditNoteContainer match={match} />
      </NoteCacheProvider>
    </IonPage>
  );
};

export default EditNote;
