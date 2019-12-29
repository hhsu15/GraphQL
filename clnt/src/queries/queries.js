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
export {getBookQuery, getAuthorQuery}


