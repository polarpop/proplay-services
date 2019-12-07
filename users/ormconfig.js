
const defaultConfig = {
  type: "sqlite",
  database: "./db.sqlite",
  synchronize: true,
  dropSchema: true,
  logging: true,
  entities: [
    "lib/entity/**/*.js"
  ],
  migrations: [
    "lib/migration/**/*.js"
  ],
  subscribers: [
    "lib/subscriber/**/*.js"
  ],
  cli: {
    entitiesDir: "lib/entity",
    migrationsDir: "lib/migration",
    subscribersDir: "lib/subscriber"
  }
};

let config = {};

/**
* Creates an string of objects related to the database options of typeorm.
* This allows for an easy way to create a database config for typeorm that is
* based off environment variables.
*
* @param {string?} prefix The optional prefix you want to concat with the suffixes variable. Defaults to: "DB".
*
* @param {string?} type The optional database type you want to connect to. Defaults to: "postgres".
*
* @returns {Object<string, string>} The configuration object specific to the environment
* you are currently deploying to.
*
* @example
* // use mysql and a different prefix
* const config = getConfigFromEnv("DATABASE", "mysql");
* console.log(config); // outputs the config.
*
* // or just keep it to the default.
* const config2 = getConfigFromEnv();
* console.log(config2);
*/
function getConfigFromEnv(prefix="DB", type="postgres") {
  let suffixes = {
    type: "TYPE",
    url: "URL",
    sycronize: "SYNC",
    logging: "LOGGING",
    entities: "ENTITIES_DIRS",
    subscribers: "SUBSCRIBERS_DIRS",
    migrations: "MIGRATIONS_DIRS",
    host: "HOSTNAME",
    username: "USERNAME",
    password: "PASSWORD",
    database: "DATABASE_NAME",
    schema: "SCHEMA_NAME",
    chartset: "CHARTSET",
    timezone: "TIMEZONE",
    connectTimeout: "CONNECT_TIMEOUT",
    acquireTimeout: "ACQUIRE_TIMEOUT",
    insecureAuth: "INSECURE_AUTH",
    supportBigNumbers: "SUPPORT_BIG_NUMBERS",
    bigNumberStrings: "BIG_NUMBER_STRINGS",
    dateStrings: "DATE_STRINGS",
    debug: "DEBUG",
    trace: "TRACE",
    multipleStatements: "MULTIPLE_STATEMENTS",
    cli: {
      entitiesDir: "CLI_ENTITIES_DIR",
      migrationsDir: "CLI_MIGRAITONS_DIR",
      subscribersDir: "CLI_SUBSCRIBERS_DIR"
    },
    ssl: {
      rejectUnauthorized: "SSL_OPTS_REJECT_UNAUTHORIZED",
      ca: "SSL_OPTS_CA_PATH",
      key: "SSL_OPTS_KEY_PATH",
      cert: "SSL_OPTS_CERT_PATH"
    }
  }

  let config = { 
    type,
    synchronize: true,
    logging: false,
    entities: [
      "src/entity/**/*.ts"
    ],
    migrations: [
      "src/migration/**/*.ts"
    ],
    subscribers: [
      "src/subscriber/**/*.ts"
    ],
    cli: {
      entitiesDir: "src/entity",
      migrationsDir: "src/migration",
      subscribersDir: "src/subscriber"
    }
  };

  for (let [ key, value ] of Object.entries(suffixes)) {
    if (typeof value === 'object') {
      for (let [ k, v ] of Object.entries(value)) {
        if (process.env[`${prefix}_${v}`]) {
          config[`${key}`][`${k}`] = process.env[`${prefix}_${v}`];
        }
      }
    } else if (process.env[`${prefix}_${value}`]) {
      if (['subscribers', 'entities', 'migrations'].includes(key)) {
        config[`${key}`] = process.env[`${prefix}_${value}`].split(',');
      } else {
        config[`${key}`] = process.env[`${prefix}_${value}`];
      }
    }
  }

  return config;
}

switch (process.env.NODE_ENV) {
  case 'production':
    config = getConfigFromEnv();
    break;
  case 'testing':
    config = getConfigFromEnv();
    break;
  default:
    config = defaultConfig;
    break;
}

module.exports = config;