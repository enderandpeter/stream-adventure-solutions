function to_upper(buffer, enc, next){
	this.push(buffer.toString().toUpperCase());
	next();
}

var trumpet = require('trumpet');
var through = require('through2');

var tr = trumpet();

tr.pipe(process.stdout);
var trumpetStream = tr.select('.loud').createStream();

var throughStream = through(to_upper);
trumpetStream.pipe(throughStream).pipe(trumpetStream);

process.stdin.pipe(tr);


