import { IonContent, IonHeader, IonPage, IonTitle, IonDatetime, IonToolbar, IonButton, IonIcon, IonRow, IonGrid, IonCol, IonItem, IonInput, IonPopover, IonLabel } from '@ionic/react';
import { calculatorOutline, calendar, calendarOutline, flower, heart, person, personCircle, rose } from 'ionicons/icons';
import React, { useEffect, useState } from 'react';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import './EnterDetails.css';
import moment from 'moment';

const Details: React.FC = () => {
    const [showPeriodInput, setShowPeriodInput] = useState(false);
    const [Birthday, setBirthday] = useState<any>();
    const today = dayjs();
    const [periodStart1, setPeriodStart1] = useState<any>();
    const [periodStart2, setPeriodStart2] = useState<any>();
    const [periodStart3, setPeriodStart3] = useState<any>();
    const [periodEnd1, setPeriodEnd1] = useState<any>();
    const [periodEnd2, setPeriodEnd2] = useState<any>();
    const [periodEnd3, setPeriodEnd3] = useState<any>();


    // make period input appear when button is clicked
    const enterPeriod = () => {
        setShowPeriodInput(true);
    };

    /* Funtion to save to local storage if period details were not added */
    function saveWithoutPeriod() {
        var finished = true;
        const name = document.getElementById('name') as HTMLInputElement;
        localStorage.setItem('Name', name.value);
        if (!name.value) {
            alert('Name Required');
            finished = false;
            console.log("finished", finished);
        }

        const age = document.getElementById('age') as HTMLInputElement;
        localStorage.setItem('Age', age.value);
        if (!age.value) {
            alert('Age Required');
            finished = false;
            console.log("finished", finished);
        }

        if (!Birthday) {
            alert('Birthday Required');
            finished = false;
            console.log("finished", finished);
        }
        localStorage.setItem('Birthday', Birthday);
        // only move to the next page if the user has entered all details 
        console.log("finished after reading", finished);
        if (finished == true) {
            localStorage.setItem("LoggedIn", "true");
            window.location.href = '/Rosie/SignUp/Preferences';
        }
    };

    /* Funtion to save to local storage if period details were added */
    const saveWithPeriod = () => {

        // same as saving without period, but then also extra things
        var finished = true;
        var overlapping = false; // to store whether period dates overlap
        const name = document.getElementById('name') as HTMLInputElement;
        localStorage.setItem('Name', name.value);
        if (!name.value) {
            alert('Name Required');
            finished = false;
            console.log("finished", finished);
        }

        const age = document.getElementById('age') as HTMLInputElement;
        localStorage.setItem('Age', age.value);
        if (!age.value) {
            alert('Age Required');
            finished = false;
            console.log("finished", finished);
        }

        if (!Birthday) {
            alert('Birthday Required');
            finished = false;
            console.log("finished", finished);
        }
        localStorage.setItem('Birthday', Birthday);

        // now do the extra things for periods
        if (!periodStart1 || !periodStart2 || !periodStart3 || !periodEnd1 || !periodEnd2 || !periodEnd3) {
            alert('You need to add all period data!');
            finished = false;
        }
        else {
            // store all of the period start and end data in an array
            const storedPeriods = [
                { startDate: periodStart1, endDate: periodEnd1 },
                { startDate: periodStart2, endDate: periodEnd2 },
                { startDate: periodStart3, endDate: periodEnd3 }
            ];

            // check that the start date is always before the end date
            const startMoment1 = moment(periodStart1);
            const endMoment1 = moment(periodEnd1);
            const periodLength1 = endMoment1.diff(startMoment1, 'days') + 1;

            const startMoment2 = moment(periodStart2);
            const endMoment2 = moment(periodEnd2);
            const periodLength2 = endMoment2.diff(startMoment2, 'days') + 1;

            const startMoment3 = moment(periodStart3);
            const endMoment3 = moment(periodEnd3);
            const periodLength3 = endMoment3.diff(startMoment3, 'days') + 1;

            if (periodLength1 > 0 && periodLength2 > 0 && periodLength3 > 0) {
                // now create a map of every single date between the dates
                let periodMap = new Map<string, string>();

                for (var i = 0; i < storedPeriods.length; i++) {

                    // find all dates between the start and end dates
                    var inBetweenDates = getInBetweenDates(new Date(storedPeriods[i]['startDate']), new Date(storedPeriods[i]['endDate']));
                    inBetweenDates.forEach(newDate => {
                        if (periodMap.get(newDate)) // check if the user is storing overlaping period dates
                        {
                            console.log("overlapping periods")
                            overlapping = true;
                        }
                        periodMap.set(newDate, "N/A");
                    });
                }

                // add everything in the periods map to local storage
                localStorage.periodMap = JSON.stringify(Array.from(periodMap.entries()));
                if (overlapping == false) {
                    if (finished == true) {
                        localStorage.setItem("LoggedIn", "true");
                        window.location.href = '/Rosie/SignUp/Preferences';
                    }
                }
                else {
                    alert("Overlapping period dates! Fix this to continue");
                }

            }
            else {
                alert("Start date cannot be after end date!");
            }
        }

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
        if (day.length < 2) month = '0' + day;

        return [year, month, day].join('-');
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
                        <IonRow>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer components={['DatePicker']}>
                                    <MobileDatePicker
                                        maxDate={today}
                                        label="Enter Birthday"
                                        value={Birthday ? dayjs(Birthday) : null} // Ensure value is a valid dayjs object
                                        onChange={(newValue) => {
                                            setBirthday(newValue ? newValue.format("YYYY-MM-DD") : null);
                                        }}
                                    />
                                </DemoContainer>
                            </LocalizationProvider>
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
                                <IonCol><IonButton type='submit' onClick={saveWithoutPeriod} size="small">Save Without Period Data</IonButton></IonCol>
                            </IonRow>
                        </IonGrid>
                    )}
                    {/* This only shows up if showPeriodInput is set to true */}
                    {showPeriodInput && (
                        <IonGrid>
                            <IonRow class="ion-justify-content-start"><p><b>Most Recent Period:</b></p></IonRow>
                            <IonRow>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DemoContainer components={['DatePicker']}>
                                        <MobileDatePicker
                                            maxDate={today}
                                            label="Start Date 1"
                                            value={periodStart1 ? dayjs(periodStart1) : null} // Ensure value is a valid dayjs object
                                            onChange={(newValue) => {
                                                setPeriodStart1(newValue ? newValue.format("YYYY-MM-DD") : null);
                                            }}
                                        />
                                    </DemoContainer>
                                </LocalizationProvider>
                            </IonRow>
                            <IonRow>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DemoContainer components={['DatePicker']}>
                                        <MobileDatePicker
                                            maxDate={today}
                                            label="End Date 1"
                                            value={periodEnd1 ? dayjs(periodEnd1) : null} // Ensure value is a valid dayjs object
                                            onChange={(newValue) => {
                                                setPeriodEnd1(newValue ? newValue.format("YYYY-MM-DD") : null);
                                            }}
                                        />
                                    </DemoContainer>
                                </LocalizationProvider>
                            </IonRow>
                            <IonRow class="ion-justify-content-start"><p><b>Second Most Recent Period:</b></p></IonRow>
                            <IonRow>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DemoContainer components={['DatePicker']}>
                                        <MobileDatePicker
                                            maxDate={today}
                                            label="Start Date 2"
                                            value={periodStart2 ? dayjs(periodStart2) : null} // Ensure value is a valid dayjs object
                                            onChange={(newValue) => {
                                                setPeriodStart2(newValue ? newValue.format("YYYY-MM-DD") : null);
                                            }}
                                        />
                                    </DemoContainer>
                                </LocalizationProvider>
                            </IonRow>
                            <IonRow>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DemoContainer components={['DatePicker']}>
                                        <MobileDatePicker
                                            maxDate={today}
                                            label="End Date 2"
                                            value={periodEnd2 ? dayjs(periodEnd2) : null} // Ensure value is a valid dayjs object
                                            onChange={(newValue) => {
                                                setPeriodEnd2(newValue ? newValue.format("YYYY-MM-DD") : null);
                                            }}
                                        />
                                    </DemoContainer>
                                </LocalizationProvider>
                            </IonRow>
                            <IonRow class="ion-justify-content-start"><p><b>Third Most Recent Period:</b></p></IonRow>
                            <IonRow>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DemoContainer components={['DatePicker']}>
                                        <MobileDatePicker
                                            maxDate={today}
                                            label="Start Date 3"
                                            value={periodStart3 ? dayjs(periodStart3) : null} // Ensure value is a valid dayjs object
                                            onChange={(newValue) => {
                                                setPeriodStart3(newValue ? newValue.format("YYYY-MM-DD") : null);
                                            }}
                                        />
                                    </DemoContainer>
                                </LocalizationProvider>
                            </IonRow>
                            <IonRow>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DemoContainer components={['DatePicker']}>
                                        <MobileDatePicker
                                            maxDate={today}
                                            label="End Date 3"
                                            value={periodEnd3 ? dayjs(periodEnd3) : null} // Ensure value is a valid dayjs object
                                            onChange={(newValue) => {
                                                setPeriodEnd3(newValue ? newValue.format("YYYY-MM-DD") : null);
                                            }}
                                        />
                                    </DemoContainer>
                                </LocalizationProvider>
                            </IonRow>
                            <IonRow class="ion-justify-content-center">
                                <IonButton className="btn" onClick={saveWithPeriod} size="large">Save Details</IonButton>
                            </IonRow>
                        </IonGrid>
                    )}
                </IonGrid>
            </IonContent>
        </IonPage>
    );
};

export default Details;
