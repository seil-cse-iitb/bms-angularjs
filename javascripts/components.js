angular.module('seil-bms-angularjs')
.component('fan', {
    templateUrl: 'components/equipments/fan.html',
    controller: function($scope, $element, $attrs, Equipment){
        var ctrl = this;
        ctrl.fan.properties.state=ctrl.fan.properties.state||false;
        $scope.switch = function(equipment){
            Equipment.actuate({equipmentId:equipment.id},{msg:"S"+Number(!equipment.properties.state), state:!equipment.properties.state});
        }
    },
    bindings: {
        fan: '<'
    }
})
.component('light', {
    templateUrl: 'components/equipments/light.html',
    controller: function($scope, $element, $attrs, Equipment){
        var ctrl = this;
        ctrl.light.properties.state=ctrl.light.properties.state||false;
        $scope.switch = function(equipment){
            Equipment.actuate({equipmentId:equipment.id},{msg:"S"+Number(!equipment.properties.state), state:!equipment.properties.state});
        }
    },
    bindings: {
        light: '<'
    }
})
.component('lightArray', {
    templateUrl: 'components/equipments/light-array.html',
    controller: function($scope, $element, $attrs, $http, Equipment){
        var ctrl = this;
        ctrl.lightArray.properties.state=ctrl.lightArray.properties.state||false;
        $scope.range = function(count) {
            return Array.apply(0, Array(+count)).map(function(value,index){
                return index;
            });
        }
        $scope.switch = function(equipment){
            Equipment.actuate({equipmentId:equipment.id},{msg:"S"+Number(!equipment.properties.state), state:!equipment.properties.state});
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