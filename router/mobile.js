// standard module
const Router = require('express').Router;
const check = require('express-validator').check;
const {getByType,getByBrand} = require('../controller/mobile');

// user define module
const loginAdd = require('../controller/login');
const { checkToken} =require('../auth/validation');
const {addOrder} = require("../controller/Order");
const 
    mobile  = 
    Router()
        .get("/type",checkToken,getByType)
        .get("/getBybrand",checkToken,getByBrand);
    
module.exports = mobile;