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
    const storedPeriods = JSON.parse(localStorage.getItem('InitialPeriods') || '[]');

    // for every period stored, get the dates between the start and end dates and add them to the periods array
    for (var i = 0; i < storedPeriods.length; i++) {

      // find all dates between the start and end dates
      var inBetweenDates = getDates(new Date(storedPeriods[i]['startDate']), new Date(storedPeriods[i]['endDate']));

      
      inBetweenDates.forEach(newDate => {
        // skip if the date is already in periods
        if (periods.find(({date}) =>date === newDate)) {
        }
        else {
          // add all the dates to the periods array
          periods.push({ title: 'Period', date: newDate });
        }
        
      });
    }
  }, []);

  /* Get the dates between two dates - https://stackoverflow.com/questions/4413590/javascript-get-array-of-dates-between-2-dates*/
  function getDates(startDate: Date, stopDate: Date) {
    var dateArray = new Array();
    var currentDate = startDate;
    while (currentDate <= stopDate) {
      dateArray.push(formatDate(new Date(currentDate)));
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return dateArray;
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
        <IonGrid class="ion-justify-content-center calendarWidth">
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
