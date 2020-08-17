const express = require('express')
const cors = require('cors')
const { graphqlHTTP } = require('express-graphql')
const schema = require('./schema')

// Initialize express app
const app = express()

// Enable Cross-Origin Resource Sharing (CORS) middleware
app.use(cors({ origin: true }))

// Enable GraphQL middleware
app.use(
	'/',
	graphqlHTTP({
		schema,
		graphiql: true
	})
)

// app.listen(3000, () => console.log('Server running on http://localhost:3000'))

module.exports = app
