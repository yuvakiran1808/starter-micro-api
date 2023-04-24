const Podcast = require("../models/podcast");

exports.createPodcast = (req, res, next) => {
  const { name, description, speaker,category,type,ispopular } = req.body;
  let video = "";
  let audio = "";

  if (req.file.mimetype.includes("video")) {
     video = req.file.destination+req.file.filename;
  } else if (req.file.mimetype.includes("audio")) {
     audio = req.file.destination+req.file.filename;
  } else {
    return res.status(400).json({ error: "Invalid file type" });
  }
  

  const podcast = new Podcast({
    name,
    description,
    speaker,
    category,
    type,
    video,
    audio,
    ispopular
  });

  podcast
    .save()
    .then((result) => {
      res.status(201).json({
        message: "Podcast created successfully",
        podcast: result,
      });
    })
    .catch((error) => {
      res.status(500).json({ error: error });
    });
};

exports.getAllPodcasts = (req, res) => {
  Podcast.find()
    .then((podcasts) => {
      res.json(podcasts);
    })
    .catch((err) => {
      return res.status(400).json({
        err: "NO podcasts found",
      });
    });
};
