// standard module
const Router = require('express').Router;
const check = require('express-validator').check;

// user define module
const {loginAdd,createUser, authenticateUser} = require('../controller/login');
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
    .post('/createUser',[ check('id')
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
                        createUser
    )
    .post('/authenticateUser',[ check('id')
                            .trim()
                            .isLength({ min: 1})
                            .withMessage("entered id field is empty or missing"),
                        check('email')
                            .isEmail()
                            .withMessage("enetered email is invalid email format or missing")
                        ],
                        authenticateUser
    )
    .get("/login",(req,res) => {
        res.render('login')
    })    
 
module.exports = login;