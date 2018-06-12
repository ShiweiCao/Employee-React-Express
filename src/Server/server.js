const express    = require('express');        
const bodyParser = require('body-parser');
const path = require('path');

const app = new express();  
const router = require('./Router/employees')

const mongoose   = require('mongoose');
mongoose.connect('mongodb://admin:admin@ds014658.mlab.com:14658/mydb');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.use((req, res, next) => {
    console.log(req.method + " " + req.originalUrl);
    next();
});

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    next();
});

app.use('/employees', router);

app.listen(8888, () => {
    console.log('Listening on port 8888')
});


