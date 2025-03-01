import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonIcon, IonRow, IonGrid, IonCol, IonItem, IonRadioGroup, IonRadio, IonCheckbox } from '@ionic/react';
import { flower, heart, person, personCircle, rose } from 'ionicons/icons';
import ExploreContainer from '../components/ExploreContainer';
import './Enter-Details.css';

const Preferences: React.FC = () => {
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle >Preferences</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonGrid fixed={true}>
                    <IonRow class="ion-justify-content-center"><h1 className="heading"><IonIcon icon={flower} className='icons'></IonIcon> Choose Preferences <IonIcon icon={flower} className='icons'></IonIcon></h1></IonRow>
                    <IonRow class="ion-justify-content-start"><p><b> Appearance:</b> </p></IonRow>
                    <IonRadioGroup value="strawberries">
                        <IonRow class="ion-justify-content-start"><IonRadio  value="light" labelPlacement="end" justify="space-between">Light Mode</IonRadio></IonRow>
                        <br />
                        <IonRow class="ion-justify-content-start"><IonRadio value="dark" justify="space-between" labelPlacement='end' >Dark Mode</IonRadio></IonRow>
                        <br />
                        <IonRow class="ion-justify-content-start"><IonRadio value="contrast" labelPlacement="end" justify="space-between">High Contrast Mode</IonRadio></IonRow>
                        <br />
                    </IonRadioGroup>
                   
                    <IonRow class="ion-justify-content-start">
                        <p><b>Notifications:</b></p>
                    </IonRow>
                    <IonCheckbox labelPlacement="end">Upcoming Period Reminder</IonCheckbox>
                    <IonCheckbox labelPlacement="end">Daily Track Reminder</IonCheckbox>
                    <IonRow class="ion-justify-content-center">
                        <IonButton className="btn" href="/Rosie/Sign-Up/Privacy-Policy" size="large">Save Preferences</IonButton>
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage>
    );
};

export default Preferences;
