require("dotenv").config();
const PORT = process.env.PORT || 5000;
const path = require("path");
const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const app = express();

const dashboard = require("./routes/dashboard.route.js");
const authentication = require("./routes/authentication.route.js");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.use(expressLayouts);

app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(cookieParser());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.use("/", dashboard);
app.use("/auth/", authentication);

app.listen(PORT, () => console.log(`Server listening on port ${PORT}...`));
