const { TokenValdiate } = require("../util/token");
const HttpException = require('../util/HttpExceptionError');

module.exports = {
  checkToken: (req, res, next) => {
    let token = req.get("authorization");
    if (token) {
      // Remove Bearer from string
      token = token.slice(7);
      //console.log("token is ", token);
      const decoded = TokenValdiate(token)
      //console.log("decoded is",decoded);
      if (decoded!=null) {
          //console.log("decoded is",decoded);
         req.decoded = decoded;
         next();
       } else {
         //console.log("decoded is null",decoded);
         next(new HttpException(200,"Access Denied! Unauthorized User"));
       }
     }else {
      next(new HttpException(200,"token is missing"));
     }
  },
};
