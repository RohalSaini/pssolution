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
const category = require("./router/category");
const product = require("./router/product");
const PinCode = require("./modal/PinCode");
const stock = require("./router/stock");
const dashboard = require("./router/dashboard");
const mobile = require("./router/mobile");
const order = require("./router/order");


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
  .use("/images", express.static("assets"))
  .use("/js", express.static("js"))
  .use(express.static(path.join(__dirname, "assets")))
  .use(bodyParser.json())
  .use(login)
  .use(brand)
  .use(order)
  .use(product)
  .use(stock)
  .use(dashboard)
  .use(mobile)
  .use(error);
PinCode.bulkCreate([
  { name: "Aerodrome", pin: 160002 },
  { name: "Badheri", pin: 160036 },
  { name: "Behlana", pin: 160003 },
  { name: "Burail", pin: 160047 },
  { name: "Dadu Majra Colony", pin: 160014 },

  { name: "Daria", pin: 160101 },
  { name: "Dhanas", pin: 160014 },
  { name: "HalloMajra", pin: 160002 },
  { name: "High Court", pin: 160001 },
  { name: "Indl Area", pin: 160001 },

  { name: "Khuda Alisher", pin: 160001 },
  { name: "Khuda Lahora", pin: 160012 },
  { name: "Kishangarh", pin: 160101 },
  { name: "Maloya", pin: 160025 },
  { name: "Manimajra", pin: 160101 },

  { name: "Mauli Jagran", pin: 160102 },
  { name: "Raipur kalan", pin: 160102 },
  { name: "Raipur khurad", pin: 160102 },
  { name: "Ram Darbar", pin: 16002 },
  { name: "Sector 10", pin: 160011 },

  { name: "Sector 11", pin: 160011 },
  { name: "Sector 12", pin: 160012 },
  { name: "Sector 14", pin: 160014 },
  { name: "Sector 15", pin: 160015 },
  { name: "Sector 16", pin: 160015 },

  { name: "Sector 17", pin: 160017 },
  { name: "Sector 18", pin: 160018 },
  { name: "Sector 19", pin: 160019 },
  { name: "Sector 20", pin: 160020 },
  { name: "Sector 21", pin: 160021 },
  { name: "Sector 22", pin: 160022 },
  { name: "Sector 23", pin: 160023 },
  { name: "Sector 26", pin: 160019 },
  { name: "Sector 27", pin: 160019 },
  { name: "Sector 29", pin: 160030 },
  { name: "Sector 30", pin: 160030 },
  { name: "Sector 3", pin: 160003 },
  { name: "Sector 31", pin: 160030 },
  { name: "Sector 34", pin: 160022 },
  { name: "Sector 35", pin: 160035 },
  { name: "Sector 36", pin: 160036 },
  { name: "Sector 4", pin: 160014 },
  { name: "Sector 43", pin: 160043 },
  { name: "Sector 47", pin: 160047 },
  { name: "Sector 5", pin: 160015 },
  { name: "Sector 55", pin: 160055 },
  { name: "Sector 56", pin: 160055 },
  { name: "Sector 6", pin: 160001 },
  { name: "Sector 7", pin: 160019 },
  { name: "Sector 8", pin: 160009 },
  { name: "Sector 9", pin: 160009 },
])
  .then(() => {
    console.log(" sector are added")
  })
  .catch(error => {
    console.log(" sector are not added")
  })

sequelize
  //.sync({ force: true })
   //.sync({alter:true})
  .sync()
  .then((result) => {
    app.listen(8080, function (error) {
      if (error) throw error;
    });
  })
  .catch((error) => {
    throw new Error(error.message);
  });