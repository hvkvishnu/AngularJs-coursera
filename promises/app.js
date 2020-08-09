(function () {
  'use strict';
  angular.module('ShoppingListApp',[])
  .controller("ShoppingListAddController",ShoppingListAddController)
  .controller("ShoppingListShowController",ShoppingListShowController)
  .service("ShoppingService",ShoppingService)
  .service("WeightLossFilterService",WeightLossFilterService);

  ShoppingListAddController.$inject = ["ShoppingService"];
  function ShoppingListAddController(ShoppingService) {
    var itemAdder = this;
    itemAdder.itemName = '';
    itemAdder.itemQuantity = '';

    itemAdder.addItem = function () {
      ShoppingService.addItem(itemAdder.itemName,itemAdder.itemQuantity);
    };
  }

  ShoppingListShowController.$inject = ["ShoppingService"];
  function ShoppingListShowController(ShoppingService) {
    var itemShow = this;
    itemShow.items = ShoppingService.getItem();

    itemShow.removeItem = function (itemIndex) {
        ShoppingService.removeItem(itemIndex)
    }
  }

ShoppingService.$inject = ["$q","WeightLossFilterService"];
  function ShoppingService($q,WeightLossFilterService) {
    var service = this;

    var items = [];

    service.addItem = function (itemName,itemQuantity) {

      var namePromise = WeightLossFilterService.checkName(itemName);
      var quantityPromise = WeightLossFilterService.checkQuantity(itemQuantity);

      $q.all([namePromise,quantityPromise])
      .then(function (response) {
        var item = {
          name : itemName,
          quantity : itemQuantity
        };
        items.push(item);
      })
      .catch(function (errorResponse) {
        console.log(errorResponse.message);
      });

    };



    service.removeItem = function (itemIndex) {
      items.splice(itemIndex,1);
    };

    service.getItem = function () {
      return items;
    };
  }

  WeightLossFilterService.$inject = ["$q","$timeout"];
  function WeightLossFilterService($q,$timeout) {
    var service = this;

    service.checkName = function (name) {
      var deffered = $q.defer();

      var result = {
        message : ""
      };

      $timeout(function () {
        if(name.toLowerCase().indexOf("cookies") === -1){
          deffered.resolve(result);
        }
        else{
          result.message = "Stay away from cookie";
          deffered.reject(result);
        }
      },3000);

      return deffered.promise;
    };

    service.checkQuantity = function (quantity) {
      var deffered = $q.defer();

      var result = {
        message : ""
      };

      $timeout(function () {
        if(quantity <= 5){
          deffered.resolve(result);
        }
        else{
          result.message = "That's too much";
          deffered.reject(result);
        }
      },1000);
      return deffered.promise;
    };
  }

})();
