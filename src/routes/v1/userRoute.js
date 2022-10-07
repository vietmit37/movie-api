const express = require("express");

const userRoute = express.Router();
const userController = require("../../controller/userController");

userRoute.get("/layDanhSachNguoiDung", userController.getUser);
userRoute.get("/layDanhSachNguoiDungPhanTrang", userController.paginationUser);
userRoute.get("/timKiemNguoiDung/:keyword", userController.searchUser);
userRoute.get("/thongTinTaiKhoan", userController.getUserDetail);
userRoute.post("/capNhatTaiKhoan", userController.updateUser);
userRoute.delete("/xoaNguoiDung/:taiKhoan", userController.deleteUser);
userRoute.put("/themNguoiDung", userController.createUser);

module.exports = userRoute;
