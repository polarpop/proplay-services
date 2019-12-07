import fetch, { Response } from 'node-fetch';
import { User } from '../models';

const FACEBOOK_URL = 'https://graph.facebook.com/5.0/me';
const FACEBOOK_QUERIES = [
  'id',
  'name',
  'email',
  'favorite_athletes',
  'favorite_teams',
  'first_name',
  'last_name'
];

const GOOGLE_URL = 'https://www.googleapis.com/oauth2/v3/tokeninfo';

async function googleToken(token: string): Promise<Response> {
  return await fetch(`${GOOGLE_URL}?access_token=${token}`);
}

async function facebookToken(token: string): Promise<Response> {
  return await fetch(`${FACEBOOK_URL}?fields=${FACEBOOK_QUERIES.join(',')}&access_token=${token}`);
}

async function tokenSlushBucket(token: string) {
  const facebook_token: Response = await facebookToken(token);
  const google_token: Response = await googleToken(token);
  if (facebook_token) {
    return await facebook_token.json();
  }

  if (google_token) {
    return await google_token.json();
  }

  return Promise.reject(new Error(`Unauthenticated`));

}

export async function getUserFromToken(token: string): Promise<User> {
  try {
    const userInfo = await tokenSlushBucket(token);

    if (!userInfo) return Promise.reject(new Error(`Unauthenticated`));

    let type = 'facebook';
    

    if (userInfo.hasOwnProperty('iss')) {
      if (/google/gi.test(userInfo.iss)) {
        type = 'google';
      } else if (/apple/gi.test(userInfo.iss)) {
        type = 'apple';
      }
    }

    let user: any = {};

    switch (type) {
      case 'facebook':
        for (let [ key, value ] of Object.entries(userInfo)) {
          if (key === 'picture') {
            // @ts-ignore
            user.profile.picture = value.data.url;
          } else if (key === 'email') {
            user[`${key}`] = value;
            user.profile.username = value;
          } else if (key === 'id') {
            user.externalId = value;
            user.source = 'facebook';
          } else {
            user.profile[`${key}`] = value;
          }
        }
        break;
      case 'google':
        user.externalId = userInfo.id;
        user.profile.email = userInfo.email;
        user.profile.picture = userInfo.picture;
        user.profile.name = userInfo.name;
        user.source = 'google';
        break;

      case 'apple':
        user.externalId = userInfo.id;
        user.profile.email = userInfo.email;
        user.profile.picture = userInfo.picture;
        user.profile.name = userInfo.name;
        user.source = 'apple';
        break;
      default:
        break;


    }
    return user;
  } catch (e) {
    return Promise.reject(e);
  }
  
}