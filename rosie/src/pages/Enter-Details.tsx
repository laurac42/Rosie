import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButtons, IonMenuButton, IonButton, IonIcon, IonRow, IonGrid, IonCol, IonItem, IonInput } from '@ionic/react';
import { flower, heart, person, personCircle, rose } from 'ionicons/icons';
import ExploreContainer from '../components/ExploreContainer';
import './Enter-Details.css';

const Details: React.FC = () => {
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle >Enter Details</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonGrid fixed={true}>
                    <IonRow class="ion-justify-content-center"><h1 className="heading"><IonIcon icon={flower} className='icons'></IonIcon> Enter Your Details <IonIcon icon={flower} className='icons'></IonIcon></h1></IonRow>
                    <IonRow class="ion-justify-content-start"><p mx-5 px-5 > Please enter your name and age. You also have the option to enter up to three past periods. Please enter your details below: </p></IonRow>
                    <IonGrid class="ion-justify-content-center">
                    <IonRow> <IonItem>
                        <IonInput className="custom-font" label="Name:" placeholder="Enter Your Name"></IonInput>
                    </IonItem>
                    </IonRow>
                    <IonRow> <IonItem>
                        <IonInput className="custom-font" label="Age:" type="number" placeholder="Enter Your Age"></IonInput>
                    </IonItem>
                    </IonRow>
                    <IonRow> <IonItem>
                        <IonInput className="custom-font" label="Birthday:" type="date"></IonInput>
                    </IonItem>
                    </IonRow>
                    </IonGrid>
                    <IonRow class="ion-justify-content-start">
                        <p><b>Do you want to enter any past period data?</b></p>
                    </IonRow>
                    <IonRow class="ion-justify-content-center">
                        <IonCol><IonButton href="/Rosie/Sign-Up/Preferences" size="small">Enter Period Data</IonButton></IonCol>
                        <IonCol><IonButton href="/Rosie/Sign-Up/Preferences" size="small">Save Without Period Data</IonButton></IonCol>
                    </IonRow>
                    {/*<IonRow class="ion-justify-content-center">
                        <IonButton className="btn" href="/Rosie/Sign-Up/Preferences" size="large">Save Details</IonButton>
                    </IonRow>*/}
                </IonGrid>
            </IonContent>
        </IonPage>
    );
};

export default Details;
