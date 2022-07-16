const HttpException = require('../util/HttpExceptionError')
const validationResult = require('express-validator').validationResult;
const User = require('../modal/User');
const PinCode = require('../modal/PinCode');
const Item = require('../modal/Item');
const {TokenCreation,TokenValdiate} = require('../util/token')

const loginAdd =  async (request,response,next) => {
    let errors = validationResult(request);
    if(!errors.isEmpty()) {
        next(new HttpException(400,errors.array()[0].msg))
    }
    else {
        const names = await Item.findAll();
        console.log("names are");
        console.log(names)
        const id = request.body.id.trim();
        let ids=id
        const name = request.body.name.trim();
        const imageUrl = request.body.imageUrl.trim();
        const email = request.body.email.trim();
        try {
            const user = 
            await User
                    .create({
                        id,
                        name,
                        imageUrl,
                        email
        })
        console.log("data");
        console.log(user);
        if(!user) {
            next(new HttpException(400,"user creation error"))
        }
        const token = TokenCreation({
            id,
            name,
            imageUrl,
            email
        })

        const pinlist =  await PinCode
                .findAll()
        
        if(!pinlist) {
            pinlist=[];
        } 
        
        return response.status(201).json({
            success : true,
            data: {
                email,
                token
            },
            options: {
                pinlist,
                names:names
            }
        })
        }
        catch(error) {
            //next(new HttpException(400,"user creation error in catch"))
            if(error.parent.code === "ER_DUP_ENTRY") {
               const user = await User.findOne({
                where: {
                    id: ids
                }
            })
            const {id,email,name,imageUrl} = user.dataValues;
            const token = TokenCreation({
                id,
                name,
                imageUrl,
                email
            })
    
            const pinlist =  await PinCode
                    .findAll()
            
            if(!pinlist) {
                pinlist=[];
            } 
            
            return response.status(200).json({
                success : true,
                data: {
                    email,
                    token
                },
                options: {
                    pinlist,
                    names:names
                }
            })
        }
    }
}
}
        //         .then(list => {
        //             return response.status(201).json({
        //                 success : true,
        //                 data: {
        //                     email,
        //                     token
        //                 },
        //                 options: {
        //                     pinlist: list,
        //                     item
        //                 }
        //             })
        //         })
        //         .catch(error => {
        //             return response.status(201).json({
        //                 success : true,
        //                 data: {
        //                     email,
        //                     token
        //                 }
        //             })
        //         })
            
        // })
        // .catch((error) => {
        //     console.error("error is",error);
        //     if(error.parent.code === "ER_DUP_ENTRY") {
        //         //next(new HttpException(400,"Duplicate entry"));
        //         // select query from database
        //         console.log("id is ",id);
        //         User.findOne({
        //             where: {
        //                 id: id
        //             }
        //         })
        //         .then(user => {
        //             const {id,email,name,imageUrl} = user.dataValues;
        //             const token = TokenCreation({
        //                 id,
        //                 name,
        //                 imageUrl,
        //                 email
        //             })
        //             Pincode
        //                 .findAll()
        //                 .then(list => {
        //                     return response.status(200).json({
        //                         success : true,
        //                         data: {
        //                             email,
        //                             token
        //                         }
        //                         ,options: {
        //                             pinlist: list,
        //                             items: names
        //                         }

        //                     })
        //                 })
        //                 .catch(error => {
        //                     return response.status(200).json({
        //                         success : true,
        //                         data: {
        //                             email,
        //                             token
        //                         }
        //                     })
        //                 })
                    
        //         })
        //         .catch(error => {
        //             next(new HttpException(400,"error"));  
        //         }) 
        //     }
            //next(new HttpException(400,error)); 
//         })
        
//     }
// }

 module.exports = loginAdd;
// const HttpException = require('../util/HttpExceptionError')
// const validationResult = require('express-validator').validationResult;
// const User = require('../modal/User');
// const PinCode = require('../modal/PinCode');
// const Item = require('../modal/Item');
// const {TokenCreation,TokenValdiate} = require('../util/token')

// const loginAdd =  async (request,response,next) => {
//     let errors = validationResult(request);
//     if(!errors.isEmpty()) {
//         next(new HttpException(400,errors.array()[0].msg))
//     }
//     else {
//         const names = await Item.findAll();
//         console.log("names are");
//         console.log(names)
//         const id = request.body.id.trim();
//         const name = request.body.name.trim();
//         const imageUrl = request.body.imageUrl.trim();
//         const email = request.body.email.trim();

//         User.create({
//             id,
//             name,
//             imageUrl,
//             email
//         }).then((data) => {
//             console.log(data)
//             const token = TokenCreation({
//                 id,
//                 name,
//                 imageUrl,
//                 email
//             })
//             PinCode
//                 .findAll()
//                 .then(list => {
//                     return response.status(201).json({
//                         success : true,
//                         data: {
//                             email,
//                             token
//                         },
//                         options: {
//                             pinlist: list,
//                             item
//                         }
//                     })
//                 })
//                 .catch(error => {
//                     return response.status(201).json({
//                         success : true,
//                         data: {
//                             email,
//                             token
//                         }
//                     })
//                 })
            
//         })
//         .catch((error) => {
//             console.error("error is",error);
//             if(error.parent.code === "ER_DUP_ENTRY") {
//                 //next(new HttpException(400,"Duplicate entry"));
//                 // select query from database
//                 console.log("id is ",id);
//                 User.findOne({
//                     where: {
//                         id: id
//                     }
//                 })
//                 .then(user => {
//                     const {id,email,name,imageUrl} = user.dataValues;
//                     const token = TokenCreation({
//                         id,
//                         name,
//                         imageUrl,
//                         email
//                     })
//                     Pincode
//                         .findAll()
//                         .then(list => {
//                             return response.status(200).json({
//                                 success : true,
//                                 data: {
//                                     email,
//                                     token
//                                 }
//                                 ,options: {
//                                     pinlist: list,
//                                     items: names
//                                 }

//                             })
//                         })
//                         .catch(error => {
//                             return response.status(200).json({
//                                 success : true,
//                                 data: {
//                                     email,
//                                     token
//                                 }
//                             })
//                         })
                    
//                 })
//                 .catch(error => {
//                     next(new HttpException(400,"error"));  
//                 }) 
//             }
//             //next(new HttpException(400,error)); 
//         })
        
//     }
// }

// module.exports = loginAdd;