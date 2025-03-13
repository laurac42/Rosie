import { IonContent, IonHeader, IonPage, IonTitle, IonItem, IonInput, IonToolbar, IonButtons, IonMenuButton, IonButton, IonIcon, IonRow, IonGrid, IonCol, IonAccordion, IonAccordionGroup, IonLabel, IonList, IonMenu } from '@ionic/react';
import { backspace, calendar, clipboard, colorPalette, flower, folderOpen, heart, informationCircle, lockClosed, notifications, nuclear, people, person, personCircle, radioButtonOff, rose, settings, trendingUp } from 'ionicons/icons';
import { useEffect, useState } from 'react';

const Profile: React.FC = () => {
    const [name, setName] = useState<string>('No name');
    const [age, setAge] = useState<any>("No Age Available");
    const [birthday, setBirthday] = useState<string>('No Birthday');
    const [editDetailsBool, setEditDetailsBool] = useState<boolean>(false);

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
    }, [birthday, editDetailsBool]); // needs to also reload when birthday is changed so that it can use the changed birthday to calculate age
    // and also when details are edited so it updates to the new ones

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

        const bday = document.getElementById('bday') as HTMLInputElement;
        if (bday.value) {
            localStorage.setItem('Birthday', bday.value);
        }
        setEditDetailsBool(false);
    }

    function deleteProfile() {
        if(window.confirm("Are you sure you want to delete your profile? This includes all period data. Once deleted, your profile is unrecoverable."))
        {
            console.log("deleting profile")
            localStorage.clear();
        }
        else{
            console.log("profile is kept")
        }
        
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
                        <IonRow> <IonItem>
                            <IonInput required className="custom-font" label="Birthday:" id='bday' type="date"></IonInput>
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
