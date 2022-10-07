const { PrismaClient } = require("@prisma/client");
const { successCode, errorCode, failCode } = require("../utils/response");

const prisma = new PrismaClient();

// Lấy thông tin hệ thống rạp
const getHeThongRap = async (req, res) => {
  try {
    const heThongRap = await prisma.he_thong_rap.findMany();
    if (heThongRap) {
      successCode(res, heThongRap);
    } else {
      errorCode(res);
    }
  } catch {
    failCode(res);
  }
};

// Lấy thông tin cụm rạp theo hệ thống rạp
const getCumRap = async (req, res) => {
  const { maHeThongRap } = req.query;
  const result = {};
  try {
    const cumRap = await prisma.cum_rap.findMany({
      where: {
        ma_he_thong_rap: maHeThongRap,
      },
      include: {
        rap_phim: true,
      },
    });
    if (cumRap) {
      successCode(res, cumRap);
    } else {
      errorCode(res);
    }
  } catch {
    failCode(res);
  }
};

// Lấy thông tin lịch chiếu theo hệ thống rạp
const getLc = async (req, res) => {
  const { maHeThongRap } = req.query;
  try {
    const lichChieu = await prisma.lich_chieu.findMany({
      where: {
        rap_phim: {
          cum_rap: {
            ma_he_thong_rap: maHeThongRap,
          },
        },
      },
      include: {
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
    });
    if (lichChieu) {
      successCode(res, lichChieu);
    } else {
      errorCode(res);
    }
  } catch {
    failCode(res);
  }
};

// Lấy thông tin lịch chiếu theo mã phim
const getLcMaPhim = async (req, res) => {
  const { maPhim } = req.query;
  const result = {};
  try {
    const lichChieuTheoPhim = await prisma.lich_chieu.findMany({
      where: {
        ma_phim: Number(maPhim),
      },
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
    });
    console;
    if (lichChieuTheoPhim) {
      successCode(res, lichChieuTheoPhim);
    } else {
      errorCode(res);
    }
  } catch {
    failCode(res);
  }
};
module.exports = {
  getHeThongRap,
  getCumRap,
  getLc,
  getLcMaPhim,
};
