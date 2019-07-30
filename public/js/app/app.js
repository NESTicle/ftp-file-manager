let calipsuApp = angular.module('calipsuApp', ['angular-loading-bar']);

calipsuApp.config($httpProvider => {
    $httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
});