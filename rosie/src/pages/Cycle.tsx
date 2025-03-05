import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButtons, IonMenuButton, IonButton, IonIcon, IonGrid, IonRow } from '@ionic/react';
import { personCircle } from 'ionicons/icons';
import ExploreContainer from '../components/ExploreContainer';
import './Cycle.css';

const Cycle: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Cycle</IonTitle>
          <IonButtons slot="start">
            <IonMenuButton autoHide={false}></IonMenuButton>
          </IonButtons>
          <IonButtons slot="end">
            <IonButton className='profileButton' href="/Rosie/Profile">
              <IonIcon slot="icon-only" icon={personCircle} ></IonIcon>
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonGrid>
          <IonRow>

          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Cycle;
