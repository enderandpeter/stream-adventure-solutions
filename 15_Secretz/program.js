// For this one, I gave up and looked up the answer.
var crypto = require('crypto');
var tar = require('tar');
var zlib = require('zlib');
var concat = require('concat-stream');

var parser = new tar.Parse();
parser.on('entry', function (entry) {
    if (entry.type === 'File'){
       var h = crypto.createHash('md5', { encoding: 'hex' });
       entry.pipe(h).pipe(concat(function (hash) {
            console.log(hash + ' ' + entry.path);
        }));
    } else {
      return entry.resume();
    }
 });

var cipher = process.argv[2];
var passphrase = process.argv[3];
process.stdin
    .pipe(crypto.createDecipher(cipher, passphrase))
    .pipe(zlib.createGunzip())
    .pipe(parser);
