import { config } from '@proplay/utils';

export const server = {
  dev: {
    port: 3001,
    hostname: 'localhost',
    protocol: 'http',
    playground: true,
    tracing: true,
    name: 'posts'
  },
  test: config.createFromEnv('APOLLO'),
  production: config.createFromEnv('APOLLO')
}