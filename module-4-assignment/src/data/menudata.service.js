(function () {
  angular.module('Data')
  .service('MenuDataService',MenuDataService);
  // .constant("https://davids-restaurant.herokuapp.com/categories.json",MenuCategoriesPath)
  // .constant("https://davids-restaurant.herokuapp.com/menu_items.json",MenuItemsPath);


  MenuDataService.$inject = ["$http"];
  function MenuDataService($http) {
    var service = this;
    console.log("MenuDataService");
    service.getAllCategories = function () {
      console.log("Inside get categories");
      return $http({
        method:'GET',
        url:"https://davids-restaurant.herokuapp.com/categories.json"
      });
    };

    service.getItemsForCategory = function (category) {
      console.log("MenuDataService category ",category);
      return $http({
        method:'GET',
        url:"https://davids-restaurant.herokuapp.com/menu_items.json",
        params:{category:category}
      });
    };
  }
})();
