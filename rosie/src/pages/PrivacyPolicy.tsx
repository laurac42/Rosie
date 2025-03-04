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

                    <IonRow class="ion-justify-content-start"><p><b>1. Introduction</b>
                        <br></br>Welcome to Rosie. Your privacy is important to us. This Privacy Policy explains how we collect, use, and disclose your information. By using the App, you acknowledge and accept the terms of this policy.</p>
                    </IonRow>

                    <IonRow class="ion-justify-content-start"><p><b>2. Information We Collect</b>
                        <br></br>When you use the App, we may collect the following information:

                        Personal details you provide, such as your name, date of birth, and menstrual cycle data.

                        Device and usage data, including IP addresses, device identifiers, and app activity.

                        Any other information you voluntarily provide while using the App.</p></IonRow>

                    <IonRow class="ion-justify-content-start"><p><b>3. How We Use Your Information</b>
                        <br></br>We may use the collected data for purposes including:

                        Providing and improving the App's functionality.

                        Analyzing usage trends to enhance user experience.

                        Communicating with you regarding updates, notifications, or support.</p></IonRow>

                    <IonRow class="ion-justify-content-start"><p><b>4. Data Security and Disclaimer</b>
                        <br></br>While we take measures to protect your data, we cannot guarantee that your data will remain private or secure. By using the App, you acknowledge the inherent risks of data transmission and storage and agree that we are not liable for any unauthorized access, breaches, or losses of data.</p></IonRow>

                    <IonRow class="ion-justify-content-start"><p><b>5. Data Sharing and Disclosure</b>
                        <br></br>We may share your information:

                        With third-party service providers that assist in app functionality.

                        If required by law, regulation, or legal process.

                        In case of a business transfer, merger, or sale of assets.</p></IonRow>

                    <IonRow class="ion-justify-content-start"><p><b>6. Your Choices</b>
                        <br></br>You may:

                        Choose not to provide certain information, though this may affect App functionality.

                        Request deletion of your data.

                        Adjust device settings to limit data collection.</p></IonRow>

                    <IonRow class="ion-justify-content-start"><p><b>7. Changes to This Policy</b>
                        <br></br>We may update this Privacy Policy at any time. Any changes will be posted within the App, and continued use of the App after changes constitutes acceptance of the revised policy.</p></IonRow>

                    <IonRow class="ion-justify-content-start"><p><b>8. Contact Us</b>
                        <br></br>If you have questions or concerns about this policy, you can contact us.

                        By using Rosie, you acknowledge that you have read, understood, and agreed to this Privacy Policy.</p></IonRow>
                    <IonRow class="ion-justify-content-center">
                        <IonButton className="btn" href="/Rosie/SignUp/Welcome" size="large">Accept Privacy Policy</IonButton>
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage>
    );
};

export default Privacy;
