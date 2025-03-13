import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonIcon, IonRow, IonGrid, IonCol, IonItem, IonRadioGroup, IonRadio, IonCheckbox, IonMenu, IonList, IonLabel, IonButtons, IonMenuButton, IonAccordionGroup, IonAccordion } from '@ionic/react';
import { flower, colorPalette, notifications, people, lockClosed, informationCircle, personCircle, settings, trendingUp, clipboard, calendar, radioButtonOff, folderOpen } from 'ionicons/icons';
import React, { useState, useEffect } from 'react';
import { applyTheme } from "../theme";


const AboutUs: React.FC = () => {
    return (
        <>
              <IonMenu contentId="main-content">
                <IonHeader>
                  <IonToolbar>
                    <IonTitle>Menu</IonTitle>
                  </IonToolbar>
                </IonHeader>
                <IonContent>
        
                  <IonList>
                    <IonAccordionGroup>
                      <IonAccordion value="first">
                        <IonItem slot="header">
                          <IonIcon className="menuIcon" aria-hidden="true" icon={folderOpen} slot="start"></IonIcon>
                          <IonLabel>Main Pages</IonLabel>
                        </IonItem>
                        <div className="ion-padding" slot="content">
                          <IonItem href="/Rosie/Cycle">
                            <IonIcon className="menuIcon" aria-hidden="true" icon={radioButtonOff} slot="start"></IonIcon>
                            <IonLabel>Cycle</IonLabel>
                          </IonItem>
                        </div>
                        <div className="ion-padding" slot="content">
                          <IonItem href="/Rosie/Calendar">
                            <IonIcon className="menuIcon" aria-hidden="true" icon={calendar} slot="start"></IonIcon>
                            <IonLabel>Calendar</IonLabel>
                          </IonItem>
                        </div>
                        <div className="ion-padding" slot="content">
                          <IonItem href="/Rosie/Track">
                            <IonIcon className="menuIcon" aria-hidden="true" icon={clipboard} slot="start"></IonIcon>
                            <IonLabel>Cycle</IonLabel>
                          </IonItem>
                        </div>
                        <div className="ion-padding" slot="content">
                          <IonItem href="/Rosie/Analysis">
                            <IonIcon className="menuIcon" aria-hidden="true" icon={trendingUp} slot="start"></IonIcon>
                            <IonLabel>Cycle</IonLabel>
                          </IonItem>
                        </div>
                      </IonAccordion>
                    
        
                    <IonAccordion value="second">
                      <IonItem slot="header">
                        <IonIcon className="menuIcon" aria-hidden="true" icon={settings} slot="start"></IonIcon>
                        <IonLabel>Settings</IonLabel>
                      </IonItem>
                      <div className="ion-padding" slot="content">
                        <IonItem href="/Rosie/Menu/Appearance">
                          <IonIcon className="menuIcon" aria-hidden="true" icon={colorPalette} slot="start"></IonIcon>
                          <IonLabel>Appearance</IonLabel>
                        </IonItem>
                      </div>
                      <div className="ion-padding" slot="content">
                        <IonItem href='/Rosie/Menu/Notifications'>
                          <IonIcon className="menuIcon" aria-hidden="true" icon={notifications} slot="start"></IonIcon>
                          <IonLabel>Notifications</IonLabel>
                        </IonItem>
                      </div>
                    </IonAccordion>
                    </IonAccordionGroup>
        
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
                        <IonTitle>About Us</IonTitle>
                        <IonButtons slot="end">
                            <IonButton aria-label="Profile" className='profileButton' href="/Rosie/Profile">
                                <IonIcon className='profileIcon' slot="icon-only" icon={personCircle}></IonIcon>
                            </IonButton>
                        </IonButtons>
                    </IonToolbar>
                </IonHeader>
                <IonContent fullscreen>
                    <IonGrid fixed={true}>
                        <IonRow class="ion-justify-content-center"><h1 className="heading"><IonIcon icon={flower} className='colourIcon'></IonIcon> About Us <IonIcon icon={flower} className='colourIcon'></IonIcon></h1></IonRow>
                        <p>Meet Rosie, your go-to period-tracking app designed for simplicity and ease. We believe that understanding your cycle shouldn’t be overwhelming—it should be effortless, intuitive, and empowering. That’s why we created Rosie, a no-fuss way to track your period, predict upcoming cycles, and stay in tune with your body.

                            <br></br><br></br>Unlike other apps that overload you with complicated features, Rosie focuses on what truly matters: helping you track your period quickly and accurately. Whether you’re monitoring your cycle for personal awareness, planning ahead, or keeping an eye on symptoms, Rosie gives you the tools you need without the extra noise.

                            <br></br><br></br>We're here to make period tracking feel natural and stress-free. Because knowing your cycle means knowing yourself—and that should always be simple.</p>
                        <IonRow class="ion-justify-content-center">
                            <IonButton className="btn" href="/Rosie/Cycle" size="large">Back to Cycle Page</IonButton>
                        </IonRow>
                    </IonGrid>
                </IonContent>
            </IonPage>
        </>
    );
};

export default AboutUs;
