// modified from - https://github.com/mdn/serviceworker-cookbook/blob/master/push-payload/server.js
const webPush = require("web-push");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');
const cron = require("node-cron");
require("dotenv").config();

const app = express();
app.use(bodyParser.json()); // Middleware to parse JSON body requests
app.use(cors({
  origin: '*', // to allow cors - this allows it everywhere which is less secure but it means it works on localhost and also the actual deployment
  credentials: true
}));

if (!process.env.VAPID_PUBLIC_KEY || !process.env.VAPID_PRIVATE_KEY) {
  console.log(
    "You must set the VAPID_PUBLIC_KEY and VAPID_PRIVATE_KEY " +
    "environment variables. You can use the following ones:"
  );
  console.log(webPush.generateVAPIDKeys());
}

// Set the keys used for encrypting the push messages.
webPush.setVapidDetails(
  "https://rosie-production.up.railway.app/",
  process.env.VAPID_PUBLIC_KEY,
  process.env.VAPID_PRIVATE_KEY
);

// Define routes directly in this file
app.get("/vapidPublicKey", (req, res) => {
  res.send(process.env.VAPID_PUBLIC_KEY);
});


// ideally stored in a database but this does the job for now
// because they are stored this way it means that if the server is restarted, anyone who signed up for notifications before no longer gets them
const subscriptions = [];

app.post("/register", function (req, res) {
  console.log("in register function")
  // store the subscription when the user registers so it can be used to send to again
  const subscription = req.body.subscription;
  const daily = req.body.dailyNotifications;
  const upcoming = req.body.upcomingNotifications;

  // store whether they registered for daily and upcoming notifications or not
  subscriptions.push({ subscription: subscription, dailyNotifications: daily, upcomingNotifications: upcoming, periodPrediction: "none" });
  res.sendStatus(201);
});

// this isnt really needed because i dont think i ever call it? i used it when the user clicked a button to send a notification
app.post("/sendNotification", (req, res) => {

  const payload = req.body.payload;
  const options = {
    TTL: req.body.ttl,
  };

  setTimeout(() => {
    webPush
      .sendNotification(subscription, payload, options)
      .then(() => res.sendStatus(201))
      .catch((error) => {
        console.error("Error sending notification:", error);
        res.sendStatus(500);
      });
  }, req.body.delay * 1000);
});

// handle the user's period prediction updating
app.post("/updatePrediction", (req, res) => {
  console.log("updating prediction")
  subscriptions.forEach((storedSubscription) => {
    if (JSON.stringify(storedSubscription.subscription) == JSON.stringify(req.body.subscription)) {
      storedSubscription.periodPrediction = req.body.periodPrediction;
    }
    else {
      console.log("subscription doesnt match: ", JSON.stringify(storedSubscription.subscription) + " " + JSON.stringify(req.body.subscription))
    }
  })
});

// Function to send daily notifications to all registered subscriptions
function sendDailyNotifications() {
  const payload = "Track your period to help understand your symptoms!"

  // find out if there are any subscriptions
  subscriptions.forEach((storedSubscription) => {
    if (storedSubscription.dailyNotifications == "true" || storedSubscription.dailyNotifications == true) {
      webPush
        .sendNotification(storedSubscription.subscription, payload)
        .then(() => console.log("Notification sent to:", storedSubscription.subscription.endpoint))
        .catch((error) => {
          console.error("Error sending notification:", error);
        });
    }
    else {
      console.log("daily notifications have not been set")
    }
  })
}

// Function to send upcoming notifications to all registered subscriptions that have upcoming periods
function sendUpcomingNotifications() {
  // find out if there are any subscriptions
  console.log(subscriptions)
  console.log("inside upcoming notifications function")
  subscriptions.forEach((storedSubscription) => {
    console.log("this is a sunscription")
    // check they have subscribed to upcoming notifications and there has been a prediction set
    if ((storedSubscription.upcomingNotifications == "true" || storedSubscription.upcomingNotifications == true) && storedSubscription.periodPrediction != "none") {
      console.log("this is a sunscription that has a prediction")
      if (Number(storedSubscription.periodPrediction) <=3)
      {
        console.log("prediction: ", storedSubscription.periodPrediction)
        var payload = `Your period is due in ${storedSubscription.periodPrediction} days`
        if (parseInt(storedSubscription.periodPrediction) <=0)
        {
          payload = `Your period is due today`
        }
        webPush
        .sendNotification(storedSubscription.subscription, payload)
        .then(() => console.log("Notification sent to:", storedSubscription.subscription.endpoint))
        .catch((error) => {
          console.error("Error sending notification:", error);
        });
      }
      else {
        console.log("period is not due yet");
        console.log(storedSubscription.periodPrediction);
      }
    }
  })
}

// send a reminder to track notification at 2 every day
cron.schedule("* 14 * * *", () => {
  sendDailyNotifications();
});

// send an upcoming period notification at 9 if the user's period is upcoming
cron.schedule("* 9 * * *", () => {
  sendUpcomingNotifications();
});

// schedule all users upcoming period prediction to decrement every day at midnight as tis means they 
cron.schedule("* 0 * * *", () => {
  subscriptions.forEach((storedSubscription) => {
    if (storedSubscription.periodPrediction != "none")
    {
      var decrement = Number(storedSubscription.periodPrediction) - 1;
      storedSubscription.periodPrediction = decrement;
    }
  })
});

// Set up the port correctly
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(` Server is running on port ${PORT}`);
});

app.get("/", (req, res) => {
  res.send("Server is running!");
});

const path = require("path");
app.use(express.static(path.join(__dirname, "public")));

