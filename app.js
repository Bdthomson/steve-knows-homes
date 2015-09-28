var myApp = angular.module('myApp', ['ui.bootstrap']);

myApp.controller('AppCtrl', ['$scope', '$http', '$log', '$modal', function($scope, $http, $log, $modal) {

    // GET REVIEWS
    var request = {
        placeId: 'ChIJeUNcjISEUocRIOxVJY90nqM'
    };

    service = new google.maps.places.PlacesService(map);

    $scope.getter = new function(){
        service.getDetails(request, function (place, status){
            $scope.$apply(function () {
                $scope.reviews = place.reviews;
                for (var i = 0; i < $scope.reviews.length; i++){
                    var utcSeconds = $scope.reviews[i].time;
                    var d = new Date(0); // The 0 there is the key, which sets the date to the epoch
                    d.setUTCSeconds(utcSeconds);
                    if($scope.reviews[i].author_name == 'Matt Sluman'){
                        var day = d.getDay() - 4;
                        var month = d.getMonth() -1;
                    }else{
                        var day = d.getDay();
                        var month = d.getMonth();
                    }

                    var year = d.getFullYear();
                    var date = '' + month + '/' + day + '/' + year;
                    $scope.reviews[i].date = date;
                }; //End For

                var len = $scope.reviews.length;

                for(var i = 0; i < len; i++){
                    $scope.reviews.push($scope.reviews[i]);
                }

                for(var i = 0; i < len * 100; i++){
                    $scope.reviews.push($scope.reviews[i]);
                }
            });
        });
    }; //End getter



    $scope.open = function (size) {

        var modalInstance = $modal.open({
            animation: $scope.animationsEnabled,
            templateUrl: 'modal.html',
            controller: 'ModalInstanceCtrl',
            size: size,
        });
    }
}]);


myApp.controller('ModalInstanceCtrl', function ($scope, $modalInstance) {

    $scope.ok = function () {
        $modalInstance.close();
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
});
