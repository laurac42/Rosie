import { useState, useEffect } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButtons, IonMenuButton, IonButton, IonIcon, IonGrid, IonRow, IonMenu, IonList, IonAccordion, IonAccordionGroup, IonItem, IonLabel } from '@ionic/react';
import { calendar, clipboard, colorPalette, folderOpen, informationCircle, lockClosed, notifications, people, personCircle, radioButtonOff, settings, trendingUp } from 'ionicons/icons';
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
    const storedPhotos: string[] = (JSON.parse(localStorage.photoDates || '[]')); // this is just the dates not actual photos
    console.log("photos", storedPhotos);
    console.log("skin", storedSkin);

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
    <>
      <IonMenu contentId="main-content">
        <IonHeader>
          <IonToolbar>
            <IonTitle>Menu</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonList>
            <IonAccordionGroup>
              <IonAccordion value="first">
                <IonItem slot="header">
                  <IonIcon className="menuIcon" aria-hidden="true" icon={folderOpen} slot="start"></IonIcon>
                  <IonLabel>Main Pages</IonLabel>
                </IonItem>
                <div className="ion-padding" slot="content">
                  <IonItem href="/Rosie/Cycle">
                    <IonIcon className="menuIcon" aria-hidden="true" icon={radioButtonOff} slot="start"></IonIcon>
                    <IonLabel>Cycle</IonLabel>
                  </IonItem>
                </div>
                <div className="ion-padding" slot="content">
                  <IonItem href="/Rosie/Calendar">
                    <IonIcon className="menuIcon" aria-hidden="true" icon={calendar} slot="start"></IonIcon>
                    <IonLabel>Calendar</IonLabel>
                  </IonItem>
                </div>
                <div className="ion-padding" slot="content">
                  <IonItem href="/Rosie/Track">
                    <IonIcon className="menuIcon" aria-hidden="true" icon={clipboard} slot="start"></IonIcon>
                    <IonLabel>Cycle</IonLabel>
                  </IonItem>
                </div>
                <div className="ion-padding" slot="content">
                  <IonItem href="/Rosie/Analysis">
                    <IonIcon className="menuIcon" aria-hidden="true" icon={trendingUp} slot="start"></IonIcon>
                    <IonLabel>Cycle</IonLabel>
                  </IonItem>
                </div>
              </IonAccordion>


              <IonAccordion value="second">
                <IonItem slot="header">
                  <IonIcon className="menuIcon" aria-hidden="true" icon={settings} slot="start"></IonIcon>
                  <IonLabel>Settings</IonLabel>
                </IonItem>
                <div className="ion-padding" slot="content">
                  <IonItem href="/Rosie/Menu/Appearance">
                    <IonIcon className="menuIcon" aria-hidden="true" icon={colorPalette} slot="start"></IonIcon>
                    <IonLabel>Appearance</IonLabel>
                  </IonItem>
                </div>
                <div className="ion-padding" slot="content">
                  <IonItem href='/Rosie/Menu/Notifications'>
                    <IonIcon className="menuIcon" aria-hidden="true" icon={notifications} slot="start"></IonIcon>
                    <IonLabel>Notifications</IonLabel>
                  </IonItem>
                </div>
              </IonAccordion>
            </IonAccordionGroup>

            <IonItem href="/Rosie/Menu/AboutUs">
              <IonIcon className="menuIcon" aria-hidden="true" icon={people} slot="start"></IonIcon>
              <IonLabel>About Us</IonLabel>
            </IonItem>
            <IonItem href='/Rosie/Menu/PrivacyPolicy'>
              <IonIcon className="menuIcon" aria-hidden="true" icon={lockClosed} slot="start"></IonIcon>
              <IonLabel>Privacy Policy</IonLabel>
            </IonItem>
            <IonItem href='/Rosie/Menu/Resources'>
              <IonIcon className="menuIcon" aria-hidden="true" icon={informationCircle} slot="start"></IonIcon>
              <IonLabel>Resources</IonLabel>
            </IonItem>
          </IonList>
        </IonContent>
      </IonMenu>

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
    </IonPage >
    </>
  );
};

export default Calendar;
