
const { model, Schema, Types } = require("mongoose");
const schema = new Schema({
  name: { type: String, default: "" },
  desc: { type: String, default: "" },
  image: { type: String, default: "" },
  status: { type: String, enum: ["0", "1"], default: "1" },
}, { timestamps: true })
module.exports = model("category", schema);






