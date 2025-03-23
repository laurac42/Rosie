import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButtons, IonMenuButton, IonButton, IonIcon, IonRow, IonGrid, IonCol } from '@ionic/react';
import { ellipsisVertical, flower, heart, shareOutline } from 'ionicons/icons';
import Popup from 'reactjs-popup';
import './SignUp.css';
import { useEffect, useState } from 'react';

const SignUp: React.FC = () => {
    const [install, setInstall] = useState("false");
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle >Sign-Up</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonGrid fixed={true}>
                    <IonRow class="ion-justify-content-center" ><h1 className="welcome"><IonIcon icon={flower} className='colourIcon'></IonIcon> Welcome to Rosie <IonIcon icon={flower} className='colourIcon'></IonIcon></h1></IonRow>
                    <IonRow class="ion-justify-content-center"><p>Rosie is your personal period tracker, designed to help you stay on top of your cycle with ease.
                        Whether you're tracking symptoms, predicting your next period, or planning ahead, Rosie gives you the insights you need to feel in control of your body.
                        Sign up now to start tracking and get personalized reminders, cycle insights, and more! <IonIcon icon={heart} className='colourIcon'></IonIcon></p></IonRow>
                    <IonRow class="ion-justify-content-center">
                        <IonButton className="btn" href="/Rosie/SignUp/EnterDetails" size="large">Sign-Up</IonButton>
                    </IonRow>
                </IonGrid>
                {install == "true" ?(
                    <IonGrid className='install-grid' fixed={true}>
                        <IonRow className='ion-justify-content-center'><h2>Installation Instructions:</h2></IonRow>
                        <IonRow className='ion-justify-content-center'>
                        <p><b>Apple:</b>
                        <br></br>
                        • Click the share button at the bottom of the screen <IonIcon className='colourIcon' icon={shareOutline}></IonIcon>
                        <br></br>
                        • Scroll down and choose 'Add to Home Screen'
                        <br></br>
                        <br></br>
                        <b>Android:</b>
                        <br></br>
                        • Click the menu button at the top right <IonIcon className='colourIcon' icon={ellipsisVertical}></IonIcon>
                        <br></br>
                        • Choose 'Add to Home Screen'
                        </p></IonRow>
                        <IonRow className='ion-justify-content-center'>
                        <IonButton onClick={() => setInstall("false")}>Done</IonButton>
                        </IonRow>
                    </IonGrid>
                ):(
                    <IonRow class="ion-justify-content-center"><IonButton className='installButton' onClick={() => setInstall("true")}>
                        Install App
                    </IonButton></IonRow>
                )}
            </IonContent>
        </IonPage>
    );
};

export default SignUp;
