import { IonContent, IonHeader, IonPage, IonTitle, IonItem, IonInput, IonToolbar, IonButtons, IonMenuButton, IonButton, IonIcon, IonRow, IonGrid, IonCol, IonAccordion, IonAccordionGroup, IonLabel, IonList, IonMenu, IonDatetime, IonPopover } from '@ionic/react';
import { backspace, calendarOutline, flower, nuclear, personCircle, today } from 'ionicons/icons';
import { useEffect, useState } from 'react';
import Menu from '../components/Menu'
import moment from 'moment';

const Profile: React.FC = () => {
    const [name, setName] = useState<string>('No name');
    const [age, setAge] = useState<any>("No Age Available");
    const [birthday, setBirthday] = useState<string>('No Birthday');
    const [editDetailsBool, setEditDetailsBool] = useState<boolean>(false);
    const [today, setToday] = useState<any>();

    useEffect(() => {
        // get all profile data from local storage
        if (localStorage.Name) { setName(localStorage.Name); }
        if (localStorage.Birthday) { setBirthday(localStorage.Birthday); }
        // use birthday to calculate age, checking it is a number first
        if (isNaN(getAge(birthday))) {
            setAge("No age availale")
        }
        else {
            setAge(getAge(birthday))
        }
        // only allow the user to choose up to today
        const today = moment().format("YYYY-MM-DD")
        setToday(today);

    }, [ editDetailsBool]); 

    // function to get age from birthday - taken from: https://stackoverflow.com/questions/4060004/calculate-age-given-the-birth-date-in-the-format-yyyymmdd
    function getAge(dateString: string) {
        var today = new Date();
        var birthDate = new Date(dateString);
        var age = today.getFullYear() - birthDate.getFullYear();
        var m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    }

    // changes the value of the edit details variable to change what content appears
    function editDetails() {
        setEditDetailsBool(true)
    }

    /**
     *  Check if any details were updated and save them to local storage if they were
     */
    function saveDetails() {
        const name = document.getElementById('name') as HTMLInputElement;
        // only change in local storage if something has been entered
        if (name.value) {
            localStorage.setItem('Name', name.value);
        }

        const age = document.getElementById('age') as HTMLInputElement;
        if (age.value) {
            localStorage.setItem('Age', age.value);
        }

        // check if birthday has changed and if it has, update
        if (birthday != localStorage.Birthday) {
            localStorage.setItem('Birthday', birthday);
        }
        setEditDetailsBool(false);
    }

    function deleteProfile() {
        if (window.confirm("Are you sure you want to delete your profile? This includes all period data. Once deleted, your profile is unrecoverable.")) {
            console.log("deleting profile")
            localStorage.clear();
        }
        else {
            console.log("profile is kept")
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
                        <IonTitle>Profile</IonTitle>
                        <IonButtons slot="end">
                            <IonButton aria-label="Profile" className='profileButton' href="/Rosie/Profile">
                                <IonIcon className='profileIcon' slot="icon-only" icon={personCircle}></IonIcon>
                            </IonButton>
                        </IonButtons>
                    </IonToolbar>
                </IonHeader>
                <IonContent fullscreen>

                    {/* When edit details isnt set: */}
                    {!editDetailsBool &&
                        (<IonGrid fixed={true}>

                            <IonRow class='ion-justify-content-center'>
                                <h1 className='heading'><IonIcon icon={flower} className='colourIcon'></IonIcon>Your Details<IonIcon icon={flower} className='colourIcon'></IonIcon></h1>
                            </IonRow>
                            <IonRow class='ion-justify-content-start'>
                                <p><b>Name: </b>{name} </p>
                            </IonRow>
                            <IonRow class='ion-justify-content-start'>
                                <p><b>Birthday: </b>{birthday} </p>
                            </IonRow>
                            <IonRow class='ion-justify-content-start'>
                                <p><b>Age: </b>{age} </p>
                            </IonRow>
                            <IonRow class="ion-justify-content-center">
                                <IonButton className="btn" onClick={editDetails} size="large">Edit Details</IonButton>
                            </IonRow>

                        </IonGrid>)}
                    {/* When edit details is set: */}
                    {editDetailsBool &&
                        (<IonGrid fixed={true}>
                            <IonRow ><IonButton href="/Rosie/Calendar" ><IonIcon icon={backspace}></IonIcon>Back to Cycle Page</IonButton></IonRow>
                            <IonRow class='ion-justify-content-center'>
                                <h1 className='heading'><IonIcon icon={flower} className='colourIcon'></IonIcon>Edit Details<IonIcon icon={flower} className='colourIcon'></IonIcon></h1>
                            </IonRow>
                            <IonRow> <IonItem>
                                <IonInput required className="custom-font" label={"Name:"} id="name" placeholder={name}></IonInput>
                            </IonItem>
                            </IonRow>
                            <IonRow> <IonItem>
                                <IonInput required className="custom-font" label="Age:" id='age' type="number" placeholder={age}></IonInput>
                            </IonItem>
                            </IonRow>
                            <IonRow>
                                <IonItem id="bday">
                                    <IonInput
                                        className="custom-font"
                                        label="Birthday:"
                                        placeholder="Enter Birthday"
                                        value={birthday}
                                    ></IonInput>
                                    <IonIcon className="datePickerIcon" icon={calendarOutline} size="small"></IonIcon>
                                    <IonPopover trigger="bday" show-backdrop="false">
                                        <IonDatetime
                                            class="popoverDateTime"
                                            presentation="date"
                                            max={today}
                                            onIonChange={(e) => {
                                                const formattedDate = moment(e.detail.value).format("YYYY-MM-DD");
                                                setBirthday(formattedDate);
                                            }}
                                        ></IonDatetime>
                                    </IonPopover>
                                </IonItem>
                            </IonRow>
                            <IonRow class="ion-justify-content-center">
                                <IonButton className="btn" onClick={saveDetails} size="large">Save Details</IonButton>
                            </IonRow>
                        </IonGrid>)}

                    <IonGrid class="dangerGrid" fixed={true}>
                        <IonRow class='ion-justify-content-center'>
                            <h1 className='heading'><IonIcon icon={nuclear} className='dangerIcon'></IonIcon>Danger Zone<IonIcon icon={nuclear} className='dangerIcon'></IonIcon></h1>
                        </IonRow>
                        <IonRow class="ion-justify-content-center">
                            <IonButton className="btn dangerButton" onClick={deleteProfile} size="large">Delete Profile</IonButton>
                        </IonRow>

                    </IonGrid>

                </IonContent>
            </IonPage>
        </>
    );
};

export default Profile;
