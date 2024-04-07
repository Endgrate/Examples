import "../Help/GeneralInfoContainer.css"

import { 
  IonImg,
  IonText 
} from "@ionic/react";

interface ContainerProps {
  title: string;
  content: string;
  image_url: string;
  alternate: boolean;
}

const GeneralInfoContainer: React.FC<ContainerProps> = ({ title, content, image_url, alternate }) => {

  if (alternate) {
    return (
      <div className="generalInfoContainer">
        <div className="generalInfoContainerTextContent">
          <IonImg
            className="generalInfoContainerImg"
            src={image_url}
            alt="Loading graphic for ItsNous notes."
          />
        </div>
        <div className="generalInfoContainerTextContent ion-padding">
          <IonText>
            <h1>
              { title }
            </h1>
            <p>
              { content }
            </p>
          </IonText>
        </div>
      </div> 
    );
  }
  else {
    return (
      <div className="generalInfoContainer">
        <div className="generalInfoContainerTextContent ion-padding">
          <IonText>
            <h1>
              { title }
            </h1>
            <p>
              { content }
            </p>
          </IonText>
        </div>
        <div className="generalInfoContainerTextContent">
          <IonImg
            className="generalInfoContainerImg"
            src={image_url}
            alt="Loading graphic for ItsNous notes."
          />
        </div>
      </div> 
    );
  }

};

export default GeneralInfoContainer;