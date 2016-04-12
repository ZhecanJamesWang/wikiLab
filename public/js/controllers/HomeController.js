// public/js/controllers/HomeController.js
// home controller for rendering home.html page
// including functions for deleting topics and triggering editing functionality in client side

app.controller('HomeController', function($scope, $location, TopicService) {

  $scope.topicSearch = "";

//calling service get function to get all the topics
  TopicService.getTopicList().then(function(topics) {
    $scope.topics = topics;
    $scope.TopicsCount = topics.length;
  });


// get topic url to render topic page with topic controller
  $scope.getTopic = function(topic_url) {
      $location.path('/topic_page');
      TopicService.current_topic_url = topic_url
  };

  $scope.readTopic = function(url) {
    $location.path('/wiki/' + url);
  };

  $scope.createTopic = function() {
    $location.path('/new');
  };

// don't leave code from previous apps, please!
// (true throughout; I'm not going to keep removing)
});
