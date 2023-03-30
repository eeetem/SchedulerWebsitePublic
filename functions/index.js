// The Cloud Functions for Firebase SDK to create Cloud Functions and set up triggers.
const functions = require('firebase-functions');
const admin = require('firebase-admin');
const {getFirestore} = require("firebase-admin/firestore");

admin.initializeApp();
const db = getFirestore()
db.settings({ ignoreUndefinedProperties: true })


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
async function UsernameToId(username) {
    functions.logger.debug("searching for: "+username);
    const snapshot = await admin.firestore().collection('UserData').where('publicData.username', '==', username).get();
    if (snapshot.empty) {
        functions.logger.info("no matches");
        return;
    }
    functions.logger.info("users found: "+snapshot.size);
    //this just returns one result
    var res;
    snapshot.forEach(result => {
        res = result;//this is ass but figuring out how to get just the first element without typescript is hellish
    })
    return res.id;
}
exports.UserToID = functions.https.onCall(async (data, context) => {
    functions.logger.debug("starting: "+data);
    const q = await UsernameToId(data);
    functions.logger.debug("request ran: "+q);
    return q;
});

exports.GetUserData = functions.https.onCall(async (data, context) => {
    var id = "";

    if (data == null) {
        id = context.auth.uid;
    } else if (data.userid != null && data.userid !== "") {
        id = data.userid;
    } else if (data.username != null && data.username !== "") {
        id = await UsernameToId(data.username)
    } else {
        return {status: 'error', code: 401, message: 'Bad Request'}
    }
    functions.logger.info("data requested for user: !" + id);


    const query = admin.firestore().collection('UserData').doc(id).get().then(async r => {
        return r.get("publicData");
    });
    return query;
});


exports.AddFriend = functions.https.onCall(async (data, context) => {
    functions.logger.info("friend request!");
    if (!context.auth) {
        functions.logger.info("not logged in!");
        return {status: 'error', code: 401, message: 'Not signed in'}
    }
    functions.logger.info("user " + context.auth.uid + " adding" + data);
    //todo notify other user of friend request
    var response = await admin.firestore().collection('UserData').doc(data).get();
    if (response.data() == null) {
        functions.logger.info("user with id:" + data + "does not exist, searching username");
        data = await UsernameToId(data);
        if(data == null || data === "") {
            return {status: 'error', code: 401, message: 'User does not exist'}
        }
        response = await admin.firestore().collection('UserData').doc(data).get();
        if (response.data() == null) {
            return {status: 'error', code: 401, message: 'User does not exist'}
        }
    }

        const currentFriendList = response.get("WantsToFriend")
        currentFriendList.push(data)
        await admin.firestore().collection('UserData').doc(context.auth.uid).update({WantsToFriend: currentFriendList});
        return {status: 'OK', code: 100, message: 'Friend Request Added'}


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
exports.UpStatus =  functions.https.onCall(async (data, context) => {

    if (data == null) {
        return {status: 'ERROR', code: 401, message: 'no id provided'}
    }
    const id = data;
    functions.logger.info("UpStatus requested for user: !" + id);

    const r = await admin.firestore().collection('UserData').doc(id).get()
    const pdata = r.get("publicData");
    const timetable = JSON.parse(pdata["timetableJSON"]);
    const days = ["monday", "tuesday", "wednesday", "thursday", "friday"];

    const date = new Date();
    const hournow = date.getHours();
    const daynow = date.getDay();
    const dayNowText = days[daynow-1];

    const timeNow = hournow + dayNowText

    functions.logger.info("Time Now:" + timeNow);
    var onToday = {}
    for (var key in timetable) {
        var value = timetable[key];
        if (key.charAt(0) === "9")//edgecase for 9
        {
            key = "0" + key;
        }
        const time = key.slice(0, 2)
        const day = key.replace(time, "")
        if (day === dayNowText) {
            onToday[time] = value;
        }
    }
    let activityNow;
    let firstActivityAfterNow;
    let NextFree;
    let NextBusy;

    if(onToday[hournow] !=null){
        activityNow = [hournow]
        for (let i = hournow+1; i < 18; i++) {
            if(onToday[i] == null){
                NextFree = i;
            }
        }
    }else {
        for (let i = hournow + 1; i < 18; i++) {
            if (onToday[i] != null) {
                NextBusy = i;
                firstActivityAfterNow = onToday[i]
                break;
            }
        }
    }
    var response = {}
    if(activityNow != null){
        response["status"] = "busy"
        response["activity"] = activityNow
        response["freeIn"] = NextFree
    }else{
        response["status"] = "Available"
        response["nextactivity"] = firstActivityAfterNow
        response["busyIn"] = NextBusy
    }
    return {status: 'OK', code: 100, response:response}
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
            year :"1st",
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
    const year = data["year"];
    const pfpURL = data["pfpURL"];
    const timetable = data["timetable"];
    const timetableJSON = data["timetableJSON"];
    const moduleRemoveOptions= data["moduleRemoveOptions"];
    const moduleList = data["moduleList"];

    const userDoc = db.collection('UserData').doc(context.auth.uid);
    await userDoc.update({
        'publicData.dob': dob,
        'publicData.surName':surName,
        'publicData.firstName':firstName,
        'publicData.courseCode': courseCode,
        'publicData.bio': bio,
        'publicData.username': username,
        'publicData.pfpURL': pfpURL,
        'publicData.year': year,
        'publicData.timetable': timetable,
        'publicData.timetableJSON':timetableJSON,
        'publicData.moduleRemoveOptions': moduleRemoveOptions,
        'publicData.moduleList': moduleList,
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