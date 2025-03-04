import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButtons, IonMenuButton, IonButton, IonIcon, IonGrid, IonRow } from '@ionic/react';
import { personCircle } from 'ionicons/icons';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import ExploreContainer from '../components/ExploreContainer';
import './Calendar.css';

const Calendar: React.FC = () => {
  /* This is a list of events in the calendar */
  const periods = [
    { title: 'Period', date: '2025-03-01'},
  ]
  // a custom render function
  function renderEventContent(eventInfo: any) {
    return (
      <>
        <b>{eventInfo.timeText}</b>
        <i>{eventInfo.event.title}</i>
      </>
    )
  }
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Calendar</IonTitle>
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
        <IonGrid class="calendarWidth">
          <FullCalendar
            plugins={[dayGridPlugin]}
            initialView='dayGridMonth'
            weekends={true}
            events={periods}
            eventContent={renderEventContent} // custom function to render the event content
          />
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Calendar;
