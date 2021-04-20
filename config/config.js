import local from '../config/env/local';
const env = process.env.NODE_ENV;

let conf;
switch (env) {
  case 'local ':
    conf = local;
    break;
  default:
    conf = local;
    break;
}

export default {
  dbUrl: conf.db.url,
  port: conf.port,
  url: conf.url,
  secret: conf.ACCESS_TOKEN_SECRET,
  tokenLife: conf.ACCESS_TOKEN_LIFE,
};