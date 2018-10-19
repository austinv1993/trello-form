var express = require('express')
,	port = 3000
,	app = express();

app.use(express.static(__dirname));

app.listen(port, function() {
	console.log("Listening on port:", port);
});
