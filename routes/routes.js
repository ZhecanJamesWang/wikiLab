var express = require('express');
var mongoose = require('mongoose');
var Topic = require('../models/topicModel');
var ObjectId = mongoose.Types.ObjectId;

var routes = {
  getTopic: function(req, res) {
    console.log(req.params.topic_url);
    Topic.findOne({url: req.params.topic_url},function(err, topic) {
      if (err) {
        console.log("ERROR: Cannot retrieve topic")
        res.status(404);
      }
      res.status(200).json(topic);
    });
  },
  getTopicList: function(req, res) {
    Topic.find(function(err, topics) {
      if (err) {
        console.log("ERROR: Cannot retrieve topics")
        res.status(404);
      }
      var topicHeaders = [];
      for (var i = 0; i < topics.length; i++) {
        topicHeaders.push({
          topic: topics[i].topic,
          url: topics[i].url
        });
      }
      res.status(200).json(topicHeaders);
    });
  },
  editTopic: function(req, res) {
    function confirm(err, topic) {
      console.log(topic);
      if (err) {
        return res.send({
          success: false,
          message: 'ERROR: Could not create topic'
        });
      }
      return res.send({
        success: true,
        topic: topic.topic,
        url: topic.url,
        content: topic.content
      });
    }
    Topic.find({url: req.params.topic_url}, function(err, topics) {
      switch(topics.length) {
        case 0: //Topic does not exist; create it!
          Topic.create({
            user: ObjectId("507c7f79bcf86cd7994f6c0e"),
            topic: req.body.topic.trim(),
            url: req.body.topic.trim().replace(/ /g,"_"),
            content: req.body.content
          }, confirm);
          break;
        case 1: //Topic exists: edit it!
        console.log("find the topic on server");
          var topic = topics[0];
          // req.user._id
          if (topic.user == ObjectId("507c7f79bcf86cd7994f6c0e")) {
           
            topic.topic = req.body.topic.trim();
            topic.url = req.body.topic.trim().replace(/ /g,"_");
            topic.content = req.body.content;
            topic.save(confirm);

          } else {
            res.status(401).send({
              success: false,
              message: 'ERROR: Not your topic'
            });
          }
          break;
        default: //Either the topic exists or it doesn't. Something is broken.
          res.status(500).send({
            success: false,
            message: 'ERROR: Topic stored incorrectly'
          });
      }
    });
  },
  deleteTopic: function(req, res) {
    Topic.findOne({url: req.params.topic_url}).remove(function (err) {
      if (err) {
        return res.send({
          success: false,
          message: 'ERROR: Could not delete topic'
        });
      }
      return res.send({
        success: true
      });
    });
  }
}

module.exports = routes;