(function () {
    'use strict';

    const calipsuApp = angular.module('calipsuApp');

    calipsuApp.factory('responseHandlerService', ['$q', '$log', 'trafficCop', function ($q, $log, trafficCop) {
        return {
            handleSuccess: success,
            handleError: error
        };

        function success(response) {
            if (!response.config.skip_track) {
                trafficCop.pop();
            }

            return response.data;
        }

        function error(response) {
            $log.debug(response);

            if (!response.config.skip_track)
                trafficCop.pop();

            if (!angular.isObject(response.data) || !response.data.message)
                return $q.reject("Un error desconocido ha ocurrido");

            return $q.reject(response.data.message);
        }
    }]);

    calipsuApp.factory('server', ['$http', 'responseHandlerService', 'trafficCop', function ($http, responseHandlerService, trafficCop) {
        return {
            post: (url, args, skipTracking) => {
                let config = getConfig();
    
                if (skipTracking)
                    config.skip_track = true;
                else
                    trafficCop.push();
    
                return $http.post(url, args, config).then(responseHandlerService.handleSuccess, responseHandlerService.handleError);
            },
    
            get: (url, args, skipTracking) => {
                let config = getConfig();
    
                if (skipTracking) {
                    config.skip_track = true;
                } else {
                    trafficCop.push();
                }
    
                config.params = args;
    
                return $http.get(url, config).then(responseHandlerService.handleSuccess, responseHandlerService.handleError);
            }
        };
        
        function getConfig() {
            return {
                headers: {
                    // responseType:'arraybuffer'
                    // '__RequestVerificationToken': angular.element("input[name='__RequestVerificationToken']").val()
                },
                skip_track: false
            };
        }
    }]);

    calipsuApp.service('trafficCop', function() {
        let pending = 0;
    
        return {
            pending: () => pending,
            push: push,
            pop: pop
        };
        
        function push() {
            pending++;
        }

        function pop() {
            pending--;
        }
    });
})();
