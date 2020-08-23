(function () {
  'use strict';
  angular.module("public")
  .controller('SignUpController',SignUpController);

  SignUpController.$inject = ['MenuService','MyInfoService'];
  function SignUpController(MenuService,MyInfoService) {
    var $ctrl = this;
    $ctrl.info = {};

    $ctrl.submit = function () {
      if ($ctrl.info.favorite !== undefined) {
        MenuService.getFavouriteItem($ctrl.info.favorite)
        .then(function (response) {
          MyInfoService.setInfo($ctrl.info);
          $ctrl.itemInVaild = false;
          $ctrl.submitted = true;
        })
        .catch(function (error) {
          $ctrl.itemInVaild = true;
          $ctrl.submitted = false;
        });
      }

    };
  }
})();
