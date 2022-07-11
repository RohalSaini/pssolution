// standard module
const Router = require("express").Router;
const check = require("express-validator").check;
const { getProduct, getNames, getByType } = require("../controller/getProduct");

// user define module
const {addOrder} = require("../controller/Order");
const { checkToken } = require("../auth/validation");

const item = Router()
  .post(
    "/addOrder",
    [
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
    ],addOrder
  )
  .post("/order", checkToken, getProduct)
  .get("/order", checkToken, getNames);

module.exports = item;
