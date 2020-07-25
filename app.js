(function () {
  'use strict';

  angular.module("NameCalculator",[])
  .controller('NameCalculatorController',function($scope,$filter){

    console.log($scope);

    $scope.name = '';
    $scope.totalvalue = 0;

    $scope.displayNumeric = function () {
      var totalNameValue = calculateNumericForString($scope.name);
      $scope.totalvalue = totalNameValue;

    };

    $scope.uppper = function () {
      var upcase = $filter('uppercase');
      $scope.name = upcase($scope.name);
    }

    function calculateNumericForString(string) {
      var totalStringValue = 0;
      for (var i = 0; i < string.length; i++) {
        totalStringValue += string.charCodeAt(i);
      }
      return totalStringValue;
    }


  });
})();
