//for admmin and user
const express = require("express");

const slugify = require("slugify");


/* start update for image file --09vid */
const shortid = require ("shortid");
const router = express.Router();
const path = require("path");
const multer = require("multer");



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





const { requireSingin, adminMiddleware } = require("../common-middleware/commonMiddleware");

const { addCategory, getCategory, updateCategories, deleteCategories, getOneCategory, getCategoryProductsBySlug } = require("../controller/category");




router.post("/category/create", requireSingin, adminMiddleware , upload.single("categoryPicture") ,addCategory );


router.get("/category/getCategory", getCategory );

router.post("/category/getOneCategory", getOneCategory );

//router.post("/category/getProductsCategoryByArraySlug", getProductsCategoryByArraySlug ) ;

router.post("/category/update", upload.array("categoryPicture"), updateCategories );

router.post("/category/delete", deleteCategories );


module.exports = router;
