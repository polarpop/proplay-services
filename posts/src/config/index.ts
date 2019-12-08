import { redis as redisConfig } from './redis';
import { server as serverConfig } from './server';
import { config } from '@proplay/utils';

export const redis: config.ConfigResponse = config.createExportedModule(redisConfig);

export const server: config.ConfigResponse = config.createExportedModule(serverConfig);