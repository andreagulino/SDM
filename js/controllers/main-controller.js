/* ##########################################################
   Main Controller - Always active independently on the view
   ########################################################## */
app.controller('main_ctrl', function($scope, $http, $location, $rootScope) {


});

/* ####################
   Home Controller
   #################### */
app.controller('home_ctrl', function($scope, $timeout, $location, $http, $rootScope) {

    /* # Initialization # */
    $rootScope.active_menu = "home";

    // Get the name of the current view
    view = $location.path(); 

    // Objectives
    $scope.objectives = OBJ;
    $scope.areas = AREAS;
    $scope.coords = COORDS;

    $scope.onValueChange = function() {


        sum = 0;

        for(i=0; i<$scope.objectives.length; i++) {

            w =  parseFloat($scope.objectives[i].slider.noUiSlider.get());
            sum = sum + w;
            $scope.objectives[i].weight = w;
            $scope.$apply();
        }

        for(i=0; i<$scope.objectives.length; i++) {

            $scope.objectives[i].norm = ($scope.objectives[i].weight / sum);
        }


        // Compute the sum
        $scope.finalvals = []

        for(i=0; i<AREAS.length; i++) {

            vector = PM[AREAS[i]];
            w_sum = 0;

            for( j=0; j<$scope.objectives.length; j++) {
                w_sum = w_sum + $scope.objectives[j].weight * vector[j];
            }

            $scope.finalvals[i] = {name: AREAS[i], score: w_sum};
        }


        // Normalizza gli score
        only_values = $scope.finalvals.map(function(x){return x.score});
        max = Math.max(...only_values);
        min = Math.min(...only_values);


        function norml(x) {
            return  (x-min)/(max-min) 
        }

        normalized = $scope.finalvals.map(function(x){ 
            return {
                name: x.name,
                score: norml(x.score)
            }
        });

        console.log(normalized);

        // Fix the area color

        for(i=0; i<normalized.length; i++) {
            $scope.map_areas[AREAS[i]].fillColor = 'rgba(255,0,0,'+normalized[i].score.toFixed(1)+')'

            if(normalized[i].score==1)
                $scope.map_areas[AREAS[i]].strokeColor = 'rgba(0,0,0,'+normalized[i].score.toFixed(1)+')'
            else
                $scope.map_areas[AREAS[i]].strokeColor = 'rgba(255,0,0,'+normalized[i].score.toFixed(1)+')'

            console.log( $scope.map_areas[AREAS[i]]);

            if($scope.polygons[AREAS[i]]!=null) $scope.polygons[AREAS[i]].setMap(null);

            $scope.polygons[AREAS[i]] = new google.maps.Polygon($scope.map_areas[AREAS[i]]);
            $scope.polygons[AREAS[i]].setMap($scope.map);
        }


        //rgba(255, 0, 0, 0.8);






    }

    $scope.buildSlider = function(slider, value) {
        if(slider.noUiSlider != null)
            slider.noUiSlider.destroy();

        noUiSlider.create(slider, {
            start:  value,
            connect: [true, false],
            range: {
                'min': 0,
                'max': 100
            },

            format: wNumb({
                decimals: 0
            })
        });

        setTimeout(function(slider){slider.noUiSlider.on('update', $scope.onValueChange);}, 1000, slider);

    }

    $scope.init = function() {

        sum = 0;

        for(i=0; i<$scope.objectives.length; i++) {

            current_objective = $scope.objectives[i];

            slider = document.getElementById("slider-"+i);
            $scope.objectives[i].slider = slider;

            sum += current_objective.original_weight;

            $scope.buildSlider(slider, current_objective.original_weight); 


        }

        for(i=0; i<$scope.objectives.length; i++) {
            $scope.objectives[i].norm = ($scope.objectives[i].weight / sum).toString();
        }

        // MAP
        var h = $(window).height();
        var scale = 0.70; // This is 75%
        $("#map").css('height', h * scale);

        $scope.map = new google.maps.Map(document.getElementById('map'), {
            zoom: 13,
            center: {lng: 9.216928, lat: 45.468785},
            mapTypeId: 'terrain'
        });


        $scope.map_areas = []
        $scope.polygons = []

        for(i=0; i<AREAS.length; i++) {

            $scope.map_areas[AREAS[i]] =  {
                paths:  $scope.coords[AREAS[i]] ,
                strokeColor: '#FF0000',
                strokeOpacity: 0.8,
                strokeWeight: 2,
                fillColor: '#FF0000',
                fillOpacity: 0.35
            }

            //$scope.polygons[AREAS[i]] = new google.maps.Polygon($scope.map_areas[AREAS[i]]);
            //$scope.polygons[AREAS[i]] .setMap($scope.map);

        }


    }

    $scope.reset = function() {
        // TODO: IMPLEMENT

        for(i=0; i<$scope.objectives.length; i++) {
            $scope.objectives[i].slider.noUiSlider.set([0]);
        }
    }

    $scope.allZero = function() {
        // TODO: IMPLEMENT


        for(i=0; i<$scope.objectives.length; i++) {
            $scope.objectives[i].weight = 0;
            $scope.buildSlider($scope.objectives[i].slider,0); 
   
        }

        for(i=0; i<$scope.objectives.length; i++) {
            $scope.objectives[i].norm = 0;
        }

    }


    $timeout($scope.init, 1000);


});