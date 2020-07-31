(function () {
  'use strict';
  angular.module('CustomFilterApp',[])
  .controller('CustomFilterAppController',CustomFilterAppController)
  .filter('custom',CustomFilterFactory)
  .filter('truth',TruthFilter);

  CustomFilterAppController.$inject = ['$scope','customFilter'];
  function CustomFilterAppController($scope,customFilter) {

    $scope.sayMessage = function () {
      var msg = "I like to learn new technologies";
      return msg;

  };

  $scope.sayCustomMessage = function () {
    var msg = "I like to learn new technologies";
    msg = customFilter(msg);
    return msg;
  };
}

function CustomFilterFactory() {
    return function (input) {
      input = input || '';
      input = input.replace('like','love');
      return input;
    };
  }

function TruthFilter() {
  return function (input, target, replace) {
    input = input || '';
    input = input.replace(target,replace);
    return input;
  };
}
})();
