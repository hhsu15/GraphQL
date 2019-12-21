import graphene


books = [
	{'book_id':"1", 'book_name': 'book1', 'genre': 'fiction', 'author_id': '1'},
	{'book_id':"2", 'book_name': 'book2', 'genre': 'history', 'author_id': '2'},
	{'book_id':"3", 'book_name': 'book3', 'genre': 'fiction', 'author_id': '1'},

]


authors = [
	{'author_id': "1", 'author_name': 'Hsin', 'age': 40},
	{'author_id': "2", 'author_name': 'Kyle', 'age': 6},
]


class BookType(graphene.ObjectType):
	book_id = graphene.ID(description="book id")
	book_name = graphene.String(name="bookName", default_value="unknown")
	genre = graphene.String()
	author = graphene.Field(lambda : AuthorType)

	def resolve_author(parent, info):
		author_id = parent['author_id']
		for author in authors:
			if author['author_id'] == author_id:
				return author


class AuthorType(graphene.ObjectType):
	author_id = graphene.ID()
	author_name = graphene.String(name="authorName", default_value="unknown")
	age = graphene.Int()
	books = graphene.List(BookType)
	
	def resolve_books(parent, info):
		author_id = parent['author_id']
		return [b for b in books if b['author_id']==author_id]



class RootQuery(graphene.ObjectType):
	book = graphene.Field(BookType, book_id=graphene.ID(required=True))
	
	author = graphene.Field(AuthorType, author_id=graphene.ID(required=True))

	def resolve_book(parent, info, book_id):
		for book in books:
			if book['book_id'] == book_id:
				return book

	def resolve_author(parent, info, author_id):
		for author in authors:
			if author['author_id'] == author_id:
				return author

if __name__ == '__main__':

	schema = graphene.Schema(query=RootQuery)

	book_query = '''
    	query book {
			book(bookId: "1") {
				bookId
				bookName
				genre
				author {
					authorName
					age
				}
			}
		
		}
	'''
	
	author_query = '''
		query author {
			author(authorId: "1") {
				age
				authorId
				authorName
				books {
					bookName
					genre
					bookId
				}
			}
		}

	'''
	
	comb_query = '''
		query comb {
			book(bookId:2){
				bookId
				bookName
				genre
			}
			author(authorId:1){
				authorId
				authorName
				age
			}
		}

	'''

	result = schema.execute(author_query)
	print(result.data)
