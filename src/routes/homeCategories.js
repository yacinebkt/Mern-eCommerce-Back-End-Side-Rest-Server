//for admmin and user
const express = require("express");

const slugify = require("slugify");



const { requireSingin, adminMiddleware } = require("../common-middleware/commonMiddleware");

/*const { addCategory, getCategory, updateCategories, deleteCategories } = require("../controller/category");*/



/* start update for image file --09vid */
const shortid = require ("shortid");
const router = express.Router();
const path = require("path");
const multer = require("multer");

const { addHomeCategory, getHomeCategory,  } = require("../controller/homeCategories");



// to decript the uplods files -> multer.npm
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(path.dirname(__dirname), "uploads"))
    },
    filename: function (req, file, cb) {
      cb(null, shortid.generate() + '-' + file.originalname)
    }
})

/*  var upload = multer({ storage: storage }) */
const upload =multer({storage})

/* ENd update for image file  */








//router.post("/category/create", requireSingin, adminMiddleware , upload.single("categoryPicture") ,addCategory );
router.post("/homeCategory/add", requireSingin, adminMiddleware , upload.single("homeCategoryPicture") ,addHomeCategory );


//router.get("/category/getCategory", getCategory );
router.get("/homeCategory/getHomeCategory", getHomeCategory );


//router.get("/homeCategory/getHomeCategoryByModal", getHomeCategoryByModal);


module.exports = router;
