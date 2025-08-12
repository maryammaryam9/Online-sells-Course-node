const { model, Schema } = require("mongoose");


const schema = new Schema({
  name: { type: String, default: "" },
  phone:  { type: String, default: "" },
  email: { type: String, default: "", unique: true },
  username: { type: String, default: "" },
  password: { type: String, default: ""},
  lat: { type: Number, default: 31.2 },
  long: { type: Number, default: 73.1 },
  fcmTokens: { type: [String], default: undefined },
  address: { type: String, default: "" },

  
  status: { type: String, default: "1" },
}, { timestamps: true })
module.exports = model("user", schema);