(function () {
  angular.module('MenuApp')
  .controller('ItemsListController',ItemsListController);

  ItemsListController.$inject = ['$stateParams','items'];
  function ItemsListController($stateParams,items) {
    var itemlist = this;
    itemlist.items = items.data.menu_items;
    itemlist.category= $stateParams.categoryName;
    console.log('categoryName in controller',itemlist.category);
    console.log(itemlist);
  }
})();
