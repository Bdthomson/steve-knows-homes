var myApp = angular.module('myApp', ['ui.bootstrap']);

myApp.controller('AppCtrl', ['$scope', '$http', '$log', '$modal', function($scope, $http, $log, $modal) {

    // Request object with placeId of Steveknowshomes, a business registered on google maps.
    var request = {
        placeId: 'ChIJeUNcjISEUocRIOxVJY90nqM'
    };

    // A PlacesService created from the invisble map element on the html page.
    service = new google.maps.places.PlacesService(map);

    // Creating a get function that serves the
    $scope.getter = new function() {

        // Query google maps api, which takes in a request object.
        service.getDetails(request, function(place, status) {

            // Updates the page using the apply function.
            $scope.$apply(function() {

                // Create a reviews array based on the recieved place object in the callback.
                $scope.reviews = place.reviews;

                // For each review
                for (var i = 0; i < $scope.reviews.length; i++) {
                    var utcSeconds = $scope.reviews[i].time;
                    // Creating a Date object with an integer parameter of 0 sets it to EPOCH
                    var d = new Date(0);
                    d.setUTCSeconds(utcSeconds);

                    // Grab fields from date object
                    var day = d.getDay();
                    var month = d.getMonth();
                    var year = d.getFullYear();

                    // Create string object from date variables
                    var date = '' + month + '/' + day + '/' + year;

                    // Create a new date string property on the reviews array and populate it
                    $scope.reviews[i].date = date;
                };

                // Get number of reviews in the array
                var len = $scope.reviews.length;

                // Creates an effect that looks like infinite scrolling, each review gets put 100 times.
                for (var i = 0; i < len * 100; i++) {
                    $scope.reviews.push($scope.reviews[i]);
                }
            });
        });
    }; //End getter



    // Create an open() function that can be called from the html home page.
    $scope.open = function(size) {
        var modalInstance = $modal.open({
            animation: $scope.animationsEnabled,
            templateUrl: 'modal.html',
            controller: 'ModalInstanceCtrl',
            size: size,
        });
    }
}]);


myApp.controller('ModalInstanceCtrl', function($scope, $modalInstance) {
    $scope.ok = function() {
        $modalInstance.close();
    };

    $scope.cancel = function() {
        $modalInstance.dismiss('cancel');
    };
});
