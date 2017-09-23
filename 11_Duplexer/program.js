var duplexer2 = require('duplexer2');

var spawn = require('child_process').spawn;

module.exports = function (cmd, args) {
   const ps = spawn(cmd, args);
   
   return duplexer2(ps.stdin, ps.stdout);
};