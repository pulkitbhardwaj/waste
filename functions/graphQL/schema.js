const {
	GraphQLObjectType,
	GraphQLString,
	GraphQLSchema,
	GraphQLList
} = require('graphql')
const db = require('./firestore')

/**
 * Post Type to represent each Blog Post
 */
const PostType = new GraphQLObjectType({
	name: 'Post',
	fields: () => ({
		id: { type: GraphQLString },
		title: { type: GraphQLString },
		content: { type: GraphQLString }
	})
})

/**
 * The root query for quering the data of different types through the API
 */
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

/**
 * The mutaions to mutate data through the API
 */
const Mutation = new GraphQLObjectType({
	name: 'Mutation',
	fields: {
		addPost: {
			type: PostType,
			args: {
				title: { type: GraphQLString },
				content: { type: GraphQLString }
			},
			resolve: async (parent, args) => {
				let post = (
					await db.collection('posts').add({
						title: args.title,
						content: args.content
					})
				).get()
				return (await post).data()
			}
		}
	}
})

module.exports = new GraphQLSchema({
	query: RootQuery,
	mutation: Mutation
})
