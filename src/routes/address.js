const express = require("express");
const { userMiddleware, requireSingin } = require('../common-middleware/commonMiddleware');
const { addAddress, getAddress } = require('../controller/address');
const router = express.Router();


router.post('/user/address/create', requireSingin, userMiddleware, addAddress);
router.post('/user/getaddress', requireSingin, userMiddleware, getAddress);

module.exports = router;
