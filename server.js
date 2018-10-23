var express = require('express')
,	port = 80
,	app = express();

app.use(express.static(__dirname));

app.listen(port, function() {
	console.log("Listening on port:", port);
});
