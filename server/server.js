// modified from - https://github.com/mdn/serviceworker-cookbook/blob/master/push-payload/server.js
const webPush = require("web-push");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');
const cron = require("node-cron");
require("dotenv").config();

const app = express();
app.use(bodyParser.json()); // Middleware to parse JSON body requests

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
const subscriptions = [];

app.post("/register", function (req, res) {
  // store the subscription when the user registers so it can be used to send to again
  const subscription = req.body.subscription;
  const daily = req.body.dailyNotifications;
  console.log("daily", daily);
  // find out whether they registered for daily notifications or not
  subscriptions.push([subscription, daily]);
  res.sendStatus(201);
});


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

// Function to send notifications to all registered subscriptions
function sendDailyNotifications() {
  const payload = "Track your period to help understand your symptoms!"

  // find out if there are any subscriptions
  console.log(subscriptions);
  subscriptions.forEach((subscription) => {
    // check if the second part of the subscription is set to true
    console.log("subscription0", subscription[0]);
    console.log("subscription1", subscription[1]);
    if (subscription[1] == "true" || subscription[1] == true) {
      webPush
        .sendNotification(subscription[0], payload)
        .then(() => console.log("Notification sent to:", subscription[0].endpoint))
        .then(() => res.sendStatus(201))
        .catch((error) => {
          console.error("Error sending notification:", error);
          res.sendStatus(500);
        });
    }
    else {
      console.log("daily notifications have not been set")
    }
  })
}


cron.schedule("52 12 * * *", () => {
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

// to stop CORS error
app.use(cors({
  origin: 'http://localhost:5173', // You can also use '*' to allow all origins (not recommended in production)
}));