//Setting up route
angular.module('mean').config(['$routeProvider', '$httpProvider',
    function($routeProvider, $httpProvider) {
        $routeProvider.
        when('/articles', {
            templateUrl: 'views/articles/list.html'
        }).
        when('/articles/create', {
            templateUrl: 'views/articles/create.html'
        }).
        when('/articles/:articleId/edit', {
            templateUrl: 'views/articles/edit.html'
        }).
        when('/articles/:articleId', {
            templateUrl: 'views/articles/view.html'
        }).
        when('/', {
            templateUrl: 'views/index.html'
        }).
        otherwise({
            redirectTo: '/'
        });

        // ==== CODE TO DO 401 NOT LOGGED IN CHECKING
        //This code will intercept 401 unauthorized errors returned from web requests.
        //On default any 401 will make the app think it is not logged in.
        var interceptor = ['$rootScope','$q', function(scope, $q) {
            function success(response) {
                return response;
            }

            function error(response) {
                var status = response.status;
                if (status == 401) {
                    var deferred = $q.defer();
                    var req = {
                        config: response.config,
                        deferred: deferred
                    };
                    scope.$broadcast('event:' + status, response.data);
                    return deferred.promise;
                }
                // otherwise
                return $q.reject(response);
            }

            return function(promise) {
                return promise.then(success, error);
            };
        }];

        $httpProvider.responseInterceptors.push(interceptor);
    }
]);

//Setting HTML5 Location Mode
angular.module('mean').config(['$locationProvider',
    function($locationProvider) {
        $locationProvider.hashPrefix("!");
    }
]);