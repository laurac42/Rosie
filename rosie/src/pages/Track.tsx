import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButtons, IonMenuButton, IonButton, IonIcon, IonGrid, IonRow, IonCol } from '@ionic/react';
import { add, bandage, ellipsisHorizontal, flash, happyOutline, man, personCircle, pulse, sadOutline, thunderstorm, water } from 'ionicons/icons';
import { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import './Track.css'; // styles the calendar
import moment from 'moment';
import { IonRippleEffect } from '@ionic/react';
import { usePhotoGallery } from './hooks/usePhotoGallery';
import Menu from '../components/Menu'
import Tabs from '../components/Tabs'

const Track: React.FC = () => {
  const [events, setEvents] = useState<any[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [clickedFlow, setClickedFlow] = useState<string>('');
  const [clickedPain, setClickedPain] = useState<string>('');
  const [clickedSkin, setClickedSkin] = useState<string>('');
  const [clickedEmotion, setClickedEmotion] = useState<string>('');
  const { deletePhoto, photos, takePhoto } = usePhotoGallery();

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
  function saveTracking() {

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
    savePeriodData();
  }

  /** 
   * save the period data, including turning it into saving start and end dates
   */
  function savePeriodData() {
    if (clickedFlow) {
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


  return (
    <>
      <Menu />
      <IonPage id="main-content">
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonMenuButton></IonMenuButton>
            </IonButtons>
            <IonTitle>Track</IonTitle>
            <IonButtons slot="end">
              <IonButton aria-label="Profile" className='profileButton' href="/Rosie/Profile">
                <IonIcon className='profileIcon' slot="icon-only" icon={personCircle}></IonIcon>
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent fullscreen>
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
              <h2>Period Flow</h2>
            </IonRow>
            <IonRow className="track-page trackRows">
              <IonCol
                // clicked css class is added when the column is clicked
                className={`ion-activatable ripple-parent ${clickedFlow.includes('Heavy') ? 'clicked clickedIcon' : ''}`}
                onClick={handleFlowClick}>
                <IonIcon icon={water} className='colourIcon'></IonIcon> <br></br> Heavy<IonRippleEffect />
              </IonCol>
              <IonCol
                // clicked css class is added when the column is clicked
                className={`ion-activatable ripple-parent ${clickedFlow.includes('Medium') ? 'clicked clickedIcon' : ''}`}
                onClick={handleFlowClick}>
                <IonIcon icon={water} className='colourIcon'></IonIcon><br></br>Medium<IonRippleEffect className="custom-ripple " /></IonCol>
              <IonCol
                // clicked css class is added when the column is clicked
                className={`ion-activatable ripple-parent ${clickedFlow.includes('Light') ? 'clicked clickedIcon' : ''}`}
                onClick={handleFlowClick}>
                <IonIcon icon={water} className='colourIcon'></IonIcon><br></br>Light<IonRippleEffect className="custom-ripple" /></IonCol>
            </IonRow>
            <IonRow class="ion-justify-content-start">
              <h2>Pain</h2>
            </IonRow>
            <IonRow className="track-page trackRows">
              <IonCol
                // clicked css class is added when the column is clicked
                className={`ion-activatable ripple-parent ${clickedPain.includes('No Pain') ? 'clicked clickedIcon' : ''}`}
                onClick={handlePainClick}>
                <IonIcon icon={happyOutline} className='colourIcon'></IonIcon><br></br>No Pain<IonRippleEffect className="custom-ripple" /></IonCol>
              <IonCol
                // clicked css class is added when the column is clicked
                className={`ion-activatable ripple-parent ${clickedPain.includes('Cramps') ? 'clicked clickedIcon' : ''}`}
                onClick={handlePainClick}>
                <IonIcon icon={flash} className='colourIcon'></IonIcon><br></br>Cramps<IonRippleEffect className="custom-ripple" /></IonCol>
              <IonCol
                // clicked css class is added when the column is clicked
                className={`ion-activatable ripple-parent ${clickedPain.includes('Back Pain') ? 'clicked clickedIcon' : ''}`}
                onClick={handlePainClick}>
                <IonIcon icon={man} className='colourIcon'></IonIcon><br></br>Back Pain<IonRippleEffect className="custom-ripple" /></IonCol>
              <IonCol
                // clicked css class is added when the column is clicked
                className={`ion-activatable ripple-parent ${clickedPain.includes('Headache') ? 'clicked clickedIcon' : ''}`}
                onClick={handlePainClick}>
                <IonIcon icon={sadOutline} className='colourIcon'></IonIcon><br></br>Headache<IonRippleEffect className="custom-ripple" /></IonCol>
            </IonRow>
            <IonRow class="ion-justify-content-between">
              <IonCol><h2>Skin</h2></IonCol>
            </IonRow>
            <IonRow className="track-page trackRows">
              <IonCol
                // clicked css class is added when the column is clicked
                className={`ion-activatable ripple-parent ${clickedSkin.includes('Good') ? 'clicked clickedIcon' : ''}`}
                onClick={handleSkinClick}>
                <IonIcon icon={happyOutline} className='colourIcon'></IonIcon><br></br>Good<IonRippleEffect className="custom-ripple" /></IonCol>
              <IonCol
                // clicked css class is added when the column is clicked
                className={`ion-activatable ripple-parent ${clickedSkin.includes('Acne') ? 'clicked clickedIcon' : ''}`}
                onClick={handleSkinClick}>
                <IonIcon icon={ellipsisHorizontal} className='colourIcon'></IonIcon><br></br>Acne<IonRippleEffect className="custom-ripple" /></IonCol>
              <IonCol
                // clicked css class is added when the column is clicked
                className={`ion-activatable ripple-parent ${clickedSkin.includes('Oily') ? 'clicked clickedIcon' : ''}`}
                onClick={handleSkinClick}>
                <IonIcon icon={water} className='colourIcon'></IonIcon><br></br>Oily<IonRippleEffect className="custom-ripple" /></IonCol>
              <IonCol
                // clicked css class is added when the column is clicked
                className={`ion-activatable ripple-parent ${clickedSkin.includes('Dry') ? 'clicked clickedIcon' : ''}`}
                onClick={handleSkinClick}>
                <IonIcon icon={bandage} className='colourIcon'></IonIcon><br></br>Dry<IonRippleEffect className="custom-ripple" /></IonCol>
            </IonRow>
            <IonRow><h1>Add Skin Photo</h1></IonRow>
            <IonRow><p>Add a skin photo to help you understand how your skin changes throughout the month</p></IonRow>
            <IonRow class='ion-justify-content-center'>
              <IonButton onClick={() => takePhoto(selectedDate)} size='default'>Add Photo <IonIcon icon={add} className='buttonIcon'></IonIcon></IonButton>
            </IonRow>

            <IonRow class="ion-justify-content-start">
              <h2>Emotions</h2>
            </IonRow>
            <IonRow className="track-page trackRows">
              <IonCol
                // clicked css class is added when the column is clicked
                className={`ion-activatable ripple-parent ${clickedEmotion.includes('Happy') ? 'clicked clickedIcon' : ''}`}
                onClick={handleEmotionClick}>
                <IonIcon icon={happyOutline} className='colourIcon'></IonIcon><br></br>Happy<IonRippleEffect className="custom-ripple" /></IonCol>
              <IonCol
                // clicked css class is added when the column is clicked
                className={`ion-activatable ripple-parent ${clickedEmotion.includes('Sad') ? 'clicked clickedIcon' : ''}`}
                onClick={handleEmotionClick}>
                <IonIcon icon={sadOutline} className='colourIcon'></IonIcon><br></br>Sad<IonRippleEffect className="custom-ripple" /></IonCol>
              <IonCol
                // clicked css class is added when the column is clicked
                className={`ion-activatable ripple-parent ${clickedEmotion.includes('Angry') ? 'clicked clickedIcon' : ''}`}
                onClick={handleEmotionClick}>
                <IonIcon icon={thunderstorm} className='colourIcon'></IonIcon><br></br>Angry<IonRippleEffect className="custom-ripple" /></IonCol>
              <IonCol
                // clicked css class is added when the column is clicked
                className={`ion-activatable ripple-parent ${clickedEmotion.includes('Mood Swings') ? 'clicked clickedIcon' : ''}`}
                onClick={handleEmotionClick}>
                <IonIcon icon={pulse} className='colourIcon'></IonIcon><br></br>Mood Swings<IonRippleEffect className="custom-ripple" /></IonCol>
            </IonRow>
            <IonRow class="ion-justify-content-center">
              <IonButton className="btn" href="/Rosie/Cycle" onClick={saveTracking} size="large">Save All</IonButton>
            </IonRow>
          </IonGrid>
        </IonContent>
        <Tabs />
      </IonPage>

    </>
  );
};

export default Track;
