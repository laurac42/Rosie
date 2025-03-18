import { IonContent, IonHeader, IonPage, IonTitle, IonDatetime, IonToolbar, IonButton, IonIcon, IonRow, IonGrid, IonCol, IonItem, IonInput, IonPopover } from '@ionic/react';
import { calculatorOutline, calendar, calendarOutline, flower, heart, person, personCircle, rose } from 'ionicons/icons';
import React, { useEffect, useState } from 'react';
import './EnterDetails.css';
import moment from 'moment';

const Details: React.FC = () => {
    const [finished, setFinished] = useState(false); // state for whether or not the user has finished entering their details
    const [showPeriodInput, setShowPeriodInput] = useState(false);
    const [Birthday, setBirthday] = useState<any>();
    const [today, setToday] = useState<any>();
    const [periodStart1, setPeriodStart1] = useState<any>();
    const [periodStart2, setPeriodStart2] = useState<any>();
    const [periodStart3, setPeriodStart3] = useState<any>();
    const [periodEnd1, setPeriodEnd1] = useState<any>();
    const [periodEnd2, setPeriodEnd2] = useState<any>();
    const [periodEnd3, setPeriodEnd3] = useState<any>();


    useEffect(() => {
        // only allow the user to choose up to today
        const today = moment().format("YYYY-MM-DD")
        setToday(today);
    }, []);


    // make period input appear when button is clicked
    const enterPeriod = () => {
        setShowPeriodInput(true);
    };

    /* Funtion to save to local storage if period details were not added */
    const saveWithoutPeriod = () => {
        const name = document.getElementById('name') as HTMLInputElement;
        localStorage.setItem('Name', name.value);
        if (!name.value) {
            alert('Name Required');
            return;
        }

        const age = document.getElementById('age') as HTMLInputElement;
        localStorage.setItem('Age', age.value);
        if (!age.value) {
            alert('Age Required');
            return;
        }

        const bday = document.getElementById('bday') as HTMLInputElement;
        localStorage.setItem('Birthday', bday.value);
        if (!bday.value) {
            alert('Birthday Required');
            return;
        }
        setFinished(true); // if this point in the function is reached, everything is saved and the user is finished
    };

    /* Funtion to save to local storage if period details were added */
    const saveWithPeriod = () => {

        // same as saving without period, but then also extra things
        saveWithoutPeriod();
        if (!periodStart1.value || !periodStart2.value || !periodStart3.value || !periodEnd1.value || !periodEnd2.value  || !periodEnd3.value) {
            alert('You need to add all period data!');
            return;
        }
        // store all of the period start and end data in an array
        const storedPeriods = [
            { startDate: periodStart1, endDate: periodEnd1 },
            { startDate: periodStart2, endDate: periodEnd2 },
            { startDate: periodStart3, endDate: periodEnd3 }
        ];

        // now create a map of every single date between the dates
        let periodMap = new Map<string, string>();

        for (var i = 0; i < storedPeriods.length; i++) {

            // find all dates between the start and end dates
            var inBetweenDates = getInBetweenDates(new Date(storedPeriods[i]['startDate']), new Date(storedPeriods[i]['endDate']));
            inBetweenDates.forEach(newDate => {
                periodMap.set(newDate, "N/A");
            });
        }

        // add everything in the periods map to local storage
        localStorage.periodMap = JSON.stringify(Array.from(periodMap.entries()));
    }

    /* Get the dates between two dates - https://stackoverflow.com/questions/4413590/javascript-get-array-of-dates-between-2-dates*/
    function getInBetweenDates(startDate: Date, stopDate: Date) {
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

    /**
     * Used to set the birthday variable to the chosen date
     */
    function changeBirthday(e: CustomEvent<any>) {

        const formattedDate = moment(e.detail.value).format("YYYY-MM-DD")
        setBirthday(formattedDate);
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle >Enter Details</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonGrid fixed={true}>
                    <IonRow class="ion-justify-content-center"><h1 className="heading"><IonIcon icon={flower} className='colourIcon'></IonIcon> Enter Your Details <IonIcon icon={flower} className='colourIcon'></IonIcon></h1></IonRow>
                    <IonRow class="ion-justify-content-start"><p> Please enter your name and age. You also have the option to enter up to three past periods. Please enter your details below: </p></IonRow>
                    <IonGrid class="ion-justify-content-center">
                        <IonRow> <IonItem>
                            <IonInput required className="custom-font" label="Name:" id="name" placeholder="Enter Your Name"></IonInput>
                        </IonItem>
                        </IonRow>
                        <IonRow> <IonItem>
                            <IonInput required className="custom-font" label="Age:" id='age' type="number" placeholder="Enter Your Age"></IonInput>
                        </IonItem>
                        </IonRow>
                        <IonRow> <IonItem id='bday'>
                            <IonInput required className="custom-font" label="Birthday:" placeholder='dd/mm/yyyy' value={Birthday}>
                            </IonInput>
                            <IonIcon className='datePickerIcon' icon={calendarOutline} size='small'></IonIcon>
                            <IonPopover trigger="bday" show-backdrop="false">
                                <IonDatetime
                                    class='popoverDateTime'
                                    presentation='date'
                                    max={today}
                                    onIonChange={changeBirthday}
                                ></IonDatetime>
                            </IonPopover>
                        </IonItem>
                        </IonRow>
                    </IonGrid>
                    {/* This content disappears when showPeriodInput is set to true*/}
                    {!showPeriodInput && (
                        <IonGrid>
                            <IonRow class="ion-justify-content-start">
                                <p><b>Do you want to enter any past period data?</b></p>
                            </IonRow>
                            <IonRow class="ion-justify-content-center">
                                <IonCol><IonButton onClick={enterPeriod} size="small">Enter Period Data</IonButton></IonCol>
                                <IonCol><IonButton type='submit' onClick={saveWithoutPeriod} href="/Rosie/SignUp/Preferences" size="small">Save Without Period Data</IonButton></IonCol>
                            </IonRow>
                        </IonGrid>
                    )}
                    {/* This only shows up if showPeriodInput is set to true */}
                    {showPeriodInput && (
                        <IonGrid>
                            <IonRow class="ion-justify-content-start"><p><b>Most Recent Period:</b></p></IonRow>
                            <IonRow>
                                <IonItem id="periodStart1">
                                    <IonInput
                                        className="custom-font"
                                        label="Start Date:"
                                        placeholder="Enter Period Start Date"
                                        value={periodStart1}
                                    ></IonInput>
                                    <IonIcon className="datePickerIcon" icon={calendarOutline} size="small"></IonIcon>
                                    <IonPopover trigger="periodStart1" show-backdrop="false">
                                        <IonDatetime
                                            class="popoverDateTime"
                                            presentation="date"
                                            max={today}
                                            onIonChange={(e) => {const formattedDate = moment(e.detail.value).format("YYYY-MM-DD")
                                                setPeriodStart1(formattedDate);}}
                                        ></IonDatetime>
                                    </IonPopover>
                                </IonItem>
                            </IonRow>
                            <IonRow>
                                <IonItem id="periodEnd1">
                                    <IonInput
                                        className="custom-font"
                                        label="End Date:"
                                        placeholder="Enter Period End Date"
                                        value={periodEnd1}
                                    ></IonInput>
                                    <IonIcon className="datePickerIcon" icon={calendarOutline} size="small"></IonIcon>
                                    <IonPopover trigger="periodEnd1" show-backdrop="false">
                                        <IonDatetime
                                            class="popoverDateTime"
                                            presentation="date"
                                            max={today}
                                            onIonChange={(e) => {const formattedDate = moment(e.detail.value).format("YYYY-MM-DD")
                                                setPeriodEnd1(formattedDate);}}
                                        ></IonDatetime>
                                    </IonPopover>
                                </IonItem>
                            </IonRow>
                            <IonRow class="ion-justify-content-start"><p><b>Second Most Recent Period:</b></p></IonRow>
                            <IonRow>
                                <IonItem id="periodStart2">
                                    <IonInput
                                        className="custom-font"
                                        label="Start Date:"
                                        placeholder="Enter Period Start Date"
                                        value={periodStart2}
                                    ></IonInput>
                                    <IonIcon className="datePickerIcon" icon={calendarOutline} size="small"></IonIcon>
                                    <IonPopover trigger="periodStart2" show-backdrop="false">
                                        <IonDatetime
                                            class="popoverDateTime"
                                            presentation="date"
                                            max={today}
                                            onIonChange={(e) => {const formattedDate = moment(e.detail.value).format("YYYY-MM-DD")
                                                setPeriodStart2(formattedDate);}}
                                        ></IonDatetime>
                                    </IonPopover>
                                </IonItem>
                            </IonRow>
                            <IonRow>
                                <IonItem id="periodEnd2">
                                    <IonInput
                                        className="custom-font"
                                        label="End Date:"
                                        placeholder="Enter Period End Date"
                                        value={periodEnd2}
                                    ></IonInput>
                                    <IonIcon className="datePickerIcon" icon={calendarOutline} size="small"></IonIcon>
                                    <IonPopover trigger="periodEnd2" show-backdrop="false">
                                        <IonDatetime
                                            class="popoverDateTime"
                                            presentation="date"
                                            max={today}
                                            onIonChange={(e) => {const formattedDate = moment(e.detail.value).format("YYYY-MM-DD")
                                                setPeriodEnd2(formattedDate);}}
                                        ></IonDatetime>
                                    </IonPopover>
                                </IonItem>
                            </IonRow>
                            <IonRow class="ion-justify-content-start"><p><b>Third Most Recent Period:</b></p></IonRow>
                            <IonRow>
                                <IonItem id="periodStart3">
                                    <IonInput
                                        className="custom-font"
                                        label="Start Date:"
                                        placeholder="Enter Period Start Date"
                                        value={periodStart3}
                                    ></IonInput>
                                    <IonIcon className="datePickerIcon" icon={calendarOutline} size="small"></IonIcon>
                                    <IonPopover trigger="periodStart3" show-backdrop="false">
                                        <IonDatetime
                                            class="popoverDateTime"
                                            presentation="date"
                                            max={today}
                                            onIonChange={(e) => {const formattedDate = moment(e.detail.value).format("YYYY-MM-DD")
                                                setPeriodStart3(formattedDate);}}
                                        ></IonDatetime>
                                    </IonPopover>
                                </IonItem>
                            </IonRow>
                            <IonRow>
                                <IonItem id="periodEnd3">
                                    <IonInput
                                        className="custom-font"
                                        label="End Date:"
                                        placeholder="Enter Period End Date"
                                        value={periodEnd3}
                                    ></IonInput>
                                    <IonIcon className="datePickerIcon" icon={calendarOutline} size="small"></IonIcon>
                                    <IonPopover trigger="periodEnd3" show-backdrop="false">
                                        <IonDatetime
                                            class="popoverDateTime"
                                            presentation="date"
                                            max={today}
                                            onIonChange={(e) => {const formattedDate = moment(e.detail.value).format("YYYY-MM-DD")
                                                setPeriodEnd3(formattedDate);}}
                                        ></IonDatetime>
                                    </IonPopover>
                                </IonItem>
                            </IonRow>
                            <IonRow class="ion-justify-content-center">
                                <IonButton className="btn" onClick={saveWithPeriod} href="/Rosie/SignUp/Preferences" size="large">Save Details</IonButton>
                            </IonRow>
                        </IonGrid>
                    )}
                </IonGrid>
            </IonContent>
        </IonPage>
    );
};

export default Details;
