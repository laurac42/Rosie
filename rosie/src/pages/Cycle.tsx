import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButtons, IonMenuButton, IonButton, IonIcon, IonGrid, IonRow } from '@ionic/react';
import { personCircle } from 'ionicons/icons';
import { CircularProgressbar } from 'react-circular-progressbar';
import React, { useState, useEffect } from 'react';
import ExploreContainer from '../components/ExploreContainer';
import moment from 'moment';
import './Cycle.css';

const Cycle: React.FC = () => {
  const [day, setDay] = useState(0);
  const [averageCycleLength, setAverageCycleLength] = useState(0);
  const [startDates, setStartDates] = useState<string[]>([]);

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
    var storedPeriods = JSON.parse(localStorage.getItem('InitialPeriods') || '[]');
    // exit if there are no periods stored
    if (storedPeriods.length === 0) {
      return 0;
    }
    // create an array of all of the start dates
    var startDates: string[] = [];
    for (var i = 0; i < storedPeriods.length; i++) {
      var date = (new Date(storedPeriods[i]['startDate']));
      startDates.push(formatDate(date));
    }

    // need to make sure all periods are stored in order first (from most recent)
    startDates.sort((a, b) => (new Date(b).getTime() - new Date(a).getTime()));
    setStartDates(startDates);

    // calculate the number of days between start dates, and take the average
    var differences: number[] = [];
    for (var i = 0; i < startDates.length - 1; i++) {
      const period1 = moment(startDates[i]);
      const period2 = moment(startDates[i + 1]);

      // calculate the difference in days and add to array
      const difference = period1.diff(period2, 'days');
      differences.push(difference);
    }

    // then calculate the average of the differences
    const sum = differences.reduce((a, b) => a + b, 0);
    var cycleLength = (sum / differences.length) || 0;

    setAverageCycleLength(cycleLength);
  }

  /* Calculate what day of their cycle the user is currently on */
  function calculateDay() {
    // if there are some periods stored,
    if (startDates.length > 0) {
      // calculate the number of days since start of last period and today
      const lastPeriodStartDate = moment(startDates[0]);
      const today = moment();
      const dayOfCycle = today.diff(lastPeriodStartDate, 'days')+1; // +1 as otherwise it doesn't include the start day as a day of this cycle
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
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Cycle</IonTitle>
          <IonButtons slot="start">
            <IonMenuButton autoHide={false}></IonMenuButton>
          </IonButtons>
          <IonButtons slot="end">
            <IonButton className='profileButton' href="/Rosie/Profile">
              <IonIcon slot="icon-only" icon={personCircle} ></IonIcon>
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonGrid className="progress" class="ion-justify-content-center">
          <IonRow class="cycleWidth">
            {/* In the future, max value will be the predicted length of the users cycle
              * And the value will come from the number of days since the last period
              */}
            <CircularProgressbar value={day} maxValue={averageCycleLength} text={`Day ${day}`} />
          </IonRow>
        </IonGrid>
        <IonGrid>
          <IonRow class="ion-justify-content-center">
            <IonButton className="btn" href="/Rosie/Track" size="large">Track</IonButton>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Cycle;
