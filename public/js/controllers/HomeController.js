// public/js/controllers/HomeController.js
// home controller for rendering home.html page
// including functions for deleting topics and triggering editing functionality in client side

app.controller('HomeController', function($scope, $location, TopicService) {
  
  $scope.topicSearch = "";

//calling service get function to get all the topics
  TopicService.getTopicList().then(function(topics) {
    console.log(topics);
    $scope.topics = topics;
    $scope.TopicsCount = topics.length;
  });


// get topic url to render topic page with topic controller
  $scope.getTopic = function(topic_url) {
      $location.path('/topic_page');
      TopicService.current_topic_url = topic_url
  };

$scope.editTopic = function(topic_url) {
      $location.path('/edittopic');
      TopicService.current_topic_url = topic_url
  };

$scope.deleteTopic = function(topic_url) {
    var confirmationPromise = TopicService.delete({
      url: topic_url
    });
    
    confirmationPromise.then(
      function(confirmation) {
        var chosenTopic = $scope.topics.find(function (topic) { 
          return topic.url === topic_url;
          });
        var index = $scope.topics.indexOf(chosenTopic);
        $scope.topics.splice(index, 1);
        $scope.TopicsCount = $scope.topics.length;
      },
      function(error) {
        console.log('ERROR: Promise error in TodoController', error);
      }
    );
  };

//left codes from the previous app--------------------------------------------------------------------------------------------------

  $scope.filterCallback = function(category) {
    if (category == 'all') {
      $scope.todos = $scope.todos.concat($scope.hiddenTodos);
      $scope.hiddenTodos = [];
    } else {
      var newTodos = [];
      var newHiddenTodos = [];
      var check = (category == 'completed');
      for (var i = 0; i < $scope.todos.length; i++) {
        if ($scope.todos[i].completed == check) {
          newTodos.push($scope.todos[i]);
        } else {
          newHiddenTodos.push($scope.todos[i]);
        }
      }
      for (var i = 0; i < $scope.hiddenTodos.length; i++) {
        if ($scope.hiddenTodos[i].completed == check) {
          newTodos.push($scope.hiddenTodos[i]);
        } else {
          newHiddenTodos.push($scope.hiddenTodos[i]);
        }
      }
      $scope.todos = newTodos;
      $scope.hiddenTodos = newHiddenTodos;
    }
  };

  $scope.$parent.registerFilterCallback($scope.filterCallback);

});