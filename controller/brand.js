const HttpException = require("../util/HttpExceptionError");
const validationResult = require("express-validator").validationResult;
const Brand = require("../modal/brand");
const { TokenCreation, TokenValdiate } = require("../util/token");

const add = async (request, response, next) => {
  //console.log(" Add brand api");
  let errors = validationResult(request);
  if (!errors.isEmpty()) {
    next(new HttpException(200, errors.array()[0].msg));
  } else {
    try {
      console.log("++++++++++++");
      console.log(" I am in controller");
      console.log(JSON.parse(request.body.stock));
      console.log("++++++++++++");
      const name = request.body.name.trim();
      const category = request.body.category.trim();
      const stock = JSON.parse(request.body.stock);
      console.log("++++++++++++");
      console.log("++++++++++++");
      stock[category].forEach( (item,index) => {
        console.log(item,index);
        stock[category][index] = {
          size: item.trim(),
          list : null
        }
      })
      console.log("++++++++++++");
      const brand = await Brand.create({
        name,
        quantity:JSON.stringify(stock),
      });
      if (!brand) {
        next(new HttpException(200, `Production creation error`));
      } else {
        return response.status(201).json({
          data: brand,
          status: true
        });
      }
    } catch (error) {
      if (
        error ==
        "SequelizeValidationError: notNull Violation: brand.image cannot be null"
      ) {
        next(new HttpException(200, ` image file is missing!!`));
      } else if (error == "SequelizeUniqueConstraintError: Validation error") {
        next(
          new HttpException(
            200,
            ` filename or name should be unique , it exists in database before..!!`
          )
        );
      } else {
        next(new HttpException(200, `${error}`));
      }
    }
  }
};

const get = async (request, response, next) => {
  const brands = await Brand.findAll();
  var list = Array();
    brands.forEach((value, key) => {
      //console.log(value);
      list.push({
        brandId: value.dataValues.id,
        ...value.dataValues,
        quantity: JSON.parse(value.dataValues.quantity)
      });
    });
    console.log(list);
  return response.status(201).json({
    data: {
      brands:list
    },
    status: true
  });
};



module.exports = {
  add: add,
  get: get,
  edit: async (request, response, next) => {
    console.log(" Edit brand api");
    let errors = validationResult(request);
    if (!errors.isEmpty()) {
      next(new HttpException(400, errors.array()[0].msg));
    } else {
      try {
        const brand = request.body.brand.trim();
        const quantity = JSON.parse(request.body.quantity.trim());
        // console.log("++++++++++++");
        // console.log(" brand ",brand, " quantity ",quantity);
        // console.log("+++++++++++++");
        const result = await Brand.update(
          { quantity: JSON.stringify(quantity)},
          { where: { name: brand } }
        )
        return response.status(201).json({
          data: {
            result
          },
          status: true
        });
      } catch (error) {
        next(new HttpException(200, `${error}`));
      }
    }
  }
}
