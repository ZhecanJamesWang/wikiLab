// public/js/controllers/editController.js
// edit controller for rendering newtopic and edittopic page

app.controller('editController', function($scope, TopicService) {

//function for creating new topic
  $scope.createTopic = function() {
    console.log("createTopic start");
    var confirmationPromise = TopicService.create({
      topic: $scope.topic_name,
      content: $scope.topic_description,
      url: $scope.topic_name.trim().replace(/ /g,"_")
    });
    console.log("createTopic end");

    confirmationPromise.then(
      function(confirmation) {
        $scope.topic_name = '';
        $scope.topic_description = '';
      },
      function(error) {
        console.log('ERROR: Promise error in TodoController', error);
      }
    );
  };


// calling TopicService funciton for redirecting url
  $scope.go = function ( path ) {
    TopicService.go(path);
  };


  $scope.editTopic = function(todo) {
    var confirmationPromise = TodoService.edit({
      _id: todo._id,
      name: topic.topic_name,
      description: topic.topic_description,
    });
    confirmationPromise.then(
      function(confirmation) {
        if (confirmation.success) {
        $scope.topic_name = '';
        $scope.topic_description = '';
        }
      },
      function(error) {
        console.log('ERROR: Promise error in TodoController', error);
      }
    );
  };


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