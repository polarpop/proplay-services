import { config } from '@proplay/utils';
import { redis as brokerConfig } from './broker';

export const redis: config.ConfigResponse = config.createExportedModule(brokerConfig);