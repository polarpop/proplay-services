import { config } from '@proplay/utils';
import { redis as brokerConfig } from './broker';
import { server as serverConfig } from './server';

export const redis: config.ConfigResponse = config.createExportedModule(brokerConfig);

export const server: config.ConfigResponse = config.createExportedModule(serverConfig);