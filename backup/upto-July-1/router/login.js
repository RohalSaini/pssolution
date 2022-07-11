// standard module
const Router = require('express').Router;
const check = require('express-validator').check;

// user define module
const loginAdd = require('../controller/login');
const { checkToken} =require('../auth/validation');

const 
    login  = Router()
        .post('/login',[ check('id')
                            .trim()
                            .isLength({ min: 1})
                            .withMessage("entered id field is empty or missing"),
                        check('name')
                            .trim()
                            .isLength({min: 1})
                            .withMessage(" entered name field is empty or missing"),
                        check('imageUrl')
                            .trim()
                            .isLength({min: 1})
                            .withMessage(" entered imageUrl field is empty or missing"),    
                        check('email')
                            .isEmail()
                            .withMessage("enetered email is invalid email format or missing")
                        ],
                        loginAdd
    )
    .get("/login",checkToken,(req,res) => {
        res.status(200).json({
            data : "ok"
        })
    })    
 
module.exports = login;