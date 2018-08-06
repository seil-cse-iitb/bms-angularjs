angular.module('seil-bms-angularjs')
.component('fan', {
    templateUrl: 'components/equipments/fan.html',
    controller: function($scope, $element, $attrs){
        var ctrl = this;
        ctrl.fan.properties.state=false;
    },
    bindings: {
        fan: '<'
    }
})
.component('light', {
    templateUrl: 'components/equipments/light.html',
    controller: function($scope, $element, $attrs){
        var ctrl = this;
        ctrl.light.properties.state=false;
    },
    bindings: {
        light: '<'
    }
})
.component('lightArray', {
    templateUrl: 'components/equipments/light-array.html',
    controller: function($scope, $element, $attrs){
        var ctrl = this;
        ctrl.lightArray.properties.state=false;
        $scope.range = function(count) {
            return Array.apply(0, Array(+count)).map(function(value,index){
                return index;
            });
        }
    },
    bindings: {
        lightArray: '<'
    }
})
.component('ac', {
    templateUrl: 'components/equipments/ac.html',
    controller: function($scope, $element, $attrs){
        var ctrl = this;
        ctrl.ac.properties.state=false;
    },
    bindings: {
        ac: '<'
    }
})


//sensors
.component('temperature', {
    templateUrl: 'components/sensors/temperature.html',
    controller: function($scope, $element, $attrs){
        var ctrl = this;
        ctrl.temperature.properties.state=false;
        // ctrl.temperature.value = "hourglass_full"
    },
    bindings: {
        temperature: '<'
    }
})