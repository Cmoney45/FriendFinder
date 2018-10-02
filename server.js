const express = require("express");
const app = express();

const PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

require("./app/routing/htmlRoutes")(app, express);
require("./app/routing/apiRoutes")(app);

app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});
