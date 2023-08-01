/** @format */

const mongoose = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const userSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
		// unique: true -> Ideally, should be unique, but its up to you
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
	image: {
		type: String,
		default: "https://res.cloudinary.com/dlfxinw9v/image/upload/v1631037631/default-profile-picture_sohcwq.png",
	},
	location: {
		type: String,
		required: false,
	},
	// socialMedia: { type: Array },         we will decide later on!!!
});

const User = mongoose.model("User", userSchema);

module.exports = User;
