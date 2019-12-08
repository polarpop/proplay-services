import { Broker } from '@proplay/message-broker';
import { redis } from '../config';
import { UserMetaModel } from '../models';

const conf = Object.assign({}, redis.client, {
  prefix: 'users:authenticated:'
});

export const user = new Broker<UserMetaModel>(conf);
