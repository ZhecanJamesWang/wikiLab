var app = angular.module('wikiLab', [
    'ngRoute'
  ]).config(['$routeProvider', '$locationProvider',
  function($routeProvider, $locationProvider) {

    $routeProvider

      // summary landing page
      .when('/', {
        templateUrl: 'partials/home.html',
        controller: 'HomeController',
        resolve: {
          authentication: function(AuthService, $route) {
            return AuthService.checkAuthentication();
          }
        }
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