var combine = require('stream-combiner')
var through = require('through2');
var split = require('split');
var zlib = require('zlib');

module.exports = function () {
    var bookList;
    
    function pushBookToList(stream){
        if(bookList){
            stream.push(JSON.stringify(bookList) + '\n');
        }
    }
    
    function write(line, _, next){
        if(line.length === 0){
            return next();
        }
        var lineObj = JSON.parse(line);
        
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