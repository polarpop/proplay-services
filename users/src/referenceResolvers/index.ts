import { User } from '../entity';
import { getRepository } from 'typeorm';

export async function resolveUserReference(reference: Pick<User, "id">): Promise<User|undefined> {
  const repo = getRepository(User);
  return await repo.findOne(reference.id, { 
    where: {
      active: true
    } 
  });
}