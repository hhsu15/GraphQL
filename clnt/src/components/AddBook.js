import React, { Component } from 'react';
import {graphql} from 'react-apollo'
import {getAuthorQuery} from '../queries/queries'


class AddBook extends Component {
	constructor(props){
		super()
		this.state = {
			name: "",
			genre: "",
			authorId: ""
		}
	}
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

	submitForm(e){
		e.preventDefault(); //this is pure javascript code to prevent the default behavior of submit which refreshes the page
		console.log(this.state) // since we bind this to the function
	}

	render() {
		return (
			<form id='add-book' onSubmit={this.submitForm.bind(this)}>
				<div className='field'>
					<label>Book Name:</label>
					<input type='text' onChange={(e) =>this.setState({name:e.target.value})}/>
				</div>

				<div className='field'>
					<label>Genre:</label>
					<input type='text' onChange={(e) =>this.setState({genre:e.target.value})}/>
				</div>

				<div className='field'>
					<label>Author:</label>
					<select onChange={(e) =>this.setState({authorId:e.target.value})}>
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


