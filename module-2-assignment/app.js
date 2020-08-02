(function () {
  angular.module('ShoppingListCheckOffApp',[])
  .controller("ToBuyController",ToBuyController)
  .controller("AlreadyBoughtController",AlreadyBoughtController)
  .service("ShoppingListCheckOffService",ShoppingListCheckOffService);


  ToBuyController.$inject = ["ShoppingListCheckOffService"];
  function ToBuyController(ShoppingListCheckOffService) {
    var itemToBuy = this;

    itemToBuy.items = ShoppingListCheckOffService.getToBuyItems();

    itemToBuy.moveToBought = function (itemIndex) {
      ShoppingListCheckOffService.removeFromBuyItems(itemIndex)
    };

  }

  AlreadyBoughtController.$inject = ["ShoppingListCheckOffService"];
  function AlreadyBoughtController(ShoppingListCheckOffService) {
    var itemBought = this;
    itemBought.items = ShoppingListCheckOffService.getBoughtItems();
  }


  function ShoppingListCheckOffService() {
    var service = this;

    var toBuyItems = [
      {name:"cookies",quantity:10},
      {name:"chips",quantity:5},
      {name:"cake",quantity:3},
      {name:"pepto bismol",quantity:7},
      {name:"coke",quantity:2},
      {name:"corn flakes",quantity:5}
    ];

    var boughtItems = [];

    service.removeFromBuyItems = function (index) {
      addToBoughtItems(index);
      toBuyItems.splice(index,1);
    };

    function addToBoughtItems(index) {
      boughtItems.push(toBuyItems[index]);
    }

    service.getToBuyItems = function () {
      return toBuyItems;
    };

    service.getBoughtItems = function () {
      return boughtItems;
    };


  }
})();
