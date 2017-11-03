$(document).ready(function(){
var obj = {}
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
        		
		    if(asteroid.is_potentially_hazardous_asteroid === true) {
		            asteroidName.push(asteroid.name)

		        if(asteroid.estimated_diameter.feet) {
	                asteroidDiameter.push(asteroid.estimated_diameter.feet.estimated_diameter_max)
	            	}
	            if(asteroid.close_approach_data['0'].relative_velocity) {
	                velocity.push(asteroid.close_approach_data['0'].relative_velocity.miles_per_hour)
	            	}
		    	if(asteroid.close_approach_data['0'].miss_distance) {
	                distance.push(asteroid.close_approach_data['0'].miss_distance.miles)
	            	}
				}
		    }
		}
		//this creates an object of asteroidsNames with key:value velocity, distance, and diameter
		for(var i=0;i<asteroidName.length;i++) {
    		obj[asteroidName[i]] = {
        			Velocity: velocity[i],
        			Distance: distance[i],
        			Diameter: asteroidDiameter[i]
			}
		}

		var jsonString = JSON.stringify(obj)
		var jsonArray = JSON.parse(jsonString)

		//below loops through elements of an array
		var result=''

		//im so close, i just cant get the name
		$.each(jsonArray, function(i,item){
			result += 'name=' + '<br>'
			result += 'Velocity=' + item.Velocity + '<br>'
			result += 'Diameter=' + item.Diameter + '<br>'
			result += 'Distance from earth=' + item.Distance + '<br><br>'
			


		})
		$('#display').html(result)

		console.log(obj)

		
		

		})
	})
})

