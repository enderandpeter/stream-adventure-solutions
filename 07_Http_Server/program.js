 const http = require('http');
 const through = require('through2');

 const port = process.argv[2];

 const server = http.createServer((request, response) => {
     if(request.method === 'POST'){
		 request.pipe(through(function write(buffer, encoding, next){
      this.push(buffer.toString().toUpperCase());
      next();
    })).pipe(response);
	 }
 });
 server.listen(port);
