// standard module
const Router = require("express").Router;
const check = require("express-validator").check;
const { getProduct, getNames, getByType, orders } = require("../controller/getProduct");
const sequelize = require("sequelize");
const op = sequelize.Op;
const multer = require("multer");

// user define module
const { addOrder,confirmOrder,cancelOrder } = require("../controller/Order");
const { checkToken } = require("../auth/validation");
const Order = require("../modal/order");
const fileStorage = multer.diskStorage({
  destination: (req, res, cb) => {
    cb(null, "assets/images");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const filter = (req, file, cb) => {
  if (
    file.mimetype == "image/png" ||
    file.mimetype == "image/jpeg" ||
    file.mimetype == "image/png"
  ) {
    cb(null, true);
  } else {
    cb("Invalid Image Type", "Images Only");
  }
};

const multerObj = multer({
  storage: fileStorage,
  fileFilter: filter,
}).single("image");

const item = Router()
  .post(
    "/v1/addOrder",checkToken,(req, res, next) => {
      multerObj(req, res, (err) => {
        //console.log(" ADD ORDER ");
        //console.log(req.body.cart);

        req.body = {...req.body}
        req.body.cart = JSON.stringify(req.body.cart)
        next();
      });
    },
    (req, res, next) => {
      console.log(req.body);
      console.log(" AFTER ADD ORDER ");
      next();
    },
    [
      check("customerid")
        .trim()
        .isLength({ min: 1 })
        .withMessage("entered customerId field is empty or missing"),
      check("name")
        .trim()
        .isLength({ min: 1 })
        .withMessage(" entered name field is empty or missing"),
      check("cell")
        .trim()
        .isLength({ min: 1 })
        .withMessage(" entered cell Number field is empty or missing"),    
      check("bill")
        .trim()
        .isLength({ min: 1 })
        .withMessage(" entered bill field is empty or missing"),
      check("cart")
        .trim()
        .isLength({ min: 1 })
        .withMessage(" entered cart field is empty or missing"),
      check("address")
        .trim()
        .isLength({ min: 1 })
        .withMessage(" entered address field is empty or missing"),
      check("orderType")
        .trim()
        .isLength({ min: 1 })
        .withMessage("entered orderType field is empty or missing"),
    ],
    addOrder
  )
  .post("/order", checkToken, getProduct)
  .get("/getOrders",[
    check("email")
      .trim()
      .isLength({ min: 1 })
      .withMessage("entered email field is empty or missing"),
  ], orders)
  .get("/order", async (req, res) => {
    const orders = await Order.findAll( {
      where: {
        checked: {
          [op.is]: null
        }
     }
    });
    res.render("order", { data: { orders: orders } });
  })
  .post("/v1/confirmOrder",[
    check("orderNumber")
      .trim()
      .isLength({ min: 1 })
      .withMessage("entered orderMuner field is empty or missing"),
    check("customerid")
      .trim()
      .isLength({ min: 1 })
      .withMessage("entered customerId field is empty or missing"),
    check("bill")
      .trim()
      .isLength({ min: 1 })
      .withMessage(" entered nbill field is empty or missing"),
    check("cart")
      .trim()
      .isLength({ min: 1 })
      .withMessage(" entered cart field is empty or missing"),
    check("address")
      .trim()
      .isLength({ min: 1 })
      .withMessage(" entered address field is empty or missing"),
  ],
  confirmOrder
  )
  .post("/v1/cancelOrder",[
    check("orderNumber")
      .trim()
      .isLength({ min: 1 })
      .withMessage("entered orderMuner field is empty or missing"),
    check("customerid")
      .trim()
      .isLength({ min: 1 })
      .withMessage("entered customerId field is empty or missing"),
    check("bill")
      .trim()
      .isLength({ min: 1 })
      .withMessage(" entered nbill field is empty or missing"),
    check("cart")
      .trim()
      .isLength({ min: 1 })
      .withMessage(" entered cart field is empty or missing"),
    check("address")
      .trim()
      .isLength({ min: 1 })
      .withMessage(" entered address field is empty or missing"),
  ],
  cancelOrder
  )
  .get("/customer", async (req, res) => {
    const orders = await Order.findAll( {
      where: {
        checked: {
          [op.is]: true
        }
     }
    });
    res.render("customer", { data: { orders: orders } });
  })
  
module.exports = item;
