import trumpet from 'trumpet'
import { transform } from 'through2'

const tr = trumpet();

const trumpetStream = tr.select('.loud').createStream();

trumpetStream.pipe(transform(function to_upper(buffer, enc, next){
	this.push(buffer.toString().toUpperCase());
	next();
})).pipe(trumpetStream);

process.stdin.pipe(tr).pipe(process.stdout);
