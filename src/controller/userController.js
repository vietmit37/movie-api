const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const { successCode, errorCode, failCode } = require("../utils/response");
const authController = require("./authController");

// Lấy Danh Sách Người Dùng
const getUser = async (req, res) => {
  try {
    const user = await prisma.nguoi_dung.findMany();
    successCode(res, user);
  } catch {
    failCode(res);
  }
};
// Lấy danh sách người dùng theo token
const getUserDetail = async (req, res) => {
  try {
    const { token } = req.headers;
    if (token) {
      const data = authController.verifyToken(token);
      successCode(res, data);
    } else {
      errorCode(res, "Token không hợp lệ");
    }
  } catch {
    failCode(res);
  }
};

// Pagination
const paginationUser = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const size = parseInt(req.query.size) || 2;
  const totalCount = await prisma.nguoi_dung.count();
  const currentPage = page || 0;
  const result = {};
  try {
    result.user = await prisma.nguoi_dung.findMany({
      skip: size * page - size,
      take: size,
    });
    result.totalCount = totalCount;
    result.currentPage = currentPage;
    result.size = size;
    successCode(res, result);
  } catch {
    failCode(res);
  }
};

// Search theo tài khoản
const searchUser = async (req, res) => {
  const keyword = req.params.keyword;
  try {
    const result = await prisma.nguoi_dung.findMany({
      where: {
        tai_khoan: {
          contains: keyword,
        },
      },
    });
    successCode(res, result);
  } catch {
    failCode(res);
  }
};

//Thêm người dùng
const createUser = async (req, res) => {
  const { taiKhoan, matKhau, email, soDt, hoTen, loaiND } = req.body;
  const obj = {
    tai_khoan: taiKhoan,
    mat_khau: matKhau,
    email,
    so_dt: soDt,
    ho_ten: hoTen,
    loai_nguoi_dung: loaiND,
  };
  try {
    const checkTaiKhoan = await prisma.nguoi_dung.findFirst({
      where: {
        tai_khoan: taiKhoan,
      },
    });
    if (checkTaiKhoan) {
      errorCode(res, "Tài khoản đã tồn tại");
    } else {
      const data = await prisma.nguoi_dung.create({ data: obj });
      if (data) {
        successCode(res, "Tạo tài khoản thành công");
      } else {
        errorCode(res, "Tạo tài khoản thất bại");
      }
    }
  } catch {
    failCode(res);
  }
};

// Update người dùng
const updateUser = async (req, res) => {
  const { token } = req.headers;
  const { taiKhoan, matKhau, email, soDt, hoTen, loaiND } = req.body;
  const obj = {
    tai_khoan: taiKhoan,
    mat_khau: matKhau,
    email,
    so_dt: soDt,
    ho_ten: hoTen,
    loai_nguoi_dung: loaiND,
  };
  try {
    if (token) {
      const dataToken = authController.verifyToken(token);

      const dataUpdate = await prisma.nguoi_dung.update({
        where: {
          tai_khoan: dataToken.tai_khoan,
        },
        data: obj,
      });
      successCode(res, dataUpdate);
    } else {
      errorCode(res, "Không thành công");
    }
  } catch {
    failCode(res);
  }
};

// Delete user
const deleteUser = async (req, res) => {
  try {
    const { taiKhoan } = req.params;
    await prisma.nguoi_dung.delete({
      where: {
        tai_khoan: taiKhoan,
      },
    });
    successCode(res, "Xóa thành công");
  } catch {
    failCode(res);
  }
};
module.exports = {
  getUser,
  paginationUser,
  searchUser,
  getUserDetail,
  updateUser,
  deleteUser,
  createUser,
};
