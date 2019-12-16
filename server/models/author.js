// Create mongodb schema for author
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const authorSchema = new Schema({
	name: String,
	age: Number
	// mongodb will create id automatically
});

module.exports = mongoose.model('Author',authorSchema)
