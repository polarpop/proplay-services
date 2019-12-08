import { config } from '@proplay/utils';

export const server = {
  dev: {
    port: 3000,
    hostname: 'localhost',
    protocol: 'http',
    playground: true,
    tracing: true,
    cors: true,
    engine: true
  },
  test: config.createFromEnv('APOLLO'),
  production: config.createFromEnv('APOLLO')
}