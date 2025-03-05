import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButtons, IonMenuButton, IonButton, IonIcon, IonGrid, IonRow } from '@ionic/react';
import { personCircle } from 'ionicons/icons';
import { CircularProgressbar, CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
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
        <IonGrid class="ion-justify-content-center">
          <IonRow class="cycleWidth">
            {/* In the future, max value will be the predicted length of the users cycle */}
            <CircularProgressbar className="progress" value={20} maxValue={35} text={`Day ${20}`} />;
          </IonRow></IonGrid>
          <IonGrid>
          <IonRow class="ion-justify-content-center">
            <IonButton className="btn" href="/Rosie/Track" size="large">Save Details</IonButton>
          </IonRow>
          </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Cycle;
