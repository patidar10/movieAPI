var express = require('express');
var app = express();

var mongoose = require('mongoose');

var mov_route = require('./routes/movie');
const uri = "mongodb+srv://Sawan:7909569277@cluster10.yvl58.mongodb.net/?retryWrites=true&w=majority";
app.use('/allmovies', mov_route);

mongoose.connect(uri).then(() => {
    console.log("DB connected");
}).catch(err => {
    console.log("failed!!", err);
});

app.listen(3000);