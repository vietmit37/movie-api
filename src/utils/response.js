const successCode = (res, data) => {
  let dSend = {
    statusCode: 200,
    message: "Thành công",
    data,
  };
  res.status(200).send(dSend);
};
const errorCode = (res, data) => {
  let dSend = {
    statusCode: 400,
    message: "Thất bại",
    data,
  };
  res.status(400).send(dSend);
};
const failCode = (res) => {
  let dSend = {
    message: "Lỗi",
  };
  res.status(500).send(dSend);
};
module.exports = {
  successCode,
  errorCode,
  failCode,
};
