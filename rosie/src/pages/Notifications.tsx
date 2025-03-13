import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButtons, IonMenuButton, IonButton, IonIcon, IonRow, IonGrid, IonCol, IonItem, IonRadioGroup, IonRadio, IonCheckbox, IonMenu, IonList, IonLabel } from '@ionic/react';
import { flower, colorPalette, notifications, people, lockClosed, informationCircle, personCircle } from 'ionicons/icons';
import React, { useState, useEffect } from 'react';
import { applyTheme } from "../theme";
import ExploreContainer from '../components/ExploreContainer';


const Notifications: React.FC = () => {
    return (
        <>
            <IonMenu contentId="main-content">
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
                        <IonTitle>Notifications</IonTitle>
                        <IonButtons slot="end">
                            <IonButton aria-label="Profile" className='profileButton' href="/Rosie/Profile">
                                <IonIcon className='profileIcon' slot="icon-only" icon={personCircle}></IonIcon>
                            </IonButton>
                        </IonButtons>
                    </IonToolbar>
                </IonHeader>
                <IonContent fullscreen>
                <IonGrid fixed={true}>
                    <IonRow class="ion-justify-content-start">
                        <IonRow class="ion-justify-content-center"><h1 className="heading"><IonIcon icon={flower} className='colourIcon'></IonIcon> Choose Your Notifications <IonIcon icon={flower} className='colourIcon'></IonIcon></h1></IonRow>
                    </IonRow>
                    <IonRow class="checkbox"><IonCheckbox labelPlacement="end">Upcoming Period Reminder</IonCheckbox></IonRow>
                    <IonRow><IonCheckbox labelPlacement="end">Daily Track Reminder</IonCheckbox></IonRow>
                    <IonRow class="ion-justify-content-center">
                        <IonButton className="btn" href="/Rosie/Cycle" size="large">Save Notifications</IonButton>
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage >
        </>
    );
};

export default Notifications;
