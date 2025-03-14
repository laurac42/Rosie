import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButtons, IonMenuButton, IonButton, IonIcon, IonGrid, IonRow, IonCol, IonList, IonMenu, IonAccordion, IonItem, IonAccordionGroup, IonLabel } from '@ionic/react';
import { calendar, clipboard, colorPalette, folderOpen, informationCircle, lockClosed, notifications, people, personCircle, radioButtonOff, settings, trendingUp } from 'ionicons/icons';
import React from 'react';
import { BarChart, PieChart } from '@mui/x-charts';
import { axisClasses } from '@mui/x-charts/ChartsAxis';
import { useState, useEffect } from 'react';
import moment from 'moment';
import './Analysis.css';

const Analysis: React.FC = () => {
    const [periods, setPeriods] = useState<string[]>([]);
    const [startDates, setStartDates] = useState<string[]>([]);
    const [endDates, setEndDates] = useState<string[]>([]);
    const [periodLengths, setPeriodLengths] = useState<{ length: number, startDate: string }[]>([]);
    const [cycleLengths, setCycleLengths] = useState<{ length: number, startDate: string }[]>([]);
    const [averagePeriodLength, setAveragePeriodLength] = useState<number>(0);
    const [averageCycleLength, setAverageCycleLength] = useState<number>(0);
    const [crampDays, setCrampDays] = useState<string[]>([]);
    const [noPainDays, setNoPainDays] = useState<string[]>([]);
    const [backPainDays, setBackPainDays] = useState<string[]>([]);
    const [headacheDays, setHeadacheDays] = useState<string[]>([]);

    const chartSetting = {
        yAxis: [
            {
                label: 'Number of Days',
            },
        ],
        width: 500,
        height: 300,

    };

    // get average period length on first load
    useEffect(() => {
        getStartAndEndDates();
        getPainData();
    }, []);

    /**
     * Get all of the period data, calculate start and end dates, and calculate the average period length
     */
    function getAveragePeriodLength() {

        // check number of start and end dates is equal
        if (startDates.length != endDates.length) {
            console.log("error with calculating start and end dates: ", startDates.length, endDates.length);
            return;
        }
        periodLengths.length = 0; // reset it each time it is calculated
        for (let i = 0; i < startDates.length; i++) {
            const startMoment = moment(startDates[i]);
            const endMoment = moment(endDates[i]);
            const periodLength = endMoment.diff(startMoment, 'days') + 1;
            periodLengths.push({ length: periodLength, startDate: startDates[i] });
        }

        // calculate average
        var sum = 0;
        for (let i = 0; i < periodLengths.length; i++) {
            sum += periodLengths[i].length;
        }
        var averagePeriodLength = (sum / periodLengths.length) || 0;

        setAveragePeriodLength(Math.round(averagePeriodLength * 10) / 10);
    }

    /**
     * Get the average cycle length 
     * Calculate the difference in days between two start dates
     */
    function getAverageCycleLength() {
        cycleLengths.length = 0; // reset it each time it is calculated
        for (let i = 1; i < startDates.length; i++) {
            const startMoment = moment(startDates[i - 1]);
            const endMoment = moment(startDates[i]);
            const cycleLength = endMoment.diff(startMoment, 'days');
            //console.log(cycleLength);
            cycleLengths.push({ length: cycleLength, startDate: startDates[i - 1] });
        }

        // calculate average
        var sum = 0;
        for (let i = 0; i < cycleLengths.length; i++) {
            sum += cycleLengths[i].length;
        }
        var averageCycleLength = (sum / cycleLengths.length) || 0;

        setAverageCycleLength(Math.round(averageCycleLength * 10) / 10);
    }

    /**
     * Get the start and end dates of a period
     */
    function getStartAndEndDates() {
        // clear any old data first:
        periods.length = 0;
        startDates.length = 0;
        // first, load in all period data and make sure it is sorted by date
        var periodDates = new Map<string, string>(JSON.parse(localStorage.periodMap));
        periodDates.forEach((flow: string, date: string) => {
            if (!periods.includes(date)) { periods.push(date); }
        });
        periods.sort((a, b) => (new Date(a).getTime() - new Date(b).getTime())); // from oldest

        // the first period is definitely a start date
        if (!startDates.includes(periods[0])) { startDates.push(periods[0]); }

        for (let i = 1; i < periods.length; i++) {
            // for date 1 onward, check if day before was a period, if yes, i is not a start date
            // if day before was not a period, periods[i] is a start date
            var dayBefore = moment(periods[i]).subtract(1, 'day').format("YYYY-MM-DD");
            if (periods[i - 1] != dayBefore) {
                // periods i is a start date
                if (!startDates.includes(periods[i])) { startDates.push(periods[i]); }
            }

            // if periods[i+1] either does not exist or is not the next day, periods[i] is an end date
            var dayAfter = moment(periods[i]).add(1, 'day').format("YYYY-MM-DD");
            if (i + 1 > periods.length || periods[i + 1] != dayAfter) {
                // periods i is an end date
                if (!endDates.includes(periods[i])) { endDates.push(periods[i]); }
            }
        }

        // call functions to do calculations based on start and end dates
        getAverageCycleLength();
        getAveragePeriodLength();
    }

    // get the pain data
    function getPainData() {
        // first empty old data
        crampDays.length = 0;
        noPainDays.length = 0;
        backPainDays.length = 0;
        headacheDays.length = 0;

        // load in all pain data and make sure it is sorted by date
        var painDates = new Map<string, string>(JSON.parse(localStorage.painMap));
        const newMap = Array.from(painDates).sort((a, b) => moment(a[1]).diff(moment(b[1])));

        const sortedPainDays = new Map(newMap);

        // add each date to the corresponding pain type array
        const today = moment();
        sortedPainDays.forEach((pain: string, date: string) => {
            const day = moment(date);
            // only use tracking in the last month:
            if (today.diff(day, 'days') < 31) {
                if (!crampDays.includes(date) && pain == "Cramps") { crampDays.push(date); }
                else if (!noPainDays.includes(date) && pain == "No Pain") { noPainDays.push(date); }
                else if (!headacheDays.includes(date) && pain == "Headache") { headacheDays.push(date); }
                else if (!backPainDays.includes(date) && pain == "Back Pain") { backPainDays.push(date); }
            }
            else {
                // because the array is ordered, if one day is over 31 days away, they will all be so we can exit the function
                return;
            }

        });
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
                        <IonTitle>Analysis</IonTitle>
                        <IonButtons slot="end">
                            <IonButton aria-label="Profile" className='profileButton' href="/Rosie/Profile">
                                <IonIcon className='profileIcon' slot="icon-only" icon={personCircle}></IonIcon>
                            </IonButton>
                        </IonButtons>
                    </IonToolbar>
                </IonHeader>
                <IonContent fullscreen>
                    <IonGrid fixed={true}>
                        <IonRow><h2>Period Length</h2></IonRow>
                        <IonRow><BarChart
                            dataset={periodLengths}
                            xAxis={[{ scaleType: 'band', dataKey: 'startDate', label: 'Start Date', }]}
                            series={[
                                { dataKey: 'length', label: 'Period Length', color: 'var(--lighter-pink)' },
                            ]}
                            slotProps={{
                                legend: {
                                    labelStyle: {
                                        fill: 'var(--text)',
                                    },
                                },
                            }}
                            {...chartSetting}
                        /></IonRow>
                        <IonRow class="ion-justify-content-between"><p><b>Average Period Length: {averagePeriodLength} days</b></p> <IonButton>More Details</IonButton> </IonRow>

                        <IonRow><h2>Cycle Length</h2></IonRow>
                        <IonRow><BarChart
                            dataset={cycleLengths}
                            xAxis={[{ scaleType: 'band', dataKey: 'startDate' }]}
                            series={[
                                { dataKey: 'length', label: 'Cycle Length', color: 'var(--complementary-colour)' },
                            ]}
                            slotProps={{
                                legend: {
                                    labelStyle: {
                                        fill: 'var(--text)',
                                    },
                                },
                            }}
                            {...chartSetting}
                        /></IonRow>
                        <IonRow class="ion-justify-content-between"><p><b>Average Cycle Length: {averageCycleLength} days</b></p> <IonButton>More Details</IonButton> </IonRow>

                        <IonRow><h2>Pain</h2></IonRow>
                        <IonRow><p>This chart shows tracked pain data from the last 31 days:</p></IonRow>
                        <IonRow><PieChart
                            colors={['var(--lighter-pink)', 'var(--complementary-colour)', 'var(--complementary-colour2)', 'var(--complementary-colour3)']}
                            series={[
                                {
                                    data: [
                                        { id: 0, value: noPainDays.length, label: 'No Pain' },
                                        { id: 1, value: crampDays.length, label: 'Cramps' },
                                        { id: 2, value: backPainDays.length, label: 'Back Pain' },
                                        { id: 3, value: headacheDays.length, label: 'Headache Pain' },
                                    ],
                                    innerRadius: 5,
                                    paddingAngle: 5,
                                    cornerRadius: 5,
                                },

                            ]}
                            slotProps={{
                                legend: {
                                    labelStyle: {
                                        fill: 'var(--text)',
                                    },
                                },
                            }}
                            width={500}
                            height={200}
                        /> </IonRow>

                    </IonGrid>

                </IonContent>
            </IonPage>
        </>
    );
};

export default Analysis;
