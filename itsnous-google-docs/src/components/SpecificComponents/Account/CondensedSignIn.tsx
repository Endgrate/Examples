import './CondensedSignInProfile.css';

import { 
  IonButtons,
  IonButton,
  IonImg
} from '@ionic/react';

import { useClerk } from '@clerk/clerk-react';

const Condensed_SignIn: React.FC = () => {
  const clerk = useClerk();
  return (
    <div className="condensed_signin_container">
      <div className="condensed_signin">
        <div className="condensed_signin_left">
          <IonImg
            src="https://storage.googleapis.com/its-nous-v2/loginGraphic.png"
            alt="Textus Logo Simple"
          />
        </div>
        <div className="condensed_signin_right">
          <h4>
            <b>
              Join Nous Today
            </b>
          </h4>
          <IonButtons>
            <IonButton onClick={() => clerk.openSignIn({})}>
              Sign In
            </IonButton>
            <IonButton onClick={() => clerk.openSignUp({})}> 
              Sign Up
            </IonButton>
          </IonButtons>
        </div>
      </div>
    </div>
  );
};

export default Condensed_SignIn;
