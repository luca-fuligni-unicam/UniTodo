const admin = require("firebase-admin");

admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    databaseURL: "https://unitodo-a6bbb.firebaseio.com"
})

module.exports = admin;
