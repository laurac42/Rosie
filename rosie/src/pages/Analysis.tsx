import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButtons, IonMenuButton, IonButton, IonIcon, IonGrid, IonRow, IonCol } from '@ionic/react';
import { personCircle } from 'ionicons/icons';
import React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
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
        getAveragePeriodLength();
    }, []);

    /**
     * Get all of the period data, calculate start and end dates, and calculate the average period length
     */
    function getAveragePeriodLength() {
        //startDates.length = 0;
        getStartAndEndDates();
        getAverageCycleLength();

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
            periodLengths.push({length: periodLength, startDate: startDates[i]});
        }

        // calculate average
        var sum = 0;
        for (let i=0; i<periodLengths.length; i++)
        {
            sum += periodLengths[i].length;
        }
        var averagePeriodLength = (sum / periodLengths.length) || 0;

        setAveragePeriodLength(Math.round(averagePeriodLength * 10) / 10);

        console.log(averagePeriodLength);

    }

    /**
     * Get the average cycle length 
     * Calculate the difference in days between two start dates
     */
    function getAverageCycleLength()
    {   
        cycleLengths.length = 0; // reset it each time it is calculated
        for (let i = 1; i < startDates.length; i++) {
            const startMoment = moment(startDates[i-1]);
            const endMoment = moment(endDates[i]);
            const cycleLength = endMoment.diff(startMoment, 'days');
            cycleLengths.push({length: cycleLength, startDate: startDates[i]});
        }

        // calculate average
        var sum = 0;
        for (let i=0; i<cycleLengths.length; i++)
        {
            sum += cycleLengths[i].length;
        }
        var averageCycleLength = (sum / cycleLengths.length) || 0;

        setAverageCycleLength(Math.round(averageCycleLength * 10) / 10);

        console.log(averageCycleLength);
    }

    function getStartAndEndDates() {
        // first, load in all period data and make sure it is sorted by date
        var periodDates = new Map<string, string>(JSON.parse(localStorage.periodMap));
        periodDates.forEach((flow: string, date: string) => {
            if (!periods.includes(date)) { periods.push(date); }
        });
        periods.sort((a, b) => (new Date(a).getTime() - new Date(b).getTime())); // from most recent

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
            //console.log("end dates: ",endDates);
        }
    }


    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Analysis</IonTitle>
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
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">Analysis</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonGrid fixed={true}>
                    <IonRow><h2>Period Length</h2></IonRow>
                    <IonRow><BarChart
                    dataset={periodLengths}
                    xAxis={[{ scaleType: 'band', dataKey: 'startDate' }]}
                    series={[
                        { dataKey: 'length', label: 'Period Length' , color: 'var(--mid-pink)'},
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
                    <p><b>Average Period Length: {averagePeriodLength} days</b></p>
                    <IonRow><h2>Cycle Length</h2></IonRow>
                    <IonRow><BarChart
                    dataset={cycleLengths}
                    xAxis={[{ scaleType: 'band', dataKey: 'startDate' }]}
                    series={[
                        { dataKey: 'length', label: 'Cycle Length' , color: 'var(--mid-pink)'},
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
                    <p><b>Average Cycle Length: {averageCycleLength} days</b></p>

                    <IonRow><h2>Pain</h2></IonRow>
                </IonGrid>

            </IonContent>
        </IonPage>
    );
};

export default Analysis;
