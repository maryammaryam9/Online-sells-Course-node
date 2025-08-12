const router = require("express").Router();
const { auth, jwtSign } = require("../middleware/jwt");
const User = require("../models/user");
const bcrypt = require("bcrypt");
// const passwordReset = require("../emailTemplates/passwordResetHTML");
// const myNodemail = require("../emailTemplates/nodeMailer");

const salt = 10;

router.post("/login", async (req, res) => {
  try {
    let b = req.body;
    console.log(b, 'this is the body of login');

    let data = await User.findOne({ email: b.email, status: "1", userType: b.userType });
    console.log(data, 'User Found');

    if (data && (await bcrypt.compare(b.password, data.password))) {
      console.log(data, 'this is the data');

      res.json({ status: 1, data });

    } else {
      res.json({ status: 0, message: "Email or password is not correct" });
    }

  } catch (err) {
    res.json({ status: -1, message: err.message });
  }
});

// Get all users
router.get("/getAllUsers", async (req, res) => {
  try {
    const data = await User.find().sort({ createdAt: -1 }); 
    res.json({ status: 1, message: "success", data });
  } catch (err) {
    res.json({ status: -1, message: err.message });
  }
});


// Update user
router.put("/update/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const updateData = req.body;
    if (updateData.password) {
      updateData.password = await bcrypt.hash(updateData.password, 10);
    }

    const updatedUser = await User.findByIdAndUpdate(userId, updateData, {
      new: true, 
    });

    if (!updatedUser) {
      return res.json({ status: 0, message: "User not found" });
    }

    res.json({ status: 1, message: "User updated successfully", data: updatedUser });
  } catch (err) {
    res.json({ status: -1, message: err.message });
  }
});



  router.post("/create", async (req, res) => {
    // console.log(req.body, "this is the req.body");

    try {
      let b = req.body;
      // let data = await new User(req.body).save();
      // console.log(data,'response data')
      // res.json({ status: 1, data });

      console.log(b, "this is the body");
      b.password = await bcrypt.hash(b.password, salt);
      let data = await User.findOne({ email: b.email, status: 1,userType:b.userType });
      // data = await new User(req.body).create();
      console.log(data);
      if (data) res.json({ status: 0, message: "Email already Exist" });
      else {
        let data = await new User(b).save();
        // , jwtToken: jwtSign(data)
        console.log(data, "this is the data");
        res.json({ status: 1,message:"success", data });

      }
    } catch (err) {
      res.json({ status: -1, message: err.message });
    }
  });



























 
    //  this is not used for now 


//delete User

// router.delete("/delete/:id",async(req,res)=>{
//   try{
//     const userData=req.params.id;
//     const deleteUser=await User.findByIdAndDelete(userId)

//     if(!deleteUser){
//       return res.json({status:0,message:"User not found"});

//     }
//     res.json({status:1 ,message:"User deleted successfully",data:deleteUser})



//   }catch(e){
//     res.json({status:-1,message:e.message})

//   }
// })

router.delete("/delete/:id", auth, async (req, res) => {
  try {
    await User.updateOne({ id: req.params.id }, { status: "-1" });
    res.json({ status: 1, message: "success" });
  } catch (err) {
    res.json({ status: -1, message: err.message });
  }
});



//dashboard
// router.post("/admin/login", async (req, res) => {
//   try {
//     let b = req.body;
//     console.log(b,'this is the body of login')
//     let data = await User.findOne({email: b.email,status: "1",userType:b.userType});
//     console.log(data,'User Found')
//     if (data && (await bcrypt.compare(b.password, data.password))) {
//       console.log(data,'this is the data')
      
//       // data.password = undefined;
//       if (data.fcmTokens && data.fcmTokens.indexOf(b.fcmTokens) == -1)
//         await User.updateOne({ _id: data._id },{ $push: { fcmTokens: b.fcmTokens } }
//     );
//     res.json({ status: 1, data ,jwtToken: jwtSign(data)});
//     } else {
//       res.json({ status: 0, message: "Email or password is not correct" });
//     }
//   } catch (err) {
//     res.json({ status: -1, message: err.message });
//   }
// });

//login with phoneNumber
router.post("/pLogin", async (req, res) => {
  console.log(req.body);
  let b = req.body;
  let data = await User.findOne({
    phoneNumber: b.phoneNumber,
    phoneCode: b.phoneCode,
    status: "1",
    userType: b.userType,
  });
  // && await bcrypt.compare(b.password, data.password)
  if (data) {
    // data.password = undefined;
    res.json({ status: 1, data, jwtToken: jwtSign(data) });
    if (data.fcmTokens && data.fcmTokens.indexOf(b.fcm) == -1)
      await User.updateOne({ _id: data._id }, { $push: { fcmTokens: b.fcm } });
  } else {
    res.json({ status: 0, message: "User not found. Please sign up." });
  }
}),




  router.post("/clearAllDoctors", async (req, res) => {
    try {
        const { userId } = req.body;
        await User.findByIdAndUpdate(userId, { $set: { clearedDoctors: [] } }); // Clear all doctors
        res.json({ status: 1, message: "All doctors removed from history" });
    } catch (error) {
        console.error("Error clearing all doctors:", error);
        res.status(500).json({ status: -1, message: "Server error" });
    }
});






//check user phone number in DB
router.post("/checkNumber", async (req, res) => {
  console.log(req.body);
  try {
    let b = req.body;
    // console.log(b)
    let userdata = await User.findOne({
      phoneCode: b.phoneCode,
      phoneNumber: b.phoneNumber,
      status: "1",
      userType: b.userType,
    });
    if (userdata) {
      res.json({
        status: 1,
        message: "Phone Number Already Existed",
        data: userdata,
      });
    } else {
      res.json({ status: 0, message: "New User", data: userdata });
    }
  } catch (error) {
    res.json({ status: 2, message: error.message });
  }
}),


  router.post("/app/create", async (req, res) => {
    try {
      let b = req.body;
      console.log(b);
      // b.password = await bcrypt.hash(b.password, salt);
      let data =  await User.findOne({ phoneNumber: b.phoneNumber, phoneCode: b.phoneCode, status: "1",userType: b.userType});

      if (data) res.json({ status: 0, message: "Phone Number already Exist" });
      else {
        data = await new User(req.body).save();
        res.json({ status: 1, data, jwtToken: jwtSign(data) });
      }
    } catch (err) {
    console.log(err);
      res.json({ status: -1, message: err.message });
    }
  });

  







router.get("/getById/:id", async (req, res) => {
  try {
    const data = await User.findById(req.params.id);
    // console.log(data,'this is data')
    res.json({ status: 1, data });
  } catch (err) {
    res.json({ status: -1, message: err.message });
  }
});





router.post("/updateProfileImage",  async (req, res) => {
  try {
    let b = req.body;
    const data = await User.findByIdAndUpdate(
      b._id,
      { image: b.image },
      { new: true }
    ).select("image");
    if (data) res.json({ status: 1, data });
    else res.json({ status: 0, message: "No data found" });
  } catch (err) {
    res.json({ status: -1, message: err.message });
  }
});



// app
router.post("/logout", async (req, res) => {
  try {
    let b = req.body;
    console.log(b,'this is the body of logout')
    await User.findByIdAndUpdate(b.id, { new: true });

    res.json({ status: 1, message: "success" });
  } catch (err) {
    res.json({ status: -1, message: err.message });
  }
});

router.post("/forgetPasswordLink", async (req, res) => {
  try {
    let b = req.body;
    let user = await User.findOneAndUpdate(
      { email: b.email },
      { isPasswordChange: true },
      { new: true }
    );
    if (user) {
      let link = "https://miscarea.com/admin/#/forget-passwrod/" + user._id;
      await myNodemail(user.email, "Reset Password", passwordReset(link));
      res.json({ status: 1, message: "Success" });
    } else res.json({ status: 0, message: "No user found" });
  } catch (err) {
    res.json({ status: -1, message: "Somthing went wrong" });
  }
});

router.post("/forgetPassword", async (req, res) => {
  try {
    let b = req.body;
    let data = await User.findOne(
      { _id: b._id, isPasswordChange: true },
      { password: 1 }
    );
    if (data) {
      b.password = await bcrypt.hash(b.password, salt);
      await User.updateOne(
        { _id: b._id },
        { password: b.password, isPasswordChange: false }
      );
      res.json({ status: 1, message: "Password updated successfully" });
    } else throw new Error("");
  } catch (err) {
    res.json({ status: -1, message: "Something went wrong try again" });
  }
});

router.post("/updatePassword", async (req, res) => {
  try {
    let b = req.body;
    let data = await User.findOne({ _id: b._id, status: "1" }, { password: 1 });
    if (data && (await bcrypt.compare(b.password, data.password))) {
      b.newPassword = await bcrypt.hash(b.newPassword, salt);
      await User.updateOne(
        { _id: b._id, status: "1" },
        { password: b.newPassword }
      );
      res.json({ status: 1, message: "Password updated successfully" });
    } else throw new Error("Old Password does not match");
  } catch (err) {
    res.json({ status: -1, message: err.message });
  }
});

router.delete("/delete/:_id", auth, async (req, res) => {
  try {
    await User.updateOne({ _id: req.params._id }, { status: "-1" });
    res.json({ status: 1, message: "success" });
  } catch (err) {
    res.json({ status: -1, message: err.message });
  }
});

// app
router.delete("/app/delete/:_id", async (req, res) => {
  try {
    await User.updateOne({ _id: req.params._id }, { status: "-1" });
    res.json({ status: 1, message: "success" });
  } catch (err) {
    res.json({ status: -1, message: err.message });
  }
});

router.get("/dashboardData",  async (req, res) => {
  try {
    let customers = await User.find({
      status: { $nin: "-1" },
      userType: "customer",
    }).count();
    let shops = await User.find({
      status: { $nin: "-1" },
      userType: "shop",
    }).count();
    let drivers = await User.find({
      status: { $nin: "-1" },
      userType: "driver",
    }).count();
    // let orders = await Order.find({ status: { $nin: "-1" } }).count();
    // let products = await Product.find({ status: { $nin: "-1" } }).count();
    // let shopCategories = await Category.find({
    //   status: { $nin: "-1" },
    //   shopId: { $nin: null },
    // }).count();
    // let categories = await Category.find({
    //   status: { $nin: "-1" },
    //   shopId: null,
    // }).count();
    let banners = await Banner.find({ status: { $nin: "-1" } }).count();
    res.json({
      status: 1,
      data: {
        customers,
        shops,
        drivers,
        // orders,
        // products,
        // shopCategories,
        // categories,
        banners,
      },
    });
  } catch (err) {
    res.json({ status: -1, message: err.message });
  }
});

module.exports = router;
