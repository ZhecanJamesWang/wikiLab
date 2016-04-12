//routes/routes.js

//main routing summary of app server side handling
var express = require('express'); // not necessary in this file
var mongoose = require('mongoose'); // you're not using this (because you're not using ObjectId)
var Topic = require('../models/topicModel');
var ObjectId = mongoose.Types.ObjectId; // you're not using this

var routes = {
  getTopic: function(req, res) {
    Topic.findOne({url: req.params.topic_url}, function (err, topic) {
      if (err) {
        return res.status(500).send({  // remember to set status code!
          success: false,
          message: 'ERROR: Could not create topic'
        });
      }
      return res.send({
        success: true,
        title: topic.title,
        url: topic.url,
        content: topic.content
      });
    });
  },
  getTopicList: function(req, res) {
    Topic.find(function(err, topics) {
      if (err) {
        console.log("ERROR: Cannot retrieve topics")
        /* be consistent with your error handling -- getTopic is different.
           500 would probably be a better error code than 404 -- 404 is usually reserved for missing pages, and
           500 just means "internal server error"
         */
        res.status(404);
      }
      var topicHeaders = [];
      for (var i = 0; i < topics.length; i++) {
        topicHeaders.push({
          title: topics[i].title,
          url: topics[i].url
        });
      }
      /* The 7 lines above could be done more elegantly with a functional map:
        var topicHeaders = topics.map(function(aTopic) {
          return {
            title: aTopic.title,
            url: aTopic.url
          };
        });
       */
      res.status(200).json(topicHeaders);
    });
  },
  editTopic: function(req, res) {
    function confirm(err, topic) {
      if (err) {
        return res.send({
          success: false,
          message: 'ERROR: Could not create topic'
        });
      }
      return res.send({
        success: true,
        title: topic.title,
        url: topic.url,
        content: topic.content
      });
    }
    Topic.find({url: req.params.topic_url}, function(err, topics) {
      // I like the switch statement! Concise & elegant :)
      switch(topics.length) {
        case 0: //Topic does not exist; create it!
          Topic.create({
            user: req.user._id,
            title: req.body.title.trim(),
            url: req.body.title.trim().replace(/ /g,"_"),
            content: req.body.content
          }, confirm);
          break;
        case 1: //Topic exists: edit it!
          var topic = topics[0];
          if (topic.user.toString() == req.user._id.toString()) {
            topic.title = req.body.title.trim();
            topic.url = req.body.title.trim().replace(/ /g,"_");
            topic.content = req.body.content;
            topic.save(confirm);
          } else {
            res.status(401).send({
              success: false,
              message: 'ERROR: Not your topic'
            });
          }
          break;
        default: // Multiple topics exist, or the topics object has an invalid length property
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
