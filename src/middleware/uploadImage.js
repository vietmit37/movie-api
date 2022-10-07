const multer = require("multer");
const uploadImage = (type) => {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, `./image/`);
    },
    filename: function (req, file, cb) {
      // Dat ten file upload
      const fileNewName = Date.now() + "_" + file.originalname;
      cb(null, fileNewName);
    },
  });
  const fileFilter = (req, file, cb) => {
    // reject a file
    if (
      file.mimetype === "image/jpeg" ||
      file.mimetype === "image/png" ||
      file.mimetype === "image/jpg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  };
  const upload = multer({
    storage,
    limits: {
      fileSize: 1024 * 1024 * 5,
    },
    fileFilter,
  });
  return upload.single(type);
};
module.exports = uploadImage;
