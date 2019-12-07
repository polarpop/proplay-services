import { 
  Resolver, 
  Query, 
  Mutation, 
  Ctx,
  Args,
  Arg,
  FieldResolver, 
  Root,
  UseMiddleware
} from '@proplay/type-graphql';
import { Repository } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';

import { Post } from '../graphql';
import { User } from '../entity';

@Resolver(of => Post)
export class PostResolver {

  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>
  ) {}

  @FieldResolver(returns => User)
  async owner(@Root() post: Post): Promise<User> {
    // @ts-ignore
    return await this.userRepository.findOne(post.ownerId);
  }  
}