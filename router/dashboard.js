// standard module
const Router = require("express").Router;
const check = require("express-validator").check;

// user define module
const loginAdd = require("../controller/login");
const { checkToken } = require("../auth/validation");

const brand = require("../modal/brand");
const product = require("../modal/Product");

const dashboard = Router().get("/", async (req, res) => {
  const brands = await brand.findAll();
  const products = await product.findAll();
  res.render("dash", { data: { brands: brands, products: products } });
});
module.exports = dashboard;
