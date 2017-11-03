var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var request = require('request')

app.use(bodyParser.json())
app.use(express.static('./public'))



//request/response to/from main.js
app.get('/api', function(req, res){
	console.log('pinging', req.query)

	//request to Nasa API
	request(`https://api.nasa.gov/neo/rest/v1/feed?start_date=${req.query.startDate1}&end_date=${req.query.endDate}&api_key=uBbS7vZx5Jtx6pAfsZBVVrMThUPYxy6eMNq7m8iG`, function (error, response, body) {
		console.log('data from nasa: ', body)
		res.send(body)
	
	})

})

// client $.get -> app.get('/route') -> request('api.nasa.gov') -> our server -> function(res){} 




app.listen(8080, function(){
	console.log('The app is running on post 8080.')
})

