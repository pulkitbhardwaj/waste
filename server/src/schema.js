const {
	GraphQLObjectType,
	GraphQLString,
	GraphQLSchema,
	GraphQLList
} = require('graphql')
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
				let post = await db.collection('posts').doc(args.id).get()
				return post.data()
			}
		},
		posts: {
			type: new GraphQLList(PostType),
			resolve: async (parent, args) => {
				let posts = await db.collection('posts').get()
				return posts.docs.map(post => post.data())
			}
		}
	}
})

module.exports = new GraphQLSchema({
	query: RootQuery
})
