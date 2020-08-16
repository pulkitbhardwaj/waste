const express = require('express')
const graphqlHTTP = require('express-graphql')
const schema = require('./schema')

const app = express()

app.use(
	'/',
	graphqlHTTP({
		schema
	})
)

app.listen(3000, () => console.log('Server running on http://localhost:3000'))

// module.exports = app
