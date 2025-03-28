import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButtons, IonMenuButton, IonButton, IonIcon, IonGrid, IonRow, IonAccordion, IonAccordionGroup, IonItem, IonLabel, IonList, IonMenu } from '@ionic/react';
import { personCircle } from 'ionicons/icons';
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
  const [periodPrediction, setPeriodPrediction] = useState<any>();
  const [previousPrediction, setPreviousPrediction] = useState<any>(localStorage.getItem("previousPrediction") || "none");

  // calculate the average cycle length only on first render
  useEffect(() => {
    calculateAverageCycleLengthAndDay();
  }, []);

  // calculate average period length when either of the things it is based on update so it updates properly

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
            <IonTitle>Cycle</IonTitle>
            <IonButtons slot="end">
              <IonButton className='profileButton' href="/Rosie/Profile">
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
          <IonGrid fixed={true}>
            <IonRow><h3 >Day of Cycle: <b>{day}</b></h3></IonRow>
            <IonRow><h3 className="cycleDetails">Average Cycle Length: <b>{averageCycleLength} days </b></h3></IonRow>
            <IonRow><h3 className="cycleDetails">Predicted days until next period: <b>{periodPrediction}</b></h3></IonRow>
          </IonGrid>
          <IonGrid>
            <IonRow class="ion-justify-content-center">
              <IonButton className="btn" href="/Rosie/Track" size="large">Track</IonButton>
            </IonRow>
          </IonGrid>
        </IonContent>
        <Tabs />
      </IonPage>
    </>
  );
};

export default Cycle;
