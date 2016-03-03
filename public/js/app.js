// <!-- public/js/app.js -->
// main angular app  module file
var app = angular.module('wiki', [
    'ngRoute'
  ]).config(['$routeProvider', '$locationProvider',
  function($routeProvider, $locationProvider) {


// angular routing summary
    $routeProvider
      .when('/', {
        templateUrl: 'partials/home.html',
        controller: 'homeController'
      })

      .when('/newtopic', {
        templateUrl: 'partials/newtopic.html',
        controller: 'editController'
      })

      .when('/topic_page', {
        templateUrl: 'partials/topicpage.html',
        controller: 'topicController'
      })

    $locationProvider.html5Mode(true);

}])