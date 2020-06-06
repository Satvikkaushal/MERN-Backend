const express = require("express");
const router = express.Router();

const { getUserById, pushOrderInPurchaseList } = require("../Controllers/user");
const { isSignedIn, isAuthenticated, isAdmin } = require("../Controllers/auth");
const { updateStock } = require("../Controllers/product");
const { getOrderById, createOrder, getAllOrders, updateOrderStatus, getOrderStatus } = require("../Controllers/order");


router.param("userId", getUserById);
router.param("orderId", getOrderById);


router.post("/order/create/:userId", isSignedIn, isAuthenticated,
    pushOrderInPurchaseList, updateStock, createOrder)

router.get("/order/:userId", isSignedIn, isAuthenticated, isAdmin, getAllOrders);

router.get("order/status/:userId", isSignedIn, isAuthenticated, isAdmin, getOrderStatus);
router.put("/order/:orderId/status/:userId", isSignedIn, isAuthenticated,
    isAdmin, updateOrderStatus);

module.exports = router;