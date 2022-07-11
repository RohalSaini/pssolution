// standard module
const Router = require('express').Router;
const check = require('express-validator').check;

// user define module
const adminLogin = require('../controller/adminLogin');
const {addItem,editItem,deleteItem} = require('../controller/addProduct');
const {addProductItem,editProductItem,deleteProductItem,multerRes} = require('../controller/addProductItem');
const { checkToken} =require('../auth/validation');
const multer = require('multer');
const HttpException = require('../util/HttpExceptionError')
//multer options
const fileStorage = multer.diskStorage({
  destination: (req, res, cb) => {
    cb(null, "assets/images");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const filter = (req, file, cb) => {
  if (
    file.mimetype == "image/png" ||
    file.mimetype == "image/jpeg" ||
    file.mimetype == "image/png"
  ) {
    cb(null, true);
  } else {
    cb('Invalid Image Type',"Images Only");
  }
};

const multerObj = multer({
  storage: fileStorage,
  fileFilter: filter,
}).single("image")



const 
    login  = Router()
        .post('/admin/login',[  check('password')
                            .trim()
                            .isLength({min: 1})
                            .withMessage(" entered password field is empty or missing"), 
                        check('email')
                            .isEmail()
                            .withMessage("enetered email is invalid email format or missing")
                        ],
                        adminLogin
        ).post('/admin/add',checkToken,[
            check('itemId')
                .trim()
                .isLength({min: 1})
                .withMessage("itemId attribute is missing"),
            check('discount')
                .trim()
                .isLength({min: 1})
                .withMessage("discount attribute is missing"),
            check('price')
                .trim()
                .isLength({min: 1})
                .withMessage("price attribute is missing"),
            check('size')
                .trim()
                .isLength({min: 1})
                .withMessage("size name is missing"),    
            check('quantity')
                .trim()
                .isLength({min: 1})
                .withMessage("quantity attribute is missing"),
            check('rating')
                .trim()
                .isLength({min: 1})
                .withMessage("rating attribute is missing")    
        ],addItem)
        .post('/admin/edit',checkToken,[
            check('id')
                .trim()
                .isLength({min: 1})
                .withMessage("id attribute is missing"),
            check('itemId')
                .trim()
                .isLength({min: 1})
                .withMessage("itemId attribute is missing"),
            check('discount')
                .trim()
                .isLength({min: 1})
                .withMessage("discount attribute is missing"),
            check('price')
                .trim()
                .isLength({min: 1})
                .withMessage("price attribute is missing"),
            check('size')
                .trim()
                .isLength({min: 1})
                .withMessage("size name is missing"),    
            check('quantity')
                .trim()
                .isLength({min: 1})
                .withMessage("quantity attribute is missing")
        ],editItem)
        .post('/admin/addProductList',(req, res,next)=> {
            multerObj(req,res,(err) => {
                console.log(req.body)
                if(err){
                    next(new HttpException(400, `${err}`))
                } else {
                  if(req.file == undefined){
                    next(new HttpException(400, `No File Selected!`))
                  } else {
                      console.log("assests",req.file.filename);
                    // res.json({
                    //     msg: 'File Uploaded!',
                    //   file: `assets/images/${req.file.filename}`
                    // })
                    next()
                  }
                }
            })
        },checkToken,[
            check('serialNumber')
                .trim()
                .isLength({min: 1})
                .withMessage("serial number is missing"),
            check('measurement')
                .trim()
                .isLength({min: 1})
                .withMessage("measurement is missing"),
            check('name')
                .trim()
                .isLength({min: 1})
                .withMessage("product name is missing"),    
            check('type')
                .trim()
                .isLength({min: 1})
                .withMessage("product type is missing"),
        ],addProductItem)
        .delete('/admin/productdelete',checkToken,deleteItem)
        .post('/admin/editItem',checkToken,[
            check('id')
                .trim()
                .isLength({min: 1})
                .withMessage("id is missing"),
            check('name')
                .trim()
                .isLength({min: 1})
                .withMessage("name is missing"),
            check('serialNumber')
                .trim()
                .isLength({min: 1})
                .withMessage("serialNumber is missing"),    
            check('type')
                .trim()
                .isLength({min: 1})
                .withMessage("product type is missing"),
            check('measurement')
                .trim()
                .isLength({min: 1})
                .withMessage("measurement is missing"),    
        ],editProductItem)
        .delete('/admin/itemdelete',checkToken,deleteProductItem)
        .post('/upload',(req, res,next) => {
    multerObj(req,res,(err) => {
        console.log(req.body)
        if(err){
            next(new HttpException(400, `${err}`))
        } else {
          if(req.file == undefined){
            next(new HttpException(400, `No File Selected!`))
          } else {
              console.log("assests",req.file.filename);
            // res.json({
            //     msg: 'File Uploaded!',
            //   file: `assets/images/${req.file.filename}`
            // })
            next()
          }
        }
    });     
},[
    check('id')
        .trim()
        .isLength({min: 1})
        .withMessage("id is missing"),
],multerRes)

      
module.exports = login;