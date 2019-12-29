import React, { Component } from 'react';
import {gql} from 'apollo-boost';
import {graphql} from 'react-apollo'

const getAuthorQuery = gql`
	{
      authors {
	  	name
		id
		age
	  }
	}
`


class AddBook extends Component {
	displayAuthor(){
		var data = this.props.data
		if (data.loading) {
			return(<option disabled>Loading authors..</option>)
		} else {
			return data.authors.map(author => {
				return(<option key={author.id} value={author.id}>{author.name}</option>)
			})
		}
	
	}
	render() {
		return (
			<form id='add-book'>
				<div className='field'>
					<label>Book Name:</label>
					<input type='text'/>
				</div>

				<div className='field'>
					<label>Genre:</label>
					<input type='text'/>
				</div>

				<div className='field'>
					<label>Author:</label>
					<select>
						<option>Select Author</option>
						{this.displayAuthor()}
					</select>
				</div>

				<button>+</button>
			</form>
		)
	}

}
  //method check if data is ready
export default graphql(getAuthorQuery)(AddBook)


