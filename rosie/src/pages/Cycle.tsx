import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButtons, IonMenuButton, IonButton, IonIcon, IonGrid, IonRow, IonAccordion, IonAccordionGroup, IonItem, IonLabel, IonList, IonMenu } from '@ionic/react';
import { calendar, clipboard, colorPalette, folderOpen, informationCircle, lockClosed, notifications, people, personCircle, radioButtonOff, settings, trendingUp } from 'ionicons/icons';
import { CircularProgressbar } from 'react-circular-progressbar';
import React, { useState, useEffect } from 'react';
import Menu from '../components/Menu'
import Tabs from '../components/Tabs'
import moment from 'moment';
import './Cycle.css';

const Cycle: React.FC = () => {
  const [day, setDay] = useState(0);
  const [averageCycleLength, setAverageCycleLength] = useState(0);
  const [startDates, setStartDates] = useState<string[]>([]);
  const [periods, setPeriods] = useState<string[]>([]);
  const [endDates, setEndDates] = useState<string[]>([]);
  const [cycleLengths, setCycleLengths] = useState<{ length: number, startDate: string }[]>([]);

  // calculate the average cycle length only on first render
  useEffect(() => {
    calculateAverageCycleLength();
  }, []);

  // calculate the day of period when start dates is updated
  useEffect(() => {
    calculateDay();
  }, [startDates]);

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

        setAverageCycleLength(Math.round(averageCycleLength * 10) / 10);
        console.log(averageCycleLength);
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
    const lastPeriodStartDate = moment(startDates[0]);
    const today = moment();
    const dayOfCycle = today.diff(lastPeriodStartDate, 'days') + 1; // +1 as otherwise it doesn't include the start day as a day of this cycle
    setDay(dayOfCycle);
  }
}

/* Format the date to YYYY-MM-DD */
function formatDate(date: Date) {
  var d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return [year, month, day].join('-');
}

return (
  <>
    <Menu/>
    <IonPage id="main-content">
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton></IonMenuButton>
          </IonButtons>
          <IonTitle>Cycle</IonTitle>
          <IonButtons slot="end">
            <IonButton aria-label="Profile" className='profileButton' href="/Rosie/Profile">
              <IonIcon className='profileIcon' slot="icon-only" icon={personCircle}></IonIcon>
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonGrid className="progress" class="ion-justify-content-center">
          {startDates.length > 0 && (<IonRow class="cycleWidth">
            <CircularProgressbar value={day} maxValue={averageCycleLength} text={`Day ${day}`} />
          </IonRow>)}
          {startDates.length <= 0 && (
            <IonRow><h3>You haven't tracked any periods yet! Start tracking to start getting predictions</h3></IonRow>
          )}
        </IonGrid>
        <IonGrid>
          <IonRow class="ion-justify-content-center">
            <IonButton className="btn" href="/Rosie/Track" size="large">Track</IonButton>
          </IonRow>
        </IonGrid>
      </IonContent>
      <Tabs/>
    </IonPage>
  </>
);
};

export default Cycle;
