const express = require("express");
const router = express.Router();

// const { getProductById, createProduct } = require("../Controllers/product");
const { isSignedIn, isAuthenticated, isAdmin } = require("../Controllers/auth");
const { getProductById,
    createProduct,
    getProduct,
    photo,
    deleteProduct,
    updateProduct,
    getallProducts,
    getAllUniquecategories } = require("../Controllers/product");
const { getUserById } = require("../Controllers/user");

router.param("userId", getUserById);
router.param("productId", getProductById);

router.get("/product/:productId", getProduct);
router.get("/product/photo/:productId", photo);
router.get("/products", getallProducts);
router.get("/products/categories", getAllUniquecategories)

router.post("/product/create/:userId", isSignedIn, isAuthenticated, isAdmin, createProduct)

router.delete("/product/:productId/:userId", isSignedIn, isAuthenticated, isAdmin, deleteProduct);
router.put("/product/:productId/:userId", isSignedIn, isAuthenticated, isAdmin, updateProduct);

module.exports = router;