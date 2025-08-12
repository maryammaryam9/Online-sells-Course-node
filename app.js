const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
require("dotenv").config();
require("./database/db");

const app = express();
const port = process.env.PORT;

app.use(express.json({ limit: "1024mb", extended: true, parameterLimit: 50000 }));
app.use(cors());
app.use(morgan("dev"));
const dataRouter = require("./routes/data");

// getting files
app.use("/uploads", express.static("uploads"));

app.use("/files", require("./routes/uploads"));

app.use("/", dataRouter);

app.get("/", (req, res) => {
  res.send(" apis working here in live ");
});

app.listen(port, () => { });
