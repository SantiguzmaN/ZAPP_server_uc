'use strict'

var express = require('express');
var bodyParser = require('body-parser');

var app = express();

// cargar rutas
var user_routes = require('./routes/user');
var userConductor_routes = require('./routes/userConductor');
var zonazipp_routes = require('./routes/zona-zipp');
var reservazona_routes = require('./routes/reservaZona');
var balancecode_route=require('./routes/balance-code');

// middlewares de body-parser
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// configurar cabeceras y cors
app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin','*');
	res.header('Access-Control-Allow-Headers','Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
	res.header('Access-Control-Allow-Methods','GET, POST, OPTIONS, PUT, DELETE');
	res.header('Allow','GET, POST, OPTIONS, PUT, DELETE');
	next();
});

app.use('/api', user_routes);
app.use('/api', userConductor_routes);
app.use('/api', zonazipp_routes);
app.use('/api', reservazona_routes);
app.use('/api', balancecode_route);


module.exports = app;