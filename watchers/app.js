(function () {
  'use strict';
  angular.module("DigestCycle",[])
  .controller("DigestCycleController",DigestCycleController);

  DigestCycleController.$inject = ['$scope','$timeout'];
  function DigestCycleController($scope,$timeout) {
    $scope.onceCounter = 0;
    $scope.counter = 0;
    $scope.name = 'vishnu';

    $scope.showNumberOfWatcher = function () {
      console.log("# of watchers" , $scope.$$watchersCount);
    };

    $scope.countOnce = function () {
      $scope.onceCounter = 1;
    };


    $scope.counterMany = function () { //Pre-defined context $timeout same as in js
      $timeout(function () {
          $scope.$apply(function () {
            $scope.counter += 1;
            console.log('Counter Incremented!');
          });
      }, 2000);

    //This $scope.apply() will handle the exceptions if any thrown.
    // $scope.counterMany = function () {
    //   setTimeout(function () {
    //       $scope.$apply(function () {
    //         $scope.counter += 1;
    //         console.log('Counter Incremented!');
    //       });
    //   }, 2000);


    //In this counter value will be shown to user but if any exceptions
    //thrown not shown by angularjs
    // $scope.counterMany = function () {
    //   setTimeout(function () {
    //       $scope.counter += 1;
    //       console.log('Counter Incremented!');
    //       $scope.$digest();
    //   }, 2000);


    // In this log wll be shown up after 2 sec but incremented counter
    //will not be repainted on screen
    // $scope.counterMany = function () {
    //   setTimeout(function () {
    //       $scope.counter += 1;
    //       console.log('Counter Incremented!');
    //   }, 2000);

    }

    $scope.$watch(function () {
      console.log("Digest Cycle Fired!");
    })

    // watchers implemented by controller (usually not recommended to do)
    // $scope.$watch('onceCounter', function (newValue, oldValue) {
    //     console.log("onceCounter oldValue :", oldValue);
    //     console.log("onceCounter newValue :", newValue);
    // });
    //
    // $scope.$watch('counter', function (newValue, oldValue) {
    //     console.log("CounterMany oldValue :", oldValue);
    //     console.log("CounterMany newValue :", newValue);
    // });


  }
})();
