import { IonContent, IonHeader, IonPage, IonImg, IonTitle,IonActionSheet, IonToolbar, IonButtons, IonMenuButton, IonButton, IonIcon, IonGrid, IonRow, IonCol } from '@ionic/react';
import { personCircle, backspace, flower, trash, close } from 'ionicons/icons';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { usePhotoGallery, UserPhoto } from './hooks/usePhotoGallery';

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
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Date Details</IonTitle>
          <IonButtons slot="start">
            <IonMenuButton autoHide={false}></IonMenuButton>
          </IonButtons>
          <IonButtons slot="end">
            <IonButton className='profileButton' href="/Rosie/Profile">
              <IonIcon slot="icon-only" icon={personCircle}></IonIcon>
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonGrid fixed={true}>
            <IonRow><IonButton href="/Rosie/Calendar" aria-label='back to calendar'><IonIcon icon={backspace}></IonIcon></IonButton></IonRow>
          <IonRow>
            <IonCol>
              <h1><IonIcon icon={flower} className='colourIcon'></IonIcon>Details for {date}<IonIcon icon={flower} className='colourIcon'></IonIcon></h1>
              {/* if each thing has been stored, show the details */}
              {period && <p><b>Period: </b>{period}</p>}
              {pain && <p><b>Pain:</b> {pain}</p>}
              {emotion && <p><b>Emotion:</b> {emotion}</p>}
              {skin && <p><b>Skin:</b> {skin}</p>}
              {photos.length > 0 && (
                <div>
                  <h3>Photos:</h3>
                  <IonRow>
                    {photos.map((photo, index) => (
                    <IonCol size="6" key={index}>
                        <IonImg onClick={() => setPhotoToDelete(photo)} src={photo.webviewPath} />
                    </IonCol>
                    ))}
                </IonRow>
                </div>
              )}
            </IonCol>
          </IonRow>
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
  );
};

export default Date;
