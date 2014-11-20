"use strict";
var app = angular.module('futebolApp', []);

app.controller('mainController', ['$rootScope', '$scope', '$http', '$window', function($rootScope, $scope, $http, $window){
    var location = $window.document.location.search.substring(1);
    $scope.location = location;
    $scope.device = $window.device;
    if(!location){
        $http.get('/api/futebol/').success(function(data, status, headers, config) {
            $scope.items = data;
        });
    }else{
        $http.get('/api/futebol/' + location).success(function(data, status, headers, config) {
            $rootScope.time = data.nome;
            switch (data.campeonato){
                case 'Libertadores':
                    $scope.title = 'Partidas da Libertadores';
                    break;

                case 'Copa do Brasil':
                    $scope.title = 'Copa do Brasil';
                    break;
                default:
                    $scope.title = 'Partidas do Brasileiros';
            }
            $scope.detalhe = data;
            for(var i in data.partidas){
                data.partidas[i].brasileiro = data.partidas[i].brasileiro || data.partidas[i].copadobrasil || data.partidas[i].libertadores;
            }
        });
    }
}]);