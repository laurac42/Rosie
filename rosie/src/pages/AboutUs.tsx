import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonIcon, IonRow, IonGrid, IonCol, IonItem, IonRadioGroup, IonRadio, IonCheckbox, IonMenu, IonList, IonLabel, IonButtons, IonMenuButton, IonAccordionGroup, IonAccordion } from '@ionic/react';
import { flower, personCircle } from 'ionicons/icons';
import Menu from '../components/Menu'
import Tabs from '../components/Tabs'

const AboutUs: React.FC = () => {
  return (
    <>
      <Menu />
      <IonPage id="main-content">
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonMenuButton></IonMenuButton>
            </IonButtons>
            <IonTitle>About Us</IonTitle>
            <IonButtons slot="end">
              <IonButton className='profileButton' href="/Rosie/Profile">
                <IonIcon className='profileIcon' slot="icon-only" icon={personCircle}></IonIcon>
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent fullscreen>
          <IonGrid fixed={true}>
            <IonRow class="ion-justify-content-center"><h1 className="heading"><IonIcon icon={flower} className='colourIcon'></IonIcon> About Us <IonIcon icon={flower} className='colourIcon'></IonIcon></h1></IonRow>
            <p>Meet Rosie, your go-to period-tracking app designed for simplicity and ease. We believe that understanding your cycle shouldn’t be overwhelming—it should be effortless, intuitive, and empowering. That’s why we created Rosie, a no-fuss way to track your period, predict upcoming cycles, and stay in tune with your body.

              <br></br><br></br>Unlike other apps that overload you with complicated features, Rosie focuses on what truly matters: helping you track your period quickly and accurately. Whether you’re monitoring your cycle for personal awareness, planning ahead, or keeping an eye on symptoms, Rosie gives you the tools you need without the extra noise.

              <br></br><br></br>We're here to make period tracking feel natural and stress-free. Because knowing your cycle means knowing yourself—and that should always be simple.</p>
            <IonRow class="ion-justify-content-center">
              <IonButton className="btn" href="/Rosie/Cycle" size="large">Back to Cycle Page</IonButton>
            </IonRow>
          </IonGrid>
        </IonContent>
        <Tabs/>
      </IonPage>
    </>
  );
};

export default AboutUs;
