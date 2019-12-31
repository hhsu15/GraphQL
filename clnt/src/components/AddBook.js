import React, { Component } from 'react';
import {graphql} from 'react-apollo'
import {getAuthorQuery, addBookMutation} from '../queries/queries'
import compose from "lodash.flowright";

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
		console.log(this.props)
		var data = this.props.getAuthorQuery
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
		//console.log(this.state) // since we bind this to the function
		
		// and this is how you can invoke the mutation query
		this.props.addBookMutation()
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
//export default graphql(getAuthorQuery)(AddBook)

// compose multiple queries using "compose"
export default compose(
	graphql(getAuthorQuery, {name:"getAuthorQuery"}), // the name property determines the name of the property you get back. i.e., this.props.getAuthorQuery
	graphql(addBookMutation, {name:"addBookMutation"})
)(AddBook)
