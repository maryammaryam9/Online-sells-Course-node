const { model, ObjectId, Schema } = require("mongoose");
const schema = new Schema({
  name: { type: String, default: "" },
  email: { type: String, default: "", unique: true },
  password: { type: String, default: ""},
  image: { type: String, default: "" }, 
  isSuper: {type:Boolean},
  status: { type: String, default: "1" },
  
}, { timestamps: true });

module.exports = model("admin", schema);
