const functions = require('firebase-functions')
const graphQLServer = require('./graphQL')

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
// 	functions.logger.info('Hello logs!', { structuredData: true })
// 	response.send('Hello from Firebase!')
// })
// // .runWith({ memory: '2GB' })
// exports.helloWorld2 = functions.https.onRequest((request, response) => {
// 	functions.logger.info('Hello logs!', { structuredData: true })
// 	response.send('Hello from Firebase 2222!')
// })

exports.graphQL = functions
	.runWith({ memory: '2GB' })
	.https.onRequest(graphQLServer)
