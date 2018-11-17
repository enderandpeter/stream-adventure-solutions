const split = require('split');
const through = require('through2');

let linecount = 1;

process.stdin
 .pipe(split())
 .pipe(through(function (line, encoding, next) {
	 let output = '';

	 if(linecount % 2){
		 output = line.toString().toLowerCase();
	 } else {
		 output = line.toString().toUpperCase();
	 }

	 this.push(output + '\n');
	 linecount++;
	 next();
 })).pipe(process.stdout)
;
