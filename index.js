// standard module
const express = require("express");
const path = require("path");
const app = express();
require("dotenv").config();
const bodyParser = require("body-parser");
const multer = require("multer");

// modal for databases
const Item = require("./modal/Item");
const Stock = require("./modal/Stock");
const sequelize = require("./config/Db");
const login = require("./router/login");
//const admin = require("./router/admin");
//const views = require("./router/view");
//const items = require("./router/item");
const brand = require("./router/brand");

// centeerizelized error
const error = require("./middleware/error");

app
  .set("views", "./views")
  .set("view engine", "pug")
  
  .use((req, res, next) => {
    res.append("Access-Control-Allow-Origin", req.headers.origin || "*");
    res.append("Access-Control-Allow-Credentials", "true");
    res.append("Access-Control-Allow-Methods", [
      "GET",
      "OPTIONS",
      "PUT",
      "POST",
      "DELETE",
    ]);
    res.append(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  })
  .use(
    bodyParser.urlencoded({
      extended: true,
    })
  )
  
  .use('/images', express.static('assets'))
  .use(express.static(path.join(__dirname, "assets")))
  .use(bodyParser.json())
  .use(login)
  .use(brand)
  .use(error)
  .get("/", (req, res, next) => {
    res.render("dash");
  })  
// sequelize
//   //.sync({ force: true })
//    //.sync({alter:true})
//   .sync()
//   .then((result) => {
//     app.listen(8080, function (error) {
//       if (error) throw error;
//     });
//   })
//   .catch((error) => {
//     throw new Error(error.message);
//   });

 app.listen(process.env.PORT, function (error) {
          if (error) throw error;
  });