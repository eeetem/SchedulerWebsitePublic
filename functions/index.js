// The Cloud Functions for Firebase SDK to create Cloud Functions and set up triggers.
const functions = require('firebase-functions');
const admin = require('firebase-admin');
const {getFirestore} = require("firebase-admin/firestore");
admin.initializeApp();
const cors = require('cors')({origin: true});
const db = getFirestore()

// // Create and deploy your first functions
// // https://firebase.google.com/docs/functions/get-started
//
 exports.WhosUp = functions.https.onCall((request, response) => {
   functions.logger.info("Reuqested WhosUP!");
   return {
       "friendsOnline":[
     {"name":"john","From":Date.now()-10 , "To":Date.now()+1000},
     {"name":"larry","From":Date.now()+1000 , "To":Date.now()+2000},]
   }

 });

exports.GetFirends = functions.https.onCall((data, context) => {
    functions.logger.info("friends were requested!");
    if (!context.auth) {
        return {status: 'error', code: 401, message: 'Not signed in'}
    }
    const friends = [];
    admin.firestore().collection('UserData').doc(context.auth.uid).get().then(r => {
        for (const friendID in r.get("WantsToFriend")) {
            if(AreFriends(context.auth.uid,friendID)){
                friends.push(friendID);
            }
        }
    });
    return friends
});
exports.AddFriend = functions.https.onCall((data, context) => {
    functions.logger.info("friend request!");
    if (!context.auth) {
        functions.logger.info("not logged in!");
        return {status: 'error', code: 401, message: 'Not signed in'}
    }
    functions.logger.info("user "+context.auth.uid+" adding"+data);
    //todo notify other user of friend request
    if(!admin.firestore().collection('UserData').doc(data).get().exists()){
        functions.logger.info("user with id:"+data+"does not exist");
        return {status: 'error', code: 401, message: 'User does not exist'}
    }

    admin.firestore().collection('UserData').doc(context.auth.uid).get().then(r => {
        const currentFriendList = r.get("WantsToFriend")
        currentFriendList.push(data)
        admin.firestore().collection('UserData').doc(context.auth.uid).update({WantsToFriend:currentFriendList});
        return {status: 'OK', code: 100, message: 'Friend Request Added'}
    })



});
    exports.RemoveFriend = functions.https.onCall((data, context) => {
        functions.logger.info("friends removal!", {structuredData: true});
        if (!context.auth) {
            functions.logger.info("not logged in!", {structuredData: true});
            return {status: 'error', code: 401, message: 'Not signed in'}
        }

        admin.firestore().collection('UserData').doc(context.auth.uid).get().then(r => {
            const currentFriendList = r.get("WantsToFriend")
            const index = currentFriendList.indexOf(data);
            if (index > -1) { // only splice array when item is found
                currentFriendList.splice(index, 1); // 2nd parameter means remove one item only
            }
            admin.firestore().collection('UserData').doc(context.auth.uid).update({WantsToFriend:currentFriendList});
            return {status: 'OK', code: 100, message: 'Friend Removal Added'}
        })
    });


exports.InitiateUser = functions.auth.user().onCreate((user) => {
    functions.logger.info("created new user with id: "+user.uid, {structuredData: true});
    const data = {
        WantsToFriend: [],
    };
     db.collection('UserData').doc(user.uid).set(data).then(r => {
         return {status: 'OK', code: 100, message: 'User Created'};
     });


});




function AreFriends(id1,id2){
    const user1 = db.collection('UserData').doc(id1).get();
    const user2 = db.collection('UserData').doc(id2).get();
    if (!user1.exists || !user2.exists) {
        return false;
    }
    return (user1["WantsToFriend"].includes(id2) || user2["WantsToFriend"].includes(id1))
}
