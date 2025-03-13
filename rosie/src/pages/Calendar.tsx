import { useState, useEffect } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButtons, IonMenuButton, IonButton, IonIcon, IonGrid, IonRow } from '@ionic/react';
import { personCircle } from 'ionicons/icons';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { useHistory } from 'react-router-dom';
import { Preferences } from '@capacitor/preferences';
import { usePhotoGallery, UserPhoto } from './hooks/usePhotoGallery';

const PHOTO_STORAGE = 'photos';
import './Calendar.css';

const Calendar: React.FC = () => {
  const [events, setEvents] = useState<{ title: string, date: string, className: string }[]>([]);
  const history = useHistory();

  

  useEffect(() => {

    // Fetch all data from local storage on initial load
    const storedPeriods = new Map<string, string>(JSON.parse(localStorage.periodMap || '[]'));
    const storedPain = new Map<string, string>(JSON.parse(localStorage.painMap || '[]'));
    const storedEmotions = new Map<string, string>(JSON.parse(localStorage.emotionsMap || '[]'));
    const storedSkin = new Map<string, string>(JSON.parse(localStorage.skinMap || '[]'));
    const storedPhotos:string [] = (JSON.parse(localStorage.photoDates || '[]')); // this is just the dates not actual photos
    console.log("photos",storedPhotos);
    console.log("skin",storedSkin);

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
    console.log(photoEvents);
    console.log(skinEvents);
    // combine all events
    setEvents([...periodEvents, ...painEvents, ...emotionEvents, ...skinEvents, ...photoEvents]);
  }, []);

  /**
   * When a date is clicked it should take the user to a new page, with all the details for that date
   */
  function handleDateClick(info: any) {
    history.push(`/Calendar/${info.dateStr}`);
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
          <IonButton aria-label="Profile" className='profileButton' href="/Rosie/Profile">
              <IonIcon className='profileIcon' slot="icon-only" icon={personCircle}></IonIcon>
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonGrid fixed={true} class="ion-justify-content-center calendarWidth">
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
          />
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Calendar;
