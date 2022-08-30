const HttpException = require('../util/HttpExceptionError')
const validationResult = require('express-validator').validationResult;
const Brand = require('../modal/brand');
const Product = require('../modal/Product');
const {TokenCreation,TokenValdiate} = require('../util/token')

module.exports = {
    getByType: async (request,response,next) => {
        if(request.query.type) {
            const products = await Product.findAll({
                where: {
                  category: request.query.type,
                }
            });
            var productList = Array();
            products.forEach(async (value, key)=>{
              const data = value.dataValues;
              productList.push( {...data} )
            });

            const brands = await Brand.findAll();
            // console.log(brands);
            var list = Array();
            brands.forEach(async (value, key)=>{
              const data = value.dataValues;
              list.push( {...data} )
            });    
            //console.log(list);
            
            list.forEach((_element) => {
              productList.forEach((__element) => {
                //console.log(_element);
                if(__element.brand == _element.name) {
                  //console.log(__element);
                  const quantity = JSON.parse(_element.quantity);
                  Object.keys(quantity).forEach((key) => {
                    if(key == __element.category) {
                      //console.log(" element ",quantity[key]," key is ",key) // baz
                      const sizeList = quantity[key];
                      sizeList.forEach((___element) => {
                        if(___element.size.trim() == __element.quantity) {
                          if(___element.list) {
                            ___element.list.forEach((_____element) => {
                              if(_____element.productId == __element.id) {
                                  console.log( "found",_____element);
                                  __element.stock = _____element.stock;
                                  if(_____element.stock > 0) {
                                      productList.pop();
                                  }
                              } 
                            })
                          }
                        }
                      })
                    }
                  });
                }
              })
            })
            return response.status(200).json({
              data: {
                productList
              },
              status: true
            });
        }else {
            next(new HttpException(200, `Enter type field`))
        }
    },
    getByBrand: async (request,response,next) => {
        if(request.query.type) {
            const products = await Product.findAll({
                where: {
                  brand: request.query.type,
                }
            });
            var productList = Array();
            products.forEach(async (value, key)=>{
              const data = value.dataValues;
              productList.push( {...data} )
            });

            const brands = await Brand.findAll();
            // console.log(brands);
            var list = Array();
            brands.forEach(async (value, key)=>{
              const data = value.dataValues;
              list.push( {...data} )
            });    
            //console.log(list);
            
            list.forEach((_element) => {
              productList.forEach((__element) => {
                //console.log(_element);
                if(__element.brand == _element.name) {
                  //console.log(__element);
                  const quantity = JSON.parse(_element.quantity);
                  Object.keys(quantity).forEach((key) => {
                    if(key == __element.category) {
                      //console.log(" element ",quantity[key]," key is ",key) // baz
                      const sizeList = quantity[key];
                      sizeList.forEach((___element) => {
                        if(___element.size == __element.quantity) {
                          if(___element.list) {
                            ___element.list.forEach((_____element) => {
                              if(_____element.productId == __element.id) {
                                  console.log( "found",_____element);
                                  __element.stock = _____element.stock;
                                  if(_____element.stock == 0) {
                                      productList.pop();
                                  }
                              } 
                            })
                          }
                        }
                      })
                    }
                  });
                }
              })
            })
            return response.status(200).json({
              data: {
                productList
              },
              status: true
            });
        }else {
            next(new HttpException(200, `Enter type field`))
        }
    },
};