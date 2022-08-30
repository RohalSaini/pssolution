const HttpException = require("../util/HttpExceptionError");
const validationResult = require("express-validator").validationResult;
const Brand = require("../modal/brand");
const { TokenCreation, TokenValdiate } = require("../util/token");

module.exports = {
  addStock: async (request, response, next) => {
    let errors = validationResult(request);
    if (!errors.isEmpty()) {
      next(new HttpException(400, errors.array()[0].msg));
    } else {
      //console.log(" stock Controller");
      var status = false;
      var udpated = null;
      var id = null;
      const obj = {
        brand: request.body.brand.trim(),
        productId: +request.body.productId.trim(),
        size: request.body.size.trim(),
        add: +request.body.add.trim(),
        stock: +request.body.stock.trim(),
        category: request.body.category.trim(),
      };
      var brands = await Brand.findAll();
      const listbrands = Array();
      brands.forEach((value, key) => {
        listbrands.push({
          brandId: value.dataValues.id,
          ...value.dataValues,
        });
      });
      listbrands.forEach(async (item, key) => {
        //console.log(item);
        //console.log(obj);
        if (item.name == obj.brand) {
          //console.log("found name");
          item.quantity = JSON.parse(item.quantity);
          Object.keys(item.quantity).forEach(async (key) => {
            if (obj.category == key) {
              item.quantity[key].forEach(async (brandObj, index) => {
                //console.log(" brandObj  ", brandObj, " finding product id",obj.productId ," size is ",obj.size);
                // if (
                //   brandObj.size == obj.size &
                //   brandObj.productId == obj.productId &
                //   brandObj.stock == obj.stock
                // ) {
                //   //console.log(" before update brandObj  ", brandObj);
                //   brandObj.stock = obj.add;
                //   status = true;
                //   udpated = item.quantity;
                //   id = item.id;
                //   //console.log(" after update brandObj  ", brandObj);
                // }
                if(brandObj.size.trim() == obj.size.trim()) {
                  // console.log(" before update brandObj  ", brandObj);
                  brandObj.list.forEach((__element) => {
                    if(__element.productId == obj.productId) {
                      console.log(__element);
                      status = true;
                      __element.stock += obj.add ;
                      udpated = item.quantity;
                      id = item.id;
                    }
                  })
                }
              });
            }
          });
        }
      });
      if (status) {
        try {
          console.log("update query for stock ");
          console.log(" object  ",udpated);
          const result = await Brand.update(
            { quantity: JSON.stringify(udpated)}, {
              where: {
                id: id,
              },
            }
          );
          console.log(result);
          return response.status(201).json({
            data: result,
            status: true
          });
        } catch (err) {
          console.log(err);
          next(new HttpException(200, `updation stock error ${err}`));
        }
      } else {
        next(new HttpException(200, `Cannot find product`));
      }
    }
  },
};
