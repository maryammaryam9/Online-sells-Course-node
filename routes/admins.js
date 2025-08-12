 const router = require("express").Router();
 const { auth, jwtSign } = require("../middleware/jwt");
 const Admin = require("../models/admin");
 const bcrypt = require("bcrypt");
  
 
 //create admin
 router.post("/create", async (req, res) => {
    // console.log(req.body, "this is the req.body");

    try {
      let b = req.body;
      // let data = await new User(req.body).save();
      // console.log(data,'response data')
      // res.json({ status: 1, data });

      console.log(b, "this is the body");
      b.password = await bcrypt.hash(b.password, 10);
      let data = await Admin.findOne({ email: b.email, status: 1 });
      // data = await new User(req.body).create();
      console.log(data);
      if (data) res.json({ status: 0, message: "Email already Exist" });
      else {
        let data = await new Admin(b).save();
        console.log(data, "this is the data");
        res.json({ status: 1, message: "success", data });
       

      }
    } catch (err) {
      res.json({ status: -1, message: err.message });
    }
  });

  router.post("/login", async (req, res) => {
    //  console.log(req.body , " this is login admin api +++++++++++++++++++")
  try {
    let b = req.body;
    console.log(b, 'this is the body of login');

    let data = await Admin.findOne({ email: b.email, status: "1" });
    console.log(data, 'User Found');

    if (data && (await bcrypt.compare(b.password, data.password))) {
      console.log(data, 'this is the data');
      
        res.json({
        status: 1,
        message: "success",
        data,
        jwtToken: jwtSign(data)
      });

    } else {
      res.json({ status: 0, message: "Email or password is not correct" });
    }

  } catch (err) {
    res.json({ status: -1, message: err.message });
  }
});


//getAllAdmins

router.get("/getAllAdmins", async (req, res) => {
  console.log("Getting all admins...");

  try {
    // await connectToDatabase(); // ✅ Must connect before querying!

    const data = await Admin.find().sort({ createdAt: -1 });

    res.json({ status: 1, message: "success", data });
  } catch (err) {
    console.error("Error fetching admins:", err);
    res.json({ status: -1, message: err.message });
  }
});



//  count admin wala 


router.get("/count", async (req, res) => {
  try {
    const superCount = await Admin.countDocuments({ isSuper: true });
    const nonSuperCount = await Admin.countDocuments({ isSuper: false });
  res.json({ status: 1, message: "success", data: {
        superAdmins: superCount,
        instructures: nonSuperCount
      } });
   
  } catch (error) {
    res.json({ status: -1, message: err.message });
  }
});


router.get("/gettesting", async (req, res) => {
  console.log("Getting all admins...");

  try {
    // await connectToDatabase(); // ✅ Must connect before querying!

    const data = await Admin.find().sort({ createdAt: -1 });

    res.json({ status: 1, message: "success", data });
  } catch (err) {
    console.error("Error fetching admins:", err);
    res.json({ status: -1, message: err.message });
  }
});


router.get("/gettesting", async (req, res) => {
  console.log("Getting all admins...");

  try {
    // await connectToDatabase(); // ✅ Must connect before querying!

    const data = await Admin.find().sort({ createdAt: -1 });

    res.json({ status: 1, message: "success", data });
  } catch (err) {
    console.error("Error fetching admins:", err);
    res.json({ status: -1, message: err.message });
  }
});





// Update  admin
router.put("/update/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const updateData = req.body;

    
    if (updateData.password) {
      updateData.password = await bcrypt.hash(updateData.password, 10);
    }

    const updatedUser = await Admin.findByIdAndUpdate(userId, updateData, {
      new: true, 
    });

    if (!updatedUser) {
      return res.json({ status: 0, message: "Admin not found" });
    }

    res.json({ status: 1, message: "Admin updated successfully", data: updatedUser });
  } catch (err) {
    res.json({ status: -1, message: err.message });
  }
});


  module.exports = router;