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
            console.log("sum is "+sum);
            if(sum>0)
                $scope.objectives[i].norm = ($scope.objectives[i].weight / sum);
            else 
                $scope.objectives[i].norm = 0;
        }


        // Compute the sum
        $scope.finalvals = []

        for(i=0; i<AREAS.length; i++) {
            
           

            vector = PM[AREAS[i]];
            w_sum = 0;

            for( j=0; j<$scope.objectives.length; j++) {
                
                w_sum = w_sum + $scope.objectives[j].norm * vector[j];
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

        $scope.normalized = $scope.finalvals.map(function(x){ 
            console.log("returning "+ norml(x.score)+" from "+x.score)

            return {
                name: x.name,
                score: norml(x.score)
            }
        });


        // Add areas on the map

        //if( $scope.mapAreas!=null)
        //  L.geoJson($scope.mapAreas, {'style': areaStyle}).addTo(null);

        // Remove all polygons
        $scope.map.eachLayer(function (layer) {
           if(layer.feature!=null && layer.feature.geometry.type=="Polygon")
            $scope.map.removeLayer(layer);
        });


        $scope.mapAreas = [{
            "type": "FeatureCollection",
            "features": $scope.getFeatures()
        }];


        function getColor(feature) {
                if(feature["properties"]["score"]==1)
                    return 'black'
                else 
                    return 'white'
        }
        function areaStyle(feature){
            return {
                fillColor: feature["properties"]["fill-color"],
                weight: 4,
                opacity: 1,
                color: getColor(feature),
                dashArray: '3',
                fillOpacity: 0.5
            }
        };

        L.geoJson($scope.mapAreas, {'style': areaStyle}).addTo($scope.map);


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

        // Fix size
        var h = $(window).height();
        var scale = 0.75; // This is 75%
        $("#map").css('height', h * scale);

        // Initialize the map
        $scope.map = L.map('map').setView([45.464211,  9.191383], 12);

        // Setup token
        L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            maxZoom: 18,
            id: 'mapbox.streets',
            accessToken: 'pk.eyJ1IjoiYW5kcmVhZ3VsaW5vIiwiYSI6ImNqdnFla2R6cTJpcWI0YW11cWprNWc4MWIifQ.HLUgsin2A-fwQpqbuJIqjQ'
        }).addTo($scope.map);

    }


    $scope.getFeatures = function() {

        features = []

        for(i=0; i<AREAS.length; i++) {

            features[i] = {
                "type": "Feature",
                "properties": {
                    "stroke": "#555555",
                    "stroke-width": 2,
                    "stroke-opacity": 1,
                    "fill": "#555555",
                    "fill-opacity": 0.5,
                    "score": $scope.normalized[i].score.toFixed(1),
                    "fill-color": 'rgba(255,0,0,'+$scope.normalized[i].score.toFixed(1)+')',
                    "Name": AREAS[i]
                },
                "geometry": {
                    "type": "Polygon",
                    "coordinates": [$scope.coords[AREAS[i]].map(function(x){return [x.lng, x.lat]})]
                }
            }


        }

        return features;
    }

    $scope.reset = function() {
        // TODO: IMPLEMENT

        for(i=0; i<$scope.objectives.length; i++) {
            $scope.objectives[i].slider.noUiSlider.set([0]);
        }
    }

    $scope.allZero = function() {
 

        for(i=0; i<$scope.objectives.length; i++) {
            $scope.objectives[i].weight = 0;
            $scope.buildSlider($scope.objectives[i].slider,0); 

        }

        for(i=0; i<$scope.objectives.length; i++) {
            $scope.objectives[i].norm = 0;
        }
        
       console.log("setting to zero");

    }


    $timeout($scope.init, 1000);


});