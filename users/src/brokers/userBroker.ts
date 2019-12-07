import { Broker } from '@proplay/message-broker';
import { redis } from '../config';
import { User } from '../entity';

const conf = Object.assign({}, redis.client, {
  prefix: 'users:authenticated'
});

export const user: Broker<User> = new Broker(conf);
