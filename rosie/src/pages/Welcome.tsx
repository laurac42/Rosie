import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonIcon, IonRow, IonGrid } from '@ionic/react';
import { flower } from 'ionicons/icons';
import Menu from '../components/Menu'

 const Welcome: React.FC = () => {
    return (
        <>
        <Menu/>
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
                            <IonIcon icon={flower} className='colourIcon'></IonIcon> Welcome to Rosie <IonIcon icon={flower} className='colourIcon'></IonIcon>
                        </h1>
                    </IonRow>
                    <IonRow class="ion-justify-content-center">
                        <p>Welcome to Rosie, your personal period tracker. Click to get started with tracking your period.</p>
                    </IonRow>
                    <IonRow class="ion-justify-content-center">
                        <IonButton className="btn" href="/Rosie/Cycle" size="large">Get Started</IonButton>
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage>
        </>
    );
};

export default Welcome;