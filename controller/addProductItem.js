const HttpException = require("../util/HttpExceptionError");
const validationResult = require("express-validator").validationResult;
const User = require("../modal/User");
const Item = require("../modal/Item");
const { TokenCreation, TokenValdiate } = require("../util/token");
const fs = require('fs');
const path = require('path');

const addProductItem = (request, response, next) => {
  let errors = validationResult(request);
  if (!errors.isEmpty()) {
    next(new HttpException(400, errors.array()[0].msg));
  } else {
    const fileName = `assets/images/${request.file.filename}`;
    console.log(fileName);
    const type = request.body.type.trim();
    const name = request.body.name.trim();
    const serialNumber = request.body.serialNumber.trim();
    const measurement = request.body.measurement.trim();
    Item.create({
      type,
      name,
      serialNumber,
      measurement,
    })
      .then((data) => {
        console.log(data);
        return response.status(201).json({
          data,
        });
      })
      .catch((error) => {
        console.log(error);
        next(new HttpException(400, `Production creation error ${error}`));
      });
  }
};

module.exports = {
  addProductItem: async (request, response, next) => {
    let errors = validationResult(request);
    if (!errors.isEmpty()) {
      next(new HttpException(400, errors.array()[0].msg));
    } else {
      const url = `${request.file.filename}`;
      console.log("url ", url);
      const image = request.file.fileName;
      const type = request.body.type.trim();
      const name = request.body.name.trim();
      const serialNumber = request.body.serialNumber.trim();
      const measurement = request.body.measurement.trim();
      Item.create({
        type,
        name,
        serialNumber,
        measurement,
        image: url,
      })
        .then((data) => {
          console.log(data);
          return response.status(201).json({
            data,
          });
        })
        .catch((error) => {
          console.log(error);
          next(new HttpException(400, `Production creation error ${error}`));
        });
    }
  },
  editProductItem: async (request, response, next) => {
    let errors = validationResult(request);
    if (!errors.isEmpty()) {
      next(new HttpException(400, errors.array()[0].msg));
    } else {
      const id = request.body.id.trim();
      const type = request.body.type.trim();
      const name = request.body.name.trim();
      const serialNumber = request.body.serialNumber.trim();
      const measurement = request.body.measurement.trim();
      const item = await Item.findByPk(id);
      try {
        const result = await Item.update(
          { type, name, measurement },
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
        next(new HttpException(400, `Production creation error ${err}`));
      }

      //   Item.create({
      //     type,
      //     name,
      //     serialNumber,
      //     measurement,
      //   })
      //     .then((data) => {
      //       console.log(data);
      //       return response.status(201).json({
      //         data,
      //       });
      //     })
      //     .catch((error) => {
      //       console.log(error);
      //       next(new HttpException(400, `Production creation error ${error}`));
      //     });
    }
  },
  deleteProductItem: async (request, response, next) => {
    console.log(request.query.name);
    try {
      const itemData = await Item.destroy({
        where: {
          id: request.query.name,
        },
      });

      return response.status(201).json({
        data: itemData,
      });
    } catch (error) {
      next(new HttpException(400, `Production creation error ${error}`));
    }
  },
  multerRes: async (request, response, next) => {
    let errors = validationResult(request);
    if (!errors.isEmpty()) {
      next(new HttpException(400, errors.array()[0].msg));
    } else {
      const id = request.body.id.trim();
      
      

      const item = await Item.findByPk(id);
      const image = `${request.file.filename}`;
      const imagePath = `${item.image}`;
    
      try {
        const result = await Item.update(
          { image },
          {
            where: {
              id: id,
            },
          }
        );
        console.log(result);

        path.join(__dirname, "assets")
        try {
          fs.unlinkSync(path.join(__dirname,'../', "assets","images",imagePath));
          //file removed
        } catch (err) {
          console.error(err);
        }
        return response.status(201).json({
          data: result,
        });
      } catch (err) {
        console.log(err);
        next(new HttpException(400, `Production creation error ${err}`));
      }
    }
  },
};
