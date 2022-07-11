const HttpException = require('../util/HttpExceptionError')
const validationResult = require('express-validator').validationResult;
const User = require('../modal/User');
const Product = require('../modal/Product');
const Stock = require('../modal/Stock');
const {TokenCreation,TokenValdiate} = require('../util/token')

const addItem = async (request,response,next) => {
    let errors = validationResult(request);
    if(!errors.isEmpty()) {
        next(new HttpException(400,errors.array()[0].msg))
    } else  {
        try {
          console.log("++++++++++++");
          console.log(request.body);
          console.log("++++++++++++");
          //const fileName = `assets/images/${request.file.filename}`
         // console.log("url is ",fileName);
        const discount = +request.body.discount.trim();
        const price = +request.body.price.trim();
        const size = +request.body.size.trim();
        const quantity = request.body.quantity.trim();
        const rating = request.body.rating.trim();
        const itemId = request.body.itemId.trim();
        const sizeItemId = size+","+itemId;

        const stock = await Stock.create({
            discount,
            price,
            size,
            quantity,
            rating,
            itemId,
            sizeItemId
        })

        if(!stock) {
           const discount = +request.body.discount.trim();
        const price = +request.body.price.trim();
        const size = +request.body.size.trim();
        const quantity = request.body.quantity.trim();
        const rating = request.body.rating.trim();
        const itemId = request.body.itemId.trim();
        const sizeItemId = size+","+itemId;

        if(!stock) {
            next(new HttpException(400,`Production creation error`)); 
        } else {
            return response.status(201).json({
                data:stock
            })
        }
        } else {
            return response.status(201).json({
                data:stock
            })
        }
        }catch(error) {
            next(new HttpException(400,`${error}`)); 
        }
        
    }
}

module.exports = {
    addItem: addItem,
    editItem: async (request,response,next) => {
        let errors = validationResult(request);
        if(!errors.isEmpty()) {
            next(new HttpException(400,errors.array()[0].msg))
        } else  {
            const id = +request.body.id.trim();    
            const discount = +request.body.discount.trim();
            const price = +request.body.price.trim();
            const size = +request.body.size.trim();
            const quantity = request.body.quantity.trim();
            const itemId = request.body.itemId.trim();
            const sizeItemId = size+","+itemId;

            console.log(id);
            try {
              const result= await Stock.update({ discount,price,size,quantity,sizeItemId }, {
                  where: {
                    id: id
                  }
                
                });
              console.log(result);
                return response.status(201).json({
                  data:result,
                });
            } catch (err) {
              console.log(err);
                next(new HttpException(400, `Production creation error ${err}`));
            }
        }
    },
    deleteItem: async (request, response, next) => {
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