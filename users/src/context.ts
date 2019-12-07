import { user as broker } from './brokers';

export async function context({ req }: any) {
  const externalId = req.headers['X-USER-ID'] || null;
  if (externalId) {
    const user = await broker.retrieve(externalId);
    if (user) return { user };
  }
  

  return {};
  
}