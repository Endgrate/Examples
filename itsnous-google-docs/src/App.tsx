// Ion Basic Components
import { 
  Redirect, 
  Route 
} from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact
} from '@ionic/react';
import { 
  IonReactRouter 
} from '@ionic/react-router';
import { 
  createOutline, 
  analyticsOutline, 
  personOutline
} from 'ionicons/icons';

// Pages
import Notes from './pages/Authenticated/Notes/Notes';
import Finance from './pages/Authenticated/Finance/FinanceNews';
import Account from './pages/Authenticated/Account';

// Core CSS required for Ionic components to work properly
import '@ionic/react/css/core.css';

// Basic CSS for apps built with Ionic
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

// Optional CSS utils that can be commented out
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

// Theme variables
import './theme/variables.css';
import EditNote from './pages/Authenticated/Notes/EditNote';
import NotesSuccess from './pages/Authenticated/Notes/NotesSuccess';
import Help from './pages/Authenticated/Help';
import FinanceNews from './pages/Authenticated/Finance/FinanceNews';
import FinanceHome from './pages/Authenticated/Finance/FinanceHome';

import { 
  getAnalytics 
} from "firebase/analytics";

import { 
  app
} from './components/Backend/FirebaseDatabase';

import { 
  SignedIn, 
  SignedOut 
} from '@clerk/clerk-react';

setupIonicReact({
  rippleEffect: false,
  mode: 'md',
});

getAnalytics(app);

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
        <IonRouterOutlet onPointerEnterCapture={() => {}} onPointerLeaveCapture={() => {}}>

          <Route exact path="/notes">
            <SignedIn>
              <Notes />
            </SignedIn>
            <SignedOut>
              <Redirect to="/account" />
            </SignedOut>
          </Route>

          <Route exact path="/help">
            <SignedIn>
              <Help />
            </SignedIn>
            <SignedOut>
              <Redirect to="/account" />
            </SignedOut>
          </Route>

          <Route exact path="/finance/news">
            <SignedIn>
              <FinanceNews />
            </SignedIn>
            <SignedOut>
              <Redirect to="/account" />
            </SignedOut>
          </Route>

          <Route path="/account">
            <Account />
          </Route>

          <Route exact path="/">
            <SignedIn>
              <Redirect to="/notes"/>
            </SignedIn>
            <SignedOut>
              <Redirect to="/account"/>
            </SignedOut>
          </Route>

          <Route exact path="/notes/edit/:note_id" component={EditNote} />
          <Route exact path="/notes/edit/:note_id/success" component={NotesSuccess} />

        </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;
