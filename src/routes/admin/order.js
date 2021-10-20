const express = require("express");
/*const { ,  } = require("../../common-middleware");*/
const { requireSingin, adminMiddleware } = require("../../common-middleware/commonMiddleware");
const {
    updateOrder,
  getCustomerOrders,
} = require("../../controller/admin/order");
const router = express.Router();

router.post(`/order/update`, requireSingin, adminMiddleware, updateOrder);

router.post(
  `/order/getCustomerOrders`,
  requireSingin,
  adminMiddleware,
 getCustomerOrders
);

module.exports = router;