const express = require("express");

const movieRoute = express.Router();
const movieController = require("../../controller/movieController");
const uploadImage = require("../../middleware/uploadImage");

movieRoute.get("/layDanhSachBanner", movieController.getBanner);
movieRoute.get("/layDanhSachPhim", movieController.getMovie);
movieRoute.get("/layDanhSachPhimPhanTrang", movieController.paginationMovie);
movieRoute.get("/layDanhSachPhimTheoNgay", movieController.getMovieDate);
movieRoute.get("/layThongTinPhim/:id", movieController.getMovieID);
movieRoute.post(
  "/capNhatPhimUpload/:id",
  uploadImage("image"),
  movieController.updateMovie
);
movieRoute.post(
  "/themPhimUpload",
  uploadImage("image"),
  movieController.createMovie
);
movieRoute.delete("/xoaPhim/:id", movieController.deleteMovie);

module.exports = movieRoute;
