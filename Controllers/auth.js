const User = require("../models/user");
const { check, validationResult } = require('express-validator');
const jwt = require("jsonwebtoken");
var expressJwt = require("express-jwt");

exports.signUp = (req, res) => {
    //console.log(req.body);

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({
            error: errors.array()[0].msg
        })
    }

    const user = new User(req.body);
    user.save((err, user) => {
        if (err) {
            return res.status(400).json({
                err: "Not able to save"
            })
        }
        res.json({
            name: user.name,
            email: user.email,
            id: user._id
        });
    });
}

exports.signIn = (req, res) => {
    const errors = validationResult(req);
    const { email, password } = req.body;
    if (!errors.isEmpty()) {
        return res.status(422).json({
            error: errors.array()[0].msg
        })
    }
    User.findOne({ email }, (err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: "email not found"
            })
        }
        if (!user.authenticate(password)) {
            res.status(401).json({
                error: "wrong match"
            })
        }
        //token creation
        const token = jwt.sign({ _id: user._id }, process.env.SECRET);
        //saving in cookie
        res.cookie("token", token, { expire: new Date() + 9999 });
        //sending response
        const { _id, name, email, role } = user;
        return res.json({
            token, user: {
                _id, name, email, role
            }
        })
    })
}

exports.signOut = (req, res) => {
    res.clearCookie("token");
    res.json({
        message: "Signed out succesfully"
    });
}

//protected Routes
exports.isSignedIn = expressJwt({
    secret: process.env.SECRET,
    userProperty: "auth"
})
//custom middleware
exports.isAuthenticated = (req, res, next) => {
    console.log("is Autenticatted")
    let checker = req.profile && req.auth && req.profile._id == req.auth._id;
    if (!checker) {
        return res.status(403).json({
            error: "Access Denied"
        });
    }
    next();
}
exports.isAdmin = (req, res, next) => {
    console.log("is Admin")
    if (req.profile.role === 0) {
        return res.status(403).json({
            error: "Not admin"
        });
    }
    next();
}


