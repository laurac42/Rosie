import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonIcon, IonRow, IonGrid, IonCol, IonItem, IonRadioGroup, IonRadio, IonCheckbox } from '@ionic/react';
import { flower, heart, person, personCircle, rose } from 'ionicons/icons';
import ExploreContainer from '../components/ExploreContainer';

const Privacy: React.FC = () => {
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle >Privacy Policy</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonGrid fixed={true}>
                    <IonRow class="ion-justify-content-center"><h1 className="heading"><IonIcon icon={flower} className='icons'></IonIcon> Privacy Policy <IonIcon icon={flower} className='icons'></IonIcon></h1></IonRow>
                </IonGrid>
            </IonContent>
        </IonPage>
    );
};

export default Privacy;
