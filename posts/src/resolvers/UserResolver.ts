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

import { User } from '../graphql/User';
import { Post } from '../entity';

@Resolver(of => User)
export class UserResolver {
  constructor(
    @InjectRepository(Post) private readonly postRepository: Repository<Post>
  ) {}
  @FieldResolver(returns => [Post])
  async posts(@Root() user: User): Promise<Post[]> {
    return await this.postRepository.find({
      where: {
        ownerId: user.id,
        active: true
      },
      relations: ['categories', 'video', 'views']
    });
  }
}