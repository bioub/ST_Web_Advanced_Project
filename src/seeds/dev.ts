import { resolve } from 'path';

import { Database } from 'sqlite3';

import config from '../config';

const dbPath = resolve(__dirname, '..', '..', config.dbPath);

const db = new Database(dbPath);

db.serialize(() => {
  db.run('DROP TABLE IF EXISTS users;');
  db.run(
    'CREATE TABLE users (id INTEGER PRIMARY KEY AUTOINCREMENT, username VARCHAR (40) UNIQUE, password CHAR (32));',
  );
  db.run("INSERT INTO users (id, username, password) VALUES (1, 'romain', '123456');");
});

db.close();
