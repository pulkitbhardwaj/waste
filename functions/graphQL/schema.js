const {
	GraphQLObjectType,
	GraphQLSchema,
	GraphQLList,
	GraphQLString,
	GraphQLID
} = require('graphql')
const db = require('./firestore')

/**
 * Post Type to represent each Blog Post
 */
const PostType = new GraphQLObjectType({
	name: 'Post',
	fields: () => ({
		id: { type: GraphQLID },
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
			args: { id: { type: GraphQLID } },
			resolve: async (parent, args) => {
				let post = await db.collection('posts').doc(args.id).get()
				return { id: post.id, ...post.data() }
			}
		},
		posts: {
			type: new GraphQLList(PostType),
			resolve: async (parent, args) => {
				let posts = await db.collection('posts').get()
				return posts.docs.map(post => ({ id: post.id, ...post.data() }))
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
				let promise = await db.collection('posts').add({
					title: args.title,
					content: args.content
				})
				let post = await promise.get()
				return { id: post.id, ...post.data() }
			}
		}
	}
})

module.exports = new GraphQLSchema({
	query: RootQuery,
	mutation: Mutation
})
