'use strict';

// modulos
var fs = require('fs');
var path = require('path');

var cloudinary = require('cloudinary').v2;

cloudinary.config({
	cloud_name: 'douxyvndb',
	api_key: '877136832755668',
	api_secret: 'KjUgxY5D_XYVQ3GysRHVLW1Wbss'

});

// modelos
var ZonaZipp = require('../models/zona-zipp');
var Res2 = require('../models/reserva-zona');

// Metodo para guardar las zonas ZIPP
function saveZonaZipp(req, res){
	var zonazapp = new ZonaZipp();
	var params = req.body;

	if(params.address){
		//zonazipp.country = params.country;
		zonazapp.city = params.city;
		zonazapp.address = params.address;
		zonazapp.number_spaces = params.number_spaces;
		zonazapp.price = params.price;
		zonazapp.image_zona_zipp = null;
		zonazapp.image_bill = null;
		zonazapp.horary_start = params.horary_start;
		zonazapp.horary_to = params.horary_to;
		zonazapp.estado_zonazipp = params.estado_zonazipp;
		zonazapp.lat = params.lat;
		zonazapp.lng = params.lng;
		zonazapp.description = params.description;
		zonazapp.user = req.user.sub;
		zonazapp.fechaC = req.user.fechaC;

		zonazapp.save((err, zonazippStored) => {
			if(err){
				res.status(500).send({message: 'Error en el servidor'});
			}else{
				if (!zonazippStored) {
					res.status(404).send({message: 'No se ha guardado la zona zipp'});
				}else{
					res.status(200).send({zonazapp: zonazippStored});
				}
			}
		});
	}else{
		res.status(200).send({
			message: 'La dirección es obligatoria'
		});
	}
}
//funion para crear zona zapp dese web
function saveZonaZapp2(req, res){
	var zonazapp = new ZonaZipp();
	var params = req.body;
	if(params.address){
		zonazapp.city = params.city;
		zonazapp.address = params.address;
		zonazapp.number_spaces = params.number_spaces;
		zonazapp.price = params.price;
		zonazapp.big_type =  params.big_type,
		zonazapp.medium_type =  params.medium_type,
		zonazapp.small_type =  params.small_type,
		zonazapp.electric_station = params.electric_station,
		zonazapp.leave_key = params.leave_key,
		zonazapp.total_hours_day = params.total_hours_day,
		zonazapp.cctv = params.cctv,
		zonazapp.phone = params.phone,
		zonazapp.roofed = params.roofed,
		zonazapp.security_guard = params.security_guard,
		zonazapp.car_type= params.car_type,
		zonazapp.motorcycle_type = params.motorcycle_type,
		zonazapp.bike_type = params.bike_type,
		zonazapp.image_zona_zipp = null;
		zonazapp.image_bill = null;
		zonazapp.horary = params.horary;
		zonazapp.estado_zonazipp = params.estado_zonazipp;
		zonazapp.lat = params.lat;
		zonazapp.lng = params.lng;
		zonazapp.description = params.description;
		zonazapp.score = params.score;
		zonazapp.user = req.user.sub;
		zonazapp.fechaC = req.user.fechaC;
		zonazapp.save((err, zonazippStored) => {
			if(err){
				res.status(500).send({message: 'Error en el servidor'});
			}else{
				if (!zonazippStored) {
					res.status(404).send({message: 'No se ha guardado la zona zipp'});
				}else{
					res.status(200).send({zonazapp: zonazippStored});
				}
			}
		});
	}else{
		res.status(200).send({
			message: 'La dirección es obligatoria'
		});
	}
}


// Metodo para obtener las zonas
function getZonasZipp(req, res){
	ZonaZipp.find({}).populate({path: 'user'}).exec((err, zonaszipp) => {
		if(err){
			res.status(500).send({
				message: 'Error en la petición'
			});
		}else{
			if(!zonaszipp){
				res.status(404).send({
					message: 'No hay zonas zipp'
				});
			}else{
				res.status(200).send({zonaszipp});
			}
		}
	});
}
// Metodo para obtener todas las zonas ZIPP web
function getZonasZapp2(req, res){
	ZonaZipp.find({}).exec((err, zonaszipp) => {
		if(err){
			res.status(500).send({
				message: 'Error en la petición'
			});
		}else{
			if(!zonaszipp){
				res.status(404).send({
					message: 'No hay zonas zipp'
				});
			}else{
				res.status(200).send({zonaszipp});
			}
		}
	});
}

// Metodo para obtener una zona segun el id
function getZonaZipp(req, res){
	var zonazippId = req.params.id;
	ZonaZipp.findById(zonazippId).populate({path: 'user'}).exec((err, zonazipp) => {
		if(err){
			res.status(500).send({
				message: 'Error en la petición'
			});
		}else{
			if(!zonazipp){
				res.status(404).send({
					message: 'La zona zipp no existe'
				});
			}else{
				res.status(200).send({zonazipp});
			}
		}
	});
}

// Metodo para obtener todas las zonas ZIPP discriminadas por usuario

function getZonasZippByUser(req, res){
	var userZonazippId = req.params.id;
	console.log(userZonazippId);
	ZonaZipp.find({"user":  userZonazippId}).exec((err, zonaszipp) => {
		if(err){
			res.status(500).send({
				message: 'Error en la petición'
			});
		}else{
			if(!zonaszipp){
				res.status(404).send({
					message: 'No hay zonas zipp'
				});
			}else{
				res.status(200).send({zonaszipp});
			}
		}
	});
}

// Metodo para hacer el historial de uso de las zonas ZIPP por usuario

function getRecordZonasZipp(req, res){
	var userRecordZonaZipp = req.params.id;
	Res2.find({"userzonazipp":  userRecordZonaZipp}).exec((err, reservazonas) => {

		if(err){
			res.status(500).send({
				message: 'Error en la petición'
			});
		}else{
			if(!reservazonas){
				res.status(404).send({
					message: 'No hay zonas zipp utilizadas'
				});
			}else{
				res.status(200).send({reservazonas});
			}
		}
	});
}

// Metodo para actualizar una zona
function updateZonaZipp(req, res){
	var zonazippId = req.params.id;
	var update = req.body;

	ZonaZipp.findByIdAndUpdate(zonazippId, update, {new:true}, (err, zonazippUpdated) => {
		if(err){
			res.status(500).send({
				message: 'Error en la petición'
			});
		}else{
			if(!zonazippUpdated){
				res.status(404).send({
					message: 'No se ha actualizado la zona zipp'
				});
			}else{
				res.status(200).send({zonazipp: zonazippUpdated});
			}
		}
	});
}

// Metodo para cambiar y actualizar la imagen de la zona zipp
function uploadImageZonaZipp(req, res){

	var cc= req.files;
	var zonazippId = req.params.id;
	var file_name = 'No subido...';


		cloudinary.uploader.upload(cc.image_zona_zipp.path, function(err, result){
			console.log('result:'+result.url);
			file_name=""+result.url;
			ZonaZipp.findByIdAndUpdate(zonazippId, {image_zona_zipp: file_name},  {new:true}, (err, zonazippUpdated) => {
				if(err){
					res.status(500).send({
						message:'Error al actualizar la zonazipp'
					});
				}else{
					if(!zonazippUpdated){
						res.status(404).send({
							message:'No se ha podido actualizar la zona zipp'
						});
					}else{
						res.status(200).send({zonazipp: zonazippUpdated, image_zona_zipp: file_name});
					}
				}
			});
		});

}

// Metodo para obtener la imagen de una zona ZIPP
function getImageFile(req, res){
	var imageFile = req.params.imageFile;
	var path_file = './uploads/zonaszipp/'+imageFile;

	fs.exists(path_file, function(exists){
		if(exists){
			res.sendFile(path.resolve(path_file));
		}else{
			res.status(404).send({
				message: 'La imagen no existe'
			});
		}
	});
}

// Metodo para subir la imagen de la factura de servicio publico de la zona ZIPP
function uploadImageZonaZippBill(req, res){
	var cc= req.files;
	var zonazippbillId = req.params.id;
	var file_name = 'No subido...';


	cloudinary.uploader.upload(cc.image_bill.path, function(err, result){
		console.log('result:'+result.url);
		file_name=""+result.url;
		ZonaZipp.findByIdAndUpdate(zonazippbillId, {image_bill: file_name},  {new:true}, (err, zonazippbillUpdated) => {
			if(err){
				res.status(500).send({
					message:'Error al actualizar la zonazipp'
				});
			}else{
				if(!zonazippbillUpdated){
					res.status(404).send({
						message:'No se ha podido actualizar la factura de la zona ZIPP'
					});
				}else{
					res.status(200).send({zonazipp: zonazippbillUpdated, image_bill: file_name});
				}
			}
		});
	});
}

// Metodo para obtener la imagen de una zona ZIPP
function getImageFileBill(req, res){
	var imageFile = req.params.imageFile;
	var path_file = './uploads/bills/'+imageFile;

	fs.exists(path_file, function(exists){
		if(exists){
			res.sendFile(path.resolve(path_file));
		}else{
			res.status(404).send({
				message: 'La imagen no existe'
			});
		}
	});
}

// Metodo para borrar una zona ZIPP
function deleteZonaZipp(req, res){
	var zonazippId = req.params.id;

	ZonaZipp.findByIdAndRemove(zonazippId, (err, zonazippRemoved) => {
		if(err){
			res.status(500).send({
				message:'Error en la petición'
			});
		}else{
			if(!zonazippRemoved){
				res.status(404).send({
					message:'No se ha podido borrar la zona zipp'
				});
			}else{
				res.status(200).send({zonazipp: zonazippRemoved});
			}
		}
	});
}


// Exportar metodos
module.exports = {
	saveZonaZipp,
	saveZonaZapp2,
	getZonasZipp,
	getZonasZapp2,

	getZonaZipp,
	getZonasZippByUser,
    getRecordZonasZipp,

	updateZonaZipp,

	uploadImageZonaZipp,
	getImageFile,

	uploadImageZonaZippBill,
	getImageFileBill,

	deleteZonaZipp
};