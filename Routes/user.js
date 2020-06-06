const express = require("express");
const router = express.Router();

const { getUserById, getUser, getAllUsers, updateUser, userPurchaseList } = require("../Controllers/user");
const { isSignedIn, isAdmin, isAuthenticated } = require("../Controllers/auth");

router.param("userId", getUserById)

router.get("/user/:userId", isSignedIn, isAuthenticated, getUser);
router.get("/orders/user/:userId", isSignedIn, isAuthenticated, userPurchaseList);
router.put("/user/:userId", isSignedIn, isAuthenticated, updateUser);

//Assignment
router.get("/allUsers", getAllUsers);

module.exports = router;