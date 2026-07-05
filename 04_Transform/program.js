import { transform } from "through2";

process.stdin.pipe(transform(function(buffer, encoding, next) {
	this.push(buffer.toString().toUpperCase());
	next();
})).pipe(process.stdout);
