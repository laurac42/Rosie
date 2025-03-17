import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonIcon, IonRow, IonGrid, IonCol, IonItem, IonRadioGroup, IonRadio, IonCheckbox } from '@ionic/react';
import { flower, heart, person, personCircle, rose } from 'ionicons/icons';
import React, { useState, useEffect } from 'react';
import { applyTheme } from "../theme";
import ExploreContainer from '../components/ExploreContainer';


const Preferences: React.FC = () => {
    const [theme, setTheme] = useState<string>('');
    const [notifications, setNotifications] = useState<string[]>([]);

    // to handle the selection of a theme change radio button
    // sets the theme constant to whatever was the theme selected by the radio buttons
    const handleThemeChange = (e: CustomEvent<any>) => {
        setTheme(e.detail.value);
        applyTheme(e.detail.value);
    };

    function requestPermission() {
        Notification.requestPermission().then((result) => {
            if (result === "granted") {
                console.log("saving to local storage");
                randomNotification();
            }
            localStorage.setItem('Notifications', result); // set the local storage to granted so it can be accessed everywhere
        })
    }    

    function clickedNotification(e: CustomEvent<any>) {
        console.log(e.detail.value);
        // if the notifications array includes what was clicked already, it needs to be removed
        // if it does not include it, it needs to be added
        if (notifications.includes(e.detail.value)) {
            var index = notifications.indexOf(e.detail.value);
            notifications.splice(index, 1);
        }
        else {
            notifications.push(e.detail.value);
        }
        localStorage.chosenNotifications = JSON.stringify(notifications);
    }

    function randomNotification() {
        const notifTitle = "This is a notification";
        const notifBody = `Created by Laura`;
        const notifImg = `/Rosie/rose.png`;
        const options = {
          body: notifBody,
          icon: notifImg,
        };
        new Notification(notifTitle, options);
        //setTimeout(randomNotification, 30000);
      }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle >Preferences</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonGrid fixed={true}>
                    <IonRow class="ion-justify-content-center"><h1 className="heading"><IonIcon icon={flower} className='colourIcon'></IonIcon> Choose Preferences <IonIcon icon={flower} className='colourIcon'></IonIcon></h1></IonRow>
                    <IonRow class="ion-justify-content-center"><p>(You can change these later in settings)</p></IonRow>
                    <IonRow class="ion-justify-content-start"><p><b> Appearance:</b> </p></IonRow>
                    <IonRadioGroup value={theme} onIonChange={handleThemeChange}>
                        <IonRow class="ion-justify-content-start"><IonRadio value="light" labelPlacement="end" justify="space-between">Light Mode</IonRadio></IonRow>
                        <br />
                        <IonRow class="ion-justify-content-start"><IonRadio value="dark" justify="space-between" labelPlacement='end' >Dark Mode</IonRadio></IonRow>
                        <br />
                        <IonRow class="ion-justify-content-start"><IonRadio value="contrast" labelPlacement="end" justify="space-between">High Contrast Mode</IonRadio></IonRow>
                        <br />
                    </IonRadioGroup>

                    <IonRow class="ion-justify-content-start">
                        <p><b>Notifications:</b></p>
                    </IonRow>
                    <IonRow class="checkbox"><IonCheckbox onIonChange={clickedNotification} value="upcoming" labelPlacement="end">Upcoming Period Reminder</IonCheckbox></IonRow>
                    <IonRow><IonCheckbox onIonChange={clickedNotification} value="daily" labelPlacement="end">Daily Track Reminder</IonCheckbox></IonRow>
                    <IonRow class="ion-justify-content-center">
                        <IonButton onClick={requestPermission} className="btn" size="large">Save Preferences</IonButton>
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage>
    );
};

export default Preferences;
