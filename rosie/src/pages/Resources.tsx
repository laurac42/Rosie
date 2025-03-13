import { IonContent, IonHeader, IonPage, IonMenu, IonTitle, IonToolbar, IonButton, IonIcon, IonRow, IonGrid, IonCol, IonItem, IonList, IonLabel, IonButtons, IonMenuButton } from '@ionic/react';
import { flower, colorPalette, notifications, people, lockClosed, informationCircle, personCircle } from 'ionicons/icons';
import React from 'react';

const Resources: React.FC = () => {
    return (
        <><IonMenu contentId="main-content">
                        <IonHeader>
                            <IonToolbar>
                                <IonTitle>Notifications</IonTitle>
                            </IonToolbar>
                        </IonHeader>
                        <IonContent>
                            <IonList>
                                <IonItem href="/Rosie/Menu/Appearance">
                                    <IonIcon className="menuIcon" aria-hidden="true" icon={colorPalette} slot="start"></IonIcon>
                                    <IonLabel>Appearance</IonLabel>
                                </IonItem>
                                <IonItem href='/Rosie/Menu/Notifications'>
                                    <IonIcon className="menuIcon" aria-hidden="true" icon={notifications} slot="start"></IonIcon>
                                    <IonLabel>Notifications</IonLabel>
                                </IonItem>
                                <IonItem href="/Rosie/Menu/AboutUs">
                                    <IonIcon className="menuIcon" aria-hidden="true" icon={people} slot="start"></IonIcon>
                                    <IonLabel>About Us</IonLabel>
                                </IonItem>
                                <IonItem href='/Rosie/Menu/PrivacyPolicy'>
                                    <IonIcon className="menuIcon" aria-hidden="true" icon={lockClosed} slot="start"></IonIcon>
                                    <IonLabel>Privacy Policy</IonLabel>
                                </IonItem>
                                <IonItem href='/Rosie/Menu/Resources'>
                                    <IonIcon className="menuIcon" aria-hidden="true" icon={informationCircle} slot="start"></IonIcon>
                                    <IonLabel>Resources</IonLabel>
                                </IonItem>
                            </IonList>
                        </IonContent>
                    </IonMenu>
            <IonPage id="main-content">
                <IonHeader>
                    <IonToolbar>
                        <IonButtons slot="start">
                            <IonMenuButton></IonMenuButton>
                        </IonButtons>
                        <IonTitle>Period Health Resources</IonTitle>
                        <IonButtons slot="end">
                            <IonButton aria-label="Profile" className='profileButton' href="/Rosie/Profile">
                                <IonIcon className='profileIcon' slot="icon-only" icon={personCircle}></IonIcon>
                            </IonButton>
                        </IonButtons>
                    </IonToolbar>
                </IonHeader>
                <IonContent fullscreen>
                    <IonGrid fixed={true}>
                        <IonRow class="ion-justify-content-center">
                            <h1 className="heading">
                                <IonIcon icon={flower} className='colourIcon'></IonIcon> Period Resources <IonIcon icon={flower} className='colourIcon'></IonIcon>
                            </h1>
                        </IonRow>
                        <IonList>
                            <IonItem href="https://www.nhs.uk/conditions/periods/" target="_blank">
                                <IonIcon className="menuIcon" aria-hidden="true" icon={informationCircle} slot="start"></IonIcon>
                                <IonLabel>NHS Guide to Periods</IonLabel>
                            </IonItem>
                            <IonItem href="https://periodpoverty.uk/" target="_blank">
                                <IonIcon className="menuIcon" aria-hidden="true" icon={informationCircle} slot="start"></IonIcon>
                                <IonLabel>Period Poverty Support</IonLabel>
                            </IonItem>
                            <IonItem href="https://www.endometriosis-uk.org/" target="_blank">
                                <IonIcon className="menuIcon" aria-hidden="true" icon={informationCircle} slot="start"></IonIcon>
                                <IonLabel>Endometriosis UK (Support & Advice)</IonLabel>
                            </IonItem>
                            <IonItem href="https://www.irise.org.uk/" target="_blank">
                                <IonIcon className="menuIcon" aria-hidden="true" icon={informationCircle} slot="start"></IonIcon>
                                <IonLabel>iRise (Menstrual Equity & Education)</IonLabel>
                            </IonItem>
                            <IonItem href="https://www.nhs.uk/conditions/polycystic-ovary-syndrome-pcos/" target="_blank">
                                <IonIcon className="menuIcon" aria-hidden="true" icon={informationCircle} slot="start"></IonIcon>
                                <IonLabel>PCOS Information (NHS)</IonLabel>
                            </IonItem>
                            <IonItem href="https://www.wellbeingofwomen.org.uk/what-we-do/campaigns/just-a-period/periods-information-hub/" target="_blank">
                                <IonIcon className="menuIcon" aria-hidden="true" icon={informationCircle} slot="start"></IonIcon>
                                <IonLabel>Wellbeing Women Period Information</IonLabel>
                            </IonItem>
                        </IonList>
                        <IonRow class="ion-justify-content-center">
                            <IonButton className="btn" href="/Rosie/Cycle" size="large">Back to Cycle Page</IonButton>
                        </IonRow>
                    </IonGrid>
                </IonContent>
            </IonPage>
        </>
    );
};

export default Resources;