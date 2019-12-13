// define the graph schema

const graphql = require('graphql');
const { 
	GraphQLObjectType, 
	GraphQLString, 
	GraphQLSchema,
	GraphQLID // id will allow int and string
	} 
= graphql;

const _ = require('lodash');

var books = [
	{name: "book a", id: '1'},
	{name: "book b", id: '2'},
	{name: "book c", id: '3'},
]

// instantiate object to define a Book type
const BookType = new GraphQLObjectType({
	name: 'Book',
	fields: () => ({
		id: {
			type: GraphQLID
		},
		name: {
			type: GraphQLString
		},
		genre: {
			type: GraphQLString
		}
	})
});

// define the root query type
// this is different than the BookType since we will define every different type of rootquery
const RootQuery = new GraphQLObjectType({
	name: 'RootQueryType',
	// the fields are not function
	fields: {
		book: {
			type: BookType,
			args: {id:{type:GraphQLID}},
			resolve(parent, args){
			// this gets run when client sends a request
			//code to get data from db
			// use lodash here
			return _.find(books, {id:args.id});
			}
		}
	}
});

module.exports = new GraphQLSchema({
    // define the queries that users are allowed to use
	query: RootQuery
});
