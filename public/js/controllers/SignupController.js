// public/js/controllers/SignupController.js
app.controller('SignupController', function($scope, AuthService) {
  
  $scope.signupForm = function() {
    AuthService.createAccount({
      username: $scope.username,
      password: $scope.password
    });    
  }

});