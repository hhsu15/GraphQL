import graphene

class RootQuery(graphene.ObjectType):
	username = graphene.String(
		description="the name",
		name=graphene.String(default_value='stranger'))

	def resolve_username(root, info, name):
		print(root)
		print(info)
		return f"Hello, {name}!"


if __name__ == '__main__':

	schema = graphene.Schema(query=RootQuery)

	query = '''
    	query whoIsUser {user}
	'''

	result = schema.execute(query)
	print(result.data)
