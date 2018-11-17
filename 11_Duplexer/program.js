const duplexer2 = require('duplexer2');

const spawn = require('child_process').spawn;

module.exports = (cmd, args) => {
   const ps = spawn(cmd, args);

   return duplexer2(ps.stdin, ps.stdout);
};
