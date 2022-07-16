// standard module
const Router = require('express').Router;
const check = require('express-validator').check;


// user define module
const loginAdd = require('../controller/login');
const { checkToken} =require('../auth/validation');


// for testing
const Item = require('../modal/Item');

const 
    views  = Router()
    .get("/admin/addItem",(req,res) => {
        res.render('addItem');
    })
    .get('/addProductList/',(req,res) => {
        res.render('addProductList')
    })
    .get('/dashboard/', async (req,res) => {
        const item = await Item.findAll({ include: 'stocks' });
        var list = Array();
        item.forEach(async (value, key)=>{
            const id = value.dataValues.id;
            const serialNumber = value.dataValues.serialNumber;
            const name = value.dataValues.name;
            const measurement = value.dataValues.measurement;
            const type = value.dataValues.type;
            const stocks = value.dataValues.stocks;
            var stockList = Array();
            stocks.forEach((value,key) => {
                const stockId = value.dataValues.id;
                const discount = value.dataValues.discount;
                const price = value.dataValues.price;
                const quantity = value.dataValues.quantity;
                const rating = value.dataValues.rating;
                const size = value.dataValues.size;
                stockList.push(
                    {
                        stockId,
                        discount,
                        price,
                        quantity,
                        rating,
                        size
                    }
                )
            })
            list.push(
                {
                    id,
                    serialNumber,
                    name,
                    measurement,
                    type,
                    stock:stockList
                }
            )
            
        });
        console.log(list);
        res.render('dashboard', { login: list })
    })
    .get('/add/',(req,res) => {
        res.render('add')
    })
    .post('/editItem',(req,res) => {
        res.render('editProductList')
    })
    .get('/viewProduct/', async (req,res) => {
        const item = await Item.findAll();
        //const items = item.getItem();
        console.log("Items are ");
        console.log("+++++++++");
        console.log(item);
        console.log("+++++++");
        var list = Array();
        item.forEach((value, key)=>{
            const id = value.dataValues.id;
            const serialNumber = value.dataValues.serialNumber;
            const name = value.dataValues.name;
            const measurement = value.dataValues.measurement;
            const type = value.dataValues.type;
            list.push(
                {
                    id,
                    serialNumber,
                    name,
                    measurement,
                    type
                }
            )
        });
        res.render('view_product', { login: list })
    })
    .get('/insert/',async (req,res) => {
        const item = await Item.findAll();
        //const items = item.getItem();
        console.log("Items are ");
        console.log("+++++++++");
        console.log(item);
        console.log("+++++++");
        var list = Array();
        item.forEach((value, key)=>{
            const id = value.dataValues.id;
            const serialNumber = value.dataValues.serialNumber;
            const name = value.dataValues.name;
            const measurement = value.dataValues.measurement;
            const type = value.dataValues.type;
            list.push(
                {
                    id,
                    serialNumber,
                    name,
                    measurement,
                    type
                }
            )
        });
       res.render('insert', { login: list })
       //res.render('insert',{ title: 'Hey', message: 'Hello there!'})
    })
    .get('/changeImage/',async (req,res) => {
        const item = await Item.findAll();
        //const items = item.getItem();
        console.log("Items are ");
        console.log("+++++++++");
        console.log(item);
        console.log("+++++++");
        var list = Array();
        item.forEach((value, key)=>{
            const id = value.dataValues.id;
            const serialNumber = value.dataValues.serialNumber;
            const name = value.dataValues.name;
            const measurement = value.dataValues.measurement;
            const type = value.dataValues.type;
            const image = value.dataValues.image;
            list.push(
                {
                    id,
                    serialNumber,
                    name,
                    measurement,
                    type,
                    image
                }
            )
        });
       res.render('change', { login: list })
       //res.render('insert',{ title: 'Hey', message: 'Hello there!'})
    })
    
module.exports = views;