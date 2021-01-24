import http from 'http';

import dotenv from 'dotenv';
import { createConnection } from 'typeorm';

import app from './app';

dotenv.config();

const server = http.createServer(app);

server.on('error', (err) => {
  console.log(err.message);
});

createConnection().then(() => {
  server.listen(process.env.PORT, () => {
    console.log('Server started on port ' + process.env.PORT);
  });
});
