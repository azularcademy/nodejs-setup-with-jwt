export default {
  db: {
    url: "mongodb://localhost:27017/databasename"
  },
  models: {
  },
  security: {
  },
  session: {
    cookie: {
      secure: true,
      maxAge: false //24 * 60 * 60 * 1000 // 24 hours
    }
  },
  sockets: {
  },
  ACCESS_TOKEN_SECRET: "meanStackApp",
  ACCESS_TOKEN_LIFE: 120,
  REFRESH_TOKEN_SECRET: "meanStackAppRefreshed",
  REFRESH_TOKEN_LIFE: 86400,
  log: {
    level: "debug"
  },
  http: {
    cache: 365.25 * 24 * 60 * 60 * 1000 // One year
  },
  port: 7000,
};

