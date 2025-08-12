const { Schema, model } = require("mongoose");

const schema = Schema({
  pp: String,
  tnc: String,
  
  status: { type: String, default: "1" }
}, { timestamps: true });

module.exports = model("setting", schema);
