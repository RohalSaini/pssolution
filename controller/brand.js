const HttpException = require('../util/HttpExceptionError')
const validationResult = require('express-validator').validationResult;
const Brand = require('../modal/brand');
const {TokenCreation,TokenValdiate} = require('../util/token')

const add = async (request,response,next) => {
    let errors = validationResult(request);
    if(!errors.isEmpty()) {
        next(new HttpException(400,errors.array()[0].msg))
    } else  {
        try {
          console.log("++++++++++++");
          console.log(request.body);
          console.log("++++++++++++");
        const name = +request.body.name.trim();

        const brand = await Brand.create({
           name
        })
        if(!brand) {
            next(new HttpException(400,`Production creation error`)); 
        } else {
            return response.status(201).json({
                data:order
            })
        }
        }catch(error) {
            next(new HttpException(400,`${error}`)); 
        }
        
    }
}

module.exports = {
    add: add,
    get: async (request, response, next) => {
        console.log(request.query.name)
        if(!request.query.name) {
          next(new HttpException(400, `Enter name field`))
        }
        try {
          const stockData= await Stock.destroy({
            where: {
            id: request.query.name
            }
          })
    
          return response.status(201).json({
            data:stockData
          });
    
        }catch(error) {
          next(new HttpException(400, `Production creation error ${error}`))
        } 
      }, 
}