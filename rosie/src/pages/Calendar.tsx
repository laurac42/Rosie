import { useState, useEffect } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButtons, IonMenuButton, IonButton, IonIcon, IonGrid, IonRow } from '@ionic/react';
import { personCircle } from 'ionicons/icons';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import './Calendar.css';

const Calendar: React.FC = () => {
  const [periods, setPeriods] = useState<{ title: string, date: string }[]>([]);

  useEffect(() => {
    // Fetch periods data from local storage on initial load
    var storedPeriods = new Map<string, string>(JSON.parse(localStorage.periodMap));

    storedPeriods.forEach((flow: string, date: string) => {
      console.log(date, flow);
      periods.push({title: 'Period', date: date})
  });
  }, []);

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
        <IonGrid fixed={true} class="ion-justify-content-center calendarWidth">
          <FullCalendar
            plugins={[dayGridPlugin]}
            initialView='dayGridMonth'
            weekends={true}
            events={periods}
            headerToolbar= {{
              right: 'today',
              center: 'title',
              left: 'prev,next'
          }}
            eventContent={renderEventContent} // Custom function to render the event content
          />
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Calendar;
