// standard module
const Router = require('express').Router;
const check = require('express-validator').check;
const {getProduct,getNames,getByType} = require('../controller/getProduct');

// user define module
const loginAdd = require('../controller/login');
const { checkToken} =require('../auth/validation');

const 
    item  = 
    Router()
        .get("/items",checkToken,getProduct)
        .get("/name",checkToken,getNames)
    
module.exports = item;