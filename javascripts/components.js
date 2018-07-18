angular.module('seil-bms-angularjs')
.component('fan', {
    templateUrl: 'components/fan.html',
    controller: function($scope, $element, $attrs){
        var ctrl = this;
        $scope.switch={
            fan:false
        }
    }
})
.component('light', {
    templateUrl: 'components/light.html',
    controller: function($scope, $element, $attrs){
        var ctrl = this;
        $scope.switch={
            light:false
        }
    }
})