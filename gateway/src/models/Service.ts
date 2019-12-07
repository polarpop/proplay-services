import { BaseModel } from './BaseModel';
import { DocumentNode } from 'graphql';

export interface Service extends BaseModel {
  url: string;
  typeDefs?: DocumentNode;
}