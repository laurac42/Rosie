import { useState, useEffect } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButtons, IonMenuButton, IonButton, IonIcon, IonGrid, IonRow, IonMenu, IonList, IonAccordion, IonAccordionGroup, IonItem, IonLabel, IonRefresher, IonRefresherContent, RefresherEventDetail } from '@ionic/react';
import { personCircle } from 'ionicons/icons';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { useHistory } from 'react-router-dom';
import Menu from '../components/Menu'
import Tabs from '../components/Tabs'
const PHOTO_STORAGE = 'photos';
import './Calendar.css';
import DateComponent from './Date';
import moment from 'moment';

const Calendar: React.FC = () => {
  const [events, setEvents] = useState<{ title: string, date: string, className: string }[]>([]);
  const history = useHistory();
  const [isMounted, setIsMounted] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0); // State to trigger re-render
  const [day, setDay] = useState(0);
  const [averageCycleLength, setAverageCycleLength] = useState(0);
  const [startDates, setStartDates] = useState<string[]>([]);
  const [periods, setPeriods] = useState<string[]>([]);
  const [endDates, setEndDates] = useState<string[]>([]);
  const [cycleLengths, setCycleLengths] = useState<{ length: number, startDate: string }[]>([]);
  const [periodPrediction, setPeriodPrediction] = useState<any>();
  const [previousPrediction, setPreviousPrediction] = useState<any>(localStorage.getItem("previousPrediction") || "none");

  useEffect(() => {
    setIsMounted(true);
    // update the server with a period prediction 
    calculateAverageCycleLengthAndDay();
  }, []);

  useEffect(() => {

    // Fetch all data from local storage on initial load
    const storedPeriods = new Map<string, string>(JSON.parse(localStorage.periodMap || '[]'));
    const storedPain = new Map<string, string>(JSON.parse(localStorage.painMap || '[]'));
    const storedEmotions = new Map<string, string>(JSON.parse(localStorage.emotionsMap || '[]'));
    const storedSkin = new Map<string, string>(JSON.parse(localStorage.skinMap || '[]'));
    const storedPhotos: string[] = (JSON.parse(localStorage.photoDates || '[]')); // this is just the dates not actual photos

    const periodEvents: { title: string, date: string, className: string }[] = [];
    const painEvents: { title: string, date: string, className: string }[] = [];
    const emotionEvents: { title: string, date: string, className: string }[] = [];
    const skinEvents: { title: string, date: string, className: string }[] = [];
    const photoEvents: { title: string, date: string, className: string }[] = [];

    storedPeriods.forEach((flow: string, date: string) => {
      periodEvents.push({ title: "Period", date: date, className: 'period-event' });
    });

    storedPain.forEach((pain: string, date: string) => {
      painEvents.push({ title: pain, date: date, className: 'pain-event' });
    });

    storedEmotions.forEach((emotion: string, date: string) => {
      emotionEvents.push({ title: emotion, date: date, className: 'emotion-event' });
    });

    storedSkin.forEach((skin: string, date: string) => {
      skinEvents.push({ title: skin, date: date, className: 'skin-event' });
    });

    storedPhotos.forEach((date: string) => {
      photoEvents.push({ title: "Photo", date: date, className: 'photo-event' });
    });
    // combine all events
    setEvents([...periodEvents, ...painEvents, ...emotionEvents, ...skinEvents, ...photoEvents]);

  }, []);


  /**
   * When a date is clicked it should take the user to a new page, with all the details for that date
   */
  function handleDateClick(info: any) {
    history.push(`/Calendar/${info.dateStr}`);
  }

  /**
   * Handle the event being clicked, taking the user to a new page
   */
  function handleEventClick(info: any) {
    console.log(info.event.startStr);
    history.push(`/Calendar/${info.event.startStr}`);
  }


  function handleRefresh(event: CustomEvent<RefresherEventDetail>) {
    setTimeout(() => {
      setRefreshKey((prevKey) => prevKey + 1); // Increment refreshKey to trigger re-render
      event.detail.complete();
    }, 500);
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


  /* Calculate the users average cycle length based on past periods, to make this the maximum for the cycle */
  function calculateAverageCycleLengthAndDay() {
    // clear any old data first:
    periods.length = 0;
    startDates.length = 0;
    endDates.length = 0;
    // first, load in all period data and make sure it is sorted by date
    if (localStorage.periodMap) {
      var periodDates = new Map<string, string>(JSON.parse(localStorage.periodMap));
      periodDates.forEach((flow: string, date: string) => {
        if (!periods.includes(date)) { periods.push(date); }
      });
      periods.sort((a, b) => (new Date(b).getTime() - new Date(a).getTime())); // from newest
      // the first period is definitely a end date as they are ordered newest first
      if (!endDates.includes(periods[0])) {
        endDates.push(periods[0]);
        // check that periods 0 is not a one day period, which would mean it is also a start date
        var dayBefore = moment(periods[0]).subtract(1, 'day').format("YYYY-MM-DD");
        if (periods.length == 1 || periods[1] != dayBefore) {
          // periods i is also a start date
          if (!startDates.includes(periods[0])) {
            startDates.push(periods[0]);
          }
        }
      }
      for (let i = 1; i < periods.length; i++) {
        // only calculate the last 6 periods
        if (startDates.length < 6) {
          // for date 1 onward, check if day before was a period, if yes, i is not a start date
          // if day before was not a period, periods[i] is a start date
          var dayAfter = moment(periods[i]).add(1, 'day').format("YYYY-MM-DD");
          if (periods[i - 1] != dayAfter)

            if (!endDates.includes(periods[i])) {
              endDates.push(periods[i]);
            }
          // if periods[i+1] either does not exist or is not the next day, periods[i] is an end date
          var dayBefore = moment(periods[i]).subtract(1, 'day').format("YYYY-MM-DD");
          if (i + 1 > periods.length || periods[i + 1] != dayBefore) {
            // periods i is an end date
            if (!startDates.includes(periods[i])) {
              startDates.push(periods[i]);
            }
          }
        }
      }

      // then calculate the average based on the start and end dates
      // can only calculate the cycle length if there are two start dates
      var averageCycleLength;
      if (startDates.length > 1) {
        cycleLengths.length = 0; // reset it each time it is calculated
        for (let i = 1; i < startDates.length; i++) {
          const startMoment = moment(startDates[i - 1]);
          const endMoment = moment(startDates[i]);
          const cycleLength = startMoment.diff(endMoment, 'days');
          cycleLengths.push({ length: cycleLength, startDate: startDates[i - 1] });
        }

        // calculate average
        var sum = 0;
        for (let i = 0; i < cycleLengths.length; i++) {
          sum += cycleLengths[i].length;
        }
        averageCycleLength = (sum / cycleLengths.length) || 0;

        setAverageCycleLength(Math.round(averageCycleLength));// want whole number predictions on this page
      }
      else {
        // if the user hasn't had more than 1 period, assume that their next cycle could be in 28 days
        setAverageCycleLength(28);
        averageCycleLength = 28;
      }

      // calculate day of period part
      // calculate the number of days since start of last period and today
      if (startDates.length > 0) {
        const lastPeriodStartDate = moment(startDates[0]); // theyre ordered from recent, so first day
        const today = moment();
        const dayOfCycle = today.diff(lastPeriodStartDate, 'days') + 1; // +1 as otherwise it doesn't include the start day as a day of this cycle
        setDay(dayOfCycle);
        // call function to calculate period prediction
        calculatePeriodPrediction(dayOfCycle, averageCycleLength)
      }

    }
  }


  function calculatePeriodPrediction(dayOfCycle: number, averageCycle: number) {
    console.log(dayOfCycle, averageCycle)
    console.log("prediction calculation")
    if (startDates.length > 0) {
      var predictionNumber = 0;
      if (averageCycle - dayOfCycle > 0) {
        setPeriodPrediction(averageCycle - dayOfCycle + 1);
        predictionNumber = averageCycle - dayOfCycle + 1;
      }
      else if (averageCycle - dayOfCycle == 0) {
        setPeriodPrediction("Today")
        predictionNumber = 0;
      }
      else {
        setPeriodPrediction(dayOfCycle - averageCycle - 1 + " days ago")
        predictionNumber = 0;
      }

      // only send the update if it is different
      if (predictionNumber != Number(previousPrediction)) {
        localStorage.setItem("previousPrediction", predictionNumber.toString()); // update the local storage
        // should just update the existing notifications rather than trying to create a new one
        navigator.serviceWorker.ready.then(async function (registration) {
          const subscription = await registration.pushManager.getSubscription(); // get the user's subscription
          var notifications = localStorage.chosenNotifications;
          if (subscription && (notifications.includes("upcoming"))) {
            console.log("updating prediction", predictionNumber)
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
            console.log("not updating prediction")
          }

        })
      }
    }
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
            <IonTitle>Calendar</IonTitle>
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
          <IonRow class="ion-justify-content-center"><h3 className='calendar-heading'>Click on a date to view details</h3></IonRow>
          <IonGrid fixed={true} class="ion-justify-content-center calendarWidth">
            {isMounted && (
              <FullCalendar
                plugins={[dayGridPlugin, interactionPlugin]}
                initialView='dayGridMonth'
                weekends={true}
                events={events}
                headerToolbar={{
                  right: 'today',
                  center: 'title',
                  left: 'prev,next'
                }}
                eventContent={renderEventContent} // Custom function to render the event content
                dateClick={handleDateClick}
                eventClick={handleEventClick}
              />)}
          </IonGrid>
        </IonContent>
        <Tabs />
      </IonPage >
    </>
  );
};

export default Calendar;
