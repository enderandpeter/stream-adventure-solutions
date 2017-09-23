 var http = require('http');
 var through = require('through2');
 
 var port = process.argv[2];
 
 var server = http.createServer(function (request, response) {
     if(request.method === 'POST'){
		  function write(buffer, encoding, next){
			 this.push(buffer.toString().toUpperCase());
			 next();
		 }
		 
		 var tr = through(write);
		 
		 request.pipe(tr).pipe(response);
	 }
	
 });
 server.listen(port);