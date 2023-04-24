const express = require("express");

const router = express.Router();

const { createPodcast ,getAllPodcasts} = require("../controllers/podcast");
const {getUserById}  = require("../controllers/user")
const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});


const upload = multer({storage : storage});


router.param("userId", getUserById);


router.post(
  "/create/podcast/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  upload.single("video"),
  createPodcast
);

module.exports = router;


router.get("/podcasts",getAllPodcasts)