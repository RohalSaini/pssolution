const HttpException = require('../util/HttpExceptionError')
const validationResult = require('express-validator').validationResult;
const Order = require('../modal/order');
const {TokenCreation,TokenValdiate} = require('../util/token')

const addOrder = async (request,response,next) => {
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
        const customerid = +request.body.customerid.trim();
        const bill = +request.body.bill.trim();
        const cart = request.body.cart.trim(); 
        const address = request.body.address.trim();

        const order = await Order.create({
           customerid,
           bill,
           cart,
           address
        })
        if(!order) {
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
    addOrder: addOrder,
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