const router = require("express").Router();
const Order = require("../models/order");

//    create  

router.post("/create", async (req, res) => {
  try {
    console.log(req.body , " this is order craete ");
      let category = await Order.create(req.body);
      return res.json({ status: 1, message: "success",  data: category });
  } catch (error) {
    console.log(error.message);
    return res.json({ status: 0, message: error.message });
  }
});


//get all  
router.get("/getAll", async (req, res) => {
  try {
    const data = await Order.find()
      .sort({ createdAt: -1 })
      .populate({ path: 'userId', select: 'name' })
      .populate({
        path: 'courseId',               // array of courses populate karo
        select: 'name price desc image catId status',
        populate: {
          path: 'catId',
          model: 'category',
          select: 'name'
        }
      });

    res.json({ status: 1, message: "success", data });
  } catch (err) {
    res.json({ status: -1, message: err.message });
  }
});



//to update 
router.put("/update/:id", async (req, res) => {
     console.log(req.body, " this is  category ")
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const  data= await Order.findByIdAndUpdate(id,updatedData, { new: true } );

    if (!updatedData) {
      return res.json({ status: 0, message: "Category not found" });
    }
    res.json({ status: 1, message: "success", data: data });
  } catch (err) {
    res.json({ status: -1, message: err.message });
  }
});







module.exports = router;
