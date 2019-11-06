const functions = require('firebase-functions');

// FIREBASE
const admin = require('firebase-admin');
const serviceAccount = require('../ServiceAccountKey');

admin.initializeApp ({
    credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

const dummyData = 
['77.41.112.174',
'47.41.112.174',
'77.41.012.174',
'22.55.663.844',
'22.55.663.844' ];


// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

exports.helloWorld = functions.https.onRequest((request, response) => {

    db.collection('discover-mn').doc('visitors').get().then(doc => {
        let visitorIpAddress = doc.data().ipAddress;
        let numberOfnewVisitors = doc.data().ipAddress.length;
        let newCountofVisitors = doc.data().totalVisitorCount + numberOfnewVisitors;
        console.log('this is the data', doc.data());

        if (numberOfnewVisitors === 0) {
            console.log('nothing new to report')
        }

        db.collection('discover-mn').doc('visitors').update({
            ipAddress: [...visitorIpAddress, dummyData[0]],
            totalVisitorCount: newCountofVisitors
        }).catch(err => console.log('could not update', err));

        
    }).catch(err => console.log('could not retrieve db', err))

    console.log('hellos')
 response.send("Hello from Firebase!");
});



// export const  DiscoverMnVisitorCount = functions.pubsub.schedule('* * * * *').onRun(async (context) => {
//     console.log('This will be run every 5 minutes!');

//     return null;
//   });