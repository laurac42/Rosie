import { Redirect, Route } from 'react-router-dom';
import React, {useEffect } from 'react';
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
import SignUp from './pages/SignUp';
import Details from './pages/EnterDetails';
import Preferences from './pages/Preferences';
import Privacy from './pages/PrivacyPolicy';
import { loadTheme } from "./theme";
import Welcome from './pages/Welcome';  
import Date from './pages/Date'
import Profile from './pages/Profile'

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

import './theme/darkmode.css';
import './theme/lightmode.css';
import './theme/high-contrast.css'

setupIonicReact();

// load the theme colour on page load
const App: React.FC = () => {
  useEffect(() => {
    loadTheme();
  }, []);

  return (
    <IonApp>
      <IonReactRouter basename="/Rosie">
        <IonTabs>
          <IonRouterOutlet>
            {/*This is all of the different routes for tabs*/}
            <Route exact path="/Cycle">
              <Cycle />
            </Route>
            <Route exact path="/Calendar">
              <Calendar />
            </Route>
            <Route path="/Track">
              <Track />
            </Route>
            <Route exact path="/Analysis">
              <Analysis />
            </Route>
            <Route path="/Calendar/:date">
              <Date />
            </Route>
            <Route exact path="/SignUp">
              <SignUp />
            </Route>
            <Route exact path="/SignUp/EnterDetails">
              <Details />
            </Route>
            <Route exact path="/SignUp/Preferences">
              <Preferences />
            </Route>
            <Route exact path="/SignUp/PrivacyPolicy">
              <Privacy />
            </Route>
            <Route exact path="/SignUp/Welcome">
              <Welcome />
            </Route>
            <Route exact path="/Profile">
              <Profile />
            </Route>
            <Route exact path="/">
              <Redirect to="/SignUp" />
            </Route>
          </IonRouterOutlet>
          <IonTabBar slot="bottom">
            <IonTabButton tab="Rosie" href="/Cycle">
              <IonIcon aria-hidden="true" icon={radioButtonOff} />
              <IonLabel>Cycle</IonLabel>
            </IonTabButton>
            <IonTabButton tab="Calendar" href="/Calendar">
              <IonIcon aria-hidden="true" icon={calendar} />
              <IonLabel>Calendar</IonLabel>
            </IonTabButton>
            <IonTabButton tab="Track" href="/Track">
              <IonIcon aria-hidden="true" icon={clipboard} />
              <IonLabel>Track</IonLabel>
            </IonTabButton>
            <IonTabButton tab="Analysis" href="/Analysis">
              <IonIcon aria-hidden="true" icon={trendingUp} />
              <IonLabel>Analysis</IonLabel>
            </IonTabButton>
          </IonTabBar>
        </IonTabs>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
