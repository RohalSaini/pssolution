const HttpException = require("../util/HttpExceptionError");
const validationResult = require("express-validator").validationResult;
const Order = require("../modal/order");
const Brand = require("../modal/brand");
const Product = require("../modal/Product");
const { TokenCreation, TokenValdiate } = require("../util/token");

const addOrder = async (request, response, next) => {
  let errors = validationResult(request);
  if (!errors.isEmpty()) {
    next(new HttpException(200, errors.array()[0].msg));
  } else {
    const cart = JSON.parse(request.body.cart);
    let foundBrand = false;
    let foundItemLess = false;
    let errorMsg = null;
    // if cart empty 
    if(cart.length == 0) 
      next(new HttpException(200, "cart is empty add items to cart first"));
    const _products = await Product.findAll();
    var products = Array();
      _products.forEach((value, key) => {
        products.push({
          ...value.dataValues,
        });
    });

    // finding illegal ids 
    var illegalId = Array();
    cart.forEach((_element,key) => {
     // var illegalFound = false;
     illegalId[key] = true;
     console.log("key is ",key);
      products.forEach((__element) => {
         if(_element.id == __element.id) {
           illegalId[key] = false;
         }
      })
    })
    illegalId.forEach((_element) => {
      if(_element) {
        next(new HttpException(200, ` unable id in the stock `));
        return;
      }
    })

    cart.forEach((_element) => {
      if(_element.add == 0) {
        next(new HttpException(200, " Stock of "+ _element.name + " should be more than zero"));
        return;
      }
    })
    
    try {
      console.log("++++++++++++");
      console.log(request.body);
      console.log("++++++++++++");
      //const fileName = `assets/images/${request.file.filename}`
      // console.log("url is ",fileName);
      const customerid = request.body.customerid.trim();
      const bill = +request.body.bill.trim();
      //const cart = JSON.parse(request.body.cart);
      console.log("cart is ", cart);
      const address = request.body.address.trim();
      const orderType = request.body.orderType.trim();
      const name = request.body.name.trim();
      const cell = request.body.cell.trim();

      const order = await Order.create({
        customerid,
        bill,
        cart: JSON.stringify(cart),
        address,
        orderType,
        name,
        cell
      });
      if (!order) {
        next(new HttpException(200, `Production creation error`));
      } else {
        const _brands = await Brand.findAll();
        var brands = Array();
        _brands.forEach((value, key) => {
          brands.push({
            ...value.dataValues,
          });
        });
        //console.log(brands);
        brands.forEach((element) => {
          element.quantity = JSON.parse(element.quantity);
          Object.keys(element.quantity).forEach((key) => {
            console.log(" element ",element.quantity[key]," key is ",key) // baz
            element.quantity[key].forEach((_element) => {
              //console.log(_element);
              if (_element.list) {
                // console.log(_element);
                _element.list.forEach((__element) => {
                  // console.log(__element);
                  cart.forEach((___element) => {
                    if (___element.id == __element.productId) {
                      console.log(" before found", __element);
                      if(foundBrand == false) 
                        foundBrand = true

                      if(__element.stock > ___element.add | __element.stock == ___element.add) {
                        console.log(" before found item greater", ___element);
                        __element.stock -=___element.add;
                      } else if(__element.stock < ___element.add) {
                        console.log(" before found item less", ___element);
                        if(foundItemLess == false) {
                          foundItemLess = true;
                          errorMsg = ___element.name + " has less stock Please lower the stock !!"
                        }
                      }
                      console.log(" after found", __element);
                    }
                  });
                });
              }
            });
          });
        });

       if(foundBrand && foundItemLess == false) {
        console.log(" found Brand ", foundBrand, " foundItem Less ",foundItemLess);
        brands.forEach(async (element) => {
          console.log(element);
          const result = await Brand.update(
            { quantity: JSON.stringify(element.quantity)},
            { where: { id: element.id } }
          )
        })
       } else  {
        console.log(" found Brand ", foundBrand, " foundItem Less ",foundItemLess);
        try {
          const deleteOrder = await Order.destroy({
            where: {
              orderNumber: order.orderNumber
            },
          });
          if(deleteOrder) {
            if(foundItemLess) {
              console.log(" found Brand ", foundBrand, " foundItem Less ",foundItemLess);
              next(new HttpException(200,errorMsg));
              return;
            } else {
              console.log(" found Brand ", foundBrand, " foundItem Less ",foundItemLess);
              next(new HttpException(200, `stock is not alvailable !`));
              return;
            }
          }
        } catch (error) {
          next(new HttpException(200, `error while deletion of illegal order`));
        }
       }

        
        order.cart = JSON.parse(order.cart)
        return response.status(201).json({
          data: order,
          status: true
        });
      }
    } catch (error) {
      next(new HttpException(200, `${error}`));
    }
  }
};

module.exports = {
  addOrder: addOrder,
  cancelOrder:  async (request, response, next) => {
    console.log(request.body);
    const cart = JSON.parse(request.body.cart);
    const result = await Order.update(
      { checked: false },
      { where: { orderNumber: request.body.orderNumber } }
    );
    const _brands = await Brand.findAll();
        var brands = Array();
        _brands.forEach((value, key) => {
          brands.push({
            ...value.dataValues,
          });
        });
        //console.log(brands);
        brands.forEach((element) => {
          element.quantity = JSON.parse(element.quantity);
          Object.keys(element.quantity).forEach((key) => {
            console.log(" element ",element.quantity[key]," key is ",key) // baz
            element.quantity[key].forEach((_element) => {
              //console.log(_element);
              if (_element.list) {
                // console.log(_element);
                _element.list.forEach((__element) => {
                  // console.log(__element);
                  cart.forEach((___element) => {
                    if (___element.id == __element.productId) {
                      console.log(" before found", __element);
                      __element.stock +=___element.add;
                      console.log(" after found", __element);
                    }
                  });
                });
              }
            });
          });
        });

        brands.forEach(async (element) => {
          console.log(element);
          const result = await Brand.update(
            { quantity: JSON.stringify(element.quantity)},
            { where: { id: element.id } }
          )
        })
    return response.status(201).json({
      data: result,
      status: true
    });

    // }catch(error) {
    //   next(new HttpException(400, `Production creation error ${error}`))
    // }
  },
  confirmOrder: async (request, response, next) => {
    console.log(request.body);
    const result = await Order.update(
      { checked: true },
      { where: { orderNumber: request.body.orderNumber } }
    );
    // try {
    //   const stockData= await Stock.destroy({
    //     where: {
    //     id: request.query.name
    //     }
    //   })

    return response.status(201).json({
      data: result,
      status: true
    });

    // }catch(error) {
    //   next(new HttpException(400, `Production creation error ${error}`))
    // }
  },
  deleteItem: async (request, response, next) => {
    console.log(request.query.name);
    if (!request.query.name) {
      next(new HttpException(200, `Enter name field`));
    }
    try {
      const stockData = await Stock.destroy({
        where: {
          id: request.query.name,
        },
      });

      return response.status(201).json({
        data: stockData,
        status: true
      });
    } catch (error) {
      next(new HttpException(200, `Production creation error ${error}`));
    }
  },
};
