import "../Finance/FinanceNewsViewerModal.css";

import { 
  IonModal,
  IonText,
  IonButton,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonTitle,
  IonContent,
  IonImg
} from "@ionic/react";

import { 
  useRef
} from "react";

import { 
  useFinanceNewsCache 
} from "./FinanceNewsCache";

interface ContainerProps {
  trigger_id: string;
}

const FinanceNewsViewerModal: React.FC<ContainerProps> = ({ trigger_id }) => {

  const {
    tempArticleContent,
    openNewsViewer,
    setOpenNewsViewer
  } = useFinanceNewsCache();

  const modalViewer = useRef<HTMLIonModalElement>(null);
  let cutoff_length: number = 20;

  function closeNewsViewer() {
    modalViewer.current?.dismiss();
    setOpenNewsViewer(false);
  }

  if (tempArticleContent.images != undefined) {

    console.log(tempArticleContent.content);

    let proccessed_title: string = tempArticleContent.headline;

    if (proccessed_title.length > cutoff_length) {
      proccessed_title = proccessed_title.substring(0, cutoff_length) + "...";
    }

    const imageHeader = {
      background: `url(${tempArticleContent.images[0].url})`
    };

    return (
      <IonModal id="open" isOpen={openNewsViewer} className="financeNewsViewerModal" ref={modalViewer} trigger={trigger_id}>
        <IonHeader class="ion-no-border">
          <IonToolbar>
            <IonTitle slot="start">
              { proccessed_title }
            </IonTitle>
            <IonButtons slot="end">
              <IonButton onClick={() => closeNewsViewer()}>Close</IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <div className="financeNewsViewerModalContent">
          <div style={imageHeader} className="financeNewsViewerModalImg">
            <div className="financeNewsViewerModalInfo ion-padding">
              <h1>
                { tempArticleContent.headline }
              </h1>
              <p>
                By { tempArticleContent.author } ({ tempArticleContent.created_at })
              </p>
            </div>
          </div>
          <div dangerouslySetInnerHTML={{__html: tempArticleContent.content}} className="financeNewsViewerModalTextContent ion-padding" />
        </div>
      </IonModal>
    );
  }
};

export default FinanceNewsViewerModal;