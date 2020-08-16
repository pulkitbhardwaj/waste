const admin = require('firebase-admin')

const serviceAccount = require('./firebase-admin-credentials.json')

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
	databaseURL: 'https://blog-dc4ad.firebaseio.com'
})

module.exports = admin.firestore()

//
// Retrieve data from database like the the code given below
//
// admin
// 	.firestore()
// 	.collection('posts')
// 	.onSnapshot(docs => docs.forEach(doc => console.log(doc.data())))
