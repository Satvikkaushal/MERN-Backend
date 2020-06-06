const express = require('express');
var router = express.Router();
const { check, validationResult } = require('express-validator');

const { signOut, signUp, signIn, isSignedIn } = require("../Controllers/auth");


router.post("/signUp", [
    check("email", "email is required").isEmail(),
    check("password", "length should be more then 3").isLength({ min: 3 })
], signUp);

router.post("/signIn", [
    check("email", "email is required").isEmail(),
    check("password", "password is required").isLength({ min: 1 })
], signIn);

router.get("/signOut", signOut)

router.get("/testProtectedRoute", isSignedIn, (req, res) => {
    res.json(req.auth);
});



module.exports = router;