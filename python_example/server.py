from flask import Flask, render_template, jsonify
from flask_graphql import GraphQLView
from schema import schema

app = Flask(__name__)
app.add_url_rule('/graphql', view_func=GraphQLView.as_view('graphql', schema=schema, graphiql=True))


@app.route("/", methods=['GET'])
def index():
	return "hello there"


if __name__ == '__main__':
	app.run(debug=True)
