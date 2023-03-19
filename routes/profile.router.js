/** @format */

const router = require("express").Router();
const isLoggedIn = require("../middleware/isLoggedIn");
const User = require("../models/User.model");
const Post = require("../models/Post.model");
const Comment = require("../models/Comments.model");
const bcrypt = require("bcrypt");
const fileUploader = require("../config/cloudinary.config");

router.get("/", isLoggedIn, (req, res) => {
	res.render("profile/home");
});

router.get("/update-profile", isLoggedIn, fileUploader.single("post-cover-image"), (req, res) => {
	res.render("profile/update-profile", {
		username: req.session.user.username, //check it fail!!!
		email: req.session.user.email,
		location: req.session.user.location,
	});
});

router.post("/update-profile", isLoggedIn, fileUploader.single("post-cover-image"), (req, res) => {
	const { username, email, location } = req.body;

	let imageUrl;
	if (req.file) {
		imageUrl = req.file.path;
	}

	User.findByIdAndUpdate(req.session.user._id, { username, email, location, imageUrl }, { new: true }).then(
		(updatedUser) => {
			// updates the user in the cookie. keeps the user in the db and the user in the session in sync
			req.session.user = updatedUser;
			res.redirect("/profile");
		},
	);
});

router.get("/update-password", isLoggedIn, (req, res) => {
	res.render("profile/update-password");
});

router.post("/update-password", isLoggedIn, (req, res) => {
	const { oldPassword, newPassword } = req.body;

	if (oldPassword === newPassword) {
		res.render("profile/update-password", {
			errorMessage: "For security reasons, please do not use an old password",
		}); //improve the errormessage
		return;
	}

	User.findById(req.session.user._id).then((user) => {
		const arePasswordsTheSame = bcrypt.compareSync(oldPassword, user.password);

		if (!arePasswordsTheSame) {
			return res.render("profile/update-password", {
				errorMessage: "wrong credentials",
			});
		}

		if (newPassword.length < 8 || !/\d/g.test(newPassword)) {
			return res.render("profile/update-password", {
				errorMessage: "Your password must contain 8 characters and at least one number.",
			});
		}

		const saltRounds = 10;
		const salt = bcrypt.genSaltSync(saltRounds);
		const hashPassword = bcrypt.hashSync(newPassword, salt);

		User.findByIdAndUpdate(user._id, { password: hashPassword }, { new: true }).then((updatedUser) => {
			req.session.user = updatedUser;
			res.redirect("/profile");
		});
	});
});

// Let's delete a specific account.
// router.get("/delete-account", isLoggedIn, (req, res) => {
//   User.findByIdAndDelete(req.session.user._id).then(() => {
//     req.session.destroy((errorMessage) => {
//       if (errorMessage) {
//         console.error("err:", errorMessage);
//       }
//       res.redirect("/");
//     });
//   });
// });

router.get("/delete-account", isLoggedIn, async (req, res) => {
	const userId = req.session.user._id;

	await Promise.all([User.findByIdAndDelete(userId), Comment.deleteMany({ user: userId })]);
	const arrOfPostsFromUser = await Post.find({ author: userId });
	const getPostIds = arrOfPostsFromUser.map((e) => e._id);

	await Promise.all([Comment.deleteMany({ post: { $in: getPostIds } }), Post.deleteMany({ _id: { $in: getPostIds } })]);

	req.session.destroy((err) => {
		if (err) {
			console.error("err: ", err);
		}

		res.redirect("/profile");
	});
});

module.exports = router;
