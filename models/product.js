
const { model, Schema, Types } = require("mongoose");


const schema = new Schema({
  catId: { type: Types.ObjectId, ref:"category",default: "" },
  image: { type: String, default: "" },
  name: { type: String, default: "" },
 desc: { type: String, default: "" },
  qty: { type: Number, default: 0 },

  price: { type: Number, default: 0 },

  barcode: { type: String, required: false }, // optional
  status: { type: String, enum: ["0", "1"], default: "1" },
}, { timestamps: true })
module.exports = model("product", schema);







