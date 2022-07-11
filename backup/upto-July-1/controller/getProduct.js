const HttpException = require('../util/HttpExceptionError')
const validationResult = require('express-validator').validationResult;
const User = require('../modal/User');
const Item = require('../modal/Item');
const {TokenCreation,TokenValdiate} = require('../util/token')

const getProduct = async (request,response,next) => {
    const item = await Item.findAll({ include: 'stocks' });
    return response.status(200).json({
        data: {
            item
        }
    })
}

module.exports = {
    getProduct: getProduct,
    getNames :  async (request,response,next) => {
        const item = await Item.findAll();
        return response.status(200).json({
            data: {
                names: item
            }
        })
    },
    getByType: async (request,response,next) => {
        if(request.query.type) {
            const itemData = await Item.findAll({
                where: {
                  type: request.query.type,
                },
                include: 'stocks'
              });
            return response.status(200).json({
                data: {
                    items: itemData
                }
            })
        }else {
            next(new HttpException(400, `Enter type field`))
        }
    },
};