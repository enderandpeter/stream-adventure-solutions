import { createServer } from 'node:http';
import { transform } from 'through2'

const port = process.argv[2];

const server = createServer((request, response) => {
  if (request.method === 'POST') {
    request.pipe(transform(function write(buffer, encoding, next) {
      this.push(buffer.toString().toUpperCase());
      next();
    })).pipe(response);
  }
});
server.listen(port);
