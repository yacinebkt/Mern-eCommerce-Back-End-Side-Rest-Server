const express =require("express");
const { requireSingin, adminMiddleware } = require("../../common-middleware/commonMiddleware");
const { initData } = require("../../controller/admin/initdata");

const router =express.Router();


/*
router.post('/admin/singup', singup);
*/
router.post('/initdata', requireSingin, adminMiddleware, initData);






module.exports= router;