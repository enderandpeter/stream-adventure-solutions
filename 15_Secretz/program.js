// For this one, I gave up and looked up the answer.
import crypto from 'node:crypto'
import * as tar from 'tar'
import zlib from 'zlib'
import concat from 'concat-stream';

const cipher = process.argv[2];
const passphrase = process.argv[3];
const iv = process.argv[4]
process.stdin
    .pipe(crypto.createDecipheriv(cipher, passphrase, iv))
    .pipe(zlib.createGunzip())
    .pipe(tar.t())
    .on('entry', function (entry) {
        if (entry.type === 'File') {
            var h = crypto.createHash('md5', { encoding: 'hex' });
            entry.pipe(h).pipe(concat(function (hash) {
                console.log(hash + ' ' + entry.path);
            }));
        } else {
            return entry.resume();
        }
    })
