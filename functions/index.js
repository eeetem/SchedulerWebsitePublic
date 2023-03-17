// The Cloud Functions for Firebase SDK to create Cloud Functions and set up triggers.
const firebase = require('firebase');
const functions = require('firebase-functions');
const admin = require('firebase-admin');
const {getFirestore} = require("firebase-admin/firestore");
const axios = require("axios");
const cheerio = require("cheerio");

admin.initializeApp();
const db = getFirestore()
db.settings({ ignoreUndefinedProperties: true })

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

    const query = admin.firestore().collection('UserData').doc(context.auth.uid).get().then(async r => {
        const friends = [];
        var awaitingChecks = 0;
        for (const friendindex in r.get("WantsToFriend")) {
            const friendID = r.get("WantsToFriend")[friendindex];
            functions.logger.debug("checking if " + friendID + " is mutual")
            awaitingChecks++;
            AreFriends(context.auth.uid, friendID).then(r => {
                if(r) {
                    functions.logger.debug("adding: " + r + " to friends")
                    friends.push(friendID);
                    functions.logger.debug("adding: " + friendID + " to friends")
                }
                awaitingChecks--;
            })

        }
        while (awaitingChecks > 0) {
            await sleep(10);
        }
        return friends;
    });
    return query;
});
/*
exports.NUIGscraper = functions.pubsub.schedule('every day').onRun((context) => {
    return null;
});
*/

exports.GetUserData = functions.https.onCall((data, context) => {
    functions.logger.info("data requested for user: !"+data.userid);
    if(data.userid === ""){
        data.userid = context.auth.uid;
    }

    const query = admin.firestore().collection('UserData').doc(data.userid).get().then(async r => {
       return r.get("publicData");
    });
    return query;
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
        publicData:{
            firstName :"fname",
            surName :"sname",
            dob:"00/00/000",
            courseCode:"xx000",
            bio:"i am a very ordinary person",
            username:"i am a very ordinary person",
            pfpURL:"https://firebasestorage.googleapis.com/v0/b/schedulerwebsite.appspot.com/o/defaultPFP.png?alt=media&token=c5ae4a4e-b650-44a6-a257-c0caab08ac5f",
        }
    };
    return db.collection('UserData').doc(user.uid).set(data).then(() => {
         return {status: 'OK', code: 100, message: 'User Created'};
     });
});


exports.SubmitUserData = functions.https.onCall(async (data, context) => {
    functions.logger.info("Data Submited!");
    if (!context.auth) {
        return {status: 'error', code: 401, message: 'Not signed in'}
    }
    functions.logger.info("bio: "+ data["bio"]);
    const firstName = data["firstName"];
    const surName = data["surName"];
    const dob = data["dob"];
    const courseCode = data["courseCode"];
    const bio = data["bio"];
    const username = data["username"];
    const pfpURL = data["pfpURL"];

    const userDoc = db.collection('UserData').doc(context.auth.uid);
    await userDoc.update({
        'publicData.dob': dob,
        'publicData.surName':surName,
        'publicData.firstName':firstName,
        'publicData.courseCode': courseCode,
        'publicData.bio': bio,
        'publicData.username': username,
        'publicData.pfpURL': pfpURL,
    });
    return {status: 'ok', code: 101, message: 'updated'}
});


async function AreFriends(id1,id2){
    let result1;
    let result2;
    db.collection('UserData').doc(id1).get().then(r=>{
       result1 = r;
    });
    db.collection('UserData').doc(id2).get().then(r=>{
        result2 = r;
    });
    while(!result1||!result2)
    {
        await sleep(10);
    }
    if (!result1.exists || !result2.exists) {
        return false;
    }

    var bool1= result1.get("WantsToFriend").includes(id2);
    var bool2= result2.get("WantsToFriend").includes(id1);

    return (bool1 && bool2)
}

function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}