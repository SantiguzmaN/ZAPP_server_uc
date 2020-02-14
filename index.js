 'use strict'

var mongoose = require('mongoose');
var app = require('./app');
var port = process.env.PORT || 3789;
//var port = 4550;
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://basedatoszipp:basedatoszipp2017@ds133816.mlab.com:33816/zipp',{ useMongoClient:true }) 
	.then(() => {
		console.log('La conexión a la base de datos zipp se ha realizado correctamente!');
		
		app.listen(port, () => {
			console.log("El servidor local con Node y Express está corriendo correctamente en el puerto: "+port)
		});
	})
	.catch(err => console.log(err));