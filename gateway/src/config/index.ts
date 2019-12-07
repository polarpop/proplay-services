import { redis as redisConfig } from './redis';
import { config } from '@proplay/utils';

export const redis: config.ConfigResponse = config.createExportedModule(redisConfig);