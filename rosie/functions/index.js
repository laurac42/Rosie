const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

exports.sendPushNotification = functions.https.onRequest((req, res) => {
  // Get the FCM token from the body of the request
  const token = req.body.token;
  const message = req.body.message;

  // Define the notification payload
  const payload = {
    notification: {
      title: 'New Notification',
      body: message
    },
    token: token // The FCM token for the device to send the notification
  };

  // Send the push notification via Firebase Cloud Messaging
  admin.messaging().send(payload)
    .then((response) => {
      console.log('Notification sent successfully:', response);
      res.status(200).send('Notification sent');
    })
    .catch((error) => {
      console.error('Error sending notification:', error);
      res.status(500).send('Error sending notification');
    });
});