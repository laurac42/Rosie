    import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonIcon, IonRow, IonGrid } from '@ionic/react';
    import { flower } from 'ionicons/icons';
    import Menu from '../components/Menu'
    import Tabs from '../components/Tabs'
    import cycle from "../assets/cyc.png";
    import analysis from "../assets/analyse.png";
    import calendar from "../assets/calend.png";
    import track from "../assets/trk.png";
    import './Welcome.css'
    import { useState } from 'react';

    const Welcome: React.FC = () => {
        const [viewTutorial, setViewTutorial] = useState<Boolean>(false);

        return (
            <>
                <Menu />
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
                            {viewTutorial == false && (
                                <>
                                    <IonRow class="ion-justify-content-center">
                                        <p>Welcome to Rosie, your personal period tracker. Do you want to view an app guide?</p>
                                    </IonRow>
                                    <IonRow class="ion-justify-content-center">
                                        <IonButton className="btn guide" onClick={() => setViewTutorial(true)} size="default">View Guide</IonButton>
                                        <IonButton className="btn start" href="/Rosie/Cycle" size="default">Get Started</IonButton>
                                    </IonRow>
                                </>)}
                            {viewTutorial == true && (
                                <>
                                    <IonRow class="ion-justify-content-center">
                                        <p><b>View your cycle at a glance on the cycle page: </b></p>
                                    </IonRow>
                                    <IonRow class="ion-justify-content-center image-row">
                                        <img src={cycle} alt="On the cycle page you can view data on which day of your cycle you are on, how long your average cycle is, and how long until your next period" />
                                    </IonRow>
                                    <IonRow class="ion-justify-content-center border-bottom"> </IonRow>
                                    <IonRow class="ion-justify-content-center">
                                        <p><b>Choose a day, and  your symptoms on the track page:</b></p>
                                    </IonRow>
                                    <IonRow class="ion-justify-content-center image-row">
                                        <img src={track} alt="On the track page you can select a date, and then choose any symptoms (including period, skin, emotions, pain and a photo of your skin) you would like to track and click save to save them to your calendar"/>
                                    </IonRow>
                                    <IonRow class="ion-justify-content-center border-bottom"> </IonRow>
                                    <IonRow class="ion-justify-content-center">
                                        <p><b>View your symptoms at a glance, and click a date to see more information and photos on the calendar page:</b></p>
                                    </IonRow>
                                    <IonRow class="ion-justify-content-center image-row">
                                        <img src={calendar} alt="On the calendar page, view all tracked data at a glance, and click a specific date to see more about what you tracked that day, and any photos of your skin you took"/>
                                    </IonRow>
                                    <IonRow class="ion-justify-content-center border-bottom"> </IonRow>
                                    <IonRow class="ion-justify-content-center">
                                        <p><b>View your period analysis from the analysis page:</b></p>
                                    </IonRow>
                                    <IonRow class="ion-justify-content-center bottom-image">
                                        <img src={analysis} alt="On the analysis page, get insights into the average length of your period and cycle, and the types of pain you normally experience"/>
                                    </IonRow>
                                    <IonRow class="ion-justify-content-center">
                                        <IonButton className="done-btn" href="/Rosie/Cycle" size="large">Done</IonButton>
                                    </IonRow>
                                </>)}

                        </IonGrid>
                    </IonContent>
                    <Tabs />
                </IonPage>
            </>
        );
    };

    export default Welcome;