import { Post, Category } from '../entity';
import { getRepository } from 'typeorm';

export async function resolvePostReference(reference: Pick<Post, "id">): Promise<Post|undefined> {
  const repo = getRepository(Post);
  return await repo.findOne(reference.id, { 
    where: {
      active: true
    } 
  });
}

export async function resolveCategoryReference(reference: Pick<Category, "id">): Promise<Category|undefined> {
  const repo = getRepository(Category);
  return await repo.findOne(reference.id, {
    where: {
      active: true
    }
  });
}