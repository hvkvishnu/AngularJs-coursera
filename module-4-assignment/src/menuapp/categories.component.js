(function () {
  angular.module('MenuApp')
  .component('categoriesList',{
    templateUrl:"src/menuapp/templates/categorieslist.template.html",
    bindings:{
      list:'<'
    }
  });
})();
