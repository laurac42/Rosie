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
import Date from './Date';

const Calendar: React.FC = () => {
  const [events, setEvents] = useState<{ title: string, date: string, className: string }[]>([]);
  const history = useHistory();
  const [isMounted, setIsMounted] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0); // State to trigger re-render

  useEffect(() => {
    setIsMounted(true);
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
