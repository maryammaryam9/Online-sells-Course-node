const router = require("express").Router();
const usersRouter = require("./users");
const adminRouter = require("./admins");
const productRouter=require('./product')
const categoryRouter=require('./category')

const settingRouter = require("./settings");
const orderRouter = require("./order");
const courseRouter = require("./course");

//  routes 

router.use("/user", usersRouter);
router.use("/admin", adminRouter);
router.use("/product", productRouter);
router.use("/category", categoryRouter);
router.use("/setting", settingRouter);
router.use("/order", orderRouter);
router.use("/course", courseRouter);



module.exports = router;












