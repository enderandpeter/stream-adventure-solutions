var concat = require('concat-stream');

process.stdin.pipe(concat(function(input){
	console.log(input.toString().split('').reverse().join(''));
}));