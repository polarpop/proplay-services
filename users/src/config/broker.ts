import { config } from '@proplay/utils';

export const redis = {
  dev: {

  },
  test: {
    client: config.createFromEnv('REDIS')
  },
  production: {
    client: config.createFromEnv('REDIS')
  }
};