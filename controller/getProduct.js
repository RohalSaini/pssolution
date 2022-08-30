const HttpException = require("../util/HttpExceptionError");
const validationResult = require("express-validator").validationResult;
const User = require("../modal/User");
const Item = require("../modal/Item");
const Order = require("../modal/order");

const { TokenCreation, TokenValdiate } = require("../util/token");

const getProduct = async (request, response, next) => {
  const item = await Item.findAll({ include: "stocks" });
  return response.status(200).json({
    data: {
      item,
    },
    status: true,
  });
};

module.exports = {
  getProduct: getProduct,
  getNames: async (request, response, next) => {
    const item = await Item.findAll();
    return response.status(200).json({
      data: {
        names: item,
      },
      status: true,
    });
  },
  getByType: async (request, response, next) => {
    if (request.query.type) {
      const itemData = await Item.findAll({
        where: {
          type: request.query.type,
        },
        include: "stocks",
      });
      return response.status(200).json({
        data: {
          items: itemData,
        },
        status: true,
      });
    } else {
      next(new HttpException(200, `Enter type field`));
    }
  },
  orders: async (request, response, next) => {
    let errors = validationResult(request);
    if (!errors.isEmpty()) {
      next(new HttpException(200, errors.array()[0].msg));
    } else {
      const email = request.body.email;
      try {
        const orders = await Order.findAll({
          where: {
            customerid: email,
          },
        });
        var list = Array();
        orders.forEach((value, key) => {
          list.push({
            ...value.dataValues,
          });
        });
        list.forEach((order) => {
            order.cart = JSON.parse(order.cart)
        })
        return response.status(201).json({
          data: {
            orders: orders,
          },
          status: true,
        });
      } catch (error) {
        next(new HttpException(200, "cannot find orders ", error));
      }
    }
  },
};
