var express = require('express');
var app = express();
app.use(express.static('public'));
app.use('/*', function(req, res){
  res.sendfile(__dirname + '/public/index.html');
});
var server = app.listen(process.env.PORT || 3000, function(){
	console.log("Server is listening on PORT: ", server.address().port);
});

