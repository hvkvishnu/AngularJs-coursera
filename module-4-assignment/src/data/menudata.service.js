(function () {
  angular.module('Data')
  .service('MenuDataService',MenuDataService);
  // .constant("https://davids-restaurant.herokuapp.com/categories.json",MenuCategoriesPath)
  // .constant("https://davids-restaurant.herokuapp.com/menu_items.json",MenuItemsPath);


  MenuDataService.$inject = ["$http"];
  function MenuDataService($http) {
    var service = this;
    service.getAllCategories = function () {
      return $http({
        method:'GET',
        url:"https://davids-restaurant.herokuapp.com/categories.json"
      });
    };

    service.getItemsForCategory = function (category) {
      return $http({
        method:'GET',
        url:"https://davids-restaurant.herokuapp.com/menu_items.json",
        params:{category:category}
      });
    };
  }
})();
