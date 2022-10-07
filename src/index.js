const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
const rootRouter = require("./routes/index");

app.use("/image", express.static("image"));
app.use(express.json());
app.use(cors());

app.listen(8080, (res, req) => {
  console.log("Thanh cong");
});

app.use("/api", rootRouter);
