// models/todoModel.js
var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

var Topic = mongoose.Schema({
  user:{
    type: ObjectId,
    required: true
  },
  title: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },  
  content: {
    type: String,
    required: true
  },
  created: {
    type: Date,
    required: true,
    default: new Date()
  }
});

module.exports = mongoose.model("topic", Topic);