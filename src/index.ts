import http from 'http';

import app from './app';
import config from './config';

const server = http.createServer(app);

server.on('error', (err) => {
  console.log(err.message);
});

server.listen(config.port, () => {
  console.log('Server started on port ' + config.port);
});
