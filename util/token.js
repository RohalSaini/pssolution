const jwt = require('jsonwebtoken');
const secret = "qwe1234";

function tokenCreation(data) {
    return jsontoken = jwt.sign(
        { 
            data 
        }, 
            secret, {
                expiresIn: "1h"
        });
}

function validateToken(token) {
    //console.log("TOKEN is ",token);
    return status = jwt.verify(token, secret, function(err, decoded) {
        if(decoded) {
            return decoded;
        }
        else {
            return null;
        }
      });
}


module.exports = {
    TokenCreation: tokenCreation,
    TokenValdiate: validateToken
}