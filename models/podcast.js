const mongoose = require("mongoose");

const podcastSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    maxLength: 32,
  },
  description :{
       type : String,
       trim : true,
       required : true,
       maxLength : 2000
  },
  speaker : {
    type : String,
    trim : true,
    required : true,
    maxLength : 32
  },
  category : {
    type : String,
    maxLength : 10,
  },
  type : {
    type : String,
    required : true,
    maxLength : 10
  },
  audio : {
    type: String,
    default : '',
  },
  video : {
    type : String,
    default : ''
  },
 ispopular : {
  type : Boolean,
  default : false
 },

},{timestamps : true});


module.exports = mongoose.model("Podcast",podcastSchema);