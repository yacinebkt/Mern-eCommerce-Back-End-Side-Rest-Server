const express = require("express");

const { requireSingin, adminMiddleware } = require("../common-middleware/commonMiddleware");
const { createBrand, updateBrand, getallBrands } = require("../controller/brands");

const multer = require("multer");

const shortid = require ("shortid")


const router = express.Router();
const path = require("path");


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



// api to creat product
//router.post("/brand/create", requireSingin, adminMiddleware, upload.array("brandPicture") , createBrand );


//const MultipleUpload = upload.array('brandPicture')
//const SingleUpload = upload.single('brandLogo')
const cpUpload = upload.fields([{ name: 'brandLogo', maxCount: 1 }, { name: 'brandPicture', maxCount: 8 }])


router.post("/brand/create", requireSingin, adminMiddleware, cpUpload, createBrand );







router.post("/brand/update", requireSingin, adminMiddleware, cpUpload, updateBrand );


router.get("/brand/getallbrands", getallBrands );  




//const MultipleUpload = upload.fields([{ name: 'logo', maxCount: 1 }, { name: 'brandPicture'}])

//router.post("/brand/create", requireSingin, adminMiddleware, MultipleUpload , createBrand );



module.exports = router;
