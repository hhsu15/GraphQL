const express = require('express');
const graphqlHTTP = require('express-graphql'); // this is how express server comunidates with graphql
const schema = require('./schema/schema');

const app = express();

app.use('/graphql', graphqlHTTP(
	{ 
		schema,
		// the graphiql tool came with graphql package, a default UI for you to test the graphql, pretty neat :)
		graphiql: true // to test graphql
	} // you need to pass a schema to the middleware
)) // endpoint for 'graphql', we pass the special handler graphqlHTTP 

app.listen(4000, () => {
	console.log('Hello, now listening for requests on port 4000')
})



