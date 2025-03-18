import { IonTabBar, IonTabButton, IonIcon, IonLabel } from "@ionic/react";
import { radioButtonOff, calendar, clipboard, trendingUp } from "ionicons/icons";

const Tabs: React.FC = () => {
    return (
        <IonTabBar slot="bottom">
            <IonTabButton tab="Rosie" href="/Cycle">
                <IonIcon aria-hidden="true" icon={radioButtonOff} />
                <IonLabel>Cycle</IonLabel>
            </IonTabButton>
            <IonTabButton tab="Calendar" href="/Calendar">
                <IonIcon aria-hidden="true" icon={calendar} />
                <IonLabel>Calendar</IonLabel>
            </IonTabButton>
            <IonTabButton tab="Track" href="/Track">
                <IonIcon aria-hidden="true" icon={clipboard} />
                <IonLabel>Track</IonLabel>
            </IonTabButton>
            <IonTabButton tab="Analysis" href="/Analysis">
                <IonIcon aria-hidden="true" icon={trendingUp} />
                <IonLabel>Analysis</IonLabel>
            </IonTabButton>
        </IonTabBar>
    );
};

export default Tabs;