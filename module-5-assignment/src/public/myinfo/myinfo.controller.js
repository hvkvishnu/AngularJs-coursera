(function () {
  'use strict';
  angular.module('public')
  .controller('MyInfoController',MyInfoController);

  MyInfoController.$inject = ['userInfo','MenuService'];
  function MyInfoController(userInfo,MenuService){
    var $ctrl = this;
    if (userInfo) {
      $ctrl.userInfo = userInfo;
      MenuService.getFavouriteItem(userInfo.favorite)
      .then(function (response) {
        $ctrl.favouriteItem = response;
      })
      .catch(function (errorResponse) {
        console.log(errorResponse);
      });
    }
  }
})();
