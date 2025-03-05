import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButtons, IonMenuButton, IonButton, IonIcon, IonGrid, IonRow } from '@ionic/react';
import { personCircle } from 'ionicons/icons';
import { CircularProgressbar, CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import ExploreContainer from '../components/ExploreContainer';
import './Cycle.css';

const Cycle: React.FC = () => {

  /* Calculate the users average cycle length based on past periods, to make this the maximum for the cycle */
  function calculateAverageCycleLength() {
    var cycleLength = 28;
    const storedPeriods = JSON.parse(localStorage.getItem('InitialPeriods') || '[]');
    var startDates = [];
    // create an array of all of the start dates
    for (var i = 0; i < storedPeriods.length; i++) {
      var date = (new Date(storedPeriods[i]['startDate']));
      startDates.push(formatDate(date));
    }
    // take all start dates, calculate the number of days between them, and take the average
    // but this means all of the period dates need to be stored in order, or the difference won't be correct
    // b-a is from most recent, a-b is from least recent
    startDates.sort((a, b) => (new Date(b).getTime() - new Date(a).getTime()));
    console.log( "startDates: ", startDates); // Output: [2021–01–01, 2022–01–01, 2023–01–01]
    return (cycleLength);
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
        <IonGrid class="ion-justify-content-center">
          <IonRow class="cycleWidth">
            {/* In the future, max value will be the predicted length of the users cycle
              * And the value will come from the number of days since the last period
              */}
            <CircularProgressbar className="progress" value={20} maxValue={calculateAverageCycleLength()} text={`Day ${20}`} />;
          </IonRow></IonGrid>
        <IonGrid>
          <IonRow class="ion-justify-content-center">
            <IonButton className="btn" href="/Rosie/Track" size="large">Save Details</IonButton>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Cycle;
