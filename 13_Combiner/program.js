const combine = require('stream-combiner')
const through = require('through2');
const split = require('split');
const zlib = require('zlib');

module.exports = function () {
    let bookList;

    function pushBookToList(stream){
        if(bookList){
            stream.push(JSON.stringify(bookList) + '\n');
        }
    }

    function write(line, _, next){
        if(line.length === 0){
            return next();
        }
        const lineObj = JSON.parse(line);

        if(lineObj.type === 'genre'){
            pushBookToList(this);
            bookList = {name: lineObj.name, books: [] };
        } else if(lineObj.type === 'book'){

            bookList.books.push(lineObj.name);
        }
        next();
    }
    function end(done){
        pushBookToList(this);
        done();
    }

    return combine(
        split(),
        through(write, end),
        zlib.createGzip()
    )
}
