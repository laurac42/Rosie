import moment from "moment";

export const checkTrack = () => {
    // check if notification permissions have been granted and if the user has asked for daily notifications
    const savedTheme = localStorage.getItem("Theme") || "light";
    console.log("trying to send notifications")
    const Notifications = localStorage.getItem("Notifications");
    const selectedNotifications = JSON.parse(localStorage.chosenNotifications);
    if (Notifications == "granted" && selectedNotifications.includes("daily")) {
        // check if notifications have been allowed and daily notifications selected
        console.log("daily notifications have been selected")
        const today = moment();
        // check if a notification has already been sent today
        if (localStorage.getItem("NotificationDate") != today.format("YYYY-MM-DD")) {
            // send a track notification and also set the notification date variable to today
            localStorage.setItem("NotificationDate", today.format("YYYY-MM-DD"));
            const notifTitle = "Reminder to Track";
            const notifBody = `You haven't tracked yet today! Head to the track page to track your symptoms`;
            const notifImg = `/Rosie/rose.png`;
            const options = {
                body: notifBody,
                icon: notifImg,
            };
            new Notification(notifTitle, options);
        }
    }
    else {
        console.log("Notifications");
    }
};