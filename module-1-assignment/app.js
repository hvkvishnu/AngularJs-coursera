(function () {
  'use strict';
  angular.module('LunchChecker',[])
  .controller('LunchCheckerController',LunchCheckerController);

  LunchCheckerController.$inject = ['$scope'];

  function LunchCheckerController($scope) {
      $scope.itemString = '';
      $scope.checkMessage = '';
      $scope.textColor = '';
      $scope.borderColor = '';


      $scope.checkQuantity = function () {
        if($scope.itemString == ''){
          $scope.checkMessage = 'Please enter data first';
          $scope.textColor = 'red';
          $scope.borderColor = 'red';
        }
        else{
        var totalItem = splitItem($scope.itemString);
        $scope.textColor = 'green';
        $scope.borderColor = 'green';
        $scope.checkMessage = checkConstraint(totalItem);
      }
    }
  }

  function splitItem(string) {
    var items = string.split(',');
    console.log(items);
    return checkBlankItems(items);
  }

  function checkBlankItems(items) {
    let finalItemsCount = items.length;
    for (var i = 0; i < items.length; i++) {
      if(items[i].trim() == ""){
        finalItemsCount--;
      }
    }
    return finalItemsCount;
  }

  function checkConstraint(totalValue) {
    if (totalValue <= 3) {
      return 'Enjoy!';
    }
    return 'Too much!';
  }

})();
