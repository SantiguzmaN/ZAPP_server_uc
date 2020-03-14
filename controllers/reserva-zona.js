'use strict';
// modelos
var ReservaZona = require('../models/reserva-zona');

// Metodo para guardar las reservas ZIPP
function saveReservaZapp(req, res){
	console.log("entró al srevidor desde la aplicación móvil");
	var reserva_zapp = new ReservaZona();
	var params = req.body;

	if(params.placa){
		reserva_zapp.placa = params.placa;
		reserva_zapp.valor_total = params.valor_total;
		reserva_zapp.fecha_inicio = params.fecha_inicio;
		reserva_zapp.fecha_final = params.fecha_final;
		reserva_zapp.hora_inicio = params.hora_inicio;
		reserva_zapp.hora_fin = params.hora_fin;
		reserva_zapp.tiempo_total = params.tiempo_total;
		reserva_zapp.estado_reserva = params.estado_reserva;
		reserva_zapp.zonazipp = params.zonazipp;
		reserva_zapp.userzonazipp = params.userzonazipp;
		reserva_zapp.user = params.user;

		reserva_zapp.save((err, reserva_zippStored) => {
			if(err){
				res.status(500).send({message: 'Error en el servidor'});
			}else{
				if (!reserva_zippStored) {
					res.status(404).send({message: 'No se ha tomado la zona zipp'});
				}else{
					res.status(200).send({reserva_zapp: reserva_zippStored});
				}
			}
		});
	}else{
		res.status(200).send({
			message: 'La placa es obligatoria'
		});
	}
}

// Metodo para obtener las reservas ZIPP
function getReservasZapp(req, res){
	//var user_id = req.user.sub;
	ReservaZona.find({}).populate({path: 'user'}).populate({path: 'zonazipp'}).populate({path: 'userzonazipp'}).exec((err, reservas_zipp) => {
		if(err){
			res.status(500).send({
				message: 'Error en la petición'
			});
		}else{
			if(!reservas_zipp){
				res.status(404).send({
					message: 'No hay reservas zonas zipp'
				});
			}else{
				res.status(200).send({reservas_zipp});
			}
		}
	});
}

// Metodo para obtener las reservas ZIPP por usuario // historial
function getReservasZappByUser(req, res){
	var user_id = req.params.id;
	ReservaZona.find({"user":  user_id}).populate({path: 'user'}).populate({path: 'zonazipp'}).exec((err, reservas_zipp) => {
		if(err){
			res.status(500).send({
				message: 'Error en la petición'
			});
		}else{
			if(!reservas_zipp){
				res.status(404).send({
					message: 'No hay reservas zipp'
				});
			}else{
				res.status(200).send({reservas_zipp});
			}
		}
	});
}

// Metodo para actualizar una reserva ZAPP al finalizar
function updateReserva(req, res){
	let reservaId = req.params.id;
	let update = req.body;

	ReservaZona.findByIdAndUpdate(reservaId, update,  {new:true}, (err, reservaUpdated) => {
		if(err){
			res.status(500).send({message:'Error al actualizar la reserva'});
		}else{
			if(!reservaUpdated){
				res.status(404).send({message:'No se  ha podido actualizar la reserva'});
			}else{
				res.status(200).send({reserva_zipp: reservaUpdated});
			}
		}
	});
}




// Exportar metodos
module.exports = {
	saveReservaZapp,
	getReservasZapp,
	getReservasZappByUser,
	updateReserva
};