import { config } from '@proplay/utils';

export const redis = {
  dev: {
    client: {
      host: 'redis'
    }
  },
  test: {
    client: config.createFromEnv('REDIS')
  },
  production: {
    client: config.createFromEnv('REDIS')
  }
}