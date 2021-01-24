const config = {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 3000,
  jwtSecret: process.env.JWT_SECRET || 'NOT_SO_SECRET',
  dbPath: process.env.DB_PATH || './db/dev.db',
};

export default config;
