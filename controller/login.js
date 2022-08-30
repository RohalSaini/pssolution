const HttpException = require("../util/HttpExceptionError");
const validationResult = require("express-validator").validationResult;
const User = require("../modal/User");
const PinCode = require("../modal/PinCode");
const Item = require("../modal/Item");
const { TokenCreation, TokenValdiate } = require("../util/token");

const loginAdd = async (request, response, next) => {
  let errors = validationResult(request);
  if (!errors.isEmpty()) {
    next(new HttpException(200, errors.array()[0].msg));
  } else {
    const names = await Item.findAll();
    console.log("names are");
    console.log(names);
    const id = request.body.id.trim();
    let ids = id;
    const name = request.body.name.trim();
    const imageUrl = request.body.imageUrl.trim();
    const email = request.body.email.trim();
    try {
      const user = await User.create({
        id,
        name,
        imageUrl,
        email,
      });
      console.log("data");
      console.log(user);
      if (!user) {
        next(new HttpException(200, "user creation error"));
      }
      const token = TokenCreation({
        id,
        name,
        imageUrl,
        email,
      });

      const pinlist = await PinCode.findAll();

      if (!pinlist) {
        pinlist = [];
      }

      return response.status(201).json({
        success: true,
        data: {
          email,
          token,
        },
        options: {
          pinlist,
          names: names,
        },
        status: true
      });
    } catch (error) {
      //next(new HttpException(400,"user creation error in catch"))
      if (error.parent.code === "ER_DUP_ENTRY") {
        const user = await User.findOne({
          where: {
            id: ids,
          },
        });
        const { id, email, name, imageUrl } = user.dataValues;
        const token = TokenCreation({
          id,
          name,
          imageUrl,
          email,
        });

        const pinlist = await PinCode.findAll();

        if (!pinlist) {
          pinlist = [];
        }

        return response.status(200).json({
          success: true,
          data: {
            email,
            token,
          },
          options: {
            pinlist,
            names: names,
          },
          status: true
        });
      }
    }
  }
};

const createUser = async (request, response, next) => {
  let errors = validationResult(request);
  if (!errors.isEmpty()) {
    next(new HttpException(400, errors.array()[0].msg));
  } else {
    const names = await Item.findAll();
    const id = request.body.id.trim();
    const name = request.body.name.trim();
    const imageUrl = request.body.imageUrl.trim();
    const email = request.body.email.trim();
    try {
      const user = await User.create({
        id,
        name,
        imageUrl,
        email,
      });
      if (!user) {
        next(new HttpException(400, "user creation error"));
      }
      const token = TokenCreation({
        id,
        name,
        imageUrl,
        email,
      });

      const pinlist = await PinCode.findAll();

      if (!pinlist) {
        pinlist = [];
      }

      return response.status(201).json({
        success: true,
        data: {
          email,
          token,
        },
        options: {
          pinlist,
          names: names,
        },
        status: true
      });
    } catch (error) {
      //next(new HttpException(400,"user creation error in catch"))
      if (error.parent.code === "ER_DUP_ENTRY") {
        next(new HttpException(200, "user exist before"));
      }
    }
  }
};

const authenticateUser = async (request, response, next) => {
  let errors = validationResult(request);
  if (!errors.isEmpty()) {
    next(new HttpException(200, errors.array()[0].msg));
  } else {
    const id = request.body.id.trim();
    const email = request.body.email.trim();
    try {
      const user = await User.findOne({
        where: {
          id: id
        },
      });
      if (!user) {
        next(
          new HttpException(
            200,
            " phone number or password incorrect try again with correct values !!"
          )
        );
      }
      if (user.email.trim() != email.trim()) {
        next(new HttpException(200, "phone number / password error"));
        return;
      } else {
        const token = TokenCreation({
            id,
            name:user.id,
            imageUrl:user.imageUrl,
            email:user.email,
        });
        const pinlist = await PinCode.findAll();
        const names = await Item.findAll();
        return response.status(201).json({
            success: true,
            data: {
              email:user.email,
              token,
            },
            options: {
                pinlist:pinlist,
                names: names,
              },
            status: true  
          });
      }
    } catch (error) {
      next(new HttpException(200, "db error"));
    }
  }
};

module.exports = {
  loginAdd: loginAdd,
  createUser: createUser,
  authenticateUser: authenticateUser,
};
