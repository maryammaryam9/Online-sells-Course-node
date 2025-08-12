const mongoose = require("mongoose");

mongoose.set('strictQuery', false);

mongoose.connect(process.env.DB_LIVE)
  .then(() => console.log("DB Connected"))
  .catch((err) => console.error("db error...", err));
