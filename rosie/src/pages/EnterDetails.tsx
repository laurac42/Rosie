import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonIcon, IonRow, IonGrid, IonCol, IonItem, IonInput } from '@ionic/react';
import { flower, heart, person, personCircle, rose } from 'ionicons/icons';
import React, { useState } from 'react';
import ExploreContainer from '../components/ExploreContainer';
import './EnterDetails.css';

const Details: React.FC = () => {
    const [finished, setFinished] = useState(false); // state for whether or not the user has finished entering their details
    const [showPeriodInput, setShowPeriodInput] = useState(false);

    // Handle 'Enter Period Data' button click
    const enterPeriod = () => {
        setShowPeriodInput(true);  // This will trigger content to show for entering period data
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
        const p1start = document.getElementById('periodStart1') as HTMLInputElement;
        if (!p1start.value) {
            alert('Period Start Date Required');
            return;
        }

        const p2start = document.getElementById('periodStart2') as HTMLInputElement;
        if (!p2start.value) {
            alert('Period Start Date Required');
            return;
        }

        const p3start = document.getElementById('periodStart3') as HTMLInputElement;
        if (!p3start.value) {
            alert('Period Start Date Required');
            return;
        }

        const p1end = document.getElementById('periodEnd1') as HTMLInputElement;
        if (!p1end.value) {
            alert('Period End Date Required');
            return;
        }

        const p2end = document.getElementById('periodEnd2') as HTMLInputElement;
        if (!p2end.value) {
            alert('Period End Date Required');
            return;
        }

        const p3end = document.getElementById('periodEnd3') as HTMLInputElement;
        if (!p3end.value) {
            alert('Period End Date Required');
            return;
        }
        // store all of the period data in an array
        const initial_periods = [
            {startDate: p1start.value, endDate: p1end.value},
            {startDate: p2start.value, endDate: p2end.value},   
            {startDate: p3start.value, endDate: p3end.value}
        ];

        // add everything in the initial periods map to local storage
        localStorage.setItem('InitialPeriods', JSON.stringify(initial_periods));
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
                        <IonRow> <IonItem>
                            <IonInput required className="custom-font" label="Birthday:" id='bday' type="date"></IonInput>
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
                                <IonItem>
                                    <IonInput className="custom-font" type='date' label="Start Date:" placeholder="Enter Period Start Date" id="periodStart1" >
                                    </IonInput>
                                </IonItem>
                                <IonItem><IonInput className="custom-font" type='date' label="End Date:" placeholder="Enter Period End Date" id="periodEnd1">
                                </IonInput></IonItem>
                            </IonRow>
                            <IonRow class="ion-justify-content-start"><p><b>Second Most Recent Period:</b></p></IonRow>
                            <IonRow >
                                <IonItem>
                                    <IonInput className="custom-font" label="Start Date:" type='date' placeholder="Enter Period Start Date" id="periodStart2">
                                    </IonInput>
                                </IonItem>
                                <IonItem><IonInput className="custom-font" label="End Date:" type='date' placeholder="Enter Period End Date" id="periodEnd2" >
                                </IonInput></IonItem>
                            </IonRow>
                            <IonRow class="ion-justify-content-start"><p><b>Third Most Recent Period:</b></p></IonRow>
                            <IonRow >
                                <IonItem>
                                    <IonInput className="custom-font" type='date' label="Start Date:" placeholder="Enter Period Start Date" id="periodStart3">
                                    </IonInput>
                                </IonItem>
                                <IonItem><IonInput className="custom-font" type='date' label="End Date:" placeholder="Enter Period End Date" id="periodEnd3">
                                </IonInput></IonItem>
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
