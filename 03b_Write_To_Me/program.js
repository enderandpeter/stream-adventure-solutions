import { Writable } from "node:stream"

class MyWritable extends Writable{
    _write(chunk, encoding, callback){
        console.log(`writing: ${chunk.toString()}`)
        callback()
    }
}

const myWritable = new MyWritable()
process.stdin.pipe(myWritable)