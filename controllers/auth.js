const User = require("../models/user");
const { validationResult } = require("express-validator");
var jwtt = require("jsonwebtoken");
var { expressjwt: jwt } = require("express-jwt");
const user = require("../models/user");


//signup

exports.signup = (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg,
    });
  }

  const user = new User(req.body);

  user
    .save()
    .then((user) => {
      return res.json({
        name: user.name,
        email: user.email,
        id: user._id,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({
        err: "Not able to save the user in database",
      });
    });
};

//signin

exports.signin = (req, res) => {
  const errors = validationResult(req);

  const { email, password } = req.body;

  if (!errors.isEmpty()) {
    return res.status(422).json({
      errors: errors.array()[0].msg,
    });
  }
  User.findOne({ email })
    .then((user) => {
      if(!user)
      { 
        return res.status(400).json({
          error: "user email does not exists",
        });
      }
      if (user.password != password) {
        return res.status(401).json({
          error: "Email and password do not match",
        });
      }
      const token = jwtt.sign({ _id: user._id }, process.env.SECRET);
      res.cookie("token", token, { expire: new Date() + 9999 });
      const { _id, name, email, role } = user;
      return res.json({
        token,
        user: { _id, name, email, role },
      });
    })
    .catch((err) => {
      return res.status(400).json({
         err: "user email does not exists",
      });
    });
};



exports.signout = (req, res) => {
  res.clearCookie("token");
  res.json({
    message: "Successfully signed out",
  });
};


exports.isSignedIn = jwt({
  secret : process.env.SECRET,
  userProperty : "auth",
  algorithms: ["HS256"],
})


//custom middlewares
exports.isAuthenticated = (req,res,next)=>{
  let checker = req.profile && req.auth && req.profile._id == req.auth._id;
  if(!checker){
    return res.status(403).json({
      error : "ACCESS DENIED"
    })
  }
     next();
}


exports.isAdmin = (req,res,next)=>{

  if(req.profile.role == 0)
  {
    return res.status(403).json({
      error : "You are not an admin, Access denied",
    })
  }
     next();
}