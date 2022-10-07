const express = require("express");
const cinemaController = require("../../controller/cinemaController");

const cinemaRoute = express.Router();

cinemaRoute.get("/LayThongTinHeThongRap", cinemaController.getHeThongRap);
cinemaRoute.get("/LayThongTinCumRapTheoHeThong", cinemaController.getCumRap);
cinemaRoute.get("/LayThongTinLichChieuHeThongRap", cinemaController.getLc);
cinemaRoute.get("/LayThongTinLichChieuPhim", cinemaController.getLcMaPhim);

module.exports = cinemaRoute;
