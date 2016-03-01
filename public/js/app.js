var app = angular.module('wikiLab', [
    'ngRoute'
  ]).config(['$routeProvider', '$locationProvider',
  function($routeProvider, $locationProvider) {

    $routeProvider

      // summary landing page
      .when('/', {
        templateUrl: 'partials/todos.html',
        controller: 'TodoController'
      });

      .when('/login', {
        templateUrl: 'partials/login.html',
        controller: 'LoginController'
      });

      .when('/logout', {
        resolve: {
          authentication: function(AuthService, $route) {
            return AuthService.logout();
          }
        }
      });

    $locationProvider.html5Mode(true);

}])