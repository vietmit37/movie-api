const express = require("express");

const lichChieuRoute = express.Router();
const lichChieuController = require("../../controller/lichChieuController");

lichChieuRoute.put("/TaoLichChieu", lichChieuController.createLC);
lichChieuRoute.put("/DatVe", lichChieuController.createTicket);

module.exports = lichChieuRoute;
