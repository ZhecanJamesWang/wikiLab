// <!-- public/js/app.js -->
// main angular app  module file
var app = angular.module('wikiLab', [
    'ngRoute'
  ]).config(['$routeProvider', '$locationProvider',
  function($routeProvider, $locationProvider) {


// angular routing summary
    $routeProvider
      .when('/', {
        templateUrl: 'partials/home.html',
        controller: 'HomeController',
        resolve: {
          authentication: function(AuthService, $route) {
            return AuthService.checkAuthentication();
          }
        }
      })

      .when('/newtopic', {
        templateUrl: 'partials/newtopic.html',
        controller: 'editController'
      })

      .when('/edittopic', {
        templateUrl: 'partials/edittopic.html',
        controller: 'editController'
      })

      .when('/topic_page', {
        templateUrl: 'partials/topicpage.html',
        controller: 'topicController'
      })

      .when('/login', {
        templateUrl: 'partials/login.html',
        controller: 'LoginController'
      })

      .when('/signup', {
        templateUrl: 'partials/signup.html',
        controller: 'SignupController'
      })

      .when('/logout', {
        resolve: {
          authentication: function(AuthService, $route) {
            return AuthService.logout();
          }
        }
      });

    $locationProvider.html5Mode(true);

}])