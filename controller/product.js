const HttpException = require("../util/HttpExceptionError");
const validationResult = require("express-validator").validationResult;
const Product = require("../modal/Product");
const Brand = require("../modal/brand");
const { TokenCreation, TokenValdiate } = require("../util/token");
const sequelize = require("sequelize");
const Op = sequelize.Op;
const brand = require("../modal/brand");

const addItem = async (request, response, next) => {
  let errors = validationResult(request);
  if (!errors.isEmpty()) {
    next(new HttpException(200, errors.array()[0].msg));
  } else {
    try {
      console.log(request.body);
      const fileName = request.file.filename;
      const name = request.body.name.trim();
      const category = request.body.category.trim();
      const brand = request.body.brand.trim();
      const productId = request.body.productId.trim();
      const discount = +request.body.discount.trim();
      const quantity = request.body.quantity.trim();
      const price = +request.body.price.trim();
      const ourPrice = +request.body.ourPrice.trim();
      const unique = `${name},${quantity},${category}`;

      const product = await Product.create({
        category,
        brand,
        productId,
        discount,
        quantity,
        price,
        ourPrice,
        name,
        image: fileName,
        unique,
      });
      if (!product) {
        next(new HttpException(200, `Production creation error`));
      } else {
        //console.log(product);
        const brands = await Brand.findAll();
        const listbrands = Array();
        brands.forEach((value, key) => {
          listbrands.push({
            brandId: value.dataValues.id,
            ...value.dataValues,
          });
        });
        listbrands.forEach(async (value, key) => {
          //console.log("update query product " ,product);
          //console.log("update query brand item", value);
          if (value.name == brand) {
            console.log("update query ", value.quantity);
            value.quantity = JSON.parse(value.quantity);
            Object.keys(value.quantity).forEach(async (key) => {
              if (category == key) {
                console.log(" key value is ", value.quantity[key]);
                value.quantity[key].forEach(async (brandObj, index) => {
                  console.log(
                    " before brandObj ",
                    brandObj,
                    " quantity ",
                    quantity,
                    " size ",
                    brandObj.size,
                    quantity === brandObj.size
                  );
                  if (brandObj.size.trim() == quantity.trim()) {
                    console.log(" found brandObj", brandObj);
                    //brandObj.productId = product.dataValues.id;
                    //brandObj.stock = 0;
                    if (brandObj.list == null) {
                      // console.log(" add to brand list");
                      brandObj.list = new Array();

                      brandObj.list.push({
                        productId: product.dataValues.id,
                        stock: 0,
                      });
                    } else {
                      brandObj.list.push({
                        productId: product.dataValues.id,
                        stock: 0,
                      });
                    }
                    console.log(" brand Selected Object ", brandObj);
                    try {
                      console.log("update query");
                      const result = await Brand.update(
                        { quantity: JSON.stringify(value.quantity) },
                        {
                          where: {
                            id: value.id,
                          },
                        }
                      );
                      //console.log(result);
                    } catch (err) {
                      console.log(err);
                      next(
                        new HttpException(
                          200,
                          `Production creation error ${err}`
                        )
                      );
                    }
                  }
                });
              }
            });
          }
        });
        return response.status(201).json({
          data: product,
          status: true,
        });
      }
    } catch (error) {
      next(new HttpException(200, `${error}`));
    }
  }
};

const findProduct = async (request, response, next) => {
  let errors = validationResult(request);
  if (!errors.isEmpty()) {
    next(new HttpException(200, errors.array()[0].msg));
  } else {
    try {
      const name = request.body.name.trim();
      const result = await Product.findAll({
        where: {
          name: { [Op.like]: `${name}%` },
        },
      });
      var productList = Array();
      result.forEach(async (value, key) => {
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
        status: true,
      });
    } catch (err) {
      console.log(err);
      next(new HttpException(200, `Production creation error ${err}`));
    }
  }
};

module.exports = {
  addItem: addItem,
  editItem: async (request, response, next) => {
    let errors = validationResult(request);
    if (!errors.isEmpty()) {
      next(new HttpException(200, errors.array()[0].msg));
    } else {
      const id = +request.body.id.trim();
      const name = request.body.name.trim();
      const discount = +request.body.discount.trim();
      const price = +request.body.price.trim();
      const ourPrice = +request.body.ourPrice.trim();

      console.log(id);
      var image = null;
      try {
        image = request.file.filename;
      } catch (error) {}
      //const image = request.file.filename;
      console.log("file name is ", image);
      if (image) {
        console.log("udating image ", request.file.filename);
        try {
          const result = await Product.update(
            { discount, price, ourPrice, name, image },
            {
              where: {
                id: id,
              },
            }
          );
          console.log(result);
          return response.status(201).json({
            data: result,
          });
        } catch (err) {
          console.log(err);
          next(new HttpException(200, `Production creation error ${err}`));
        }
      } else {
        try {
          const result = await Product.update(
            { discount, price, ourPrice, name },
            {
              where: {
                id: id,
              },
            }
          );
          console.log(result);
          return response.status(201).json({
            data: result,
            status: true,
          });
        } catch (err) {
          console.log(err);
          next(new HttpException(200, `Production creation error ${err}`));
        }
      }
    }
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
        status: true,
      });
    } catch (error) {
      next(new HttpException(200, `Production creation error ${error}`));
    }
  },
  findProduct: findProduct,
  deleteProduct: async (request, response, next) => {
    let errors = validationResult(request);
    if (!errors.isEmpty()) {
      next(new HttpException(200, errors.array()[0].msg));
    } else {
      try {
      const id = request.body.id;
      const name = request.body.name;
      const category = request.body.category;
      const quantityValue = request.body.quantity;
      const brand = request.body.brand;  
      const resultProduct = await Product.destroy({
        where: {
          id: request.body.id,
        },
      });
      if (resultProduct) {
        const brands = await Brand.findAll();
        // console.log(brands);
        var list = Array();
        brands.forEach(async (value, key) => {
          const data = value.dataValues;
          list.push({ ...data });
        });
        //console.log(list);
        let updatedBrand = null
        let updatedQuantity = null
        list.forEach((_element) => {
            //console.log(" ok ",_element);
            if (_element.name == brand) {
              updatedBrand = _element.name
              console.log("found brand ", _element);
              const quantity = JSON.parse(_element.quantity);
              updatedQuantity = quantity
              Object.keys(quantity).forEach((key) => {
                if (key == category) {
                  console.log(" element ",quantity[key]," key is ",key) // baz
                  const sizeList = quantity[key];
                  sizeList.forEach((___element) => {
                    //console.log(" size of ",sizeList);
                    if (___element.size == quantityValue) {
                      //console.log(" size of found ",sizeList);
                      if (___element.list) {
                        console.log(" size of found before ",___element.list);
                        ___element.list = ___element.list.filter(item => item.productId != id);
                        console.log(" size of found after ",___element.list);
                      }
                    }
                  });
                }
              })
            }
          });
         
          const result = await Brand.update(
          { quantity: JSON.stringify(updatedQuantity)},
          { where: { name: updatedBrand } }
        )
        if(result) {
          return response.status(201).json({
            data: {
              id,name,category,quantityValue
            },
            status: true
          });
        }
        else {
          next(new HttpException(200, `error while deleting`));
        }
       
      } else {
        next(new HttpException(200, `error while ${error}`));
      }
    } catch (error) {
      next(new HttpException(200, `Production creation error ${error}`));
    }
   }
  }
}

