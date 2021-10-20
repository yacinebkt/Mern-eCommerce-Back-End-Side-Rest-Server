//call libires
const express = require("express");
const env = require("dotenv");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const path =require("path")

// create App
const app = express();

// vid 11 13.10
const cors = require('cors');


// import routes 

const userRoutes = require("./routes/user");
const adminRoutes = require("./routes/admin/user");
const categoryRoutes = require ("./routes/category");
const homeCategoryRoutes = require ("./routes/homeCategories");

const productRoutes = require("./routes/product");

const brandRoutes = require("./routes/brands");

const orderRoutes = require ("./routes/order")

const adminOrderRoutes = require ("./routes/admin/order")


const cartRoutes = require ("./routes/cart");
const addressRoutes = require ("./routes/address")

const initDataRoutes = require ("./routes/admin/initData")
const pageRoutes = require ("./routes/admin/page")





// environment variables
env.config();


// mongodb connection
//mongodb+srv://root:<password>@cluster0.gcfqu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority

mongoose.connect(
    `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@cluster0.gcfqu.mongodb.net/${process.env.MONGO_DATABASE}?retryWrites=true&w=majority`, 
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            //add after
            useFindAndModify : false

        }
    ).then(() =>{
        console.log("data base connsected")
    });

//mongoose.set('useFindAndModify', false);



//for passing data
/* app.use(express.json()); */

//An alternative library for passing data
/*app.use(bodyParser());
app.use(express.json());
*/




// create the ferst hello API


/*
app.get('/', (req, res, next) => {
     // green req / Ok request
    res.status(200).json({
        message: "Hello From the other side (/ server☺ )"
    });


});


app.post('/data', (req, res, next) => {
   res.status(200).json({
       message: req.body 
   });


});
*/
app.use(cors());
app.use(express.json());



app.use("/public", express.static(path.join(__dirname, 'uploads')));
app.use("/api", adminRoutes);
app.use("/api", userRoutes);

app.use("/api", categoryRoutes);

app.use("/api", homeCategoryRoutes);

app.use("/api", productRoutes);

app.use("/api", brandRoutes);


app.use("/api", cartRoutes);
app.use("/api", orderRoutes);

app.use("/api", adminOrderRoutes);





app.use("/api", addressRoutes);
app.use("/api", initDataRoutes);
app.use("/api", pageRoutes);









// listen to server (port)
app.listen(process.env.PORT, ()=>{
    console.log(` start server in port ${process.env.PORT}`); 
});