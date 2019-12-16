# GraphQL

Some basics using `express` to get started:
```
npm init # to create package.json
npm install express
# refer to "server/app.js"
node app
```

even better, use `nodemon`
```
npm install nodemon -g
nodemon  # this will watch for changes
```

Install javascript package for graphql
```
npm install graphql express-graphql  # install both. express-graphql for express to understand graphql
```
## Define schema using GraphQLObjectType
Make a schema for graphql
```
# refer to /server/schema/schema.js
# baiscally make an object for say Book with defiend schema
# and make another object for Query that points to those defined objects
```
Use GraphiQL to test your backend
```
# enable the graphiql UI by passing this to express-graphql middleware
graphiql=true

# then you can test your query doing something like

{
  book(id: "1"){
  	id, 
	name
  }
}
```

## Create relationship
Basically by defining the schema. Say `books` under AuthorType, and `author` under the BookType.

### Query a list of values
Use GraphQLList for say `books` and you will be able to get back a list

## Use MongoDB
Go to mongo DB and create an account...it has pretty easy instructions to help set up the cluster. Use sandbox do it will be free.

- Install mongoose to connect to the mongo db instance
```
npm install mongoose
```
Refer to `app.js` how to create the instance and make connection using the connection string.

To find the connection string for mongodb:
- click on "connect" button
- click on "Connect your application"
- select your driver version (e.g., Node.js)
- Copy the connection string and replace your password
- In the connection string, you can modify and use anyname for your database. By default it gives you "test"


### Make mogodb schema
Refer to `server/modles`

### Retrieve data
Now you can modify the resolve function to use Mongodb method such as `obj.findById(id)` or `obj.find({})` to retrieve the data

## Mutation
Mutation is for add, update, delete.
Basicall you create a GraphQLObject for mutation, similar to the RootQuery, define your function such as `addAuthor`. Use the mongodb object to create send a record to database. Your graphql lookslike this:
```
mutation{
  addAuthor(name:"Jess", age:30){
    name
  }
}
```

