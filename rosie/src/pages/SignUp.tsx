import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButtons, IonMenuButton, IonButton, IonIcon, IonRow, IonGrid, IonCol } from '@ionic/react';
import { ellipsisVertical, flower, heart, shareOutline } from 'ionicons/icons';
import Popup from 'reactjs-popup';
import './SignUp.css';
import { useEffect, useState } from 'react';

const SignUp: React.FC = () => {
    const [install, setInstall] = useState("false");
    const [open, setOpen] = useState(false);
    const closeModal = () => setOpen(false);
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle >Sign-Up</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonGrid fixed={true}>
                    <IonRow ><h1 className="welcome"><IonIcon icon={flower} className='colourIcon'></IonIcon> Welcome to Rosie <IonIcon icon={flower} className='colourIcon'></IonIcon></h1></IonRow>
                    <IonRow class="ion-justify-content-center"><p>Rosie is your personal period tracker, designed to help you stay on top of your cycle with ease.
                        Whether you're tracking symptoms, predicting your next period, or planning ahead, Rosie gives you the insights you need to feel in control of your body.
                        Sign up now to start tracking and get personalized reminders, cycle insights, and more! <IonIcon icon={heart} className='colourIcon'></IonIcon></p></IonRow>
                    <IonRow class="ion-justify-content-center">
                        <IonButton className="btn" href="/Rosie/SignUp/EnterDetails" size="large">Sign-Up</IonButton>
                    </IonRow>
                    <IonRow class="ion-justify-content-center">
                        {/* https://react-popup.elazizi.com/react-modal*/}
                        <Popup open={open} onClose={closeModal} 
                        trigger={<IonButton onClick={() => setOpen(o => !o)} className='installButton'>Install</IonButton>} modal>
                            {close && (
                                <div className="modal">
                                    <button className="close" onClick={close}>
                                        &times;
                                    </button>
                                    <div className="header"> Installation Instructions </div>
                                    <div className="content">
                                        <p><b>Apple: </b>
                                            <br></br>
                                            - Click the share buton at the bottom of the screen <IonIcon icon={shareOutline}></IonIcon>
                                            <br></br>
                                            - Scroll down and click 'Add to Home Screen'
                                            <br></br>
                                            <br></br>
                                            <b>Android: </b>
                                            <br></br>
                                            - Open the menu in the upper right corner <IonIcon icon={ellipsisVertical}></IonIcon>
                                            <br></br>
                                            - Click 'Add to Home Screen'</p>
                                    </div>
                                    <div className="actions">
                                        <IonButton
                                            onClick={closeModal}
                                        >Close
                                        </IonButton>
                                    </div>
                                </div>
                            )}
                        </Popup>
                    </IonRow>

                </IonGrid>
            </IonContent>
        </IonPage>
    );
};

export default SignUp;
