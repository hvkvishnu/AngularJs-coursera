(function () {
  'use strict';
  angular.module('MenuApp')
  .config(RoutesConfig);

  RoutesConfig.$inject = ['$stateProvider','$urlRouterProvider'];
  function RoutesConfig($stateProvider,$urlRouterProvider) {

    $urlRouterProvider.otherwise('/');

    $stateProvider

    //Home page
    .state('home',{
      url:'/',
      templateUrl:'src/menuapp/templates/home.template.html'
    })

    //Categories list page
    .state('categoriesList',{

      url:'/categories-list',
      templateUrl:'src/menuapp/templates/main-categorieslist.template.html',
      controller:'CategoriesListController as categoriesList',
      resolve:{
        list:['MenuDataService',function (MenuDataService) {
          console.log("inside route category");
          return MenuDataService.getAllCategories();
        }]
      }
    })

    //Specific item page
    .state('itemsList',{
      url:'/items-list/{categoryShortName}',
      templateUrl:'src/menuapp/templates/main-itemslist.template.html',
      controller:'ItemsListController as itemsList',
      params:{
        categoryShortName:null,
        categoryName:null
      },
      resolve:{
        items:['$stateParams','MenuDataService',function ($stateParams,MenuDataService) {
          console.log("category Name:",$stateParams.categoryName);
          return MenuDataService.getItemsForCategory($stateParams.categoryShortName);
        }]
      }
    });
  }
})();
