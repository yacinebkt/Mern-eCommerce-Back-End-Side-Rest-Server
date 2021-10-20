const express =require("express");
const { userMiddleware, requireSingin } = require("../common-middleware/commonMiddleware");
const { getOrders, addOrder, getOrder } = require("../controller/order");


const router =express.Router();


router.post('/addOrder', requireSingin, userMiddleware, addOrder);

router.get('/getOrders', requireSingin, userMiddleware, getOrders);

router.post('/getOrder', requireSingin, userMiddleware, getOrder);
/*
router.post("/getOrder", requireSignin, userMiddleware, getOrder);
 */



module.exports= router;