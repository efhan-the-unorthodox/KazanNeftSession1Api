const express = require("express");
const parser = require('body-parser');
const logger = require('morgan');
const http = require('http');
const path = require('path');
var methodOverride = require('method-override');
var cors = require('cors');

const app = express();

app.use('/static', express.static('public'))
app.use(logger('dev'));
app.use(parser.json());
app.use(parser.urlencoded({
    extended: true
}));
app.set('trust proxy', true);
app.use(methodOverride());
app.use(cors());


app.get('/', (req, res)=>{
    res.send("Kazan Neft Session 1 Web Api");
});

const api = require('./routes/api');

app.use('/api', api);

const port = process.env.PORT || 3000;

app.set("port", port);

app.listen(app.get("port"), function(){
    console.log("Server started and listening on port "+ app.get("port"));
});



