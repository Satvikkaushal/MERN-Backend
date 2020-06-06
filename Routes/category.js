const express = require("express");
const router = express.Router();

const { getCategoryById, createCategory, getAllCategory, getCategory, removeCategory, updateCategory } = require("../Controllers/category");
const { getUserById } = require("../Controllers/user");
const { isAdmin, isAuthenticated, isSignedIn } = require("../Controllers/auth");

router.param("userId", getUserById);
router.param("categoryId", getCategoryById);

//for testing
router.get("/testing", (req, res) => {
    res.send("category working");
});


router.post(
    "/category/create/:userId",
    isSignedIn,
    isAuthenticated,
    isAdmin,
    createCategory
);
router.get("/category/:categoryId", getCategory);
router.get("/categories", getAllCategory);

router.put("/category/:categoryId/:userId", isSignedIn, isAuthenticated, isAdmin, updateCategory);
router.delete("/category/:categoryId/:userId", isSignedIn, isAuthenticated, isAdmin, removeCategory);
module.exports = router;
