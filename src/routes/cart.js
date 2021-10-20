//for admmin and user
const express = require("express");



const { requireSingin, userMiddleware } = require("../common-middleware/commonMiddleware");

const { addItemToCart, getCartItems, removeCartItems } = require("../controller/cart");

const router = express.Router();



router.post("/user/cart/addtocart", requireSingin, userMiddleware , addItemToCart );

/*router.get("/cart/getCart", getCart );*/

router.post("/user/getCartItems", requireSingin, userMiddleware , getCartItems );

router.post( "/user/cart/removeItem", requireSingin, userMiddleware,  removeCartItems );
  


module.exports = router;
