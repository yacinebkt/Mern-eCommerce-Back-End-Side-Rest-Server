//for admmin and user
const express = require("express");

const { requireSingin, adminMiddleware } = require("../common-middleware/commonMiddleware");
const { createProduct, getProductsBySlug, getProductDetailsById, getProducts, deleteProductById, updateProduct, getAllProducts, getProductsCategoryByArrayIds, getOrderProductByPrice, updateProductByAdmin } = require("../controller/product");
const multer = require("multer");

const shortid = require ("shortid")

/*const { addCategory, getCategory } = require("../controller/category");*/

const router = express.Router();
const path = require("path")


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
router.post("/product/create", requireSingin, adminMiddleware, upload.array("productPicture") , createProduct );
router.get("/product/getallproducts", getAllProducts );  // New


router.post("/product/getOrderProductByPrice", getOrderProductByPrice );  // New




// api to fetch product
// path  + controler 

router.post("/products/getProductsCategoryByArrayIds", getProductsCategoryByArrayIds ) ;


router.get("/products/:slug", getProductsBySlug);




router.get("/product/:productId", getProductDetailsById);




/*router.get("/category/getCategory", getCategory );*/
router.delete("/product/deleteProductById", requireSingin, adminMiddleware, deleteProductById);


router.post("/product/getProducts", requireSingin,  adminMiddleware, getProducts );

//router.post("/brand/update", requireSingin, adminMiddleware, cpUpload, updateBrand );


router.post("/product/updateProductByAdmin", requireSingin, adminMiddleware, upload.array("productPicture"), updateProductByAdmin );

router.post("/product/update", requireSingin, updateProduct );






module.exports = router;
