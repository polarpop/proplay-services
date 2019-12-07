import fetch, { Response } from 'node-fetch';
import { getRepository, Repository } from 'typeorm';

import { User } from '../entity';

interface AccessTokenOptions {
  returnMetadataOnly?: boolean;
  returnSource?: boolean;
}

export interface AccessTokenMetadata {
  id: string;
  [key: string]: any;
  source: 'google' | 'facebook' | 'apple';
}

export type AccessTokenResponse = AccessTokenMetadata | User | undefined;

const FACEBOOK_URL = 'https://graph.facebook.com/5.0/me';

const GOOGLE_URL = 'https://www.googleapis.com/oauth2/v3/tokeninfo';

async function googleToken(token: string): Promise<Response> {
  return await fetch(`${GOOGLE_URL}?access_token=${token}`);
}

async function facebookToken(token: string): Promise<Response> {
  return await fetch(`${FACEBOOK_URL}?fields=id&access_token=${token}`);
}

async function tokenSlushBucket(token: string) {
  const facebook_token: Response = await facebookToken(token);
  const google_token: Response = await googleToken(token);
  let type;
  if (facebook_token) {
    type = 'facebook';
    return { userInfo: await facebook_token.json(), source: type };
  }

  if (google_token) {
    type = 'google';
    return { userInfo: await google_token.json(), source: type };
  }

  return Promise.reject(new Error(`Unauthenticated`));

}

export async function getUserFromAccessToken(token: string, options: AccessTokenOptions = {}): Promise<AccessTokenResponse> {
  const data = await tokenSlushBucket(token);
  const repo: Repository<User> = getRepository(User);
  if (!userInfo) return Promise.reject(new Error(`Unauthenticated`));
  if (options.returnMetadataOnly)  { 
    const info = data.userInfo;
    return {
      source: data.source,
      id: info.id,
      profile: {
        email: info?.email,
        username: info.username ? info.username : info?.email,
        name: info.name ? info.name : `${info.given_name} ${info.family_name}`,
        picture: data.source === 'facebook' ? info?.profile_pic : info?.picture
      }
    }
  } else {
    return await repo.findOne({
      where: {
        externalId: data.userInfo.id
      },
      relations: [
        'profile', 
        'following', 
        'followers', 
        'convertedBy', 
        'conversions', 
        'devices'
      ]
    });
  }

  
}