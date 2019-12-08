import { config } from '@proplay/utils';

export const server = {
  dev: {
    port: 3002,
    hostname: 'localhost',
    protocol: 'http',
    playground: true,
    tracing: true,
    name: 'users'
  },
  test: config.createFromEnv('APOLLO'),
  production: config.createFromEnv('APOLLO')
}