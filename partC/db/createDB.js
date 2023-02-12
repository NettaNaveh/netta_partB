
const path = require('path');
const csv = require('csvtojson');
const sql = require("./db");


//create tables
const CreateCustomersTable = (req,res)=> {
    const Q1 = "CREATE TABLE Customers (CustomerId int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT, firstName varchar(255) NOT NULL, lastName varchar(255) NOT NULL, email varchar(255) NOT NULL)";
    SQL.query(Q1,(err,mySQLres)=>{
        if (err) {
            console.log("error ", err);
            res.status(400).send({message: "error in creating users table"});
            return;
        }
        console.log('created Customers table');
        res.send("Customers table created");
        return;
    })
}

const CreateVegtablesTable = (req,res)=> {
    const Q2 = "CREATE TABLE Vegtables (VegtableId int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT, name varchar(255) NOT NULL, price integer NOT NULL, category varchar(255) NOT NULL, image nvarchar(100))";
    SQL.query(Q2,(err,mySQLres)=>{
        if (err) {
            console.log("error ", err);
            res.status(400).send({message: "error in creating vegtables table"});
            return;
        }
        console.log('created Vegtables table');
        res.send("Vegtables table created");
        return;
    })
}


//insert data
const InsertData_Customers = (req,res)=>{
    var Q3 = "INSERT INTO Customers SET ?";
    const csvFilePath= path.join(__dirname, "CustomersData.csv");
    csv()
    .fromFile(csvFilePath)
    .then((jsonObj)=>{
    console.log(jsonObj);
    jsonObj.forEach(element => {
        var NewEntry = {
            "firstName": req.body.firstName,
            "lastName": req.body.lastName,
            "email": req.body.email,
        };
        sql.query(Q3, NewEntry, (err,mysqlres)=>{
            if (err) {
                console.log("error in inserting data", err);
                res.render('CrushView',{GetMsg: "There was a problem adding a new user "+err});
                return;
            }
            console.log("created row sucssefuly ");
        });
    });
    })
    res.render('CrushView',{GetMsg: "The data was inserted successfully"});
};

const InsertData_Vegtables = (req,res)=>{
    var Q4 = "INSERT INTO Vegtables SET ?";
    const csvFilePath= path.join(__dirname, "VegtablesData.csv");
    csv()
    .fromFile(csvFilePath)
    .then((jsonObj)=>{
    console.log(jsonObj);
    jsonObj.forEach(element => {
        var NewItemEntry = {
            "name": element.name,
            "price": element.price,
            "category": element.category,
            "image": element.image
        }
        console.log("try insert item: " + NewItemEntry);
        sql.query(Q4, NewItemEntry, (err,mysqlres)=>{
            if (err) {
                console.log("error in inserting data into Vegtables table", err);
            }
            console.log("created row sucssefuly in Vegtables table " + mysqlres);
        });
    });
    })
   // res.send("data read in Vegtables table");
};


//drop
const DropCustomersTable = (req, res)=>{
    var Q13 = "DROP TABLE Customers";
    SQL.query(Q13, (err, mySQLres)=>{
        if (err) {
            console.log("error in droping Customers table ", err);
            res.status(400).send({message: "error on dropping Customers table" + err});
            return;
        }
        console.log("Customers table drpped");
        res.send("Customers table drpped");
        return;
    })
};

const DropVegtablesTable = (req, res)=>{
    var Q13 = "DROP TABLE Vegtables";
    SQL.query(Q13, (err, mySQLres)=>{
        if (err) {
            console.log("error in droping Vegtables table ", err);
            res.status(400).send({message: "error on dropping Vegtables table" + err});
            return;
        }
        console.log("Vegtables table drpped");
        res.send("Vegtables table drpped");
        return;
    })
};

module.exports = {CreateCustomersTable,CreateVegtablesTable, InsertData_Customers,InsertData_Vegtables, DropCustomersTable,DropVegtablesTable};