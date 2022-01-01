const express = require("express");
const body_parser = require("body-parser");
const router = require("./src/router");
const { mongo, Mongoose } = require("mongoose");
const app = express();
const port = 4000;
const mongooseconnection = require("./src/database/connect")
mongooseconnection

app.use(body_parser.urlencoded({extended:false}));
app.use(body_parser.json());
app.use("/api" ,router);

app.listen(port,()=>{
    console.log(`servers started ${port}`)
});