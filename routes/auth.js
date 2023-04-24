const { check } = require("express-validator");

var express = require("express");

var router = express.Router();

const {signup,signin,signout}  = require("../controllers/auth");


router.post(
  "/signup",
  [
    check("name", "name should be atleast 3 characters").isLength({ min: 3 }),
    check("email", "email is not valid").isEmail(),
    check("password", "password is not valid").isLength({ min: 5 }),
  ],
  signup
);

router.post(
  "/signin",
  [
    check("email", "email is required").isEmail(),
    check("password", "password is required").isLength({ min: 5 }),
  ],
  signin
);

router.get("/signout", signout);

module.exports = router;