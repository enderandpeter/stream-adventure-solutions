var through = require('through2');

function write(buffer, encoding, next){
	this.push(buffer.toString().toUpperCase());
	next();
}
var stream = through(write);

process.stdin.pipe(stream).pipe(process.stdout);