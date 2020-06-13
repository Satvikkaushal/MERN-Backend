const mongoose = require("mongoose");
require("dotenv").config();
const express = require("express");
const bodyParser = require('body-parser');
const cookieParser = require("cookie-parser");
const cors = require("cors");
const app = express();
//auth routes
const authRoutes = require("./Routes/auth");
//user routes
const userRoutes = require("./Routes/user");
//category routes
const categoryRoutes = require("./Routes/category");
//product routes
const productRoutes = require("./Routes/product");
//order routes
const orderRoutes = require("./Routes/order");
//payment routes
const paymentRoutes = require("./Routes/payment");



//Db connection
mongoose.connect(process.env.DB,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    }).then(() => {
        console.log("DB connected");
    });

//Middle wares
app.use(bodyParser.json())
app.use(cookieParser())
app.use(cors())

//My routes    
app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", categoryRoutes);
app.use("/api", productRoutes);
app.use("/api", orderRoutes);
app.use("/api", paymentRoutes);

const port = 8000;
app.listen(port, () => {
    console.log(`App is running at ${port}`);
})
