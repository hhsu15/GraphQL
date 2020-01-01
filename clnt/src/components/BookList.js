import React, { Component } from 'react';
import {graphql} from 'react-apollo'
import {getBookQuery} from '../queries/queries'
import BookDetails from './BookDetails'

class BookList extends Component {
  
  constructor(props){
  	super(props)
	this.state = {
		selected: null
	}
  }
  //method check if data is ready
  displayBooks(){
  	var data = this.props.data;
	if (data.loading) {
		return (<div>Loading books...</div>)
	} else {
		return data.books.map(book => {
			// format html tag
			return (
				// onClick it will set the state with selected book id
				<li key={book.id} onClick={(e)=>{this.setState({selected:book.id})}}>{book.name}</li>
			)
		})
	}
  
  }

  render(){
  	return (
 	   <div id="book-list">
			<ul>
				{this.displayBooks()}
			</ul>
			<BookDetails bookid={this.state.selected}/>
    	</div>
  	);
  } 		
}

export default graphql(getBookQuery)(BookList)


