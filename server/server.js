const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
const fs=require('fs');

const app = express();

mongoose
  .connect(process.env.DATABASE, { useNewUrlParser: true })
  .then(() => {
    console.log("Started DB");
  })
  .catch((err) => {
    console.log(err);
  });

app.use(morgan("dev"));

app.use(bodyParser.json({ limit: "2mb" }));

app.use(cors());

fs.readdirSync('./routes').map((route)=>{
  app.use("/api",require("./routes/"+route))
})

const port=process.env.PORT

app.listen(port,()=>{
    console.log(`server is started on Port ${port}`);
})