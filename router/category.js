// standard module
const Router = require("express").Router;
const check = require("express-validator").check;

// user define module
const { add, get } = require("../controller/category");
const { checkToken } = require("../auth/validation");
const HttpException = require('../util/HttpExceptionError')


const category = Router()
  .post(
    "/v1/type/add",[
        check("type")
          .trim()
          .isLength({ min: 1 })
          .withMessage("type field is missing !!")
      ],
    add
  )
  .get("/type", (req, res) => {
    res.render("category");
  })
  .get('/v1/types',get);

module.exports = category;
