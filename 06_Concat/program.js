const concat = require('concat-stream');

process.stdin.pipe(concat((input) => console.log(
	input.toString().split('').reverse().join('')
)));
