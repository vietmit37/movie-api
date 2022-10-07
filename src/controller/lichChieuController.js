const { PrismaClient } = require("@prisma/client");
const { successCode, errorCode, failCode } = require("../utils/response");

const prisma = new PrismaClient();

// Create Lịch chiếu
const createLC = async (req, res) => {
  const { maRap, giaVe, maPhim, ngayGioKhoiChieu } = req.body;
  const data = {
    ma_rap: maRap,
    gia_ve: giaVe,
    ma_phim: maPhim,
    ngay_gio_chieu: new Date(ngayGioKhoiChieu),
  };
  const movie = await prisma.phim.findMany({
    where: {
      ma_phim: maPhim,
    },
  });
  try {
    if (movie) {
      const taoLC = await prisma.lich_chieu.create({
        data,
      });
      console.log(data.ngay_gio_chieu);
      successCode(res, taoLC);
    } else {
      errorCode(res);
    }
  } catch {
    failCode(res);
  }
};

// create ticket
const createTicket = async (req, res) => {
  const { maGhe, taiKhoan, maLichChieu } = req.body;
  try {
    const data = {
      ma_ghe: maGhe,
      tai_khoan: taiKhoan,
      ma_lich_chieu: maLichChieu,
    };
    const user = await prisma.nguoi_dung.findMany({
      where: {
        tai_khoan: taiKhoan,
      },
    });
    if (user) {
      const taoTicket = await prisma.dat_ve.create({
        data,
        include: {
          ghe: true,
          lich_chieu: {
            include: {
              phim: true,
              rap_phim: {
                include: {
                  cum_rap: {
                    include: {
                      he_thong_rap: true,
                    },
                  },
                },
              },
            },
          },
        },
      });
      successCode(res, taoTicket);
    } else {
      errorCode(res);
    }
  } catch {
    failCode(res);
  }
};
module.exports = {
  createLC,
  createTicket,
};
