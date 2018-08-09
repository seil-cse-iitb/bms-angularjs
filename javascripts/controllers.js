var API_ROOT = CONFIG.BACKEND_HOST
angular.module('seil-bms-angularjs')

.controller('HomeCtrl', function($scope,$http, Auth, $window, $location) {
    Auth.loginRequired();
    $scope.logout = function(){
        $window.localStorage.removeItem('satellizer_token');
        $location.path('/login');
    }
})
.controller('MasterCtrl', function($scope,$http, Auth, $window, $location, Alert) {
    // Auth.loginRequired();
    $scope.logout = function(){
        $window.localStorage.removeItem('satellizer_token');
        $location.path('/login');
    }
    Alert.query(function(res){
        $scope.alerts=res;
    })
    $scope.generateColorFromLevel = function(level){
        switch(level){
            case 'danger': return 'red';
            case 'warn': return 'amber';
            case 'info': return 'blue';
            case 'success': return 'green';
        }
    }
})
.controller('205Ctrl', function($scope, $http, Auth, $window, $location){
	// Auth.loginRequired();
	$scope.changeState = function(appliance, state){
		var state_string = state? "on" : "off";
		$http.get(API_ROOT+"control/205/"+appliance+"/"+state_string);
	}
    $scope.logout = function(){
        $window.localStorage.removeItem('satellizer_token');
        $location.path('/');
    }
})
.controller('ExplorerCtrl', function($scope, $http, $window, $stateParams, $state, $sce, Auth, Equipment, Sensor, Util){
	// Auth.loginRequired();

    $scope.logout = function(){
        $window.localStorage.removeItem('satellizer_token');
        $location.path('/');
    }
    if(!$stateParams.location){
        $state.go('explorer',{location:'/'});
    }
    $http.get(API_ROOT+'location?location='+$stateParams.location).then(function(res){
        $scope.properties = res.data;        
        for (const key in $scope.properties.embeds) {
            $scope.properties.embeds[key] = $sce.trustAsHtml($scope.properties.embeds[key]);
            
        }
        $scope.table = Array.matrix($scope.properties.rows,$scope.properties.cols,0);
        Equipment.query({location:$stateParams.location},function(res){
            $scope.equipments=res;
            for(var i=0;i<$scope.equipments.length;i++){
                var equipment = $scope.equipments[i];
                $scope.table[equipment.properties.row-1][equipment.properties.col-1] = {"equipment":$scope.equipments[i]}
            };
            // test
            Sensor.query({location:$stateParams.location},function(res){
                $scope.sensors = res;
                for(var i=0;i<$scope.sensors.length;i++){
                    var sensor = $scope.sensors[i];
                    $scope.table[sensor.properties.row-1][sensor.properties.col-1].sensor = $scope.sensors[i];
                };
                console.log($scope.table)
            })
        })
        
    })
    $scope.navigate = function(location){
        $state.go('explorer',{location:$stateParams.location+location});
    }
    io.socket.get('/sensor/subscribe?location='+$stateParams.location, function(data, jwr) {

        io.socket.on('sensor_data', function(reading) {
          var sensor = Util.getBySerial($scope.sensors, reading.serial)
          if(sensor != null){
            sensor.value = reading.temperature;
            var hue = 250-(reading.temperature-16)*(250/16) 
            sensor.properties.style['background-color'] = "hsl("+ hue +",100%,50%)"
            $scope.$apply();
          }
        });
      });
})
.controller('LoginCtrl',['$scope','$window','$http','$location','$auth',function($scope,$window,$http,$location,$auth){
    $scope.login=function(){
        $http.post('/auth/authenticate', $scope.user).then(function(response){
            $window.localStorage.setItem('satellizer_token', response.data.token);
            $location.path('/');
        }, function(response){
            alert(response.data.message);
        });
    }
    $scope.authenticate = function(provider) {
      $auth.authenticate(provider).then(function(response) {
        // Signed in with IITBSSO.
        $location.path('/');
      })
      .catch(function(response) {
        // Something went wrong.
        alert(response.data.message);
      });
    };
}]);

Array.matrix = function(numrows, numcols, initial){
    var arr = [];
    for (var i = 0; i < numrows; ++i){
       var columns = [];
       for (var j = 0; j < numcols; ++j){
          columns[j] = initial;
       }
       arr[i] = columns;
     }
     return arr;
 }
