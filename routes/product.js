const router = require("express").Router();
const Product = require("../models/product");

//    create  


router.post("/create", async (req, res) => {
  try {
    console.log(req.body);
      let  data = await Product.create(req.body);
      return res.json({ status: 1, message: "success",  data: data });
  } catch (error) {
    console.log(error.message);
    return res.json({ status: 0, message: error.message });
  }
});


//get all  


router.get("/getAll", async (req, res) => {
  try {
    const data = await Product.find().sort({ createdAt: -1 }).populate({path:'catId' , select:'name'})
   res.json({ status: 1, message: "success", data: data });
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

    const  data= await Product.findByIdAndUpdate(id,updatedData, { new: true } );

    if (!updatedData) {
      return res.json({ status: 0, message: "Category not found" });
    }
    res.json({ status: 1, message: "success", data: data });
  } catch (err) {
    res.json({ status: -1, message: err.message });
  }
});







module.exports = router;
