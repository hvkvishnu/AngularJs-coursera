(function () {
  angular.module('MenuApp')
  .component('itemsList',{
    templateUrl:"src/menuapp/templates/itemslist.template.html",
    bindings:{
      items:'<',
      category:'<'
    }
  });
})();
