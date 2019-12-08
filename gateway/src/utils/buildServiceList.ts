import { ServiceDefinition } from '@apollo/federation';
import { service } from '../brokers';

export async function buildServiceList(): Promise<any[]> {
  return await service.scan('services:configuration:*');
}