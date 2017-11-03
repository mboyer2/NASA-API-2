$(document).ready(function(){
var obj = {}
var dangerousAsteroids = []
var asteroidName = []
var asteroidDiameter=[]
var velocity=[]
var distance=[]
var endDate
var startDate
$('#button').on('click', function(event){

	startDate = $('#startDate').val()
	endDate = $('#endDate').val()
	
	//how do include startDate and endDate as userInput
	$.get('/api', { startDate1: startDate, endDate: endDate }, function(nasaData){
		
		// console.log(nasaData)
		nasaObj = JSON.parse(nasaData)

		let neo = nasaObj.near_earth_objects
// conditional statements
		
		for(let day in neo) {

			for(let asteroid of neo[day]) {

				let tempAsteroid = {}



        		
		    if(asteroid.is_potentially_hazardous_asteroid === true) {
		            tempAsteroid.name = asteroid.name

		        if(asteroid.estimated_diameter.feet) {
	                tempAsteroid.diameter = asteroid.estimated_diameter.feet.estimated_diameter_max
	            	}
	            if(asteroid.close_approach_data['0'].relative_velocity) {
	                tempAsteroid.velocity = asteroid.close_approach_data['0'].relative_velocity.miles_per_hour
	            	}
		    	if(asteroid.close_approach_data['0'].miss_distance) {
	                tempAsteroid.distance = asteroid.close_approach_data['0'].miss_distance.miles

	                dangerousAsteroids.push(tempAsteroid)


	            	}
	            }
			}
		}

		console.log(dangerousAsteroids)

		var container =

		for (var i = 0; i<dangerousAsteroids.length; i++){
			$('#container').append(`
				<div id="name">name= ${dangerousAsteroids[i].name} </div>
				<div id="diameter">diameter= ${dangerousAsteroids[i].diameter} </div>
				<div id="distance">distance= ${dangerousAsteroids[i].distance} </div>
				<div id="velocity">velocity= ${dangerousAsteroids[i].velocity} </div>
				<br>`)
			}
		})
	})
})

