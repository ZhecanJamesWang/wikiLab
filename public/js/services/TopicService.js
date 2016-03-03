// public/js/services/TodoService.js
// The main angular service for sharing functions and variables

app.service('TopicService', function($http, $q) {
  this.current_topic_url = '';

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
        }

      }, function (error) {
        console.log('ERROR: Promise error in TodoService', error);
        confirmation.reject(error);
      });
    return confirmation.promise;
  };

// function for editing existing topics
  this.edit = function(topicData) {
    var confirmation = $q.defer();
    $http.post('/api/editTopic', topicData)
      .then(function (response) {
        if (response.data.success) {
          confirmation.resolve({
            success: response.data.success,
            name: response.data.topic_name,
            description: response.data.topic_description,
            _id: response.data._id
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

// function for deleting existing topics
  this.delete = function(todoData) {
    var confirmation = $q.defer();
    $http.post('/api/deleteTodo', todoData)
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
});