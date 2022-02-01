const express = require("express");
const exphbs = require("express-handlebars");
const path = require("path");
const session = require('express-session');
const flash = require("connect-flash");
const mysqlStore = require('express-mysql-session');
const {database} = require('./keys');
const passport = require('passport');

//initializations
const app = express();
const PORT = 4000;
require('./libs/passport');

//settings
app.set("port", PORT);
app.set("views", path.join(__dirname, "views"));
app.engine(
  ".hbs",
  exphbs.engine({
    defaultLayout: "main",
    layoutsDir: path.join(app.get("views"), "layouts"),
    patialsDir: path.join(app.get("views"), "partials"),
    extname: ".hbs",
    helpers: require("./libs/handlebars"),
  })
);
app.set("view engine", ".hbs");

//middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(session({
  secret: 'chamolmysqlnodesession',
  resave: false,
  saveUninitialized: false,
  store: new mysqlStore(database)
}));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

//global variables
app.use((req, res, next) => {
  app.locals.success = req.flash("success");
  app.locals.fail = req.flash('fail');
  app.locals.user = req.user;
  app.locals.linkedIn = new URL(req.url, 'https://www.linkedin.com/in/victor-vargas-b25916223');
  next();
});


//routes
app.use(require("./routes"));
app.use(require("./routes/authentication"));
app.use("/links", require("./routes/links"));

//Public
app.use(express.static(path.join(__dirname, "public")));

//Starting server
app.listen(app.get("port"), () => {
  console.log(`Server on port: ${PORT}`);
});
