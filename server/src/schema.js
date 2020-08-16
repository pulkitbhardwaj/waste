const { GraphQLObjectType, GraphQLString, GraphQLSchema } = require('graphql')
const db = require('./firestore')

const PostType = new GraphQLObjectType({
	name: 'Post',
	fields: () => ({
		id: { type: GraphQLString },
		title: { type: GraphQLString },
		content: { type: GraphQLString }
	})
})

const RootQuery = new GraphQLObjectType({
	name: 'RootQueryType',
	fields: {
		post: {
			type: PostType,
			args: { id: { type: GrpahQLString } },
			resolve: (parent, args) => {
				// code to get from firestore
			}
		}
	}
})

module.exports = new GraphQLSchema({
	query: RootQuery
})
