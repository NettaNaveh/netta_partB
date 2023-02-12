const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 8080;
const CRUD_operations = require("./db/CRUD_functions");
const path = require('path');
const fs = require('fs');
const stringify = require('csv-stringify').stringify;
const { parse } = require("csv-parse");
const CSVToJSON = require('csvtojson');
const CreateDB = require('./db/createDB');
const { get } = require("http");

//setup view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static('static'));

// pages routes
app.get('/', (req,res)=>{
    res.render('landing_page');
});

app.get('/order_confirmation', CRUD_operations.manageAndConfirmOrder);

// (req,res)=>{
//     var cart = JSON.parse(req.query.cart);
//
//     res.render('order_confirmation',{
//         V1: 'Netta',
//         V2:"| Your order has been received by the system, we are preparing it for you, You can pick it up from the farm during our business hours, Payment must be made upon collection, Please note, cash payment only!"
//
//     });
// }

app.get('/vegetables',CRUD_operations.getAllVegetables);


app.get('/My_Cart', (req,res)=>{
    var answer = JSON.parse(req.query.cart);
    var sum=0;
    answer.forEach(e=>sum+=Number(e.price));
    res.render('My_Cart',{
        cart: answer,
        sum:sum
    });

});

app.get('/customer_detailes', (req,res)=>{
    res.render('customer_detailes',{
        V1: "Customer details"
    });

});

app.get("/getAllCustomers",CRUD_operations.getAllCustomers );

app.get("/InsertData_Vegtables",CreateDB.InsertData_Vegtables );

app.listen(port, () => {
    console.log("Server is running on port " + port );
});
