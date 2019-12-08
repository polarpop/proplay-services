import { Broker } from '@proplay/message-broker';
import { redis } from '../config';

export interface Service {
  name: string;
  url?: string;
}

const conf = Object.assign({}, redis.client, { prefix: 'services:configuration:' })

export const service = new Broker<Service>(conf);