import { BaseModel } from './BaseModel';

export interface Preference extends BaseModel {
  name: string;
  enabled: boolean;
}

export interface Device extends BaseModel {
  installationId: string;
  name?: string;
  os?: string;
  ipAddress?: string;
  pushToken?: string;
}

export interface Profile extends BaseModel {
  name: string;
  username: string;
  email: string;
  picture?: string;
  title?: string;
  company?: string;
  preferences?: Preference[];

}

export interface User extends BaseModel {
  externalId: string;
  source: string;
  profile: Profile;
  active?: boolean;
  premium?: boolean;
  role?: string;
  lastLogin?: Date;
  convertedBy?: User;
  conversions?: User[];
  following?: User[];
  followers?: User[];
  devices?: Device[];
}