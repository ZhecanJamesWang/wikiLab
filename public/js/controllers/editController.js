// public/js/controllers/editController.js
// edit controller for rendering newtopic and edittopic page

app.controller('editController', function($scope, TopicService) {

  $scope.topic_name = '';
  $scope.topic_description = '';

//function for creating new topic
  $scope.createTopic = function() {
    var confirmationPromise = TopicService.create({
      topic: $scope.topic_name,
      content: $scope.topic_description,
      url: $scope.topic_name.trim().replace(/ /g,"_")
    });

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


  getTopic = function(topic_url) {
      var confirmationPromise = TopicService.getTopic({
        url: TopicService.current_topic_url,
      });

      confirmationPromise.then(
        function(topic) {
          $scope.topic = topic.topic
          $scope.content = topic.content
        },
        function(error) {
          console.log('ERROR: Promise error in TodoController', error);
        }
      );
    };  


  current_topic_url = TopicService.current_topic_url;

  getTopic(current_topic_url);


  $scope.editTopic = function() {
    console.log("editTopic");
    console.log($scope.topic_name);
    console.log($scope.topic_description);
    console.log(TopicService.current_topic_url);


    var confirmationPromise = TopicService.create({
      topic: $scope.topic_name,
      content: $scope.topic_description,
      url: TopicService.current_topic_url
    });
    
    TopicService.go('/');

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

  // $scope.editTopic = function(todo) {
  //   var confirmationPromise = TodoService.edit({
  //     _id: todo._id,
  //     name: topic.topic_name,
  //     description: topic.topic_description,
  //   });
  //   confirmationPromise.then(
  //     function(confirmation) {
  //       if (confirmation.success) {
  //       $scope.topic_name = '';
  //       $scope.topic_description = '';
  //       }
  //     },
  //     function(error) {
  //       console.log('ERROR: Promise error in TodoController', error);
  //     }
  //   );
  // };

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