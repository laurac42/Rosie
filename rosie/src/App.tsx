import { Redirect, Route } from 'react-router-dom';
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
import { IonReactRouter } from '@ionic/react-router';
import { ellipse, radioButtonOff, square, triangle, calendar, clipboard, trendingUp } from 'ionicons/icons';
import Cycle from './pages/Cycle';
import Calendar from './pages/Calendar';
import Track from './pages/Track';
import Analysis from './pages/Analysis';
import SignUp from './pages/Sign-Up';
import Details from './pages/Enter-Details';
import Preferences from './pages/Preferences';
import Privacy from './pages/Privacy-Policy';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
/*import '@ionic/react/css/palettes/dark.system.css';*/

/* Theme variables */
import './theme/variables.css';

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          {/*This is all of the different routes for tabs*/}
          <Route exact path="/Rosie/Cycle">
            <Cycle/>
          </Route>
          <Route exact path="/Rosie/Calendar">
            <Calendar />
          </Route>
          <Route path="/Rosie/Track">
            <Track />
          </Route>
          <Route exact path="/Rosie/Analysis">
            <Analysis/>
          </Route>
        </IonRouterOutlet>
        <IonTabBar slot="bottom">
          <IonTabButton tab="Rosie" href="/Rosie/Cycle">
            <IonIcon aria-hidden="true" icon={radioButtonOff} />
            <IonLabel>Cycle</IonLabel>
          </IonTabButton>
          <IonTabButton tab="Calendar" href="/Rosie/Calendar">
            <IonIcon aria-hidden="true" icon={calendar} />
            <IonLabel>Calendar</IonLabel>
          </IonTabButton>
          <IonTabButton tab="Track" href="/Rosie/Track">
            <IonIcon aria-hidden="true" icon={clipboard} />
            <IonLabel>Track</IonLabel>
          </IonTabButton>
          <IonTabButton tab="Analysis" href="/Rosie/Analysis">
            <IonIcon aria-hidden="true" icon={trendingUp} />
            <IonLabel>Analysis</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
      {/*This is all of the different routes for other pages not in tabs*/}
      <Route path="/Rosie/Sign-Up">
        <SignUp />
      </Route>
      <Route path="/Rosie/Sign-Up/Enter-Details">
        <Details />
      </Route>
      <Route path="/Rosie/Sign-Up/Preferences">
        <Preferences />
      </Route>
      <Route path="/Rosie/Sign-Up/Privacy-Policy">
        <Privacy />
      </Route>
      
    </IonReactRouter>
  </IonApp>
);

export default App;
