const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const rootDir = require("./utils/path");

const app = express();

// set view engine to ejs
app.set("view engine", "ejs");
// set views folder - we are telling express that we want to
// compile dynamic templates with the ejs engine
app.set("views", "views");

const adminData = require("./routes/admin");
const shopRoutes = require("./routes/shop");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(rootDir, "public")));

// "/admin" adding path admin to the router
app.use("/admin", adminData.routes);
app.use(shopRoutes);

app.use((req, res, next) => {
  res.status(404).render("404", { pageTitle: "Page Not Found!" });
});

app.listen(6969, () => {
  console.log("Server running on port 6969");
});
