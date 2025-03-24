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

    // modified from - https://github.com/mdn/serviceworker-cookbook/blob/master/push-payload/index.js
    function setUpNotifications() {
        // request permission if it isnt already given
        if (notifications.length > 0) { // only request permission if required
            Notification.requestPermission().then((result) => {
                if (result === "granted") {

                    navigator.serviceWorker.ready
                        .then(function (registration) {
                            // Use the PushManager to get the user's subscription to the push service.
                            return registration.pushManager.getSubscription()
                                .then(async function (subscription) {
                                    // If a subscription was found, return it.
                                    if (subscription) {
                                        return subscription;
                                    }

                                    // this link is a page that has the public key
                                    const response = await fetch('https://rosie-production.up.railway.app/vapidPublicKey');
                                    //console.log(response.text())
                                    const vapidPublicKey = await response.text();
                                    console.log(vapidPublicKey)
                                    const convertedVapidKey = urlBase64ToUint8Array(vapidPublicKey); // convert it from base 64

                                    return registration.pushManager.subscribe({
                                        userVisibleOnly: true,
                                        applicationServerKey: convertedVapidKey
                                    });
                                });
                        }).then(function (subscription) {
                            var daily = "false";
                            var upcoming = "false";
                            if (notifications.includes("daily")) {
                                daily = "true";
                            }
                            if (notifications.includes("upcoming")) {
                                upcoming = "true";
                            }
                            console.log("registering")
                            // Send the subscription details to the server using the Fetch API.
                            fetch('https://rosie-production.up.railway.app/register', {
                                method: 'post',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify({
                                    subscription: subscription,
                                    dailyNotifications: daily, // send whether daily notifications have been set to the server
                                    upcomingNotifications: upcoming // tell the server whether it needs to send upcoming period notifications
                                }),
                            });

                        })
                }
            })
        }
        window.location.href="/Rosie/SignUp/PrivacyPolicy"
    }

    // This function is needed because Chrome doesn't accept a base64 encoded string
    // as value for applicationServerKey in pushManager.subscribe yet
    // taken from - https://github.com/mdn/serviceworker-cookbook/blob/master/tools.js
    function urlBase64ToUint8Array(base64String: string) {
        var padding = '='.repeat((4 - base64String.length % 4) % 4);
        var base64 = (base64String + padding)
            .replace(/\-/g, '+')
            .replace(/_/g, '/');

        var rawData = window.atob(base64);
        var outputArray = new Uint8Array(rawData.length);

        for (var i = 0; i < rawData.length; ++i) {
            outputArray[i] = rawData.charCodeAt(i);
        }
        return outputArray;
    }

    /**
     * Store which notifications the user has clicked so we know which to send them 
     */
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
                        <IonButton onClick={setUpNotifications} className="btn" size="large">Save Preferences</IonButton>
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage>
    );
};

export default Preferences;
