const User = require("../models/user");

exports.getUserById = (req, res, next, id) => {
  User.findById(id)
    .exec()
    .then((user) => {
      req.profile = user;
      next();
    })
    .catch((err) => {
      return res.status(400).json({
        err: "Unable to find the use the DB",
      });
    });

};

