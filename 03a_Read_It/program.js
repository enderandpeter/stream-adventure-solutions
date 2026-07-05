import { Readable } from "node:stream"
import { createReadStream } from "node:fs"

const data = process.argv[2];

class MyStream extends Readable {    
    _read(size) {
        super._read(size)
    }
}

const myStream = new MyStream()
myStream.push(data)
myStream.pipe(process.stdout)
