/** @format */

const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
	{
		text: {
			type: String,
			required: true,
		},
		author: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
		}, // this will eventually change
		post: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Post",
		}, //IMPORTANT TO CHECK!!!!!!
	},
	{
		timestamps: true,
	},
);

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
