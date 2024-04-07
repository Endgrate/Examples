import "../Home/NoteCard.css";

import { 
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle
} from "@ionic/react";

interface ContainerProps {
  title: string;
  date: Date;
  content: string;
}

const NoteCard: React.FC<ContainerProps> = ({ title, date, content }) => {
  return (
    <IonCard className="noteCard">
      <IonCardHeader>
        <IonCardTitle>
          { title }
        </IonCardTitle>
        <IonCardSubtitle>
          Last edited on { date.toDateString() } ({ date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }) })
        </IonCardSubtitle>
      </IonCardHeader>
      <IonCardContent>
        { content.substring(0,100) }
      </IonCardContent>
    </IonCard>

  );
};

export default NoteCard;