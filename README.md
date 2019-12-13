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


