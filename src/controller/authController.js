const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const { successCode, errorCode, failCode } = require("../utils/response");

// tạo jwt
const generateToken = (data) => {
  let token = jwt.sign(data, "key", { algorithm: "HS256", expiresIn: "3d" });
  return token;
};

const verifyToken = (token) => {
  try {
    return jwt.verify(token, "key");
  } catch (err) {
    return false;
  }
};
// const checkToken = (req, res, next) => {
//   let { authentication } = req.headers;

//   if (authentication) {
//     if (verifyToken(authentication)) {
//       next();
//     } else {
//       successCode("Token không hợp lệ");
//     }
//   } else {
//     res.status(403).send("Token không hợp lệ");
//   }
// };
//sign up
const signUp = async (req, res) => {
  try {
    const { taiKhoan, matKhau, email, soDt, hoTen } = req.body;
    const obj = {
      tai_khoan: taiKhoan,
      mat_khau: matKhau,
      email,
      so_dt: soDt,
      ho_ten: hoTen,
      loai_nguoi_dung: "KhachHang",
    };
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
        successCode(res, "Đăng ký thành công");
      } else {
        errorCode(res, "Đăng ký thất bại");
      }
    }
  } catch {
    failCode(res);
  }
};
// sign in
const signIn = async (req, res) => {
  const result = {};
  try {
    const { taiKhoan, password } = req.body;
    const data = await prisma.nguoi_dung.findFirst({
      where: {
        tai_khoan: taiKhoan,
      },
    });
    if (data) {
      if (data.mat_khau == password) {
        result.userLogin = data;
        result.token = generateToken(data);
        successCode(res, result);
      } else {
        errorCode(res, "Sai mật khẩu");
      }
    } else {
      errorCode(res, "Không tìm thấy tài khoản");
    }
  } catch {
    failCode(res);
  }
};
module.exports = { signIn, signUp, verifyToken };
