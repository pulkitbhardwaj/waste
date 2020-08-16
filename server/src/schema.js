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
			args: { id: { type: GraphQLString } },
			resolve: async (parent, args) => {
				let post = await db.doc(`posts/${args.id}`).get()
				return post.data()
			}
		}
	}
})

module.exports = new GraphQLSchema({
	query: RootQuery
})
