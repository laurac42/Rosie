import { useState, useEffect } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButtons, IonMenuButton, IonButton, IonIcon, IonGrid, IonRow } from '@ionic/react';
import { personCircle } from 'ionicons/icons';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import './Calendar.css';

const Calendar: React.FC = () => {
  const [events, setEvents] = useState<{ title: string, date: string, className: string }[]>([]);

  useEffect(() => {
    // Fetch all data from local storage on initial load
    const storedPeriods = new Map<string, string>(JSON.parse(localStorage.periodMap || '[]'));
    const storedPain = new Map<string, string>(JSON.parse(localStorage.painMap || '[]'));
    const storedEmotions = new Map<string, string>(JSON.parse(localStorage.emotionsMap || '[]'));
    const storedSkin = new Map<string, string>(JSON.parse(localStorage.skinMap || '[]'));
    const storedPhotos = new Map<string, string[]>(JSON.parse(localStorage.photos || '[]'));


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
      painEvents.push({ title: emotion, date: date, className: 'emotion-event' });
    });

    storedSkin.forEach((skin: string, date: string) => {
      skinEvents.push({ title: skin, date: date, className: 'skin-event' });
    });

    storedPhotos.forEach((photos: string[], date: string) => {
        photoEvents.push({ title: "Photo", date: date, className: 'photo-event' }); // dont want to show the number of photos on the main thing, just that they exist
    });
    // combine all events
    setEvents([...periodEvents, ...painEvents, ...emotionEvents, ...skinEvents, ...photoEvents]);
  }, []);

  /**
   * When a date is clicked it should show all of the details for that date
   */
  function handleDateClick() {

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
            events={events}
            headerToolbar={{
              right: 'today',
              center: 'title',
              left: 'prev,next'
            }}
            eventContent={renderEventContent} // Custom function to render the event content
            dateClick={handleDateClick}
          />
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Calendar;
