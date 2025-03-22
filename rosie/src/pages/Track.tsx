import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButtons, IonMenuButton, IonButton, IonIcon, IonGrid, IonRow, IonCol, IonFooter, RefresherEventDetail, IonRefresher, IonRefresherContent } from '@ionic/react';
import { add, backspace, bandage, ellipsisHorizontal, flash, happyOutline, man, personCircle, pulse, sadOutline, thunderstorm, water } from 'ionicons/icons';
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
  const [day, setDay] = useState(0);
  const [averageCycleLength, setAverageCycleLength] = useState(0);
  const [startDates, setStartDates] = useState<string[]>([]);
  const [periods, setPeriods] = useState<string[]>([]);
  const [endDates, setEndDates] = useState<string[]>([]);
  const [cycleLengths, setCycleLengths] = useState<{ length: number, startDate: string }[]>([]);
  const [periodPrediction, setPeriodPrediction] = useState<any>();

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
    // if a photo has been taken, save it
    if (photo) {
      setUpSave(photo[0], photo[1], photo[2])
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

      // update the server with a period prediction when the user tracks a period
      calculateAverageCycleLength();
      calculateDay();
      calculatePeriodPrediction();
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

  /* Calculate the users average cycle length based on past periods, to make this the maximum for the cycle */
  function calculateAverageCycleLength() {
    console.log("calculating cycle length")
    // clear any old data first:
    periods.length = 0;
    startDates.length = 0;
    // first, load in all period data and make sure it is sorted by date
    if (localStorage.periodMap) {
      console.log("period map exists")
      var periodDates = new Map<string, string>(JSON.parse(localStorage.periodMap));
      periodDates.forEach((flow: string, date: string) => {
        if (!periods.includes(date)) { periods.push(date); }
      });
      periods.sort((a, b) => (new Date(a).getTime() - new Date(b).getTime())); // from oldest

      // the first period is definitely a start date
      if (!startDates.includes(periods[0])) { startDates.push(periods[0]); }

      for (let i = 1; i < periods.length; i++) {
        // for date 1 onward, check if day before was a period, if yes, i is not a start date
        // if day before was not a period, periods[i] is a start date
        var dayBefore = moment(periods[i]).subtract(1, 'day').format("YYYY-MM-DD");
        if (periods[i - 1] != dayBefore) {
          // periods i is a start date
          if (!startDates.includes(periods[i])) { startDates.push(periods[i]); }
        }

        // if periods[i+1] either does not exist or is not the next day, periods[i] is an end date
        var dayAfter = moment(periods[i]).add(1, 'day').format("YYYY-MM-DD");
        if (i + 1 > periods.length || periods[i + 1] != dayAfter) {
          // periods i is an end date
          if (!endDates.includes(periods[i])) { endDates.push(periods[i]); }
        }
      }

      // then calculate the average based on the start and end dates
      // can only calculate the cycle length if there are two start dates
      if (startDates.length > 1) {
        cycleLengths.length = 0; // reset it each time it is calculated
        for (let i = 1; i < startDates.length; i++) {
          const startMoment = moment(startDates[i - 1]);
          const endMoment = moment(startDates[i]);
          const cycleLength = endMoment.diff(startMoment, 'days');
          //console.log(cycleLength);
          cycleLengths.push({ length: cycleLength, startDate: startDates[i - 1] });
        }

        // calculate average
        var sum = 0;
        for (let i = 0; i < cycleLengths.length; i++) {
          sum += cycleLengths[i].length;
        }
        var averageCycleLength = (sum / cycleLengths.length) || 0;

        setAverageCycleLength(Math.round(averageCycleLength));// want whole number predictions on this page
        console.log("average cycle length", averageCycleLength);
      }
      else {
        // if the user hasn't had more than 2 periods, assume that their next cycle could be in 28 days
        setAverageCycleLength(28);
      }
    }

  }

  /* Calculate what day of their cycle the user is currently on */
  function calculateDay() {
    // if there are some periods stored,
    if (startDates.length > 0) {
      // calculate the number of days since start of last period and today
      const lastPeriodStartDate = moment(startDates.findLast(() => true)); // theyre ordered in reverse so needs to be the last day
      const today = moment();
      const dayOfCycle = today.diff(lastPeriodStartDate, 'days') + 1; // +1 as otherwise it doesn't include the start day as a day of this cycle
      setDay(dayOfCycle);
    }
  }

  function calculatePeriodPrediction() {

    if (averageCycleLength - day > 0) {
      setPeriodPrediction(averageCycleLength - day + 1);
    }
    else if (averageCycleLength - day == 0) {
      setPeriodPrediction("Today")
    }
    else {
      setPeriodPrediction(day - averageCycleLength - 1 + " days ago")
    }
    var predictionNumber = averageCycleLength - day;

    // should just update the existing notifications rather than trying to create a new one
    navigator.serviceWorker.ready.then(async function (registration) {
      const subscription = await registration.pushManager.getSubscription(); // get the user's subscription
      var notifications = localStorage.chosenNotifications;
      if (subscription && (notifications.includes("upcoming"))) {
        console.log("updating prediction")
        // Send the updates period prediction to the server every time it updates
        fetch('https://rosie-production.up.railway.app/updatePrediction', {
          method: 'post',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            subscription: subscription,
            periodPrediction: predictionNumber
          }),
        });
      }
      else {
        console.log("not updating predicion")
      }

    })
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
        <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>
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
            <IonRow>
              <IonButton className='back' href="/Rosie/Cycle" size="default"><IonIcon icon={backspace}></IonIcon>Back</IonButton>
            </IonRow>
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
              <IonButton className='save' href="/Rosie/Calendar" size="large">Save All</IonButton>
            </IonRow></>
          </IonGrid>
        </IonContent>
      </IonPage >

    </>
  );
};

export default Track;
