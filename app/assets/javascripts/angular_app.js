
// define which angular app is used
var app = angular.module('myapp', []);
// define a controller
app.controller('myctr', function($scope)
   {
   	$scope.name = "Amir";
   });