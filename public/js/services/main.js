'use strict';

angular.module('parserApp')
  .factory('MainService', function ($http, $q) {
    var service = {
      parser: function(url){
        var d = $q.defer();
        $http.post('/uri', {
          url: url
        }).success(function(data){
          console.log('sucessful get from server', data);
          d.resolve(data);
        }).error(function(error){
          console.log('error from server', error);
          d.reject(error);
        });
        return d.promise;
      }
    };
    return service;
  });
