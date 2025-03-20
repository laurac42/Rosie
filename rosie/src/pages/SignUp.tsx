import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButtons, IonMenuButton, IonButton, IonIcon, IonRow, IonGrid, IonCol } from '@ionic/react';
import { flower, heart } from 'ionicons/icons';
import usePWA from 'react-pwa-install-prompt'
import './SignUp.css';
import { useEffect } from 'react';

const SignUp: React.FC = () => {
    const { isStandalone, isInstallPromptSupported, promptInstall } = usePWA();

    const onClickInstall = async () => {
        const didInstall = await promptInstall();
        if (didInstall) {
            // installed
        }
    };

    const renderInstallButton = () => {
        if (!isInstallPromptSupported && !isStandalone) {
            return (
                <IonButton className="installButton" onClick={onClickInstall}>Install App</IonButton>
            );
        }
        return null;
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
                    <IonRow class="ion-justify-content-center"><h1 className="welcome"><IonIcon icon={flower} className='colourIcon'></IonIcon> Welcome to Rosie <IonIcon icon={flower} className='colourIcon'></IonIcon></h1></IonRow>
                    <IonRow class="ion-justify-content-center"><p>Rosie is your personal period tracker, designed to help you stay on top of your cycle with ease.
                        Whether you're tracking symptoms, predicting your next period, or planning ahead, Rosie gives you the insights you need to feel in control of your body.
                        Sign up now to start tracking and get personalized reminders, cycle insights, and more! <IonIcon icon={heart} className='colourIcon'></IonIcon></p></IonRow>
                    <IonRow class="ion-justify-content-center">
                        <IonButton className="btn" href="/Rosie/SignUp/EnterDetails" size="large">Sign-Up</IonButton>
                    </IonRow>
                    <IonRow class="ion-justify-content-center">
                        <div>
                            {renderInstallButton()}
                        </div></IonRow>
                </IonGrid>
            </IonContent>
        </IonPage>
    );
};

export default SignUp;
