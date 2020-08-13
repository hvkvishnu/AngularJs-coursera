(function () {
  angular.module("NarrowItDownApp",[])
  .controller("NarrowItDownController",NarrowItDownController)
  .service("MenuSearchService",MenuSearchService)
  .directive("foundItems",FoundItems)
  .component("loadingSpinner",{
    templateUrl:"spinner.html",
    controller:SpinnerController
  })
  .constant("ApiPath","https://davids-restaurant.herokuapp.com/menu_items.json");

  SpinnerController.$inject = ["$rootScope"];
  function SpinnerController($rootScope) {
    var $ctrl = this;
    $ctrl.showSpinner = false;
    var cancelListener =$rootScope.$on('shoppinglist:processing',function (event,data) {
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

  function FoundItems() {
    var ddo = {
      templateUrl:"loader/itemsloaderindicator.html",
      scope:{
        itemsFound:"<",
        onRemove:"&"
      },
      controller:FoundItemsController,
      controllerAs: 'list',
      bindToController:true,
      link: FoundItemsLink
    };
    return ddo;
  }

  function FoundItemsLink(scope,elem,attr,controller) {

    scope.$watch('list.findZeroLength()',function (newValue,oldValue) {
      if (newValue) {
        displayNoItemWarning();
      }
      else{
        removeNoItemWarning();
      }
    });

    function displayNoItemWarning() {
      console.log("inside displayNoItemWarning");
      var warningElem = elem.find("div.error");
      var headElem = elem.find("div.head");
      warningElem.slideDown(800);
      headElem.slideUp(10);


    }

    function removeNoItemWarning() {
      var warningElem = elem.find("div.error");
      var headElem = elem.find("div.head");
      warningElem.slideUp(800);
      headElem.slideDown(10);
    }
  }

  function FoundItemsController() {
    var list = this;
    list.isInitial = function () {

    }

    list.findZeroLength = function () {
      if (list.itemsFound != undefined && list.itemsFound.length <= 0 ) {
        return true;
      }
      return false;
    }
  }

  NarrowItDownController.$inject = ["$rootScope","MenuSearchService"];
  function NarrowItDownController($rootScope,MenuSearchService) {
    var menu = this;
    menu.searchTerm = '';
    //menu.foundItems = [];
    console.log("$rootScope ",$rootScope);

    menu.getMenuItems = function () {
      var promise = MenuSearchService.getMatchedMenuItems(menu.searchTerm);
      $rootScope.$broadcast("shoppinglist:processing",{on:true});
      promise.then(function (response) {
          //console.log(response);
          menu.foundItems = response;
      })
      .catch(function (error) {
          console.log(error);
      })
      .finally(function () {
        $rootScope.$broadcast("shoppinglist:processing",{on:false});
      });
    };

    menu.removeItem = function (index) {
      menu.foundItems = MenuSearchService.onRemoveItem(menu.foundItems,index);
    };

  }

  MenuSearchService.$inject = ["$http","ApiPath"];
  function MenuSearchService($http,ApiPath) {
    var service = this;
    service.getMatchedMenuItems = function (searchTerm) {
      // console.log("inside getMatchedMenuItems");

      return $http({
        method:"GET",
        url:ApiPath
      })
      .then(function (result) {
        var menuItems = result.data.menu_items;
        var foundItems = [];
        if (searchTerm === "") {
          return foundItems;
        }
        for (var i = 0; i < menuItems.length; i++) {
          if(menuItems[i].description.indexOf(searchTerm) !== -1){
            foundItems.push(menuItems[i]);
          }
        }
        return foundItems;
      });
    };

    service.onRemoveItem = function(foundItems,itemIndex){
      foundItems.splice(itemIndex,1);
      return foundItems;
    };
  }
})();
