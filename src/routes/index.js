const express = require("express");
const rootRouter = express.Router();

const userRoute = require("./v1/userRoute");
const authRoute = require("./v1/authRoute");
const movieRoute = require("./v1/movieRoute");
const cinemaRoute = require("./v1/cinemaRoute");
const lichChieuRoute = require("./v1/lichChieuRoute");

rootRouter.use("/quanLyNguoiDung/v1", userRoute);
rootRouter.use("/auth/v1", authRoute);
rootRouter.use("/quanLyPhim/v1", movieRoute);
rootRouter.use("/quanLyRap/v1", cinemaRoute);
rootRouter.use("/quanLyVe/v1", lichChieuRoute);

module.exports = rootRouter;
