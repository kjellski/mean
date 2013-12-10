angular.module('mean.system').controller('HeaderController', 
['$rootScope', '$scope', '$timeout', 'Global',
  function($rootScope, $scope, $timeout, Global) {
    $scope.global = Global;

    $scope.unauthorizedAccess = true;
    $rootScope.$on('event:401', function(event, args) {
      $scope.unauthorizedAccess = false;
      $scope.message = args;

      $timeout(function(){
        $scope.unauthorizedAccess = true;
        $scope.message = args;        
      }, 2000);
    });

    $scope.menu = [{
      "title": "Articles",
      "link": "articles"
    }, {
      "title": "Create New Article",
      "link": "articles/create"
    }];

    $scope.isCollapsed = false;
  }
]);