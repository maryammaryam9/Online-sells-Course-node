const { model, Schema, Types } = require("mongoose");
const orderSchema = new Schema({
   userId: { type: Types.ObjectId, ref: "user", required: true },
   courseId:[ { type: Types.ObjectId, ref: "course", default: "" }],
  status: { type: String, default: "Pending" }, // paid , unpaid , Cancelled
  paidAmount: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = model("order", orderSchema);
