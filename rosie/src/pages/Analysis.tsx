import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButtons, IonMenuButton, IonButton, IonIcon, IonGrid, IonRow, IonCol } from '@ionic/react';
import { personCircle } from 'ionicons/icons';
import React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import ExploreContainer from '../components/ExploreContainer';
import './Analysis.css';

const Analysis: React.FC = () => {
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
                    {/*<BarChart
                    periodData=
                        dataset={dataset}
                        xAxis={[{ scaleType: 'band', dataKey: 'month' }]}
                        series={[
                            { dataKey: 'london', label: 'London', valueFormatter },
                            { dataKey: 'paris', label: 'Paris', valueFormatter },
                            { dataKey: 'newYork', label: 'New York', valueFormatter },
                            { dataKey: 'seoul', label: 'Seoul', valueFormatter },
                        ]}
                        {...chartSetting}
                    />*/}

                    <IonRow><h2>Cycle Length</h2></IonRow>

                    <IonRow><h2>Pain</h2></IonRow>
                </IonGrid>

            </IonContent>
        </IonPage>
    );
};

export default Analysis;
