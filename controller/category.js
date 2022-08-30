const HttpException = require("../util/HttpExceptionError");
const validationResult = require("express-validator").validationResult;
const Category = require("../modal/category");
const { TokenCreation, TokenValdiate } = require("../util/token");

const add = async (request, response, next) => {
  //console.log(" Add brand api");
  let errors = validationResult(request);
  if (!errors.isEmpty()) {
    next(new HttpException(400, errors.array()[0].msg));
  } else {
    try {
      console.log("++++++++++++");
      console.log(request.body);
      console.log("++++++++++++");
      const name = request.body.type.trim();
      const category = await Category.create({
        type:name
      });
      if (!type) {
        next(new HttpException(200, `Production creation error`));
      } else {
        return response.status(201).json({
          data: category,
          status: true
        });
      }
    } catch (error) {
      if(error == "SequelizeValidationError: notNull Violation: type.type cannot be null") {
        next(new HttpException(200, "type field is missing or empty !!"));
      }else {
        next(new HttpException(200, `${error}`));
      }      
    }
  }
};

const get = async (request, response, next) => {
  const categorys = await Category.findAll();
  return response.status(201).json({
    data: {
      categorys
    },
    status: true
  });
};
module.exports = {
  add: add,
  get: get
};
