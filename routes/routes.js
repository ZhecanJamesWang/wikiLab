var express = require('express');
var mongoose = require('mongoose');
var Topic = require('../models/topicModel');

var routes = {
  getTopic: function(req, res) {
    Topic.findOne({url: req.params.url},function(err, topic) {
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
  }

  editTopic: function(req, res) {
    function done(err, topic) {
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
    Topic.find({url: req.params.url}, function(err, topics) {
      switch(topics.length) {
        case 0: //Topic does not exist; create it!
          Topic.create({
            user: req.user._id
            topic: req.body.topic.trim(),
            url: req.body.topic.trim().replace(/ /g,"_"),
            content: req.body.content
          }, done);
          break;
        case 1: //Topic exists: edit it!
          var topic = topics[0];
          if (topic.user == req.user._id) {
            topic.save({
              topic: req.body.topic.trim(),
              url: req.body.topic.trim().replace(/ /g,"_"),
              content: req.body.content
            }, done);
          } else {
            
          }

          break;
        default: //Either the topic exists or it doesn't. Something is broken.
      }
    });
  },
  deleteTodo: function(req, res) {
    Todo.findById(req.body.id).remove(function (err) {
      if (err) {
        return res.send({
          success: false,
          message: 'ERROR: Could not save todo'
        });
      }
      return res.send({
        success: true
      });
    });
  }
}

module.exports = routes;