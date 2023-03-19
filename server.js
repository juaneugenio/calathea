const app = require("./app");

// ℹ️ Sets the PORT for our app to have access to it. If no env has been set, we hard code it to 3000
const PORT = process.env.PORT || 3000;
//declaring a variable called port and the value is
//const PORT = 5000 || 3000;
// environmental variable

app.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${PORT}`);
});
