const HttpException = require('../util/HttpExceptionError')
const validationResult = require('express-validator').validationResult;
const User = require('../modal/User');
const Pincode = require('../modal/PinCode');
const {TokenCreation,TokenValdiate} = require('../util/token')

const adminLogin = (request,response,next) => {
    console.log("ADMIN LOGIN API CALL");
    let errors = validationResult(request);
    if(!errors.isEmpty()) {
        next(new HttpException(400,errors.array()[0].msg))
    } else  {
        const email = request.body.email.trim();
        const password = request.body.password.trim()
        if(email === "admin@admin.com" && password === "admin") {
            const token = TokenCreation({
                email,
                password
            })
            console.log("TOKEN IS ",token);
            console.log("EMAIL is " ,email, "PASSWORD IS " ,password);
            Pincode.bulkCreate([
                { name: 'Aerodrome', pin: 160002 },
                { name: 'Badheri', pin: 160036 },
                { name: 'Behlana', pin: 160003 },
                { name: 'Burail', pin: 160047 },
                { name: 'Dadu Majra Colony', pin: 160014 },

                { name: 'Daria', pin: 160101 },
                { name: 'Dhanas', pin: 160014 },
                { name: 'HalloMajra', pin: 160002 },
                { name: 'High Court', pin: 160001 },
                { name: 'Indl Area', pin: 160001 },

                { name: 'Khuda Alisher', pin: 160001 },
                { name: 'Khuda Lahora', pin: 160012 },
                { name: 'Kishangarh', pin: 160101 },
                { name: 'Maloya', pin: 160025 },
                { name: 'Manimajra', pin: 160101 },

                { name: 'Mauli Jagran', pin: 160102 },
                { name: 'Raipur kalan', pin: 160102 },
                { name: 'Raipur khurad', pin: 160102 },
                { name: 'Ram Darbar', pin: 16002 },
                { name: 'Sector 10', pin: 160011 },

                { name: 'Sector 11', pin: 160011 },
                { name: 'Sector 12', pin: 160012 },
                { name: 'Sector 14', pin: 160014 },
                { name: 'Sector 15', pin: 160015 },
                { name: 'Sector 16', pin: 160015 },

                { name: 'Sector 17', pin: 160017 },
                { name: 'Sector 18', pin: 160018 },
                { name: 'Sector 19', pin: 160019 },
                { name: 'Sector 20', pin: 160020 },
                { name: 'Sector 21', pin: 160021 },
                { name: 'Sector 22', pin: 160022 },
                { name: 'Sector 23', pin: 160023 },
                { name: 'Sector 26', pin: 160019 },
                { name: 'Sector 27', pin: 160019 },
                { name: 'Sector 29', pin: 160030 },
                { name: 'Sector 30', pin: 160030 },
                { name: 'Sector 3', pin: 160003 },
                { name: 'Sector 31', pin: 160030 },
                { name: 'Sector 34', pin: 160022 },
                { name: 'Sector 35', pin: 160035 },
                { name: 'Sector 36', pin: 160036 },
                { name: 'Sector 4', pin: 160014 },
                { name: 'Sector 43', pin: 160043 },
                { name: 'Sector 47', pin: 160047 },
                { name: 'Sector 5', pin: 160015 },
                { name: 'Sector 55', pin: 160055 },
                { name: 'Sector 56', pin: 160055 },
                { name: 'Sector 6', pin: 160001 },
                { name: 'Sector 7', pin: 160019 },
                { name: 'Sector 8', pin: 160009 },
                { name: 'Sector 9', pin: 160009 },

            ]).then(() => { // Notice: There are no arguments here, as of right now you'll have to...
                return Pincode.findAll();
            }).then(pinlist => {
                console.log(pinlist) // ... in order to get the array of user objects
                return response.status(201).json({
                    data: {
                        token
                    },
                    Option: {
                        codelist: pinlist
                    }
                })
            })
            .catch(error => {
                return response.status(201).json({
                    data: {
                        token
                    }
                })
            })    
        }else {
            next(new HttpException(400,"email | password error try again with valid email | password"));  
        }
    }
}

module.exports = adminLogin;