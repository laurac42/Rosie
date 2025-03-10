import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButtons, IonMenuButton, IonButton, IonIcon, IonGrid, IonRow, IonCol } from '@ionic/react';
import { personCircle } from 'ionicons/icons';
import React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { useState, useEffect } from 'react';
import moment from 'moment';
import './Analysis.css';

const Analysis: React.FC = () => {
    const [periods, setPeriods] = useState<string[]>([]);

     useEffect(() => {
        getAveragePeriodLength();
      }, []);
    /**
     * Get all of the period data, calculate start and end dates, and calculate the average period length
     */
    function getAveragePeriodLength()
    {
        // first, load in all period data and make sure it is sorted by date
        var periodDates = new Map<string, string>(JSON.parse(localStorage.periodMap));
        periodDates.forEach((flow: string, date: string) => {
            console.log(date);
            periods.push(date);
        });
        periods.sort((a, b) => (new Date(b).getTime() - new Date(a).getTime()));
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
                    <BarChart
                        xAxis={[{ scaleType: 'band', data: ['group A', 'group B', 'group C'] }]}
                        series={[{ data: [4, 3, 5] }, { data: [1, 6, 3] }, { data: [2, 5, 6] }]}
                        width={500}
                        height={300}
                    />

                    <IonRow><h2>Cycle Length</h2></IonRow>

                    <IonRow><h2>Pain</h2></IonRow>
                </IonGrid>

            </IonContent>
        </IonPage>
    );
};

export default Analysis;
