const express =require("express");
const { upload, requireSingin, adminMiddleware } = require("../../common-middleware/commonMiddleware");
const { createPage, getPage } = require("../../controller/admin/Page");

const router =express.Router();






router.post(`/page/create`, requireSingin, adminMiddleware, upload.fields([
    { name: "banners" },
    { name: "products" },
]), createPage );



router.get(`/page/:category/:type`, getPage );






module.exports= router;