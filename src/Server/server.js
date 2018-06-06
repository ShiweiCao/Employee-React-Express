const express    = require('express');        
const bodyParser = require('body-parser');
const path = require('path');

const app = new express();   

// const pilotRouter = require('./Router/pilotRouter')
// const mechRouter = require('./Router/mechRouter')
// const unitRouter = require('./Router/unitRouter')

const mongoose   = require('mongoose');
mongoose.connect('mongodb://admin:admin@ds014658.mlab.com:14658/mydb');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const Unit = require('./Model/unit.js')


app.use((req, res, next) => {
    console.log("A " + req.method + " request received at " + new Date());
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

// app.use('/pilots', pilotRouter)
// app.use('/meches', mechRouter)
// app.use('/units', unitRouter)

app.listen(8888, () => {
    console.log('Listening on port 8888')
});
