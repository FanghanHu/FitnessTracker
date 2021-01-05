const express = require("express");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 8080;

let db = require("../models");
const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use(express.static('public'));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workoutdb", { useNewUrlParser: true });



app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
});