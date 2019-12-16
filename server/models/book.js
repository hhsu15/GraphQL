const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = new Schema({
	name: String,
	genre: String,
	authorId: String,
	// mongodb will create id automatically
});

module.exports = mongoose.model('Book', bookSchema)
