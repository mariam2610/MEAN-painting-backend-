const mongoose = require('mongoose');
const express = require('express')
const app = express()
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");

//Middlewares
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

const port = 3005
mongoose.connect('mongodb://localhost:27017/paintings',
        {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useCreateIndex: true
        }).then(() => {
                console.log("DB CONNECTED")
        })



//My routes
const categoryRoutes = require("./routes/category");
const productRoutes = require("./routes/product");
const userRoutes = require("./routes/user");
const orderRoutes = require("./routes/order");
const artistRoutes = require("./routes/artist");


//My Routes

app.use("/api", categoryRoutes);

app.use("/api", productRoutes);

app.use("/api", userRoutes);

app.use("/api", orderRoutes)

app.use("/api",artistRoutes)

app.use("/uploads", express.static("uploads"));

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
