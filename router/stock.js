// standard module
const Router = require("express").Router;
const check = require("express-validator").check;

const brand = require("../modal/brand");
const product = require("../modal/Product");
const { addStock } = require("../controller/stock");
const { checkToken } = require("../auth/validation");

const stock = Router()
  .get("/stock", async (req, res) => {
    const brands = await brand.findAll();
    console.log(brands);
    // var listbrands = Array();
    // brands.forEach((value, key) => {
    //   console.log(value);
    //   listbrands.push({
    //     brandId: value.dataValues.id,
    //     ...value.dataValues
    //   });
    // });
    const products = await product.findAll();
    // var listProducts = Array();
    // products.forEach((value, key) => {
    //   console.log(value);
    //   listProducts.push({
    //     productId: value.dataValues.id,
    //     ...value.dataValues
    //   });
    // });
    res.render("stock", { data: { brands: brands, products: products } });
  })
  .post("/v1/stock",checkToken,[
      check("brand")
        .trim()
        .isLength({ min: 1 })
        .withMessage("brand field is missing !!"),
      check("productId")
        .trim()
        .isLength({ min: 1 })
        .withMessage("productId field is missing !!"),
      check("category")
        .trim()
        .isLength({ min: 1 })
        .withMessage("category field is missing !!"),
      check("size")
        .trim()
        .isLength({ min: 1 })
        .withMessage("size field is missing !!"),
      check("stock")
        .trim()
        .isLength({ min: 1 })
        .withMessage("stock field is missing !!"),
      check("add")
        .trim()
        .isLength({ min: 1 })
        .withMessage("add field is missing !!"),
    ],
      addStock
  )

module.exports = stock;
