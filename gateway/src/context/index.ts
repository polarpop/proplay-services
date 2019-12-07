import { getUserFromToken } from './getUserFromToken';
import { userBroker } from '../Broker';
import { User } from '../models';

export async function createContext({ req }: any) {
  const token = req.headers?.authorization;
  
  let user = {};
  if (!token) return user;
  let authUser: User = await getUserFromToken(token);
  await userBroker.set(authUser, { keyId: 'externalId' });
  return { user: authUser };
}