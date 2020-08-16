(function () {
  angular.module('MenuApp')
  .controller('CategoriesListController',CategoriesListController);

  CategoriesListController.$inject = ['list'];
  function CategoriesListController(list) {
    var categorieslist = this;
    categorieslist.list = list.data;
    console.log(categorieslist.list);
  }
})();
