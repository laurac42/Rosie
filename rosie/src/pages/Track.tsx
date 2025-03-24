import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButtons, IonMenuButton, IonButton, IonIcon, IonGrid, IonRow, IonCol, IonFooter, RefresherEventDetail, IonRefresher, IonRefresherContent } from '@ionic/react';
import { add, backspace, bandage, close, ellipsisHorizontal, flash, happyOutline, man, personCircle, pulse, sadOutline, thunderstorm, water } from 'ionicons/icons';
import { useState, useEffect, useRef } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { Photo } from '@capacitor/camera';
import './Track.css'; // styles the calendar
import moment from 'moment';
import { IonRippleEffect } from '@ionic/react';
import { usePhotoGallery } from './hooks/usePhotoGallery';
import Menu from '../components/Menu'

const Track: React.FC = () => {
  const [events, setEvents] = useState<any[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [clickedFlow, setClickedFlow] = useState<string>('');
  const [clickedPain, setClickedPain] = useState<string>('');
  const [clickedSkin, setClickedSkin] = useState<string>('');
  const [clickedEmotion, setClickedEmotion] = useState<string>('');
  const { deletePhoto, photos, takePhoto, setUpSave } = usePhotoGallery();
  const [photo, setPhoto] = useState<[string, Photo, string]>();

  useEffect(() => {
    // when the page loads, set the selected date to today as default
    const today = moment();
    setSelectedDate(today.format('YYYY-MM-DD'));
    setEvents([
      {
        title: 'date',
        start: today.format('YYYY-MM-DD'),
        allDay: true,
        className: 'date-event'
      }
    ]);
  }, []);

  function handleRefresh(event: CustomEvent<RefresherEventDetail>) {
    setTimeout(() => {
      // Any calls to load data go here
      event.detail.complete();
    }, 500);
  }


  // so when a date is clicked, an event is created for that date
  function handleDateClick(info: any) {
    //console.log('Date clicked:', info.dateStr);
    setSelectedDate(info.dateStr);

    // Set only the selected date as an event
    setEvents([
      {
        title: 'date',
        start: info.dateStr,
        allDay: true,
        className: 'date-event'
      }
    ]);
  }

  // handle a flow column being clicked
  function handleFlowClick(event: any) {
    const columnText = event.currentTarget.innerText.trim(); // Get the column text

    // add the column to the clicked flow
    if (columnText) {
      setClickedFlow(columnText);
    }
  }

  // handle a pain column being clicked
  function handlePainClick(event: any) {
    const columnText = event.currentTarget.innerText.trim(); // Get the column text

    // add the column to the clicked pain
    if (columnText) {
      setClickedPain(columnText);
    }
  }

  // handle a skin column being clicked
  function handleSkinClick(event: any) {
    const columnText = event.currentTarget.innerText.trim(); // Get the column text

    // add the column to the clicked skin
    if (columnText) {
      setClickedSkin(columnText);
    }

  }

  // handle an emotion column being clicked
  function handleEmotionClick(event: any) {
    const columnText = event.currentTarget.innerText.trim(); // Get the column text
    // add the column to the clicked emotion
    if (columnText) {
      setClickedEmotion(columnText);
    }
  }

  /**
   * Function to save all of the data that has been tracked to local storage
   */
  async function saveTracking() {

    // check if the pain map exists in local storage or if this is the first pain track
    if (clickedPain) {
      if (localStorage.getItem("painMap") === null) {
        // create a map that maps a date to a pain level
        let painMap = new Map<string, string>();
        painMap.set(selectedDate, clickedPain);
        localStorage.painMap = JSON.stringify(Array.from(painMap.entries()));
      }
      else {
        // get the previous pain map, and add to it, overwriting if there is something for that date already
        var storedPain = new Map(JSON.parse(localStorage.painMap));
        storedPain.set(selectedDate, clickedPain);
        localStorage.painMap = JSON.stringify(Array.from(storedPain.entries()));
      }
    }

    if (clickedEmotion) {
      // emotions data
      // check if the emotions map exists in local storage or if this is the first
      if (localStorage.getItem("emotionsMap") === null) {
        // create a map that maps a date to a pain level
        let emotionsMap = new Map<string, string>();
        emotionsMap.set(selectedDate, clickedEmotion);
        localStorage.emotionsMap = JSON.stringify(Array.from(emotionsMap.entries()));
      }
      else {
        // get the previous pain map, and add to it, overwriting if there is something for that date already
        var storedEmotions = new Map(JSON.parse(localStorage.emotionsMap));
        storedEmotions.set(selectedDate, clickedEmotion);
        localStorage.emotionsMap = JSON.stringify(Array.from(storedEmotions.entries()));
      }
    }

    if (clickedSkin) {
      // skin data
      // check if the skin map exists in local storage or if this is the first
      if (localStorage.getItem("skinMap") === null) {
        // create a map that maps a date to a pain level
        let skinMap = new Map<string, string>();
        skinMap.set(selectedDate, clickedSkin);
        localStorage.skinMap = JSON.stringify(Array.from(skinMap.entries()));
      }
      else {
        // get the previous pain map, and add to it, overwriting if there is something for that date already
        var storedSkin = new Map(JSON.parse(localStorage.skinMap));
        storedSkin.set(selectedDate, clickedSkin);
        localStorage.skinMap = JSON.stringify(Array.from(storedSkin.entries()));
      }
    }
    // if a photo has been taken, save it
    if (photo) {
      console.log(photo)
      await setUpSave(photo[0], photo[1], photo[2]);
      console.log("save has been set up")
    }
    savePeriodData();
  }

  /** 
   * save the period data, including turning it into saving start and end dates
   */
  function savePeriodData() {
    if (clickedFlow) {
      console.log("saving period data")
      // period flow data
      // check if the period map exists in local storage or if this is the first period track
      if (localStorage.getItem("periodMap") === null) {
        // create a map that maps a date to a pain level
        let periodMap = new Map<string, string>();
        periodMap.set(selectedDate, clickedFlow);
        localStorage.periodMap = JSON.stringify(Array.from(periodMap.entries()));
      }
      else {
        // get the previous pain map, and add to it, overwriting if there is something for that date already
        var storedPeriod = new Map(JSON.parse(localStorage.periodMap));
        storedPeriod.set(selectedDate, clickedFlow);
        localStorage.periodMap = JSON.stringify(Array.from(storedPeriod.entries()));
      }
    }
  }

  /* Render the period onto the calendar */
  function renderEventContent(eventInfo: any) {
    return (
      <>
        <b>{eventInfo.timeText}</b>
        <i>{eventInfo.event.title}</i>
      </>
    );
  }

  /**
   * take a photo for the selected date and store the results
   */
  function addPhoto() {
    takePhoto(selectedDate).then(result => {
      // save the photo
      setPhoto([result.fileName, result.photo, result.selectedDate])
    }).catch(error => {
      console.error('Error taking photo:', error);
    });
  }

  return (
    <>
      <IonPage id="main-content">
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonButton className='profileButton' href='/Rosie/Cycle'>
                <IonIcon className='profileIcon' slot="icon-only" icon={close}></IonIcon>
              </IonButton>
            </IonButtons>
            <IonTitle>Track</IonTitle>
            <IonButtons slot="end">
              <IonButton className='profileButton' href="/Rosie/Profile">
                <IonIcon className='profileIcon' slot="icon-only" icon={personCircle}></IonIcon>
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent fullscreen>
          <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
            <IonRefresherContent></IonRefresherContent>
          </IonRefresher>
          <IonRow>
              <IonButton className='back' href="/Rosie/Cycle" size="default"><IonIcon icon={backspace}></IonIcon>Back</IonButton>
            </IonRow>
          <IonGrid fixed={true} class="ion-justify-content-center calendarWidthTrack">
            <FullCalendar
              plugins={[dayGridPlugin, interactionPlugin]}
              initialView='dayGridWeek'
              weekends={true}
              headerToolbar={{
                left: 'prev,next',
                center: 'title',
                right: 'today'
              }}
              events={events} // Only the selected date remains highlighted
              dateClick={handleDateClick}
              eventContent={renderEventContent} // Custom function to render the event content
              dayCellClassNames={() => "trackCalendar "}
            />
          </IonGrid>
          <IonGrid fixed={true}>
            <IonRow><h3 className="h3-padding">Select a date and track your symptoms (you don't need to track them all)</h3></IonRow>
            <IonRow class="ion-justify-content-start">
              <h2><b>Period Flow</b></h2>
            </IonRow>
            <IonRow className="track-page trackRows">
              <IonCol
                // clicked css class is added when the column is clicked
                className={`track-period ion-activatable ripple-parent ${clickedFlow.includes('Heavy') ? 'clickedPeriod clickedIcon' : ''}`}
                onClick={handleFlowClick}>
                <IonIcon icon={water} className='colourIcon'></IonIcon> <br></br> Heavy<IonRippleEffect />
              </IonCol>
              <IonCol
                // clicked css class is added when the column is clicked
                className={`track-period ion-activatable ripple-parent ${clickedFlow.includes('Medium') ? 'clickedPeriod clickedIcon' : ''}`}
                onClick={handleFlowClick}>
                <IonIcon icon={water} className='colourIcon'></IonIcon><br></br>Medium<IonRippleEffect className="custom-ripple-period" /></IonCol>
              <IonCol
                // clicked css class is added when the column is clicked
                className={`track-period ion-activatable ripple-parent ${clickedFlow.includes('Light') ? 'clickedPeriod clickedIcon' : ''}`}
                onClick={handleFlowClick}>
                <IonIcon icon={water} className='colourIcon'></IonIcon><br></br>Light<IonRippleEffect className="custom-ripple-period" /></IonCol>
            </IonRow>
            <IonRow class="ion-justify-content-start">
              <h2><b>Pain</b></h2>
            </IonRow>
            <IonRow className="trackRows">
              <IonCol
                // clicked css class is added when the column is clicked
                className={`track-pain ion-activatable ripple-parent ${clickedPain.includes('No Pain') ? 'clickedPain clickedIcon' : ''}`}
                onClick={handlePainClick}>
                <IonIcon icon={happyOutline} className='colourIcon'></IonIcon><br></br>No Pain<IonRippleEffect className="custom-ripple-track" /></IonCol>
              <IonCol
                // clicked css class is added when the column is clicked
                className={`track-pain ion-activatable ripple-parent ${clickedPain.includes('Cramps') ? 'clickedPain clickedIcon' : ''}`}
                onClick={handlePainClick}>
                <IonIcon icon={flash} className='colourIcon'></IonIcon><br></br>Cramps<IonRippleEffect className="custom-ripple-track" /></IonCol>
              <IonCol
                // clicked css class is added when the column is clicked
                className={`track-pain ion-activatable ripple-parent ${clickedPain.includes('Back Pain') ? 'clickedPain clickedIcon' : ''}`}
                onClick={handlePainClick}>
                <IonIcon icon={man} className='colourIcon'></IonIcon><br></br>Back Pain<IonRippleEffect className="custom-ripple-track" /></IonCol>
              <IonCol
                // clicked css class is added when the column is clicked
                className={`track-pain ion-activatable ripple-parent ${clickedPain.includes('Headache') ? 'clickedPain clickedIcon' : ''}`}
                onClick={handlePainClick}>
                <IonIcon icon={sadOutline} className='colourIcon'></IonIcon><br></br>Headache<IonRippleEffect className="custom-ripple-track" /></IonCol>
            </IonRow>
            <IonRow class="ion-justify-content-between">
              <IonCol><h2><b>Skin</b></h2></IonCol>
            </IonRow>
            <IonRow className="track-page trackRows">
              <IonCol
                // clicked css class is added when the column is clicked
                className={`track-skin ion-activatable ripple-parent ${clickedSkin.includes('Good') ? 'clickedSkin clickedIcon' : ''}`}
                onClick={handleSkinClick}>
                <IonIcon icon={happyOutline} className='colourIcon'></IonIcon><br></br>Good<IonRippleEffect className="custom-ripple-skin" /></IonCol>
              <IonCol
                // clicked css class is added when the column is clicked
                className={`track-skin ion-activatable ripple-parent ${clickedSkin.includes('Acne') ? 'clickedSkin clickedIcon' : ''}`}
                onClick={handleSkinClick}>
                <IonIcon icon={ellipsisHorizontal} className='colourIcon'></IonIcon><br></br>Acne<IonRippleEffect className="custom-ripple-skin" /></IonCol>
              <IonCol
                // clicked css class is added when the column is clicked
                className={`track-skin ion-activatable ripple-parent ${clickedSkin.includes('Oily') ? 'clickedSkin clickedIcon' : ''}`}
                onClick={handleSkinClick}>
                <IonIcon icon={water} className='colourIcon'></IonIcon><br></br>Oily<IonRippleEffect className="custom-ripple-skin" /></IonCol>
              <IonCol
                // clicked css class is added when the column is clicked
                className={`track-skin ion-activatable ripple-parent ${clickedSkin.includes('Dry') ? 'clickedSkin clickedIcon' : ''}`}
                onClick={handleSkinClick}>
                <IonIcon icon={bandage} className='colourIcon'></IonIcon><br></br>Dry<IonRippleEffect className="custom-ripple-skin" /></IonCol>
            </IonRow>
            <IonRow><h2><b>Add Skin Photo</b></h2></IonRow>
            <IonRow><p>Add a skin photo to help you understand how your skin changes throughout the month</p></IonRow>
            {/* if a photo has been taken, let the user know */}
            {photo ? (
              <>
                <IonRow><p><b>Photo taken successfully. Click save all to save</b></p></IonRow>
                <IonRow class='ion-justify-content-center'>
                  <IonButton className='photo-button' onClick={addPhoto} size='default'>Change Photo <IonIcon icon={add} className='buttonIcon'></IonIcon></IonButton>
                </IonRow>
              </>

            ) : (<IonRow class='ion-justify-content-center'>
              <IonButton className='photo-button' onClick={addPhoto} size='default'>Add Photo <IonIcon icon={add} className='buttonIcon'></IonIcon></IonButton>
            </IonRow>)}

            <IonRow class="ion-justify-content-start">
              <h2><b>Emotions</b></h2>
            </IonRow>
            <IonRow className="trackRows track-bottom">
              <IonCol
                // clicked css class is added when the column is clicked
                className={`track-emotion ion-activatable ripple-parent ${clickedEmotion.includes('Happy') ? 'clickedEmotion clickedIcon' : ''}`}
                onClick={handleEmotionClick}>
                <IonIcon icon={happyOutline} className='colourIcon'></IonIcon><br></br>Happy<IonRippleEffect className="custom-ripple-emotion" /></IonCol>
              <IonCol
                // clicked css class is added when the column is clicked
                className={`track-emotion ion-activatable ripple-parent ${clickedEmotion.includes('Sad') ? 'clickedEmotion clickedIcon' : ''}`}
                onClick={handleEmotionClick}>
                <IonIcon icon={sadOutline} className='colourIcon'></IonIcon><br></br>Sad<IonRippleEffect className="custom-ripple-emotion" /></IonCol>
              <IonCol
                // clicked css class is added when the column is clicked
                className={` track-emotion ion-activatable ripple-parent ${clickedEmotion.includes('Angry') ? 'clickedEmotion clickedIcon' : ''}`}
                onClick={handleEmotionClick}>
                <IonIcon icon={thunderstorm} className='colourIcon'></IonIcon><br></br>Angry<IonRippleEffect className="custom-ripple-emotion" /></IonCol>
              <IonCol
                // clicked css class is added when the column is clicked
                className={`track-emotion ion-activatable ripple-parent ${clickedEmotion.includes('Mood Swings') ? 'clickedEmotion clickedIcon' : ''}`}
                onClick={handleEmotionClick}>
                <IonIcon icon={pulse} className='colourIcon'></IonIcon><br></br>Mood Swings<IonRippleEffect className="custom-ripple-emotion" /></IonCol>
            </IonRow>
            <><IonRow class="ion-justify-content-center">
              <IonButton className='save' href="/Rosie/Calendar" onClick={saveTracking} size="large">Save All</IonButton>
            </IonRow></>
          </IonGrid>
        </IonContent>
      </IonPage >

    </>
  );
};

export default Track;
