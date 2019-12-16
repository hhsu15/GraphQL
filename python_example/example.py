import graphene

class Query(graphene.ObjectType):
	hello = graphene.String(description="hello world")

	def resolve_hello(self, info):
		return "world"

schema = graphene.Schema(query=Query)

query = '''

	query sayHello {
		hello
	}

'''

result = schema.execute(query)
print(result.data)
