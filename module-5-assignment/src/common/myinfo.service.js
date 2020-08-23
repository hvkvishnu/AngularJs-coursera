(function () {
  'use strict';
  angular.module('common')
  .service('MyInfoService',MyInfoService);

  function MyInfoService() {
    var service = this;

    service.setInfo = function (userInfo) {
      service.userInfo = userInfo;
    };

    service.getInfo = function () {
      return service.userInfo;
    };
  }
})();
