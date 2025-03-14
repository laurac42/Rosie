import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonIcon, IonRow, IonGrid, IonCol, IonItem, IonRadioGroup, IonRadio, IonCheckbox } from '@ionic/react';
import { flower, heart, person, personCircle, rose } from 'ionicons/icons';
import React, { useState, useEffect } from 'react';
import { applyTheme } from "../theme";
import { messaging, getToken } from '../main';

const Preferences: React.FC = () => {
    const [theme, setTheme] = useState<string>('');
    const [notifications, setNotifications] = useState<string[]>([]);

    // to handle the selection of a theme change radio button
    // sets the theme constant to whatever was the theme selected by the radio buttons
    const handleThemeChange = (e: CustomEvent<any>) => {
        setTheme(e.detail.value);
        applyTheme(e.detail.value);
    };

    // Request permission and get token
    async function requestPermissionAndGetToken() {
        try {
            // Requesting user permission to show notifications
            const permission = await Notification.requestPermission();

            if (permission === 'granted') {
                console.log('Notification permission granted.');

                // Get the messaging token
                const token = await getToken(messaging, {
                    vapidKey: 'BIkMQAQwCbdPejVUun-u0aXe0TTIyjoVSHzpQempg__aLId_AmHQ'
                });

                console.log('FCM Token:', token);
                // Now you can send the token to your server for later use

            } else {
                console.error('Notification permission denied');
            }
        } catch (error) {
            console.error('Error getting permission or token:', error);
        }

    }


    /*function setUpNotifications() {
        // check if permissions have been granted and if not, ask the user for permission
        if (notifications.length > 0)
        {
            if (Notification.permission !== "granted") {
                Notification.requestPermission() // Request notification permission from the user's device
              }
            else {
                console.log("permission granted")
            }
        }
        if (Notification.permission == "granted")
        {
            navigator.serviceWorker.ready.then(function(registration) {
                registration.pushManager.subscribe({
                  userVisibleOnly: true,
                  applicationServerKey: 'BNmpeL7dxkKEBs52d_Ia45J6DCZeEiileN8fHY6sG-UHhmsajFmkqDkTEmj3nfZoXcdmO-8sZQbYbwfojTd9wNg' // Your public VAPID key
                }).then(function(subscription) {
                  console.log('Subscribed to push notifications:', subscription);
                  // Send subscription info to your server to manage push notifications
                }).catch(function(error) {
                  console.error('Push subscription failed:', error);
                });
              });
          }
    }*/

    function clickedNotification(e: CustomEvent<any>) {
        console.log("a notification was clicked");
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
        console.log(notifications);
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
                        {/* stay on the same page for now href="/Rosie/SignUp/PrivacyPolicy"*/}
                        <IonButton className="btn" onClick={requestPermissionAndGetToken} size="large">Save Preferences</IonButton>
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage>
    );
};

export default Preferences;
