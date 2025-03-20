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
const periodPredictions = [];

app.post("/register", function (req, res) {
  // store the subscription when the user registers so it can be used to send to again
  const subscription = req.body.subscription;
  const daily = req.body.dailyNotifications;
  const upcoming = req.body.upcomingNotifications;

  // store whether they registered for daily and upcoming notifications or not
  subscriptions.push([subscription, daily, upcoming]);
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

// handle the user sending an upcoming period notification
app.post("/updatePrediction", (req, res) => {
  subscriptions.forEach((subscription) => {
    
  })
});

// Function to send notifications to all registered subscriptions
function sendDailyNotifications() {
  const payload = "Track your period to help understand your symptoms!"

  // find out if there are any subscriptions
  subscriptions.forEach((subscription) => {
    if (subscription[1] == "true" || subscription[1] == true) {
      webPush
        .sendNotification(subscription[0], payload)
        .then(() => console.log("Notification sent to:", subscription[0].endpoint))
        .catch((error) => {
          console.error("Error sending notification:", error);
        });
    }
    else {
      console.log("daily notifications have not been set")
    }
  })
}

// send a reminder to track notification at 2 every day
cron.schedule("* 14 * * *", () => {
  console.log("Sending daily notifications...");
  sendDailyNotifications();
});

// send an upcoming period notification at 9 if the user's period is upcoming
cron.schedule("* 9 * * *", () => {
  console.log("Sending daily notifications...");
  sendDailyNotifications();
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

