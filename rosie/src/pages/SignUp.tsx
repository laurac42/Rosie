import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButtons, IonMenuButton, IonButton, IonIcon, IonRow, IonGrid, IonCol } from '@ionic/react';
import { flower, heart } from 'ionicons/icons';
import   { useReactPWAInstall } from "react-pwa-install";
import { ReactPWAInstallProvider } from 'react-pwa-install';
import './SignUp.css';
import { useEffect } from 'react';

const SignUp: React.FC = () => {
    
    const { pwaInstall, supported, isInstalled } = useReactPWAInstall();
    // came from:: https://github.com/zoltangy/react-pwa-install
    const handleClick = () => {
        pwaInstall({
            title: "Install Rosie",
            logo: "/Rosie/rose.png",
            features: (
                <ul>
                    <li>Period Tracking</li>
                    <li>Period Prediction</li>
                    <li>Cycle Analysis</li>
                    <li>Works offline</li>
                </ul>
            ),
            description: "This is a period tracking app",
        })
            .catch(() => alert("User opted out from installing"));
    };

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle >Sign-Up</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonGrid fixed={true}>
                    <IonRow ><h1 className="welcome"><IonIcon icon={flower} className='colourIcon'></IonIcon> Welcome to Rosie <IonIcon icon={flower} className='colourIcon'></IonIcon></h1></IonRow>
                    <IonRow class="ion-justify-content-center"><p>Rosie is your personal period tracker, designed to help you stay on top of your cycle with ease.
                        Whether you're tracking symptoms, predicting your next period, or planning ahead, Rosie gives you the insights you need to feel in control of your body.
                        Sign up now to start tracking and get personalized reminders, cycle insights, and more! <IonIcon icon={heart} className='colourIcon'></IonIcon></p></IonRow>
                    <IonRow class="ion-justify-content-center">
                        <IonButton className="btn" href="/Rosie/SignUp/EnterDetails" size="large">Sign-Up</IonButton>
                    </IonRow>
                    {supported() && !isInstalled() && (
                        <IonRow class="ion-justify-content-center"><IonButton className='installButton' onClick={handleClick}>
                            Install App
                        </IonButton></IonRow>
                    )}
                </IonGrid>
            </IonContent>
        </IonPage>
    );
};

export default SignUp;
