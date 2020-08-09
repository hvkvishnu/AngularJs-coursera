(function () {
  angular.module("MenuCategoriesApp",[])
  .controller("MenuCategoriesController",MenuCategoriesController)
  .service("MenuCategoriesService",MenuCategoriesService)
  .constant("ApiBasePath","https://davids-restaurant.herokuapp.com");

  MenuCategoriesController.$inject = ["MenuCategoriesService"];
  function MenuCategoriesController(MenuCategoriesService) {
    var menu = this;

    var promise = MenuCategoriesService.getMenuCategories();

    promise.then(function (response) {
      menu.categories = response.data;
      //console.log(response);
    })
    .catch(function (error) {
      console.log("Something went wrong!");
    });

    menu.logMenuItems = function (short_name) {
      var promise = MenuCategoriesService.getMenuForCategory(short_name);
      promise.then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.log("Something went wrong!");
      });
    }
  }

  MenuCategoriesService.$inject = ["$http","ApiBasePath"];
  function MenuCategoriesService($http,ApiBasePath) {
    var service = this;

    service.getMenuCategories = function () {
      var response = $http({
        method : "GET",
        url: (ApiBasePath + "/categories.json")
      });
      return response;
    };

    service.getMenuForCategory = function (short_name) {
      var response = $http({
        method : "GET",
        url : (ApiBasePath + "/menu_items.json"),
        params : {
          category : short_name
        }
      });
      return response;
    };

    $http({
  method: 'GET',
  url: 'http://google.com'
})
.then(function(response) {
  console.log(response)
});
  }
})();
