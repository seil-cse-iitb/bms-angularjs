var API_ROOT = "http://localhost:1337/"

angular.module('seil-bms-angularjs')

.service('Auth',['$http','$location',function($http, $location){

  this.loginRequired = function($state){
    $http.get('/auth/verify').then(function(){},function(){
      console.log("go to login");
      localStorage.removeItem('id_token');
      $location.path('/login');
    })
  }
}])
.factory('Sensor', function($resource) {
  return $resource(API_ROOT+'sensor/:sensorId', { sensorId:'@id' });
})
.factory('Equipment', function($resource) {
  return $resource(API_ROOT+'equipment/:equipmentId', { sensorId:'@id' });
})
// .factory('channel', function($resource) {
//   return $resource('/todo/:todoId', { todoId:'@_id' });
// });