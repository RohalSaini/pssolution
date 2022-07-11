// standard module
const Router = require('express').Router;
const check = require('express-validator').check;

// user define module
const {add,get} = require('../controller/brand');
const { checkToken} =require('../auth/validation');

const 
    brand  = Router()
        .post('/brand',[
                        check('name')
                            .trim()
                            .isLength({min: 1})
                            .withMessage(" enter brand name!!"),
                        ],
                    add
    )
    .get("/brand",(req,res) => {
        console.log("brand Page");
        res.render("brand");
    })    
 
module.exports = brand;