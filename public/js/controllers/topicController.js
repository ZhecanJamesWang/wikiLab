// public/js/controllers/topicController.js
// topicController for rendering topicpage.html

app.controller('topicController', function($scope, TopicService) {  

//input topic url
//output specific topic info
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

});