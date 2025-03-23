import { IonTabBar, IonTabButton, IonIcon, IonLabel } from "@ionic/react";
import { radioButtonOff, calendar, clipboard, trendingUp } from "ionicons/icons";

const Tabs: React.FC = () => {
    return (
        <IonTabBar slot="bottom">
            <IonTabButton aria-label="Cycle" tab="Cycle" href="/Rosie/Cycle">
                <IonIcon icon={radioButtonOff} />
                <IonLabel>Cycle</IonLabel>
            </IonTabButton>
            <IonTabButton aria-label="Calendar" tab="Calendar" href="/Rosie/Calendar" >
                <IonIcon icon={calendar} />
                <IonLabel>Calendar</IonLabel>
            </IonTabButton>
            <IonTabButton aria-label="Track" tab="Track" href="/Rosie/Track">
                <IonIcon icon={clipboard} />
                <IonLabel>Track</IonLabel>
            </IonTabButton>
            <IonTabButton tab="Analysis" href="/Rosie/Analysis">
                <IonIcon icon={trendingUp} />
                <IonLabel>Analysis</IonLabel>
            </IonTabButton>
        </IonTabBar>
    );
};

export default Tabs;