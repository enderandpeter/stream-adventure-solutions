import ws from 'websocket-stream'
const stream = ws('ws://localhost:8099');

stream.write('hello\n');
stream.pipe(process.stdout)