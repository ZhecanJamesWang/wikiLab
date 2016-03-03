// public/js/controllers/homeController.js
// home controller for rendering home.html page

app.controller('homeController', function($scope, $location, TopicService) {
  


//calling service get function to get all the topics
  TopicService.get().then(function(topics) {
    $scope.topics = topics;
    $scope.TopicsCount = topics.length;
  });


// get topic url to render topic page with topic controller
  $scope.getTopic = function(topic_url) {
      console.log("homeController getTopic");
      $location.path('/topic_page');
      TopicService.current_topic_url = topic_url
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