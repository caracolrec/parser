'use strict';

angular.module('parserApp')
  .controller('MainCtrl', function ($scope, MainService) {
    console.log($scope.url);
    $scope.parse = function(){
      console.log(JSON.stringify($scope.url));
      MainService.parser(JSON.stringify($scope.url));
    };
  });
