// define the graph schema

const graphql = require('graphql');
const { 
	GraphQLObjectType, 
	GraphQLString, 
	GraphQLSchema,
	GraphQLInt,
	GraphQLID, // id will allow int and string
	GraphQLList
	} 

= graphql;

const _ = require('lodash');

var books = [
	{name: "book a", id: '1', authorid:'1'},
	{name: "book b", id: '2', authorid:'2'},
	{name: "book c", id: '3', authorid:'3'},
	{name: "book d", id: '4', authorid:'1'},
	{name: "book e", id: '5', authorid:'2'},
	{name: "book f", id: '6', authorid:'3'},
]

var authors = [
	{name:'Hsin', age:30, id:'1'},
	{name:'Jess', age:30, id:'2'},
	{name:'Kyle', age:6, id:'3'}
]

// instantiate object to define a Book type
const BookType = new GraphQLObjectType({
	name: 'Book',

	// notice here we use a function for "fields" rather than an object. this is because we want to treat it as a function so AuthorType can be used before it's defined (we have AuthorType defined afterwards. When we use a function this won't be concerning since a function will only be executed when it's needed.
	fields: () => ({
		id: {
			type: GraphQLID
		},
		name: {
			type: GraphQLString
		},
		genre: {
			type: GraphQLString
		},
		// here comes the relationship
		author: {
			type: AuthorType,
			resolve(parent, args){ 
			    // parent will return the query result
				// where you can take the info and do things subsquently     
				//console.log(parent)
		    	return _.find(authors,{id:parent.authorid});	
			}
		}
	})
});


const AuthorType = new GraphQLObjectType({
	name: 'Author',
	fields: () => ({
		id: {
			type: GraphQLID
		},
		name: {
			type: GraphQLString
		},
		age: {
			type: GraphQLInt
		},
		books: {
			type: new GraphQLList(BookType),
			resolve(parent, args){
				console.log(parent)
			    return	_.filter(books, {authorid:parent.id}); // filter to get back filtered array; _.find is for returning one found result
			}
		}
	})
});

// define the root query type
// this is different than the BookType since we will define every different type of rootquery
const RootQuery = new GraphQLObjectType({
	name: 'RootQueryType',
	// the fields are not function
	fields: {
		// here we just use objects rather than functions like BookType because BookType and AuthorType has been defined.
		book: {
			type: BookType,
			args: {id:{type:GraphQLID}},
			resolve(parent, args){
			// this gets run when client sends a request
			//code to get data from db
			// use lodash here
			return _.find(books, {id:args.id});
			}
		},
		author: {
			type: AuthorType,
			args: {id:{type:GraphQLID}},
			resolve(parent, args){
			// this gets run when client sends a request
			//code to get data from db
			// use lodash here
			return _.find(authors, {id:args.id});
			}
		},
		books: {
			type: new GraphQLList(BookType),
//			args: {
//				author:{
//					fields:{
//						id: {
//							type: GraphQLID
//						},
//						name: {},
//						age: {}
//					}
//				},
//			},
			resolve(parent, args){
				return books;
			}
		},
		authors: {
			type: new GraphQLList(AuthorType),
			resolve(parent, args){
				return authors;
			}
		}
	}
});

module.exports = new GraphQLSchema({
    // define the queries that users are allowed to use
	query: RootQuery
});
