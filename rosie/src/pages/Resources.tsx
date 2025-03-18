import { IonContent, IonHeader, IonPage, IonMenu, IonTitle, IonToolbar, IonButton, IonIcon, IonRow, IonGrid, IonCol, IonItem, IonList, IonLabel, IonButtons, IonMenuButton, IonAccordion, IonAccordionGroup } from '@ionic/react';
import { flower, informationCircle, personCircle } from 'ionicons/icons';
import React from 'react';
import Menu from '../components/Menu'

const Resources: React.FC = () => {
    return (
        <>
            <Menu />
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