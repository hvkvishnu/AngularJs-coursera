(function() {
"use strict";

angular.module('common', [])
.constant('ApiPath', 'https://hvkvishnu-ajscourse.herokuapp.com')
.config(config);

config.$inject = ['$httpProvider'];
function config($httpProvider) {
  $httpProvider.interceptors.push('loadingHttpInterceptor');
}

})();
