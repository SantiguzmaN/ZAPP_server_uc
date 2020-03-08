'use strict'

var express = require('express');
var ReservaZonaController = require('../controllers/reserva-zona');

var api = express.Router();

// reservar zona zapp
api.post('/reservazonazapp', ReservaZonaController.saveReservaZapp);
api.get('/reservaszapp', ReservaZonaController.getReservasZapp);
api.get('/reservaszappbyuser/:id', ReservaZonaController.getReservasZappByUser);
api.put('/actualizareserva/:id', ReservaZonaController.updateReserva);


module.exports = api;