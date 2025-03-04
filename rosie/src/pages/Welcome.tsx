import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonIcon, IonRow, IonGrid, IonCol, IonItem, IonRadioGroup, IonRadio, IonCheckbox } from '@ionic/react';
import { flower, heart, person, personCircle, rose } from 'ionicons/icons';
import ExploreContainer from '../components/ExploreContainer';

 const Welcome: React.FC = () => {
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Welcome to Rosie</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonGrid fixed={true}>
                    <IonRow class="ion-justify-content-center">
                        <h1 className="heading">
                            <IonIcon icon={flower} className='icons'></IonIcon> Welcome to Rosie <IonIcon icon={flower} className='icons'></IonIcon>
                        </h1>
                    </IonRow>
                    <IonRow class="ion-justify-content-center">
                        <p>Welcome to Rosie, your personal period tracker. Click to get started with tracking your period.</p>
                    </IonRow>
                    <IonRow class="ion-justify-content-center">
                        <IonButton className="btn" href="/Rosie/SignUp" size="large">Get Started</IonButton>
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage>
    );
};

export default Welcome;