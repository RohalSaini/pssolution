// standard module
const Router = require("express").Router;
const check = require("express-validator").check;

// user define module
const { add, get,edit } = require("../controller/brand");
const { checkToken } = require("../auth/validation");
const multer = require("multer");
const BrandClass = require("../modal/brand");
const HttpException = require("../util/HttpExceptionError");

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

const brand = Router()
  .post(
    "/v1/brand",
    checkToken,
    (req, res, next) => {
      multerObj(req, res, (err) => {
        console.log(req.body);
        console.log(req.body.stock);
        req.body.stock = JSON.stringify(req.body.stock);
        next();
      });
    },
    [
      check("name")
        .trim()
        .isLength({ min: 1 })
        .withMessage("name field is missing !!"),
      check("stock")
        .trim()
        .isLength({ min: 1 })
        .withMessage("stock field is missing !!"),
      check("category")
        .trim()
        .isLength({ min: 1 })
        .withMessage("category field is missing !!"),        
    ],
    add
  )
  .get("/brand", (req, res) => {
    res.render("brand");
  })
  .get("/editBrand", async (req, res) => {
    const brands = await BrandClass.findAll();
    var list = Array();
    brands.forEach((value, key) => {
      //console.log(value);
      list.push({
        brandId: value.dataValues.id,
        ...value.dataValues
      });
    });
    console.log(list);
    res.render("editbrand", { brands: list });
  })
  .post("/v1/editbrand",checkToken,[
    check("brand")
      .trim()
      .isLength({ min: 1 })
      .withMessage("brand field is missing !!"),
    check("quantity")
      .trim()
      .isLength({ min: 1 })
      .withMessage("quntity field is missing !!"), 
  ],edit
  )
  .get("/v1/brands",checkToken, get);

module.exports = brand;
