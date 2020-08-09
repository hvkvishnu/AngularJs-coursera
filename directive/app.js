(function () {
  'use strict';
  angular.module('ShoppingListApp',[])
  .controller("ShoppingListAddController",ShoppingListAddController)
  .service("ShoppingService",ShoppingService)
  .directive("shoppingList",ShoppingListDirective);

  function ShoppingListDirective() {
    var ddo = {
      templateUrl : "shoppingList.html",
      scope:{
        items:'<',
        myTitle:'@title',
        onRemove:'&'
      },
      controller : ShoppingListDirectiveController,
      controllerAs: 'list',
      bindToController: true
    }
    return ddo;
  }

  function ShoppingListDirectiveController() {
    var dlist = this;

    dlist.cookiesInList = function () {
      for(var i=0; i < dlist.items.length; i++){
        var name = dlist.items[i].name;
        if(name.toLowerCase().indexOf("cookie") !== -1){
          return true;
        }
      }
      return false;
    }
  }

  ShoppingListAddController.$inject = ["ShoppingService"];
  function ShoppingListAddController(ShoppingService) {
    var itemAdder = this;
    itemAdder.itemName = '';
    itemAdder.itemQuantity = '';
    itemAdder.lastRemovedItem = '';
    var origTitle = "shoppingList #1";

    itemAdder.items = ShoppingService.getItem();
    itemAdder.title = origTitle + '( ' + itemAdder.items.length + ' )';

    itemAdder.addItem = function () {
      ShoppingService.addItem(itemAdder.itemName,itemAdder.itemQuantity);
      itemAdder.title = origTitle + '( ' + itemAdder.items.length + ' )';
    };

    itemAdder.removeItem = function (itemIndex) {
        itemAdder.lastRemovedItem = itemAdder.items[itemIndex].name;
        ShoppingService.removeItem(itemIndex);
        itemAdder.title = origTitle + '( ' + itemAdder.items.length + ' )';
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
      console.log(typeof(items));
      console.log(items);
    };

    service.removeItem = function (itemIndex) {
      items.splice(itemIndex,1);
    }

    service.getItem = function () {

      return items;
    };
  }

})();
