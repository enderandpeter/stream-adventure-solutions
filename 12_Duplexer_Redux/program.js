var duplexer2 = require('duplexer2');
var through2 = require('through2');

module.exports = (counter) => {
    let counterObj = {};
    function write(obj, _, next){
        counterObj[obj.country] = (counterObj[obj.country] || 0) + 1;
        next();
    }

    function end(done){
        counter.setCounts(counterObj);
        done();
    }
    const input = through2({objectMode: true}, write, end);

    return duplexer2({objectMode: true}, input, counter);
};
