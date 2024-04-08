import './CondensedSignInProfile.css';

import { 
  IonButtons,
  IonButton,
  IonImg
} from '@ionic/react';

import { useUser, useClerk } from '@clerk/clerk-react';

const Condensed_Profile: React.FC = () => {
  const { user } = useUser();
  const clerk = useClerk();

  var name_of_user = "Nous User"
  if (user?.fullName != null) {
    name_of_user = user?.fullName;
  }

  return (
    <div className="condensed_signin_container">
      <div className="condensed_signin">
        <div className="condensed_signin_left">
          <IonImg
            className="condensed_signin_profile"
            src={user?.imageUrl}
            alt="User Profile Picture"
          />
        </div>
        <div className="condensed_signin_right">
          <h4>
            <b>
              {user?.fullName}
            </b>
          </h4>
          {/* <p>
            Joined {(user?.createdAt)?.toDateString()}
          </p> */}
          <IonButtons>
            <IonButton onClick={() => clerk.signOut({})}>
              Sign Out
            </IonButton>
          </IonButtons>
        </div>
      </div>
    </div>
  );
};

export default Condensed_Profile;
