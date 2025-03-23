import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButtons, IonMenuButton, IonButton, IonIcon, IonRow, IonGrid, IonCol, IonItem, IonRadioGroup, IonRadio, IonCheckbox, IonMenu, IonList, IonLabel } from '@ionic/react';
import { checkmarkDoneOutline, flower, personCircle, saveOutline } from 'ionicons/icons';
import Menu from '../components/Menu'
import Tabs from '../components/Tabs'
import { useEffect, useState } from 'react';

const Notifications: React.FC = () => {
    const [notifications, setNotifications] = useState<string[]>([]); // get notifications on load

    useEffect(() => {
        var notify = JSON.parse(localStorage.getItem("chosenNotifications") || "[]")
        setNotifications(notify);
    }, [])

    /**
     * Store which notifications the user has clicked so we know which to send them 
     */
    function clickedNotification(e: CustomEvent<any>) {
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


    // save the notifications the user has chosen and send it to the server
    function saveNotifications() {
        var storedNotifications = JSON.parse(localStorage.getItem("chosenNotifications") || "[]");
        // if they have selected no notifications, unsubscribe
        if (storedNotifications.length == 0) {
            navigator.serviceWorker.ready.then((reg) => {
                reg.pushManager.getSubscription().then((subscription) => {
                    if (subscription) {

                        console.log("Unsubscribing");
                        fetch('https://rosie-production.up.railway.app/unsubscribe', {
                            method: 'post',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                subscription: subscription
                            }),
                        });
                        subscription.unsubscribe()
                    }
                }).catch((e) => {
                    console.log(e);
                });
            })
        }
        else {
            // request permission for notifications 
            Notification.requestPermission().then((result) => {
                if (result === "granted") {

                    navigator.serviceWorker.ready.then(async function (registration) {
                        const subscription = await registration.pushManager.getSubscription();
                        var daily = storedNotifications.includes("daily") ? "true" : "false";
                        var upcoming = storedNotifications.includes("upcoming") ? "true" : "false";

                        if (subscription) {
                            console.log("updating existing subscription")
                            // Update the server with the existing subscription
                            fetch('https://rosie-production.up.railway.app/updateSubscription', {
                                method: 'post',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify({
                                    subscription: subscription,
                                    dailyNotifications: daily,
                                    upcomingNotifications: upcoming
                                }),
                            });
                        } else {
                            /// create new subscription
                            console.log("creating new subscription")
                            const response = await fetch('https://rosie-production.up.railway.app/vapidPublicKey');
                            const vapidPublicKey = await response.text();
                            const convertedVapidKey = urlBase64ToUint8Array(vapidPublicKey);

                            return registration.pushManager.subscribe({
                                userVisibleOnly: true,
                                applicationServerKey: convertedVapidKey
                            }).then((newSubscription) => {
                                // Send new subscription to the server
                                fetch('https://rosie-production.up.railway.app/register', {
                                    method: 'post',
                                    headers: {
                                        'Content-Type': 'application/json',
                                    },
                                    body: JSON.stringify({
                                        subscription: newSubscription,
                                        dailyNotifications: daily,
                                        upcomingNotifications: upcoming
                                    }),
                                });
                            });
                        }
                    });
                }
            })
        }
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




    return (
        <>
            <Menu />
            <IonPage id="main-content">
                <IonHeader>
                    <IonToolbar>
                        <IonButtons slot="start">
                            <IonMenuButton></IonMenuButton>
                        </IonButtons>
                        <IonTitle>Notifications</IonTitle>
                        <IonButtons slot="end">
                            <IonButton aria-label="Profile" className='profileButton' href="/Rosie/Profile">
                                <IonIcon className='profileIcon' slot="icon-only" icon={personCircle}></IonIcon>
                            </IonButton>
                        </IonButtons>
                    </IonToolbar>
                </IonHeader>
                <IonContent fullscreen>
                    <IonGrid fixed={true}>
                        <IonRow class="ion-justify-content-start">
                            <IonRow class="ion-justify-content-center"><h1 className="heading"><IonIcon icon={flower} className='colourIcon'></IonIcon> Choose Your Notifications <IonIcon icon={flower} className='colourIcon'></IonIcon></h1></IonRow>
                        </IonRow>
                        <IonRow class="checkbox"><IonCheckbox id="upcoming" onIonChange={clickedNotification} checked={notifications.includes("upcoming")} value="upcoming" labelPlacement="end">Upcoming Period Reminder</IonCheckbox></IonRow>
                        <IonRow><IonCheckbox id="daily" onIonChange={clickedNotification} checked={notifications.includes("daily")} value="daily" labelPlacement="end">Daily Track Reminder</IonCheckbox></IonRow>
                        <IonRow class="ion-justify-content-center">
                            <IonButton onClick={saveNotifications} href='/Rosie/Cycle' className="btn" size="large">Save Notifications</IonButton>
                        </IonRow>
                    </IonGrid>
                </IonContent>
                <Tabs />
            </IonPage >
        </>
    );
};

export default Notifications;
