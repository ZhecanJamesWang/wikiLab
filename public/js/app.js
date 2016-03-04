// <!-- public/js/app.js -->
// main angular app  module file
// angular routing summary for client side routing

var app = angular.module('wikiLab', [
    'ngRoute'
  ]).config([
    '$routeProvider',
    '$locationProvider',
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

    .when('/new', {
      templateUrl: 'partials/topic.html',
      controller: 'TopicController'
    })

    .when('/wiki/:topic_url/:cmd', {
      templateUrl: 'partials/topic.html',
      controller: 'TopicController'
    })

    .when('/wiki/:topic_url', {
      templateUrl: 'partials/topic.html',
      controller: 'TopicController'
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


app.run(['$route', '$rootScope', '$location', function ($route, $rootScope, $location) {
    var original = $location.path;
    $location.path = function (path, reload) {
        if (reload === false) {
            var lastRoute = $route.current;
            var un = $rootScope.$on('$locationChangeSuccess', function () {
                $route.current = lastRoute;
                un();
            });
        }
        return original.apply($location, [path]);
    };
}]);