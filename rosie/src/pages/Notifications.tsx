import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButtons, IonMenuButton, IonButton, IonIcon, IonRow, IonGrid, IonCol, IonItem, IonRadioGroup, IonRadio, IonCheckbox, IonMenu, IonList, IonLabel } from '@ionic/react';
import { checkmarkDoneOutline, flower, personCircle, saveOutline } from 'ionicons/icons';
import Menu from '../components/Menu'
import Tabs from '../components/Tabs'
import { useState } from 'react';

const Notifications: React.FC = () => {
    const [notifications, setNotifications] = useState<string[]>(JSON.parse(localStorage.getItem("chosenNotifications") || "[]")); // get notifications on load

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
        // unsubscribe them if there is nothing stored
        var notifications = JSON.parse(localStorage.getItem("chosenNotifications") ||"[]")
        if (notifications == 0)
        {
            console.log("unsibscribing")
            navigator.serviceWorker.ready.then((reg) => {
                // https://developer.mozilla.org/en-US/docs/Web/API/PushSubscription/unsubscribe
                reg.pushManager.getSubscription().then((subscription) => {
                  if (subscription) {
                    subscription
                      .unsubscribe()
                      .then(function (subscription) {
                        // tell the server to unsubscribe the user
                        console.log("unsibscrigibing")
                        fetch('https://rosie-production.up.railway.app/unsubscribe', {
                            method: 'post',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                subscription: subscription
                            }),
                        });
                      })
                      .catch((e) => {
                        console.log(e);
                      });
                  }
                });
              });
        }
        
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
                            <IonButton onClick={saveNotifications} className="btn" href="/Rosie/Cycle" size="large">Save Notifications</IonButton>
                        </IonRow>
                    </IonGrid>
                </IonContent>
                <Tabs />
            </IonPage >
        </>
    );
};

export default Notifications;
