(function () {
  'use strict';
  angular.module('ShoppingListEventsApp',[])
  .controller("ShoppingListController",ShoppingListController)
  .service("ShoppingListService",ShoppingListService)
  .service("WeightLossFilterService",WeightLossFilterService)
  .component("shoppingList",{
    templateUrl : "shoppingList.html",
    controller : ShoppingListComponentController,
    bindings:{
      items:'<',
      myTitle:'@title',
      onRemove:'&'
    }
  })
  .component("loadingSpinner",{
    templateUrl:"spinner.html",
    controller:SpinnerController
  });

  SpinnerController.$inject = ["$rootScope"];
  function SpinnerController($rootScope) {
    var $ctrl = this;
    var cancelListener =
     $rootScope.$on('shoppinglist:processing',function (event,data) {
      console.log("Event :",event);
      console.log("Data :",data);

      if(data.on){
        $ctrl.showSpinner = true;
        console.log("showSpinner true");
      }
      else {

        $ctrl.showSpinner = false;
      }
    });

    $ctrl.$onDestroy = function () {
      cancelListener();
    };
  }

  ShoppingListComponentController.$inject = ["$rootScope","$element","$q","WeightLossFilterService"];
  function ShoppingListComponentController($rootScope,$element,$q,WeightLossFilterService) {
    var $ctrl = this;
    var totalItems;

    $ctrl.$onInit = function () {
      totalItems = 0;
    };

    $ctrl.$doCheck = function () {
      //console.log("on $doCheck");
      if($ctrl.items.length !== totalItems){
        totalItems = $ctrl.items.length;
        $rootScope.$broadcast("shoppinglist:processing",{on:true});
        var promises = [];
        for (var i = 0; i < $ctrl.items.length; i++) {
          promises.push(WeightLossFilterService.checkName($ctrl.items[i].name));
        }

        $q.all(promises)
        .then(function (result) {
          console.log("no error");
          var warningElem = $element.find("div.error");
          warningElem.slideUp(900);
        })
        .catch(function (result) {
          console.log("error");
          var warningElem = $element.find("div.error");
          warningElem.slideDown(900);
        })
        .finally(function () {
          $rootScope.$broadcast("shoppinglist:processing",{on:false});
        });
      }
    };

    $ctrl.remove = function (myIndex) {
      $ctrl.onRemove({index:myIndex});
    };
  }

  ShoppingListController.$inject = ["ShoppingListService"];
  function ShoppingListController(ShoppingListService) {
    var itemAdder = this;
    itemAdder.itemName = '';
    itemAdder.itemQuantity = '';
    itemAdder.lastRemovedItem = '';
    var origTitle = "shoppingList #1";

    itemAdder.items = ShoppingListService.getItem();
    itemAdder.title = origTitle + '( ' + itemAdder.items.length + ' )';

    itemAdder.addItem = function () {
      ShoppingListService.addItem(itemAdder.itemName,itemAdder.itemQuantity);
      itemAdder.title = origTitle + '( ' + itemAdder.items.length + ' )';
    };

    itemAdder.removeItem = function (itemIndex) {
        itemAdder.lastRemovedItem = itemAdder.items[itemIndex].name;
        ShoppingListService.removeItem(itemIndex);
        itemAdder.title = origTitle + '( ' + itemAdder.items.length + ' )';
    }
  }


  function ShoppingListService() {
    var service = this;

    var items = [];

    service.addItem = function (itemName,itemQuantity) {
      var item = {
        name : itemName,
        quantity : itemQuantity
      };
      items.push(item);
    };

    service.removeItem = function (itemIndex) {
      items.splice(itemIndex,1);
    }

    service.getItem = function () {

      return items;
    };
  }

  WeightLossFilterService.$inject = ["$q","$timeout"];
  function WeightLossFilterService($q,$timeout) {
    var service = this;

    service.checkName = function (name) {
      var deferred = $q.defer();
      var result = {
        message : ""
      };
      $timeout(function () {
        if(name.toLowerCase().indexOf("cookie") === -1){
          deferred.resolve(result);
        }
        else {
          result.message = "Waring Cookies Detected";
          deferred.reject(result);
        }
      },3000);
      return deferred.promise;
    };
  }

})();
