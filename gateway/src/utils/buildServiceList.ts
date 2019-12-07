import { ServiceDefinition } from '@apollo/federation';
import { service } from '../brokers';

export async function buildServiceList(): Promise<Pick<ServiceDefinition, "name" | "url">[]> {
  return await service.scan('*');
}