(function () {
  'use strict';
  angular.module('ShoppingListApp',[])
  .controller("ShoppingListAddController",ShoppingListAddController)
  .controller("ShoppingListShowController",ShoppingListShowController)
  .service("ShoppingService",ShoppingService);

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

  function ShoppingService() {
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

})();
