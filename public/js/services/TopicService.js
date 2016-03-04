// public/js/services/TodoService.js
// The main angular service for sharing functions and variables

app.service('TopicService', function($http, $q, $location) {
  this.current_topic_url = '';
  this.editing = false;

// fucntion for creating topic
  this.create = function(topicData) {
    var confirmation = $q.defer();

    $http.post('/api/editTopic/' + topicData.url, topicData)
      .then(function (response) {
        if (response.data.success) {
          confirmation.resolve({
            success: response.data.success,
            topic: response.data.topic,
            url: response.data.url,
            content: response.data.content,
          });
        } else {
          confirmation.resolve({
            success: response.data.success,
            message: response.data.message
          });
          console.log("response.data.message");
          console.log(response.data.topic);
        }

      }, function (error) {
        console.log('ERROR: Promise error in TodoService', error);
        confirmation.reject(error);
      });
    return confirmation.promise;
  };

// function for deleting existing topics
  this.delete = function(topicData) {
    var confirmation = $q.defer();
    $http.post('/api/deleteTopic/' + topicData.url, topicData)
      .then(function (response) {
        if (response.data.success) {
          confirmation.resolve({
            success: response.data.success
          });
        } else {
          confirmation.resolve({
            success: response.data.success,
            message: response.data.message
          });
        }

      }, function (error) {
        console.log('ERROR: Promise error in TodoService', error);
        confirmation.reject(error);
      });
    return confirmation.promise;
  };

// function for getting a list of stored topics
  this.get = function() {
    var topics = $http.get('/api/getTopicList').then(function (response) {
        return response.data;
      });
    return topics;
  };

// function for getting a specific topic info
  this.getTopic = function(topicData) {
    var topics = $http.get('/api/getTopic/'+topicData.url).then(function (response) {
        return response.data;
      });
    return topics;
  };

// funciton for redirecting url
  this.go = function ( path ) {
    $location.path( path );
  };

});