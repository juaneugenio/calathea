<!-- @format -->

< CHALATEA APP > Module 2 Week 3 day 1
//MVC - MODEL VIEWS CONTROLER//

3 things for each data property:
Is it required = !
Is it unique = Unique
Is it optional. If so, does it have a default value = ? with Default

## SIGN UP:

--User
name: String ! ✅
email: String ! Unique ✅
password: String ! ✅
image: String ? With Default ✅
location: String ? ✅

<!-- socialMedias: ['linkedin', 'github', 'twitter']? = [] we will decide it later on--> ✅

<!-- jobTitle: String?
cohort: String?
slack: String?
personalSite: String?
jobLocation: String? -->

## PUBLICATIONS/POST:

--Post
image: String ? Optional ✅
title: String? Optional ✅
text: String! ✅
user: User! ✅

hashtag: Hashtag? Optional✅
text: String!

Comments:
text: String!✅
author: User!✅
post: Post!---------????? Important to check cuz it wasn't there ✅
date: Date! ✅

date: Date!✅

---

GET / Home Page ✅

GET / Signup ✅
POST / Signup ✅

<!-- - Martes, 28.09 Done until line 112 GET and POST --Signup-- -->

GET / Login ✅

<!-- - Jueves, 30.09 Done Log in and Log Out. -- -->

POST / Login ✅
GET / Logout ✅

POST / update-profile✅
POST / update-password✅

POST / delete-account✅

GET / profile ✅

GET / see-posts
POST / add-post
POST / edit-post

GET / Profiles/:dynamic-id
GET / Profiles

POST / add-comment

POST / add-image

<!-- GET / map-view IS IT  NECEESSARY????-->

✅

<!-- TODO'S

- Styling de ICON BRAND in Layout.hbs and NavBar
- Styling the SIGNUP hbs with the BOOTSTRAP FORM ✅
- Create folder Profile and their files Home profile, update password and update profile.
- Home Page design with functionality and linking the API.
- Design: Photo searching, Brand design, color consistency.
-Update Profile.hbs => once the button "update profile" has being clicked, we want to see a pop up or redirect it to profile
-Post Issues: Delete post because it's not working. Also, go though all the views> post information and update it.
-->

autentication: through a session. you are how you are
autheritation: show the page.
validation:
