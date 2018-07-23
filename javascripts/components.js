angular.module('seil-bms-angularjs')
.component('fan', {
    templateUrl: 'components/fan.html',
    controller: function($scope, $element, $attrs){
        var ctrl = this;
        ctrl.fan.state=false;
    },
    bindings: {
        fan: '<'
    }
})
.component('light', {
    templateUrl: 'components/light.html',
    controller: function($scope, $element, $attrs){
        var ctrl = this;
        ctrl.light.state=false;
    },
    bindings: {
        light: '<'
    }
})