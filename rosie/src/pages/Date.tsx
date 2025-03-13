import { IonContent, IonFab, IonFabButton, IonHeader, IonPage, IonImg, IonTitle, IonActionSheet, IonToolbar, IonButtons, IonMenuButton, IonButton, IonIcon, IonGrid, IonRow, IonCol, IonAccordion, IonAccordionGroup, IonItem, IonLabel, IonList, IonMenu } from '@ionic/react';
import { personCircle, backspace, flower, trash, close, closeCircle, ticket, checkmark, calendar, clipboard, colorPalette, folderOpen, informationCircle, lockClosed, notifications, people, radioButtonOff, settings, trendingUp } from 'ionicons/icons';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { usePhotoGallery, UserPhoto } from './hooks/usePhotoGallery';
import './Date.css'

const Date: React.FC = () => {
    const { date } = useParams<{ date: string }>();
    const { deletePhoto, photos, takePhoto } = usePhotoGallery();
    const [photoToDelete, setPhotoToDelete] = useState<UserPhoto>();


    // get data for the clicked date from local storage
    const periodMap = new Map<string, string>(JSON.parse(localStorage.periodMap || '[]'));
    const painMap = new Map<string, string>(JSON.parse(localStorage.painMap || '[]'));
    const emotionsMap = new Map<string, string>(JSON.parse(localStorage.emotionsMap || '[]'));
    const skinMap = new Map<string, string>(JSON.parse(localStorage.skinMap || '[]'));

    const period = periodMap.get(date);
    const pain = painMap.get(date);
    const emotion = emotionsMap.get(date);
    const skin = skinMap.get(date);

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
                        <IonTitle>Date Details</IonTitle>
                        <IonButtons slot="end">
                            <IonButton aria-label="Profile" className='profileButton' href="/Rosie/Profile">
                                <IonIcon className='profileIcon' slot="icon-only" icon={personCircle}></IonIcon>
                            </IonButton>
                        </IonButtons>
                    </IonToolbar>
                </IonHeader>
                <IonContent fullscreen>
                    <IonGrid fixed={true}>
                        <IonRow><IonButton href="/Rosie/Calendar" ><IonIcon icon={backspace}></IonIcon>Back</IonButton></IonRow>
                        <IonRow class="ion-justify-content-center">
                                <h1><IonIcon icon={flower} className='colourIcon'></IonIcon><b>{date}</b><IonIcon icon={flower} className='colourIcon'></IonIcon></h1>
                        </IonRow>
                                {/* if each thing has been stored, show the details */}
                                {period && <IonRow><p><b>Period: </b>{period}</p></IonRow>}
                                {pain && <IonRow><p><b>Pain:</b> {pain}</p></IonRow>}
                                {emotion && <IonRow><p><b>Emotion:</b> {emotion}</p></IonRow>}
                                {skin && <IonRow><p><b>Skin:</b> {skin}</p></IonRow>}
                                {photos.length > 0 && (
                                    <div>
                                        <h3>Photos:</h3>
                                        <p>Tap a photo and choose delete if you wish to delete it</p>
                                        <IonRow>
                                            {photos.map((photo, index) => (
                                                <IonCol size="6" key={index}>
                                                    <IonImg onClick={() => setPhotoToDelete(photo)} src={photo.webviewPath} />
                                                </IonCol>
                                            ))}
                                        </IonRow>
                                    </div>
                                )}
                        
                        <IonRow class="ion-justify-content-center">
                            <IonFab >
                                <IonFabButton href='/Rosie/Calendar'>
                                    <IonIcon icon={checkmark}></IonIcon>
                                </IonFabButton>
                            </IonFab></IonRow>
                    </IonGrid>
                    <IonActionSheet
                        isOpen={!!photoToDelete}
                        buttons={[{
                            text: 'Delete',
                            role: 'destructive',
                            icon: trash,
                            handler: () => {
                                if (photoToDelete) {
                                    deletePhoto(photoToDelete);
                                    setPhotoToDelete(undefined);
                                }
                            }
                        }, {
                            text: 'Cancel',
                            icon: close,
                            role: 'cancel'
                        }]}
                        onDidDismiss={() => setPhotoToDelete(undefined)}
                    />

                </IonContent>
            </IonPage>
        </>
    );
};

export default Date;
