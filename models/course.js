const { model, Schema, Types } = require("mongoose");
const mongoose = require('mongoose');


const CourseSchema = new mongoose.Schema({

  file: { type: [] }, // PDF ya any doc
  order: { type: Number, default: 0 },
  duration: { type: String, default: '1' },
userId: { type: Types.ObjectId, ref:"user", default: null },
catId: { type: Types.ObjectId, ref:"category", default: null },
InstructureId: { type: Types.ObjectId, ref:"admin", default: null },
    image: { type: String, default: "" },
    name: { type: String, default: "" },
   desc: { type: String, default: "" },
    price: { type: Number, default: 0 },
    status: { type: String, enum: ["0", "1"], default: "1" },
}, { timestamps: true });

module.exports = mongoose.model('course', CourseSchema);
