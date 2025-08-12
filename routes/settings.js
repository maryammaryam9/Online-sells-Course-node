

const router = require("express").Router();

const Setting = require("../models/setting");

router.post("/create/:id", async (req, res) => {
  b = req.body
  try {
    let check = await Setting.findOne({ id: b.id });
    if (!check) {
      data = await Setting.create(b);
    } else {
      data = await Setting.findOneAndUpdate({ id: req.params.id }, b, { new: true });
    }
    res.json({ status: 1, data: data, message: "Success" });
  } catch (error) {
    res.json({ status: 0, message: error.message });
  }
});


router.get("/get", async (req, res) => {
    try {
      let data = await Setting.findOne().sort({ createdAt: "1"});
      res.json({ status: 1, data });
    } catch (error) {
      res.json({ status: 0, message: error.message });
    }
  });
  
module.exports = router;