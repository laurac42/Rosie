import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButtons, IonMenuButton, IonButton, IonIcon, IonRow, IonGrid, IonCol, IonItem, IonRadioGroup, IonRadio, IonCheckbox, IonMenu, IonList, IonLabel } from '@ionic/react';
import { flower, personCircle } from 'ionicons/icons';
import Menu from '../components/Menu'


const Notifications: React.FC = () => {
    return (
        <>
            <Menu/>
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
                    <IonRow class="checkbox"><IonCheckbox labelPlacement="end">Upcoming Period Reminder</IonCheckbox></IonRow>
                    <IonRow><IonCheckbox labelPlacement="end">Daily Track Reminder</IonCheckbox></IonRow>
                    <IonRow class="ion-justify-content-center">
                        <IonButton className="btn" href="/Rosie/Cycle" size="large">Save Notifications</IonButton>
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage >
        </>
    );
};

export default Notifications;
