angular.module('seil-bms-angularjs')
.component('fan', {
    templateUrl: 'components/fan.html',
    controller: function($scope, $element, $attrs){
        var ctrl = this;
        ctrl.fan.properties.state=false;
    },
    bindings: {
        fan: '<'
    }
})
.component('light', {
    templateUrl: 'components/light.html',
    controller: function($scope, $element, $attrs){
        var ctrl = this;
        ctrl.light.properties.state=false;
    },
    bindings: {
        light: '<'
    }
})
.component('ac', {
    templateUrl: 'components/ac.html',
    controller: function($scope, $element, $attrs){
        var ctrl = this;
        ctrl.ac.properties.state=false;
    },
    bindings: {
        ac: '<'
    }
})