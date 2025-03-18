import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonIcon, IonRow, IonGrid, IonCol, IonItem, IonRadioGroup, IonRadio, IonCheckbox, IonMenu, IonList, IonLabel, IonButtons, IonMenuButton, IonAccordionGroup, IonAccordion } from '@ionic/react';
import { flower, colorPalette, notifications, people, lockClosed, informationCircle, personCircle, settings, trendingUp, clipboard, calendar, radioButtonOff, folderOpen } from 'ionicons/icons';
import React, { useState, useEffect } from 'react';
import Menu from '../components/Menu'
import { applyTheme } from "../theme";


const Appearance: React.FC = () => {
    const [theme, setTheme] = useState<string>('');

    // to handle the selection of a theme change radio button
    // sets the theme constant to whatever was the theme selected by the radio buttons
    const handleThemeChange = (e: CustomEvent<any>) => {
        setTheme(e.detail.value);
        applyTheme(e.detail.value);
    };

    return (
        <>
            <Menu/>
            <IonPage id="main-content">
                <IonHeader>
                    <IonToolbar>
                        <IonButtons slot="start">
                            <IonMenuButton></IonMenuButton>
                        </IonButtons>
                        <IonTitle>Appearance</IonTitle>
                        <IonButtons slot="end">
                            <IonButton aria-label="Profile" className='profileButton' href="/Rosie/Profile">
                                <IonIcon className='profileIcon' slot="icon-only" icon={personCircle}></IonIcon>
                            </IonButton>
                        </IonButtons>
                    </IonToolbar>
                </IonHeader>
                <IonContent fullscreen>
                    <IonGrid fixed={true}>
                        <IonRow class="ion-justify-content-center"><h1 className="heading"><IonIcon icon={flower} className='colourIcon'></IonIcon> Colour Scheme <IonIcon icon={flower} className='colourIcon'></IonIcon></h1></IonRow>
                        <IonRow class="ion-justify-content-start"><p><b></b> </p></IonRow>
                        <IonRadioGroup value={theme} onIonChange={handleThemeChange}>
                            <IonRow class="ion-justify-content-start"><IonRadio value="light" labelPlacement="end" justify="space-between">Light Mode</IonRadio></IonRow>
                            <br />
                            <IonRow class="ion-justify-content-start"><IonRadio value="dark" justify="space-between" labelPlacement='end' >Dark Mode</IonRadio></IonRow>
                            <br />
                            <IonRow class="ion-justify-content-start"><IonRadio value="contrast" labelPlacement="end" justify="space-between">High Contrast Mode</IonRadio></IonRow>
                            <br />
                        </IonRadioGroup>
                        <IonRow class="ion-justify-content-center">
                            <IonButton className="btn" href="/Rosie/Cycle" size="large">Back to Cycle Page</IonButton>
                        </IonRow>
                    </IonGrid>
                </IonContent>
            </IonPage>
        </>
    );
};

export default Appearance;
