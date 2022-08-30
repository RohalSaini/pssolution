// standard module
const Router = require("express").Router;
const check = require("express-validator").check;
const { getProduct, getNames, getByType } = require("../controller/getProduct");

// user define module
const { addItem, editItem, findProduct, deleteProduct } = require("../controller/product");
const { checkToken } = require("../auth/validation");
const multer = require("multer");
const brand = require("../modal/brand");
const Product = require("../modal/Product");
const HttpException = require("../util/HttpExceptionError");
//multer options
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
    "/v1/product",
    checkToken,
    (req, res, next) => {
      multerObj(req, res, (err) => {
        console.log(req.body);
        if (err) {
          next(new HttpException(400, `${err}`));
        } else {
          if (req.file == undefined) {
            next(new HttpException(400, `No File Selected!`));
          } else {
            console.log("assests", req.file.filename);
            console.table(req.body);
            // res.json({
            //     msg: 'File Uploaded!',
            //   file: `assets/images/${req.file.filename}`
            // })
            next();
          }
        }
      });
    },
    [
      check("category")
        .trim()
        .isLength({ min: 1 })
        .withMessage("category field is missing !!"),
      check("name")
        .trim()
        .isLength({ min: 1 })
        .withMessage("name field is missing !!"),
      check("quantity")
        .trim()
        .isLength({ min: 1 })
        .withMessage("quantity field is missing !!"),
      check("brand")
        .trim()
        .isLength({ min: 1 })
        .withMessage("brand field is missing !!"),
      check("productId")
        .trim()
        .isLength({ min: 1 })
        .withMessage("productId field is missing !!"),
      check("quantity")
        .trim()
        .isLength({ min: 1 })
        .withMessage("quantity field is missing !!"),
      check("price")
        .trim()
        .isLength({ min: 1 })
        .withMessage("price field is missing !!"),
      check("discount")
        .trim()
        .isLength({ min: 1 })
        .withMessage("discount field is missing !!"),
      check("ourPrice")
        .trim()
        .isLength({ min: 1 })
        .withMessage("ourPrice field is missing !!"),
    ],
    addItem
  )
  .get("/product", async (req, res) => {
    const brands = await brand.findAll();
    var list = Array();
    brands.forEach((value, key) => {
      console.log(value);
      list.push({
        brandId: value.dataValues.id,
        ...value.dataValues,
      });
    });
    console.log(list);
    res.render("product", { brands: list });
  })
  .get("/editproduct", async (req, res) => {
    const brands = await brand.findAll();
    const products = await Product.findAll();
    res.render("edit-product", {
      data: { brands: brands, products: products },
    });
  })
  .get("/viewproduct", async (req, res) => {
    const brands = await brand.findAll();
    const products = await Product.findAll();
    res.render("viewproduct");
  })
  .post(
    "/v1/editproduct",
    checkToken,
    (req, res, next) => {
      multerObj(req, res, (err) => {
        next();
      });
    },
    [
      check("id")
        .trim()
        .isLength({ min: 1 })
        .withMessage("id field is missing !!"),
      check("name")
        .trim()
        .isLength({ min: 1 })
        .withMessage("name field is missing !!"),
      check("price")
        .trim()
        .isLength({ min: 1 })
        .withMessage("price field is missing !!"),
      check("discount")
        .trim()
        .isLength({ min: 1 })
        .withMessage("discount field is missing !!"),
      check("ourPrice")
        .trim()
        .isLength({ min: 1 })
        .withMessage("ourPrice field is missing !!"),
    ],
    editItem
  )
  .get("/v1/allProducts", checkToken,async (request, response) => {
    const products = await Product.findAll();
    var productList = Array();
    products.forEach(async (value, key) => {
      const data = value.dataValues;
      productList.push({ ...data });
    });

    const brands = await brand.findAll();
    // console.log(brands);
    var list = Array();
    brands.forEach(async (value, key) => {
      const data = value.dataValues;
      list.push({ ...data });
    });
    //console.log(list);

    list.forEach((_element) => {
      productList.forEach((__element) => {
        //console.log(_element);
        if (__element.brand == _element.name) {
          //console.log(__element);
          const quantity = JSON.parse(_element.quantity);
          Object.keys(quantity).forEach((key) => {
            if (key == __element.category) {
              //console.log(" element ",quantity[key]," key is ",key) // baz
              const sizeList = quantity[key];
              sizeList.forEach((___element) => {
                if (___element.size == __element.quantity) {
                  if (___element.list) {
                    ___element.list.forEach((_____element) => {
                      if (_____element.productId == __element.id) {
                        console.log("found", _____element);
                        __element.stock = _____element.stock;
                      }
                    });
                  }
                }
              });
            }
          });
        }
      });
    });
    productList = productList.filter(item => item.stock > 0 )
    return response.status(201).json({
      data: {
        productList,
      },
      status: true
    });
  })
  .get("/v1/product",checkToken, async (request, response) => {
    const products = await Product.findAll();
    var productList = Array();
    products.forEach(async (value, key) => {
      const data = value.dataValues;
      productList.push({ ...data });
    });

    const brands = await brand.findAll();
    // console.log(brands);
    var list = Array();
    brands.forEach(async (value, key) => {
      const data = value.dataValues;
      list.push({ ...data });
    });
    //console.log(list);

    list.forEach((_element) => {
      productList.forEach((__element) => {
        //console.log(_element);
        if (__element.brand == _element.name) {
          //console.log(__element);
          const quantity = JSON.parse(_element.quantity);
          Object.keys(quantity).forEach((key) => {
            if (key == __element.category) {
              //console.log(" element ",quantity[key]," key is ",key) // baz
              const sizeList = quantity[key];
              sizeList.forEach((___element) => {
                if (___element.size == __element.quantity) {
                  if (___element.list) {
                    ___element.list.forEach((_____element) => {
                      if (_____element.productId == __element.id) {
                        console.log("found", _____element);
                        __element.stock = _____element.stock;
                      }
                    });
                  }
                }
              });
            }
          });
        }
      });
    });
    return response.status(201).json({
      data: {
        productList,
      },
      status: true
    });
  })
  .get("/v1/getByType", checkToken,async (request, response) => {
    const category = request.query.category;
    if (category) {
      const products = await Product.findAll({
        where: {
          category: category,
        },
      });
      var productList = Array();
      products.forEach(async (value, key) => {
        const data = value.dataValues;
        productList.push({ ...data });
      });

      const brands = await brand.findAll();
      // console.log(brands);
      var list = Array();
      brands.forEach(async (value, key) => {
        const data = value.dataValues;
        list.push({ ...data });
      });
      //console.log(list);

      list.forEach((_element) => {
        productList.forEach((__element) => {
          //console.log(_element);
          if (__element.brand == _element.name) {
            //console.log(__element);
            const quantity = JSON.parse(_element.quantity);
            Object.keys(quantity).forEach((key) => {
              if (key == __element.category) {
                //console.log(" element ",quantity[key]," key is ",key) // baz
                const sizeList = quantity[key];
                sizeList.forEach((___element) => {
                  if (___element.size == __element.quantity) {
                    if (___element.list) {
                      ___element.list.forEach((_____element) => {
                        if (_____element.productId == __element.id) {
                          console.log("found", _____element);
                          __element.stock = _____element.stock;
                        }
                      });
                    }
                  }
                });
              }
            });
          }
        });
      });
      productList = productList.filter(item => item.stock > 0 )
      return response.status(201).json({
        data: {
          productList
        },
        status: true
      });
    } else {
      next(new HttpException(200, " category type is missing !"));
    }
  })
  .get('/search', async (req,res) => {
    res.render('search');
  })
  .post("/v1/search",checkToken,[
    check("name")
      .trim()
      .isLength({ min: 1 })
      .withMessage("name field is missing !!")
  ],
  findProduct
)
.post("/v1/deleteProduct",checkToken,[
  check("id")
    .trim()
    .isLength({ min: 1 })
    .withMessage("id field is missing !!"),
    check("brand")
    .trim()
    .isLength({ min: 1 })
    .withMessage("brand field is missing !!"),
    check("category")
    .trim()
    .isLength({ min: 1 })
    .withMessage("category field is missing !!"),

],
deleteProduct
)


module.exports = item;
