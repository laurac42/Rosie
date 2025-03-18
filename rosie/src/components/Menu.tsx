import { IonMenu, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonAccordionGroup, IonAccordion, IonItem, IonIcon, IonLabel } from "@ionic/react";
import { folderOpen, radioButtonOff, calendar, clipboard, trendingUp, settings, colorPalette, notifications, people, lockClosed, informationCircle } from "ionicons/icons";


const Menu: React.FC = () => {
  return (
    <IonMenu contentId="main-content">
      <IonHeader>
        <IonToolbar>
          <IonTitle>Menu</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>

        <IonList>
          <IonAccordionGroup>
            <IonAccordion class="accordionIcon" value="first">
              <IonItem className="menuHover" slot="header">
                <IonIcon className="menuIcon" aria-hidden="true" icon={folderOpen} slot="start"></IonIcon>
                <IonLabel>Main Pages</IonLabel>
              </IonItem>
              <div className="ion-padding" slot="content">
                <IonItem className="menuHover" href="/Rosie/Cycle">
                  <IonIcon className="menuIcon" aria-hidden="true" icon={radioButtonOff} slot="start"></IonIcon>
                  <IonLabel>Cycle</IonLabel>
                </IonItem>
              </div>
              <div className="ion-padding" slot="content">
                <IonItem className="menuHover" href="/Rosie/Calendar">
                  <IonIcon className="menuIcon" aria-hidden="true" icon={calendar} slot="start"></IonIcon>
                  <IonLabel>Calendar</IonLabel>
                </IonItem>
              </div>
              <div className="ion-padding" slot="content">
                <IonItem className="menuHover" href="/Rosie/Track">
                  <IonIcon className="menuIcon" aria-hidden="true" icon={clipboard} slot="start"></IonIcon>
                  <IonLabel>Track</IonLabel>
                </IonItem>
              </div>
              <div className="ion-padding" slot="content">
                <IonItem className="menuHover" href="/Rosie/Analysis">
                  <IonIcon className="menuIcon" aria-hidden="true" icon={trendingUp} slot="start"></IonIcon>
                  <IonLabel>Analysis</IonLabel>
                </IonItem>
              </div>
            </IonAccordion>


            <IonAccordion class="accordionIcon" value="second">
              <IonItem className="menuHover" slot="header">
                <IonIcon className="menuIcon" aria-hidden="true" icon={settings} slot="start"></IonIcon>
                <IonLabel className="menuHover">Settings</IonLabel>
              </IonItem>
              <div className="ion-padding" slot="content">
                <IonItem className="menuHover" href="/Rosie/Menu/Appearance">
                  <IonIcon className="menuIcon" aria-hidden="true" icon={colorPalette} slot="start"></IonIcon>
                  <IonLabel>Appearance</IonLabel>
                </IonItem>
              </div>
              <div className="ion-padding" slot="content">
                <IonItem className="menuHover" href='/Rosie/Menu/Notifications'>
                  <IonIcon className="menuIcon" aria-hidden="true" icon={notifications} slot="start"></IonIcon>
                  <IonLabel>Notifications</IonLabel>
                </IonItem>
              </div>
            </IonAccordion>
          </IonAccordionGroup>

          <IonItem className="menuHover" href="/Rosie/Menu/AboutUs">
            <IonIcon className="menuIcon" aria-hidden="true" icon={people} slot="start"></IonIcon>
            <IonLabel>About Us</IonLabel>
          </IonItem>
          <IonItem className="menuHover" href='/Rosie/Menu/PrivacyPolicy'>
            <IonIcon className="menuIcon" aria-hidden="true" icon={lockClosed} slot="start"></IonIcon>
            <IonLabel>Privacy Policy</IonLabel>
          </IonItem>
          <IonItem className="menuHover" href='/Rosie/Menu/Resources'>
            <IonIcon className="menuIcon" aria-hidden="true" icon={informationCircle} slot="start"></IonIcon>
            <IonLabel>Resources</IonLabel>
          </IonItem>

        </IonList>
      </IonContent>

    </IonMenu>
  );
};

export default Menu;
