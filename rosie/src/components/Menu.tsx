import { IonMenu, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonAccordionGroup, IonAccordion, IonItem, IonIcon, IonLabel } from "@ionic/react";
import { folderOpen, radioButtonOff, calendar, clipboard, trendingUp, settings, colorPalette, notifications, people, lockClosed, informationCircle, personCircle } from "ionicons/icons";


const Menu: React.FC = () => {
  return (
    <IonMenu contentId="main-content">
      <IonHeader>
        <IonToolbar>
          <IonTitle>Menu</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>

        <IonList class="menu">
          <IonAccordionGroup>
            <IonAccordion class="accordionIcon" value="first">
              <IonItem className="menuHover" slot="header">
                <IonIcon className="menuIcon" icon={folderOpen} slot="start"></IonIcon>
                <IonLabel>Main Pages</IonLabel>
              </IonItem>
              <div className="ion-padding" slot="content">
                <IonItem className="menuHover" href="/Rosie/Cycle">
                  <IonIcon className="menuIcon" icon={radioButtonOff} slot="start"></IonIcon>
                  <IonLabel>Cycle</IonLabel>
                </IonItem>
              </div>
              <div className="ion-padding" slot="content">
                <IonItem className="menuHover" href="/Rosie/Calendar">
                  <IonIcon className="menuIcon" icon={calendar} slot="start"></IonIcon>
                  <IonLabel>Calendar</IonLabel>
                </IonItem>
              </div>
              <div className="ion-padding" slot="content">
                <IonItem className="menuHover" href="/Rosie/Track">
                  <IonIcon className="menuIcon"  icon={clipboard} slot="start"></IonIcon>
                  <IonLabel>Track</IonLabel>
                </IonItem>
              </div>
              <div className="ion-padding" slot="content">
                <IonItem className="menuHover" href="/Rosie/Analysis">
                  <IonIcon className="menuIcon" icon={trendingUp} slot="start"></IonIcon>
                  <IonLabel>Analysis</IonLabel>
                </IonItem>
              </div>
            </IonAccordion>


            <IonAccordion class="accordionIcon" value="second">
              <IonItem className="menuHover" slot="header">
                <IonIcon className="menuIcon"  icon={settings} slot="start"></IonIcon>
                <IonLabel className="menuHover">Settings</IonLabel>
              </IonItem>
              <div className="ion-padding" slot="content">
                <IonItem className="menuHover" href="/Rosie/Menu/Appearance">
                  <IonIcon className="menuIcon"  icon={colorPalette} slot="start"></IonIcon>
                  <IonLabel>Appearance</IonLabel>
                </IonItem>
              </div>
              <div className="ion-padding" slot="content">
                <IonItem className="menuHover" href='/Rosie/Menu/Notifications'>
                  <IonIcon className="menuIcon"  icon={notifications} slot="start"></IonIcon>
                  <IonLabel>Notifications</IonLabel>
                </IonItem>
              </div>
              <div className="ion-padding" slot="content">
                <IonItem className="menuHover" href='/Rosie/Profile'>
                  <IonIcon className="menuIcon"  icon={personCircle} slot="start"></IonIcon>
                  <IonLabel>Profile</IonLabel>
                </IonItem>
              </div>
            </IonAccordion>
          </IonAccordionGroup>

          <IonItem className="menuHover" href="/Rosie/Menu/AboutUs">
            <IonIcon className="menuIcon" icon={people} slot="start"></IonIcon>
            <IonLabel>About Us</IonLabel>
          </IonItem>
          <IonItem className="menuHover" href='/Rosie/Menu/PrivacyPolicy'>
            <IonIcon className="menuIcon" icon={lockClosed} slot="start"></IonIcon>
            <IonLabel>Privacy Policy</IonLabel>
          </IonItem>
          <IonItem className="menuHover" href='/Rosie/Menu/Resources'>
            <IonIcon className="menuIcon" icon={informationCircle} slot="start"></IonIcon>
            <IonLabel>Resources</IonLabel>
          </IonItem>

        </IonList>
      </IonContent>

    </IonMenu>
  );
};

export default Menu;
