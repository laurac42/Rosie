import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButtons, IonMenuButton, IonButton, IonIcon, IonGrid, IonRow } from '@ionic/react';
import { personCircle } from 'ionicons/icons';
import React from 'react';
import { BarChart, PieChart } from '@mui/x-charts';
import Menu from '../components/Menu'
import { useState, useEffect } from 'react';
import moment from 'moment';
import Tabs from '../components/Tabs'
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
        // start dates length -1 to ignore the last one which is only required for cycle calculations
        for (let i = 0; i < startDates.length - 1; i++) {
            const startMoment = moment(startDates[i]);
            const endMoment = moment(endDates[i]);
            const periodLength = endMoment.diff(startMoment, 'days') + 1;


            periodLengths.push({ length: periodLength, startDate: startMoment.format("DD/MM") });
        }

        // calculate average
        var sum = 0;
        for (let i = 0; i < periodLengths.length - 1; i++) {
            sum += periodLengths[i].length;
        }
        var averagePeriodLength = (sum / periodLengths.length) || 0;
        periodLengths.reverse();
        setAveragePeriodLength(Math.round(averagePeriodLength * 10) / 10);

    }

    /**
     * Get the average cycle length 
     * Calculate the difference in days between two start dates
     */
    function getAverageCycleLength() {
        // can only calculate the cycle length if there are two start dates
        if (startDates.length > 1) {
            cycleLengths.length = 0; // reset it each time it is calculated
            for (let i = 1; i < startDates.length; i++) {
                const startMoment = moment(startDates[i - 1]);
                const endMoment = moment(startDates[i]);
                const cycleLength = startMoment.diff(endMoment, 'days');

                cycleLengths.push({ length: cycleLength, startDate: startMoment.format("DD/MM") });
            }

            // calculate average
            var sum = 0;
            for (let i = 0; i < cycleLengths.length; i++) {
                sum += cycleLengths[i].length;
            }
            var averageCycleLength = (sum / cycleLengths.length) || 0;
            cycleLengths.reverse(); // so they are in order from oldest to newest on the graph
            setAverageCycleLength(Math.round(averageCycleLength * 10) / 10);
        }
    }

    /**
     * Get the start and end dates of a period
     */
    function getStartAndEndDates() {
        // clear any old data first:
        periods.length = 0;
        startDates.length = 0;
        endDates.length = 0
        // first, load in all period data and make sure it is sorted by date
        if (localStorage.periodMap) {
            var periodDates = new Map<string, string>(JSON.parse(localStorage.periodMap));
            periodDates.forEach((flow: string, date: string) => {
                if (!periods.includes(date)) { periods.push(date); }
            });
            periods.sort((a, b) => (new Date(b).getTime() - new Date(a).getTime())); // from newest
            console.log(periods)
            // the first period is definitely a end date as they are ordered newest first
            if (!endDates.includes(periods[0])) {
                endDates.push(periods[0]);
                console.log("pushing to end dates: ", periods[0])
                // check that periods 0 is not a one day period, which would mean it is also a start date
                var dayBefore = moment(periods[0]).subtract(1, 'day').format("YYYY-MM-DD");
                console.log(dayBefore)
                if (periods.length == 1 || periods[1] != dayBefore) {
                    // periods i is also a start date
                    if (!startDates.includes(periods[0])) {
                        startDates.push(periods[0]);
                    }
                }
            }
            for (let i = 1; i < periods.length; i++) {
                // only calculate the last 6 periods
                if (startDates.length < 6) {
                    // for date 1 onward, check if day before was a period, if yes, i is not a start date
                    // if day before was not a period, periods[i] is a start date
                    var dayAfter = moment(periods[i]).add(1, 'day').format("YYYY-MM-DD");
                    console.log("period day : ", periods[i])
                    console.log(periods[i - 1])
                    console.log(dayAfter)
                    if (periods[i - 1] != dayAfter)

                        if (!endDates.includes(periods[i])) {
                            endDates.push(periods[i]);
                            console.log("pushing to end dates: ", periods[i])
                        }
                    // if periods[i+1] either does not exist or is not the next day, periods[i] is an end date
                    var dayBefore = moment(periods[i]).subtract(1, 'day').format("YYYY-MM-DD");
                    if (i + 1 > periods.length || periods[i + 1] != dayBefore) {
                        // periods i is an end date
                        if (!startDates.includes(periods[i])) {
                            startDates.push(periods[i]);
                        }
                    }
                }

            }
            // call functions to do calculations based on start and end dates
            getAverageCycleLength();
            getAveragePeriodLength();
        }

    }

    // get the pain data
    function getPainData() {
        // first empty old data
        crampDays.length = 0;
        noPainDays.length = 0;
        backPainDays.length = 0;
        headacheDays.length = 0;

        // load in all pain data and make sure it is sorted by date
        // check the pain map exists first
        if (localStorage.painMap) {
            var painDates = new Map<string, string>(JSON.parse(localStorage.painMap));
            // check if pain dates exists first
            if (painDates) {
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
        }



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
                        <IonTitle>Analysis</IonTitle>
                        <IonButtons slot="end">
                            <IonButton className='profileButton' href="/Rosie/Profile">
                                <IonIcon className='profileIcon' slot="icon-only" icon={personCircle}></IonIcon>
                            </IonButton>
                        </IonButtons>
                    </IonToolbar>
                </IonHeader>
                <IonContent fullscreen>
                    <IonGrid fixed={true}>
                        <IonRow><h2>Period Length</h2></IonRow>
                        <IonRow class="ion-justify-content-center"><p>(Last 5 periods)</p></IonRow>
                        {periodLengths.length > 0 ? (<IonRow><BarChart
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
                        /></IonRow>) : (
                            <IonRow><p>No period data available. Head to the track page to start tracking!</p></IonRow>
                        )}
                        <IonRow class="ion-justify-content-between"><p><b>Average Period Length: {averagePeriodLength} days</b></p> </IonRow>

                        <IonRow><h2>Cycle Length</h2></IonRow>
                        <IonRow class="ion-justify-content-center"><p>(Last 5 cycles)</p></IonRow>
                        {/* Show a message if no cycle length data */}
                        {cycleLengths.length > 0 ? (<IonRow><BarChart
                            dataset={cycleLengths}
                            xAxis={[{ scaleType: 'band', dataKey: 'startDate', label: 'Start Date', }]}
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
                        /></IonRow>) :
                            (<IonRow><p>No cycle data available. Two periods are required to calculate cycle length. Head to the track page to start tracking!</p></IonRow>)}
                        <IonRow class="ion-justify-content-between"><p><b>Average Cycle Length: {averageCycleLength} days</b></p> </IonRow>

                        <IonRow><h2>Pain</h2></IonRow>
                        <IonRow><p>This chart shows tracked pain data from the last 31 days:</p></IonRow>
                        {crampDays.length === 0 && noPainDays.length === 0 && backPainDays.length === 0 && headacheDays.length === 0 ? (
                            <IonRow class="ion-justify-content-center"><p>No pain data available. Head to the track page to start tracking!</p></IonRow>
                        ) : (
                            <IonRow>
                                <PieChart
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
                                />
                            </IonRow>
                        )}

                    </IonGrid>

                </IonContent>
                <Tabs />
            </IonPage>
        </>
    );
};

export default Analysis;
