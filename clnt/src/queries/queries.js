import {gql} from 'apollo-boost';

const getBookQuery = gql`
	{
      books {
	  	name
		id
		genre
	  }
	}
`

const getAuthorQuery = gql`
	{
      authors {
	  	name
		id
		age
	  }
	}
`

// dynamically populate
const addBookMutation = gql`
	{
		mutation {
			addBook(name:"", genre:"", authorId:""){
				name
				genre
				id
			}
		}
	}

`


export {getBookQuery, getAuthorQuery, addBookMutation}


