const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const { successCode, errorCode, failCode } = require("../utils/response");

// Lấy danh sách banner
const getBanner = async (req, res) => {
  try {
    const bannerMovie = await prisma.banner.findMany();
    successCode(res, bannerMovie);
  } catch {
    failCode(res);
  }
};

// Lấy danh sách phim
const getMovie = async (req, res) => {
  try {
    const movie = await prisma.phim.findMany();
    successCode(res, movie);
  } catch {
    failCode(res);
  }
};

// Lấy danh sách phim theo maPhim
const getMovieID = async (req, res) => {
  const { id } = req.params;
  try {
    const movie = await prisma.phim.findMany({
      where: {
        ma_phim: Number(id),
      },
    });
    if (movie) {
      successCode(res, movie);
    } else {
      errorCode(res, "Mã phim không hợp lệ");
    }
  } catch {
    failCode(res);
  }
};

// Pagination
const paginationMovie = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const size = parseInt(req.query.size) || 2;
  const totalCount = await prisma.phim.count();
  const currentPage = page || 0;
  const result = {};
  try {
    result.movie = await prisma.phim.findMany({
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

// Lấy danh sách movie theo ngày
const getMovieDate = async (req, res) => {
  let { tuNgay, denNgay } = req.query;
  tuNgay = tuNgay.split("-").reverse().join("-");
  denNgay = denNgay.split("-").reverse().join("-");
  const page = parseInt(req.query.page) || 1;
  const size = parseInt(req.query.size) || 2;
  const currentPage = page || 0;
  const result = {};
  const totalCount = await prisma.phim.count({
    where: {
      ngay_khoi_chieu: {
        gte: `${tuNgay}T00:00:00.000Z`,
      },
      ngay_khoi_chieu: {
        lte: `${denNgay}T00:00:00.000Z`,
      },
    },
  });
  try {
    result.movie = await prisma.phim.findMany({
      skip: size * page - size,
      take: size,
      where: {
        ngay_khoi_chieu: {
          gte: `${tuNgay}T00:00:00.000Z`,
        },
        ngay_khoi_chieu: {
          lte: `${denNgay}T00:00:00.000Z`,
        },
      },
      orderBy: {
        ngay_khoi_chieu: "asc",
      },
    });
    result.totalCount = totalCount;
    result.currentPage = currentPage;
    result.size = size;
    successCode(res, result);
  } catch {
    failCode(res);
  }
};

// Thêm movie
const createMovie = async (req, res) => {
  const { filename, fieldname } = req.file;
  const {
    tenPhim,
    trailer,
    moTa,
    danhGia,
    hot,
    dangChieu,
    sapChieu,
    ngayKhoiChieu,
  } = req.body;
  const obj = {
    ten_phim: tenPhim,
    trailer,
    mo_ta: moTa,
    ngay_khoi_chieu: `${ngayKhoiChieu
      .split("-")
      .reverse()
      .join("-")}T00:00:00.000Z`,
    danh_gia: Number(danhGia),
    hot: JSON.parse(`${hot}`.toLowerCase()),
    dang_chieu: JSON.parse(`${dangChieu}`.toLowerCase()),
    sap_chieu: JSON.parse(`${sapChieu}`.toLowerCase()),
  };
  try {
    const data = await prisma.phim.create({
      data: {
        ...obj,
        hinh_anh: `${fieldname}/${filename}`,
      },
    });
    if (data) {
      successCode(res, "Thêm phim thành công");
    } else {
      errorCode(res, "Thêm phim thất bại");
    }
  } catch {
    failCode(res);
  }
};

// Update movie
const updateMovie = async (req, res) => {
  const { filename, fieldname } = req.file;
  // const url = req.protocol + "://" + req.hostname + ":" + PORT + req.path;
  const { id } = req.params;
  const {
    tenPhim,
    trailer,
    moTa,
    danhGia,
    hot,
    dangChieu,
    sapChieu,
    ngayKhoiChieu,
  } = req.body;
  const obj = {
    ten_phim: tenPhim,
    trailer,
    mo_ta: moTa,
    ngay_khoi_chieu: `${ngayKhoiChieu
      .split("-")
      .reverse()
      .join("-")}T00:00:00.000Z`,
    danh_gia: Number(danhGia),
    hot: JSON.parse(`${hot}`.toLowerCase()),
    dang_chieu: JSON.parse(`${dangChieu}`.toLowerCase()),
    sap_chieu: JSON.parse(`${sapChieu}`.toLowerCase()),
  };
  try {
    await prisma.phim.update({
      where: {
        ma_phim: Number(id),
      },
      data: {
        ...obj,
        hinh_anh: `${fieldname}/${filename}`,
      },
    });
    successCode(res, "Cập nhật thành công");
  } catch {
    failCode(res);
  }
};

// Delete movie
const deleteMovie = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.phim.delete({
      where: {
        ma_phim: Number(id),
      },
    });
    successCode(res, "Xóa thành công");
  } catch {
    failCode(res);
  }
};
module.exports = {
  getBanner,
  getMovie,
  paginationMovie,
  getMovieDate,
  updateMovie,
  createMovie,
  getMovieID,
  deleteMovie,
};
