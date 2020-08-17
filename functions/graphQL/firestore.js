const admin = require('firebase-admin')
const functions = require('firebase-functions')

admin.initializeApp(functions.config())

module.exports = admin.firestore()

//
// Retrieve data from database like the the code given below
//
// admin
// 	.firestore()
// 	.collection('posts')
// 	.onSnapshot(docs => docs.forEach(doc => console.log(doc.data())))
