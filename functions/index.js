// The Cloud Functions for Firebase SDK to create Cloud Functions and set up triggers.
const functions = require('firebase-functions');

// // Create and deploy your first functions
// // https://firebase.google.com/docs/functions/get-started
//
 exports.whosUp = functions.https.onRequest((request, response) => {
   functions.logger.info("Reuqested WhosUP!", {structuredData: true});
   var responeJson = {
       "friendsOnline":[
     {"name":"john","From":Date.now()-10 , "To":Date.now()+1000},
     {"name":"larry","From":Date.now()+1000 , "To":Date.now()+2000},]
   }
   response.send(responeJson);

 });
